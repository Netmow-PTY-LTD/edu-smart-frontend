import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useCreateDocRequestForAgentMutation } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';
import * as Yup from 'yup';
import DocumentRequestModalForm from './modal/DocumentRequestModalForm';

const DocumentRequestPage = ({
  student_id,
  getSingleStudent,
  refetchSingleStudent,
  sigleStudentIsLoading,
}) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
  });
  const perPageData = 10;

  const [createDocumentRequest] = useCreateDocRequestForAgentMutation();

  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
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
    getSingleStudent?.data?.documents?.length > 0 &&
    getSingleStudent?.data?.documents?.filter(
      (item) =>
        item?.status === 'requested' &&
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatedData = { ...values, user: student_id };
    try {
      const result = await createDocumentRequest(updatedData).unwrap();
      if (result) {
        toast.success(result?.message);
        refetchSingleStudent();
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
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.title ? item?.title : '-'}`}
          </h5>
        </div>
      ),
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
      {sigleStudentIsLoading ? (
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
