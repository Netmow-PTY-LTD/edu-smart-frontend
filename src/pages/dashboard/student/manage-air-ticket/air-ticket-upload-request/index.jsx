import CommonTableComponent from '@/components/common/CommonTableComponent';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import SingleDocUploadForm from '@/components/StudentDashboard/components/SingleDocUploadForm';
import { useGetSingleUserAirTicketDocumentRequestQuery } from '@/slice/services/common/commonDocumentService';
import {
  useGetAllSubmittedAirTicketDocumentForStudentQuery,
  useUpdateSingleAirTicketDocumentForStudentMutation,
} from '@/slice/services/student/studentSubmitDocumentService';
import DataObjectComponent from '@/utils/common/data';
import { currentUser } from '@/utils/currentUserHandler';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import * as Yup from 'yup';

const AllAirTicketUploadDocumentsForStudents = () => {
  const user = currentUser();
  const [searchTermForRequest, setSearchTermForRequest] = useState('');
  const [searchTermForSubmitedData, setSearchTermForSubmitedData] =
    useState('');
  const [currentPageForRequest, setCurrentPageForRequest] = useState(0);
  const [currentPageForSubmittedData, setCurrentPageForSubmittedData] =
    useState(0);
  const perPageDataForRequest = 10;
  const perPageDataForSubmittedData = 10;
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');

  const [initialValues, setInitialValues] = useState({
    title: '',
    document: '',
    description: '',
  });

  const {
    studentSubmittedDocumentsHeaderWithoutAction,
    docRequestTableHeaderDataWithoutAction,
  } = DataObjectComponent();

  const {
    data: getSingleStudentAirTicketDocRequest,
    isLoading: getSingleStudentAirTicketDocRequestIsLoading,
    refetch: getSingleStudentAirTicketDocRequestRefetch,
  } = useGetSingleUserAirTicketDocumentRequestQuery({ student_id: user?.id });

  const {
    data: getSingleStudentAirTicketDocSubmittedData,
    isLoading: getSingleStudentAirTicketDocSubmittedIsLoading,
    refetch: getSingleStudentAirTicketDocSubmittedRefetch,
  } = useGetAllSubmittedAirTicketDocumentForStudentQuery();

  const [submitSingleDocumentForStudent] =
    useUpdateSingleAirTicketDocumentForStudentMutation();

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
      const requestData = getSingleStudentAirTicketDocRequest?.data?.find(
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
  }, [getSingleStudentAirTicketDocRequest, docId]);

  //  search input change function
  const handleSearchChangeForRequest = (e) =>
    setSearchTermForRequest(e.target.value);
  const handleSearchChangeForSubmittedData = (e) =>
    setSearchTermForSubmitedData(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getSingleStudentAirTicketDocRequest?.data?.length > 0 &&
    getSingleStudentAirTicketDocRequest?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTermForRequest.toLowerCase())
    );

  // Filter data for search option
  const isfilteredDataForSubmittedData =
    getSingleStudentAirTicketDocSubmittedData?.data?.length > 0 &&
    getSingleStudentAirTicketDocSubmittedData?.data.filter((item) =>
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
        getSingleStudentAirTicketDocRequestRefetch();
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
          {getSingleStudentAirTicketDocRequestIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h1> Document Uploaded Request</h1>
                <SearchComponent
                  searchTerm={searchTermForRequest}
                  handleSearchChange={handleSearchChangeForRequest}
                />
              </CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={[
                    ...studentSubmittedDocumentsHeaderWithoutAction,
                    ...uploadAction,
                  ]}
                  data={isfilteredData ? isfilteredData : []}
                  currentPage={currentPageForRequest}
                  setCurrentPage={setCurrentPageForRequest}
                  perPageData={perPageDataForRequest}
                  searchTerm={searchTermForRequest}
                  handleSearchChange={handleSearchChangeForRequest}
                  emptyMessage="No Data found yet."
                />
              </CardBody>
            </Card>
          )}

          {getSingleStudentAirTicketDocSubmittedIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h1> Air Ticket Document Submitted File</h1>
                <SearchComponent
                  searchTerm={searchTermForSubmitedData}
                  handleSearchChange={handleSearchChangeForSubmittedData}
                />
              </CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={docRequestTableHeaderDataWithoutAction}
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

export default AllAirTicketUploadDocumentsForStudents;
