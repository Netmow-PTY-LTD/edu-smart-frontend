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

import {
  useCreateUserAirTicketDocRequestForAgentMutation,
  useGetSingleUserAirTicketDocSubmitedFilestForAgentQuery,
  useUpdateUserAirTicketDocStatusForAgentMutation,
} from '@/slice/services/agent/agentDocumentServices';
import { useGetSingleUserAirTicketDocumentRequestQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import AirTicketDocumentRequestModalFormForSuperAdmin from './modal/AirTicketDocumentRequestModalFormForSuperAdmin';
import StatusUpdateFormForSuperAdmin from './modal/StatusUpdateFormForSuperAdmin';
import { currentUser } from '@/utils/currentUserHandler';

const AirTicketDocumentRequestPageForSuperAdmin = ({ student_id }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const [searchTermForRequest, setSearchTermForRequest] = useState('');
  const [searchTermForSubmitedData, setSearchTermForSubmitedData] =
    useState('');
  const [currentPageForRequest, setCurrentPageForRequest] = useState(0);
  const [currentPageForSubmittedData, setCurrentPageForSubmittedData] =
    useState(0);
  const user = currentUser();

  const perPageDataForRequest = 10;
  const perPageDataForSubmittedData = 10;
  const [initialValues, setInitialValues] = useState({
    title: 'Air Ticket', // Set default value
    description: '',
  });

  const {
    AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN = [],
    AIRTICKET_SUBMITTED_HEADER_FOR_SUPERADMIN = [],
  } = DataObjectComponent();

  const [rejectStatusInitialValues, setRejectStatusInitialValues] = useState({
    notes: '',
  });

  const [createDocumentRequest] =
    useCreateUserAirTicketDocRequestForAgentMutation();

  const [updateDocumentRequest] =
    useUpdateUserAirTicketDocStatusForAgentMutation();

  const {
    data: getSingleUserAirTicketDocumentRequest,
    isLoading: getSingleUserAirTicketDocumentRequestIsLoading,
    refetch: getSingleUserAirTicketDocumentRequestRefetch,
  } = useGetSingleUserAirTicketDocumentRequestQuery(
    { student_id: student_id },
    { skip: !student_id }
  );
  const {
    data: getSingleUserAirTicketDocSubmisionData,
    isLoading: getSingleUserAirTicketDocSubmisionIsLoading,
    refetch: getSingleUserAirTicketDocSubmisionRefetch,
  } = useGetSingleUserAirTicketDocSubmitedFilestForAgentQuery(
    { student_id: student_id },
    { skip: !student_id }
  );

  const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string().required('description is required'),
  });

  //  search input change function
  const handleSearchChangeForRequest = (e) =>
    setSearchTermForRequest(e.target.value);
  const handleSearchChangeForSubmittedData = (e) =>
    setSearchTermForSubmitedData(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getSingleUserAirTicketDocumentRequest?.data?.length > 0 &&
    getSingleUserAirTicketDocumentRequest?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTermForRequest.toLowerCase())
    );

  // Filter data for search option
  const isfilteredDataForSubmittedData =
    getSingleUserAirTicketDocSubmisionData?.data?.length > 0 &&
    getSingleUserAirTicketDocSubmisionData?.data.filter((item) =>
      item?.title
        ?.toLowerCase()
        .includes(searchTermForSubmitedData.toLowerCase())
    );

  const handleSubmit = async (values, { setSubmitting }) => {
    const requested_date = new Date().toISOString();
    setSubmitting(true);
    const updatedata = {
      ...values,
      student_id,
      requested_date,
    };

    try {
      const result = await createDocumentRequest(updatedata).unwrap();
      if (result.success) {
        toast.success(result?.message);
        getSingleUserAirTicketDocumentRequestRefetch();
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
    const updatedDataStatus = {
      airticket_document_id,
      status,
      accepted_date,
      accepted_by: user.id,
    };
    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUserAirTicketDocumentRequestRefetch();
        getSingleUserAirTicketDocSubmisionRefetch();
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
      airticket_document_id: docId,
      status: 'rejected',
      rejected_by: user.id,
      rejected_date,
    };

    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUserAirTicketDocumentRequestRefetch();
        getSingleUserAirTicketDocSubmisionRefetch();
        togModal();
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

  const docRequestTableHeaderDataWithAction = [
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
    if (!getSingleUserAirTicketDocumentRequest?.data) return;

    const singleDocument = getSingleUserAirTicketDocumentRequest.data.find(
      (item) => item._id === docId
    );

    if (singleDocument) {
      setRejectStatusInitialValues({ notes: singleDocument?.notes || '' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSingleUserAirTicketDocumentRequest, docId]);

  return (
    <Row>
      {getSingleUserAirTicketDocumentRequestIsLoading ? (
        <LoaderSpiner />
      ) : (
        <div className="mt-1">
          <Card>
            <ToastContainer />
            <CardHeader className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2 gap-md-0">
              <button
                className="button py-3 px-4"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Add Request
              </button>
              <SearchComponent
                searchTerm={searchTermForRequest}
                handleSearchChange={handleSearchChangeForRequest}
              />
            </CardHeader>
            <AirTicketDocumentRequestModalFormForSuperAdmin
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
              <CommonTableComponent
                headers={[
                  ...AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN,
                  ...docRequestTableHeaderDataWithAction,
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
        </div>
      )}
      {getSingleUserAirTicketDocSubmisionIsLoading ? (
        <LoaderSpiner />
      ) : (
        <div className="mt-5">
          <Card>
            <ToastContainer />
            <CardHeader className="d-flex justify-content-between align-items-center">
              <div>
                <h2>All Air Ticket Document Submission Files</h2>
              </div>
              <SearchComponent
                searchTerm={searchTermForSubmitedData}
                handleSearchChange={handleSearchChangeForSubmittedData}
              />
            </CardHeader>

            <CardBody>
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
            </CardBody>
          </Card>
        </div>
      )}

      {
        <StatusUpdateFormForSuperAdmin
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

export default AirTicketDocumentRequestPageForSuperAdmin;
