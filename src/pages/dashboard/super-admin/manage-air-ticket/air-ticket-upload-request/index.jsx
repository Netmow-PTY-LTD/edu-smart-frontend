import AirTicketDocumentRequestModalForm from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/AirTicketDocumentRequestModalForm';
import StatusUpdateForm from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/StatusUpdateForm';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useCreateUserAirTicketDocRequestForAgentMutation,
  useGetAllUserAirTicketDocSubmitedFilestForAgentQuery,
  useUpdateUserAirTicketDocStatusForAgentMutation,
} from '@/slice/services/agent/agentDocumentServices';
import { useGetAllStudentsAirticketDocumentRequestQuery } from '@/slice/services/common/commonDocumentService';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import * as Yup from 'yup';
const StudentAirtTicketDocumentUploadRquestForSuperAdmin = () => {
  const [searchTermForRequest, setSearchTermForRequest] = useState('');
  const [searchTermForSubmitedData, setSearchTermForSubmitedData] =
    useState('');
  const [currentPageForRequest, setCurrentPageForRequest] = useState(0);
  const [currentPageForSubmittedData, setCurrentPageForSubmittedData] =
    useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: 'Air Ticket', // Set default value
    description: '',
  });

  const [rejectStatusInitialValues, setRejectStatusInitialValues] = useState({
    notes: '',
  });

  const perPageDataForRequest = 10;
  const perPageDataForSubmittedData = 10;

  const {
    data: allDocumentRequestForAgentData,
    error: allDocumentRequestForAgentError,
    isLoading: allDocumentRequestForAgentIsLoading,
    refetch: allDocumentRequestForAgentRefetch,
  } = useGetAllStudentsAirticketDocumentRequestQuery();

  const {
    data: allAirTicketDocumentSubmittedDataForAgentData,
    error: allAirTicketDocumentSubmittedForAgentError,
    isLoading: allAirTicketDocumentSubmittedForAgentIsLoading,
    refetch: allAirTicketDocumentSubmittedForAgentRefetch,
  } = useGetAllUserAirTicketDocSubmitedFilestForAgentQuery();
  const [updateDocumentRequest] =
    useUpdateUserAirTicketDocStatusForAgentMutation();
  const [createDocumentRequest] =
    useCreateUserAirTicketDocRequestForAgentMutation();
  //  search input change function
  const handleSearchChangeForRequest = (e) =>
    setSearchTermForRequest(e.target.value);
  const handleSearchChangeForSubmittedData = (e) =>
    setSearchTermForSubmitedData(e.target.value);

  // Filter data for search option
  const isfilteredData =
    allDocumentRequestForAgentData?.data?.length > 0 &&
    allDocumentRequestForAgentData?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTermForRequest.toLowerCase())
    );

  // Filter data for search option
  const isfilteredDataForSubmittedData =
    allAirTicketDocumentSubmittedDataForAgentData?.data?.length > 0 &&
    allAirTicketDocumentSubmittedDataForAgentData?.data.filter((item) =>
      item?.title
        ?.toLowerCase()
        .includes(searchTermForSubmitedData.toLowerCase())
    );

  // Validation
  const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string().required('description is required'),
  });

  // Status Mutation

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const updatedata = {
      ...values,
      // student_id,
    };

    console.log('updatedata', updatedata);
    try {
      const result = createDocumentRequest(updatedata).unwrap();
      if (result) {
        toast.success(result?.message);
        allDocumentRequestForAgentRefetch();
        setAddModalIsOpen(false);
      }
    } catch (error) {
      console.error('Error in document request:', error);
      const errorMessage = error?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (airticket_document_id, status) => {
    const updatedDataStatus = { airticket_document_id, status };
    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        allDocumentRequestForAgentRefetch();
        allAirTicketDocumentSubmittedForAgentRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  const handleRejectStatus = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const updatedDataStatus = {
      ...values,
      airticket_document_id: docId,
      status: 'rejected',
    };

    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        allDocumentRequestForAgentRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  const togModal = (airticket_document_id) => {
    setDocId(airticket_document_id);
    setOpenModal(!openModal);
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
      title: 'Action',
      key: 'actions',
      render: (item) => (
        <UncontrolledDropdown direction="end">
          <DropdownToggle
            tag="a"
            className="text-reset dropdown-btn"
            role="button"
          >
            <span className="button px-3">
              <i className="ri-more-fill align-middle"></i>
            </span>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu dropdown-menu-end">
            <DropdownItem>
              <div
                className="text-primary"
                onClick={() => {
                  if (item?.status === 'submitted') {
                    handleStatusChange(item?._id, 'accepted');
                  } else {
                    toast.error('Document must be submitted first');
                  }
                }}
              >
                <i class="ri-check-double-line me-2 text-success"></i>
                Accepted
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="text-primary" onClick={() => togModal(item?._id)}>
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Rejected
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
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

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card>
            <CardHeader>
              <button
                className="button py-3 px-4"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Add Air Ticket Doc Request
              </button>
              <h3>
                All Student Air Ticket Document Upload Requests from Agent
              </h3>
              <SearchComponent
                searchTerm={searchTermForRequest}
                handleSearchChange={handleSearchChangeForRequest}
              />
            </CardHeader>
            <AirTicketDocumentRequestModalForm
              formHeader={'Add Air Ticket Document Request'}
              isOpen={addModalIsOpen}
              onClose={() => {
                setAddModalIsOpen(!addModalIsOpen);
              }}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              formSubmit={'Add Request'}
              setInitialValues={setInitialValues}
            />

            <CardBody>
              {allDocumentRequestForAgentIsLoading ? (
                <LoaderSpiner />
              ) : allDocumentRequestForAgentError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={docRequestTableHeaderDataWithoutAction}
                  data={isfilteredData ? isfilteredData : []}
                  currentPage={currentPageForRequest}
                  setCurrentPage={setCurrentPageForRequest}
                  perPageData={perPageDataForRequest}
                  searchTerm={searchTermForRequest}
                  handleSearchChange={handleSearchChangeForRequest}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h3>All Student Air Ticket Document Submission Table</h3>
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
            <StatusUpdateForm
              initialValues={rejectStatusInitialValues}
              OpenModal={openModal}
              toggle={togModal}
              handleAddSubmit={handleRejectStatus}
              submitBtn={'Send Notes'}
              validationSchema={Yup.object({
                notes: Yup.string().required('Notes is required'),
              })}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default StudentAirtTicketDocumentUploadRquestForSuperAdmin;
