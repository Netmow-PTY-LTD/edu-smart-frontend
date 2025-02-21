import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import SingleDocUploadForm from '@/components/StudentDashboard/components/SingleDocUploadForm';
import { useGetSingleUserDocRequestQuery } from '@/slice/services/common/commonDocumentService';
import { useUpdateSingleDocumentForStudentMutation } from '@/slice/services/student/studentSubmitDocumentService';
import { currentUser } from '@/utils/currentUserHandler';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import * as Yup from 'yup';

const AllUploadDocumentsForStudents = () => {
  const user = currentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');

  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');
  const perPageData = 10;

  const [initialValues, setInitialValues] = useState({
    title: '',
    document: '',
    description: '',
  });

  const {
    data: getSingleStudentDocRequest,
    isLoading: getSingleStudentDocRequestIsLoading,
    refetch: getSingleStudentDocRequestRefetch,
  } = useGetSingleUserDocRequestQuery({ student_id: user?.id });

  const [submitSingleDocumentForStudent] =
    useUpdateSingleDocumentForStudentMutation();

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

  // search input change function

  useEffect(() => {
    const fetchFile = async () => {
      const requestData = getSingleStudentDocRequest?.data?.find(
        (item) => item?._id === docId
      );

      if (!requestData) return;

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
  }, [getSingleStudentDocRequest, docId]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getSingleStudentDocRequest?.data?.length > 0 &&
    getSingleStudentDocRequest?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const studentSubmittedDocumentsHeaderWithoutAction = [
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
      title: 'Title',
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
      title: 'Description',
      key: 'description',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.description ? item?.description : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.notes ? item?.notes : '-'}`}
          </h5>
        </div>
      ),
    },

    {
      title: 'Requested By',
      key: 'requested_by',
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
      title: 'Requester Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Uploaded Files',
      key: 'files',
      render: (item) => <FileViewer files={item?.files && item?.files} />,
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
                    : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...studentSubmittedDocumentsHeaderWithoutAction,
      ...uploadAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togModal = (id) => {
    setDocId(id);
    setOpenModal(!openModal);
  };

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
      const result = await submitSingleDocumentForStudent(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleStudentDocRequestRefetch();
        setOpenModal(!openModal);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const uploadAction = [
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => (
        <button
          onClick={() => togModal(item?._id)}
          className="button d-flex px-3 py-1"
        >
          Upload
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ToastContainer />
          {getSingleStudentDocRequestIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h1> Document Uploaded Request</h1>
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={AllUploadDocumentsForStudentsData}
                  data={isfilteredData ? isfilteredData : []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPageData={perPageData}
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  emptyMessage="No Data found yet."
                />
              </CardBody>
            </Card>
          )}
        </div>
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
    </Layout>
  );
};

export default AllUploadDocumentsForStudents;
