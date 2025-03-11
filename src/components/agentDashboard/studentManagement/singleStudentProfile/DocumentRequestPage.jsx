import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
import * as Yup from 'yup';
import DocumentRequestModalForm from './modal/DocumentRequestModalForm';
import {
  useCreateUserDocRequestForAgentMutation,
  useUpdateUserDocStatusForAgentMutation,
} from '@/slice/services/agent/agentDocumentServices';
import { useGetSingleUserDocRequestQuery } from '@/slice/services/common/commonDocumentService';
import FileViewer from '@/components/common/FileViewer';
import StatusUpdateForm from './modal/StatusUpdateForm';
import DescriptionRenderer from '@/utils/DescriptionRenderer';
import moment from 'moment';
import { currentUser } from '@/utils/currentUserHandler';

const DocumentRequestPage = ({ student_id, request }) => {
  const user = currentUser();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    // notes: '',
  });

  const [rejectStatusInitialValues, setRejectStatusInitialValues] = useState({
    notes: '',
  });

  const perPageData = 10;

  const [createDocumentRequest] = useCreateUserDocRequestForAgentMutation();
  const [updateDocumentRequest] = useUpdateUserDocStatusForAgentMutation();

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
    description: Yup.string(),
    // notes: Yup.string(),
  });

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const isFilteredData =
    getSingleStudentDocRequest?.data?.length > 0 &&
    getSingleStudentDocRequest?.data?.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSubmit = async (values) => {
    const requested_date = new Date().toISOString();
    try {
      // Create an array of API calls for each document request
      const requests = values.map((item) => {
        return createDocumentRequest({
          title: item.title,
          description: item.description,
          student_id,
          requested_date,
        }).unwrap();
      });

      // Execute all requests in parallel
      // eslint-disable-next-line no-undef
      const results = await Promise.all(requests);

      // Handle success for all API calls
      results.forEach((result) => {
        if (result) {
          toast.success(result?.message);
        }
      });

      // Refresh data and close modal after all requests are done
      getSingleStudentDocRequestRefetch();
      setAddModalIsOpen((prev) => !prev); // Use previous state for reliable toggling
    } catch (error) {
      // Log error and show error message
      console.error('Error in document request:', error);
      const errorMessage = error?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  };

  const handleStatusChange = async (user_document_id, status) => {
    const accepted_date = new Date().toISOString();
    const updatedDataStatus = {
      user_document_id,
      status,
      accepted_date,
      accepted_by: user?.id,
    };
    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleStudentDocRequestRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  const handleRejectStatus = async (values, { setSubmitting }) => {
    const rejected_date = new Date().toISOString();
    setSubmitting(true);
    const updatedDataStatus = {
      ...values,
      user_document_id: docId,
      status: 'rejected',
      rejected_by: user.id,
      rejected_date,
    };

    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleStudentDocRequestRefetch();
        togModal();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  const togModal = (user_document_id) => {
    setDocId(user_document_id);
    setOpenModal(!openModal);
  };

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
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
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
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {item?.notes ? (
            <span style={{ color: '#007BFF' }}>{item?.notes}</span>
          ) : (
            'No notes yet'
          )}
        </div>
      ),
    },
    {
      title: 'Requested Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Submited Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
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

  useEffect(() => {
    if (!getSingleStudentDocRequest?.data) return;

    const singleDocument = getSingleStudentDocRequest.data.find(
      (item) => item._id === docId
    );

    if (singleDocument) {
      setRejectStatusInitialValues({ notes: singleDocument?.notes || '' });
    }

    setAllUploadDocumentsForStudentsData(() => [
      ...docRequestTableHeaderDataWithAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSingleStudentDocRequest, docId]);

  useEffect(() => {
    setAddModalIsOpen(request);
  }, [request]);

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
                Add Request
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
    </Row>
  );
};

export default DocumentRequestPage;
