import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import {
  useCreateDocRequestForAgentMutation,
  useSingleStudentSubmittedDocumentForAgentQuery,
  useUpdateDocStatusForAgentMutation,
} from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import DocumentRequestModalForm from './modal/DocumentRequestModalForm';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

const DocumentRequestPage = ({ student_id, getSingleStudent }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const [createDocumentRequest] = useCreateDocRequestForAgentMutation();

  //console.log(student_id);
  // -------------------- Just for UI example this data will come from API -----------------------
  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');

  //console.log(useSingleStudentSubmittedDocumentForAgent);

  const perPageData = 10;

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    'allSubmittedDocumentForStudentData'?.data?.length > 0 &&
    'allSubmittedDocumentForStudentData'?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleEditButtonClick = (id) => {
    console.log(id);
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

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...documentRequestHeaderWithoutAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log(values);

    const updatedData = { ...values, user: student_id };
    try {
      // const finalData = new FormData();
      // Object.entries(updatedData).forEach(([key, value]) => {
      //   finalData.append(key, value);
      // });
      const result = await createDocumentRequest(updatedData).unwrap();
      if (result) {
        toast.success(result?.message);
        setAddModalIsOpen(!addModalIsOpen);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  //console.log(getSingleStudent?.data?.documents);

  const docRequestData = getSingleStudent?.data?.documents?.filter(
    (item) => item?.status === 'requested'
  );

  return (
    <Row>
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
              data={docRequestData || []}
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
    </Row>
  );
};

export default DocumentRequestPage;
