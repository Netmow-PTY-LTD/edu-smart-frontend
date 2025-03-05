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
import React, { useState } from 'react';
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
  const [currentPageForRequest, setCurrentPageForRequest] = useState(0);
  const [currentPageForSubmittedData, setCurrentPageForSubmittedData] =
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

  const validationSchema = Yup.object().shape({
    student_id: Yup.string().required('Applicant Student is required'), // Ensure student_id is required
    description: Yup.string().required('Description is required'), // Ensure description is required
  });

  // Status Mutation

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const airTicketRequestData = {
      application: values.application_id,
      description: values.description,
      student_id: values.student_id,
      title: values.title,
    };

    try {
      const result = await createDocumentRequest(airTicketRequestData).unwrap();
      if (result.success) {
        console.log(result);
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
          <Card>
            <CardHeader>
              <button
                className="button py-3 px-4"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Create Request
              </button>
              <h3>
                All Student Air Ticket Document Upload Requests from Agent
              </h3>
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
                  headers={[
                    ...AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN,
                    ...HEADER_ACTION_FOR_SUPER,
                  ]}
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
                  headers={AIRTICKET_SUBMITTED_HEADER_FOR_SUPERADMIN}
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
