import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';
import * as Yup from 'yup';
import DocumentRequestModalForm from './modal/DocumentRequestModalForm';
import { useCreateUserDocRequestForAgentMutation } from '@/slice/services/agent/agentDocumentServices';
import { useGetSingleUserDocRequestQuery } from '@/slice/services/common/commonDocumentService';

const DocumentRequestPage = ({ student_id }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    notes: '',
  });
  const perPageData = 10;

  const [createDocumentRequest] = useCreateUserDocRequestForAgentMutation();
  const {
    data: getSingleStudentDocRequest,
    isLoading: getSingleStudentDocRequestIsLoading,
    refetch: getSingleStudentDocRequestRefetch,
  } = useGetSingleUserDocRequestQuery(
    { student_id: student_id },
    { skip: !student_id }
  );

  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    notes: Yup.string(),
  });

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...documentRequestHeaderWithoutAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const isFilteredData =
    getSingleStudentDocRequest?.data?.length > 0 &&
    getSingleStudentDocRequest?.data?.filter(
      (item) =>
        item?.status === 'requested' &&
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatedData = { ...values, student_id: student_id };

    console.log(updatedData);
    try {
      const result = await createDocumentRequest(updatedData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleStudentDocRequestRefetch();
        setAddModalIsOpen(!addModalIsOpen);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const documentRequestHeaderWithoutAction = [
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
        <div className="fs-14 fw-medium text-capitalize">
          {`${item?.description ? item?.description : '-'}`}
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

  return (
    <Row>
      {getSingleStudentDocRequestIsLoading ? (
        <LoaderSpiner />
      ) : (
        <div>
          <Card>
            <ToastContainer />
            <CardHeader className="d-flex justify-content-between align-items-center">
              <button
                className="button py-3 px-4"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Add Document Request
              </button>
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </CardHeader>
            <DocumentRequestModalForm
              formHeader={'Add Document'}
              isOpen={addModalIsOpen}
              onClose={() => {
                setAddModalIsOpen(!addModalIsOpen);
              }}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              formSubmit={'Add Document'}
              setInitialValues={setInitialValues}
            />
            <CardBody>
              <CommonTableComponent
                headers={AllUploadDocumentsForStudentsData}
                data={isFilteredData || []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPageData={perPageData}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                emptyMessage="No Data found yet."
              />
            </CardBody>
          </Card>
        </div>
      )}
    </Row>
  );
};

export default DocumentRequestPage;
