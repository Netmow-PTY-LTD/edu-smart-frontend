import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import SingleDocUploadForm from '@/components/StudentDashboard/components/SingleDocUploadForm';
import { useGetAllUserAirTicketDocSubmitedFilestForAgentQuery } from '@/slice/services/agent/agentDocumentServices';
import {
  useGetAllStudentsAirticketDocumentRequestQuery,
  useUpdateSingleAirTicketDocumentForAgentMutation,
} from '@/slice/services/common/commonDocumentService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import * as Yup from 'yup';
const StudentAirtTicketDocumentUploadRquestForAgent = () => {
  const [searchTermForRequestForAgent, setSearchTermForRequestForAgent] =
    useState('');
  const [
    searchTermForRequestForSuperAdmin,
    setSearchTermForRequestForSuperAdmin,
  ] = useState('');
  const [searchTermForSubmitedData, setSearchTermForSubmitedData] =
    useState('');
  const [currentPageForRequestForAgent, setCurrentPageForRequestForAgent] =
    useState(0);
  const [
    currentPageForRequestForSuparAdmin,
    setCurrentPageForRequestForSuparAdmin,
  ] = useState(0);
  const [currentPageForSubmittedData, setCurrentPageForSubmittedData] =
    useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const perPageDataForRequest = 10;
  const perPageDataForSubmittedData = 10;
  const [initialValues, setInitialValues] = useState({
    title: '',
    document: '',
    description: '',
  });

  const validationSchema = Yup.object({
    document: Yup.array()
      .of(
        Yup.mixed()
          .test(
            'fileFormat',
            'Only PDF, JPG, PNG files are allowed',
            (value) => {
              if (value) {
                const fileType = value.type;
                return (
                  fileType === 'application/pdf' ||
                  fileType === 'image/jpeg' ||
                  fileType === 'image/png'
                );
              }
              return false;
            }
          )
          .test('fileSize', 'File size must be 5MB or less', (value) => {
            if (value) {
              return value.size <= 5 * 1024 * 1024;
            }
            return false;
          })
      )
      .required('Documents are required')
      .min(1, 'At least one document is required')
      .max(5, 'You can upload a maximum of 5 documents'),
  });
  const {
    data: allDocumentRequestForAgentData,
    error: allDocumentRequestForAgentError,
    isLoading: allDocumentRequestForAgentIsLoading,
    refetch: allDocumentRequestForAgentRefetch,
  } = useGetAllStudentsAirticketDocumentRequestQuery();

  const superAdminAirtTicketDocRequestData =
    allDocumentRequestForAgentData?.data?.filter(
      (item) => item.requested_by.role === 'super_admin'
    );

  const agentAirtTicketDocRequestData =
    allDocumentRequestForAgentData?.data?.filter(
      (item) => item.requested_by.role === 'agent'
    );

  const {
    data: allAirTicketDocumentSubmittedDataForAgentData,
    error: allAirTicketDocumentSubmittedForAgentError,
    isLoading: allAirTicketDocumentSubmittedForAgentIsLoading,
    refetch: allAirTicketDocumentSubmittedForAgentRefetch,
  } = useGetAllUserAirTicketDocSubmitedFilestForAgentQuery();

  const [submitSingleDocumentForAgent] =
    useUpdateSingleAirTicketDocumentForAgentMutation();
  //  search input change function
  const handleSearchChangeForRequestForSuperAdmin = (e) =>
    setSearchTermForRequestForSuperAdmin(e.target.value);
  const handleSearchChangeForRequestForAgent = (e) =>
    setSearchTermForRequestForAgent(e.target.value);
  const handleSearchChangeForSubmittedData = (e) =>
    setSearchTermForSubmitedData(e.target.value);

  // Filter data for search option SuperAdmin
  const isfilteredDataForSuperAdmin =
    superAdminAirtTicketDocRequestData?.length > 0 &&
    superAdminAirtTicketDocRequestData.filter((item) =>
      item?.title
        ?.toLowerCase()
        .includes(searchTermForRequestForSuperAdmin.toLowerCase())
    );
  // Filter data for search option
  const isfilteredDataForAgent =
    agentAirtTicketDocRequestData?.length > 0 &&
    agentAirtTicketDocRequestData.filter((item) =>
      item?.title
        ?.toLowerCase()
        .includes(searchTermForRequestForAgent.toLowerCase())
    );

  // Filter data for search option
  const isfilteredDataForSubmittedData =
    allAirTicketDocumentSubmittedDataForAgentData?.data?.length > 0 &&
    allAirTicketDocumentSubmittedDataForAgentData?.data.filter((item) =>
      item?.title
        ?.toLowerCase()
        .includes(searchTermForSubmitedData.toLowerCase())
    );

  const togModal = (id) => {
    setInitialValues({
      title: '',
      document: '',
      description: '',
    });
    setDocId(id);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const fetchFile = async () => {
      const requestData = allDocumentRequestForAgentData?.data?.find(
        (item) => item?._id === docId
      );

      if (!requestData) return;

      // eslint-disable-next-line no-undef
      const files = await Promise.all(
        requestData?.files?.map(
          async (file) => await convertImageUrlToFile(file.url)
        )
      );

      setInitialValues({
        title: requestData?.title || '',
        document: files || '',
        description: requestData?.description || '',
      });
    };

    fetchFile();
  }, [allDocumentRequestForAgentData, docId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatedata = {
      ...values,
      id: docId,
      status: 'submitted',
    };

    try {
      const finalData = new FormData();
      Object.entries(updatedata).forEach(([key, value]) => {
        if (key === 'document') {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              finalData.append(`${key}`, item);
            });
          }
        } else {
          finalData.append(key, value);
        }
      });
      const result = await submitSingleDocumentForAgent(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        allDocumentRequestForAgentRefetch();
        setOpenModal(!openModal);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const docRequestTableHeaderDataWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=6`}
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },

    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Requester Role',
      key: 'role',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.role ? item?.requested_by?.role : '-'}
        </span>
      ),
    },

    {
      title: 'Requester Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium">
            {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {`${item?.notes ? item?.notes : '-'}`}
        </div>
      ),
    },
    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => {
        if (item?.requested_by?.role === 'agent') {
          return <span className="text-capitalize">-</span>;
        }
        return (
          <button
            onClick={() => togModal(item?._id)}
            className="button d-flex px-3 py-1"
          >
            Upload
          </button>
        );
      },
    },
  ];

  const airTicketdocSubmitedTableHeaderDataWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },

    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=6`}
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },
    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Descriptions',
      key: 'description',
    },

    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Requester Role',
      key: 'role',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.role ? item?.requested_by?.role : '-'}
        </span>
      ),
    },

    {
      title: 'Requester Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium ">
            {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const docRequestTableHeaderDataWithAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=6`}
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },

    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Requester Role',
      key: 'role',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.role ? item?.requested_by?.role : '-'}
        </span>
      ),
    },

    {
      title: 'Requester Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium">
            {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {`${item?.notes ? item?.notes : '-'}`}
        </div>
      ),
    },
    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => {
        if (item?.requested_by?.role === 'agent') {
          return <span className="text-capitalize">-</span>;
        }
        return (
          <button
            onClick={() => togModal(item?._id)}
            className="button d-flex px-3 py-1"
          >
            Upload
          </button>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card>
            <CardHeader>
              <h3 className="fs-1 fw-bold text-primary text-center py-3 ">
                All Student Air Ticket Document Upload Requests from You
              </h3>
              <SearchComponent
                searchTerm={searchTermForRequestForAgent}
                handleSearchChange={handleSearchChangeForRequestForAgent}
              />
            </CardHeader>
            <CardBody>
              {allDocumentRequestForAgentIsLoading ? (
                <LoaderSpiner />
              ) : allDocumentRequestForAgentError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={docRequestTableHeaderDataWithoutAction}
                  data={isfilteredDataForAgent ? isfilteredDataForAgent : []}
                  currentPage={currentPageForRequestForAgent}
                  setCurrentPage={setCurrentPageForRequestForAgent}
                  perPageData={perPageDataForRequest}
                  searchTerm={searchTermForRequestForAgent}
                  handleSearchChange={handleSearchChangeForRequestForAgent}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>
          {/* For Super Admin Request doc Table */}
          <Card>
            <CardHeader>
              <h3 className="fs-1 fw-bold text-primary text-center py-3 ">
                All Student Air Ticket Document Upload Requests from Super Admin
              </h3>
              <SearchComponent
                searchTerm={searchTermForRequestForSuperAdmin}
                handleSearchChange={handleSearchChangeForRequestForSuperAdmin}
              />
            </CardHeader>
            <CardBody>
              {allDocumentRequestForAgentIsLoading ? (
                <LoaderSpiner />
              ) : allDocumentRequestForAgentError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={docRequestTableHeaderDataWithAction}
                  data={
                    isfilteredDataForSuperAdmin
                      ? isfilteredDataForSuperAdmin
                      : []
                  }
                  currentPage={currentPageForRequestForSuparAdmin}
                  setCurrentPage={setCurrentPageForRequestForSuparAdmin}
                  perPageData={perPageDataForRequest}
                  searchTerm={searchTermForRequestForSuperAdmin}
                  handleSearchChange={handleSearchChangeForRequestForSuperAdmin}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="fs-1 fw-bold text-primary text-center py-3 ">
                All Student Air Ticket Document Submission Table
              </h3>
              <SearchComponent
                searchTerm={searchTermForSubmitedData}
                handleSearchChange={handleSearchChangeForSubmittedData}
              />
            </CardHeader>
            <CardBody>
              {allAirTicketDocumentSubmittedForAgentIsLoading ? (
                <LoaderSpiner />
              ) : allAirTicketDocumentSubmittedForAgentError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={airTicketdocSubmitedTableHeaderDataWithoutAction}
                  data={
                    isfilteredDataForSubmittedData
                      ? isfilteredDataForSubmittedData
                      : []
                  }
                  currentPage={currentPageForSubmittedData}
                  setCurrentPage={setCurrentPageForSubmittedData}
                  perPageData={perPageDataForSubmittedData}
                  searchTerm={searchTermForSubmitedData}
                  handleSearchChange={handleSearchChangeForSubmittedData}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>

          {
            <SingleDocUploadForm
              initialValues={initialValues}
              OpenModal={openModal}
              toggle={togModal}
              handleAddSubmit={handleSubmit}
              submitBtn={'Upload'}
              validationSchema={validationSchema}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default StudentAirtTicketDocumentUploadRquestForAgent;
