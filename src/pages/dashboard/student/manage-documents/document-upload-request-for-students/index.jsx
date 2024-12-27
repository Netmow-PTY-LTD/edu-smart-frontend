import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import SingleDocUploadForm from '@/components/StudentDashboard/components/SingleDocUploadForm';
import {
  useGetDocumentRequestForStudentQuery,
  useSubmitSingleDocumentForStudentMutation,
} from '@/slice/services/student/studentSubmitDocumentService';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllUploadDocumentsForStudents = () => {
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
  });

  const {
    data: getDocumentRequestForStudentData,
    isLoading: getDocumentRequestForStudentIsLoading,
    refetch: getDocumentRequestForStudentRefetch,
  } = useGetDocumentRequestForStudentQuery();

  const [submitSingleDocumentForStudent] =
    useSubmitSingleDocumentForStudentMutation();

  console.log(getDocumentRequestForStudentData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getDocumentRequestForStudentData?.data?.length > 0 &&
    getDocumentRequestForStudentData?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
    console.log(values);
    const updatedata = {
      ...values,
      id: docId,
    };
    try {
      const finalData = new FormData();
      Object.entries(updatedata).forEach(([key, value]) => {
        if (key === 'document') {
          // if (Array.isArray(value)) {
          //   value.forEach((item, index) => {
          //     finalData.append(`${key}[${index}]`, item);
          //   });
          // }
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
        getDocumentRequestForStudentRefetch();
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
          {getDocumentRequestForStudentIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                Uploaded Docs
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
          />
        }
      </div>
    </Layout>
  );
};

export default AllUploadDocumentsForStudents;
