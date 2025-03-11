import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AirTicketDocumentRequestModalFormForSuper from '@/components/sAdminDashboard/airTikcetDocManagement/modal/AirTicketDocumentRequestModalFormForSuper';
import StatusUpdateFormForSuper from '@/components/sAdminDashboard/airTikcetDocManagement/modal/StatusUpdateFormForSuper';
import {
  useCreateUserAirTicketDocRequestForAgentMutation,
  useGetAllUserAirTicketDocSubmitedFilestForAgentQuery,
  useUpdateUserAirTicketDocStatusForAgentMutation,
} from '@/slice/services/agent/agentDocumentServices';
import { useGetAllStudentsAirticketDocumentRequestQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import React, { useMemo, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
  const [searchTermForAcceptedData, setSearchTermForAcceptedData] =
    useState('');
  const [currentPageForRequest, setCurrentPageForRequest] = useState(0);
  const [currentPageForSubmittedData, setCurrentPageForSubmittedData] =
    useState(0);
  const [currentPageForAcceptedData, setCurrentPageForAcceptedData] =
    useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: 'Air Ticket', // Set default value
    description: '',
    student_id: '',
  });

  const {
    AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN = [],
    AIRTICKET_SUBMITTED_HEADER_FOR_SUPERADMIN = [],
    AIRTICKET_ACCEPTED_HEADER_FOR_SUPERADMIN = [],
  } = DataObjectComponent();

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

  // Memoized Data Processing
  const { submittedDocData, requestedDocData } = useMemo(
    () => ({
      submittedDocData:
        allDocumentRequestForAgentData?.data?.filter(
          (item) => item.status === 'submitted'
        ) || [],
      requestedDocData:
        allDocumentRequestForAgentData?.data?.filter(
          (item) => item.status === 'requested' || item.status === 'rejected'
        ) || [],
    }),
    [allDocumentRequestForAgentData]
  );

  //  search input change function
  const handleSearchChangeForRequest = (e) =>
    setSearchTermForRequest(e.target.value);
  const handleSearchChangeForSubmittedData = (e) =>
    setSearchTermForSubmitedData(e.target.value);
  const handleSearchChangeForAcceptedData = (e) =>
    setSearchTermForAcceptedData(e.target.value);

  // Filter data for search option
  const isfilteredDataForRequested =
    requestedDocData?.length > 0 &&
    requestedDocData?.filter((item) =>
      item?.title?.toLowerCase().includes(searchTermForRequest.toLowerCase())
    );
  // Filter data for search option
  const isfilteredDataForSubmittedData =
    submittedDocData?.length > 0 &&
    submittedDocData?.filter((item) =>
      item?.title
        ?.toLowerCase()
        .includes(searchTermForSubmitedData.toLowerCase())
    );

  // Validation
  const deepSearch = (obj, searchTerm) => {
    if (!obj) return false;

    // Convert search term to lowercase and split into words
    const searchWords = searchTerm.toLowerCase().split(' ');

    // Function to check if all words exist in object data
    const containsAllWords = (value) => {
      if (typeof value === 'string') {
        const lowerValue = value.toLowerCase();
        return searchWords.every((word) => lowerValue.includes(word));
      }
      return false;
    };

    // If obj is a string, check if it contains all words
    if (containsAllWords(obj)) {
      return true;
    }

    // If obj is an array, recursively search in each element
    if (Array.isArray(obj)) {
      return obj.some((item) => deepSearch(item, searchTerm));
    }

    // If obj is an object, recursively search in each property
    if (typeof obj === 'object') {
      return Object.values(obj).some((value) => deepSearch(value, searchTerm));
    }

    return false;
  };

  // Filtering the data based on search term
  const isfilteredDataForAcceptedData =
    allAirTicketDocumentSubmittedDataForAgentData?.data?.length > 0
      ? allAirTicketDocumentSubmittedDataForAgentData.data.filter((item) =>
          deepSearch(item, searchTermForAcceptedData)
        )
      : [];

  const validationSchema = Yup.object().shape({
    student_id: Yup.string().required('Applicant Student is required'), // Ensure student_id is required
    description: Yup.string().required('Description is required'), // Ensure description is required
  });

  // Status Mutation

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const requested_date = new Date().toISOString();
    const airTicketRequestData = {
      application: values.application_id,
      description: values.description,
      student_id: values.student_id,
      title: values.title,
      requested_date: requested_date,
    };

    try {
      const result = await createDocumentRequest(airTicketRequestData).unwrap();
      if (result.success) {
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
    const accepted_date = new Date().toISOString();
    // accepted_date
    const updatedDataStatus = {
      airticket_document_id,
      status,
      accepted_date: accepted_date,
    };
    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result.success) {
        toast.success(result?.message);
        setOpenModal(false);
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
      if (result.success) {
        toast.success(result?.message);
        setOpenModal(false);
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

  const HEADER_ACTION_FOR_SUPER = [
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

  return (
    <Layout>
      <div className="page-content">
        <ToastContainer />
        <div className="h-100">
          {/* reqested doc */}
          <Card>
            <CardHeader>
              <button
                className="button py-3 px-4"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Create Request
              </button>
              <h3 className="fs-1 fw-semibold">Air Ticket Requests</h3>
              <SearchComponent
                searchTerm={searchTermForRequest}
                handleSearchChange={handleSearchChangeForRequest}
              />
            </CardHeader>
            <AirTicketDocumentRequestModalFormForSuper
              formHeader={'Add Request'}
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
                  headers={[...AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN]}
                  data={
                    isfilteredDataForRequested ? isfilteredDataForRequested : []
                  }
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

          {/* submitted doc */}
          <Card>
            <CardHeader>
              <h3 className="fs-1 fw-semibold">Air Ticket Submitted</h3>
              <SearchComponent
                searchTerm={searchTermForSubmitedData}
                handleSearchChange={handleSearchChangeForSubmittedData}
              />
            </CardHeader>

            <CardBody>
              {allDocumentRequestForAgentIsLoading ? (
                <LoaderSpiner />
              ) : allDocumentRequestForAgentError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={[
                    ...AIRTICKET_SUBMITTED_HEADER_FOR_SUPERADMIN,
                    ...HEADER_ACTION_FOR_SUPER,
                  ]}
                  data={
                    isfilteredDataForSubmittedData
                      ? isfilteredDataForSubmittedData
                      : []
                  }
                  currentPage={currentPageForSubmittedData}
                  setCurrentPage={setCurrentPageForSubmittedData}
                  perPageData={perPageDataForRequest}
                  searchTerm={searchTermForSubmitedData}
                  handleSearchChange={handleSearchChangeForSubmittedData}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>

          {/* accepted doc */}
          <Card>
            <CardHeader>
              <h3 className="fs-1 fw-semibold">Air Ticket Accepted</h3>
              <SearchComponent
                searchTerm={searchTermForAcceptedData}
                handleSearchChange={handleSearchChangeForAcceptedData}
              />
            </CardHeader>
            <CardBody>
              {allAirTicketDocumentSubmittedForAgentIsLoading ? (
                <LoaderSpiner />
              ) : allAirTicketDocumentSubmittedForAgentError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={AIRTICKET_ACCEPTED_HEADER_FOR_SUPERADMIN}
                  data={
                    isfilteredDataForAcceptedData
                      ? isfilteredDataForAcceptedData
                      : []
                  }
                  currentPage={currentPageForAcceptedData}
                  setCurrentPage={setCurrentPageForAcceptedData}
                  perPageData={perPageDataForSubmittedData}
                  searchTerm={searchTermForAcceptedData}
                  handleSearchChange={handleSearchChangeForAcceptedData}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>
          {
            <StatusUpdateFormForSuper
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
