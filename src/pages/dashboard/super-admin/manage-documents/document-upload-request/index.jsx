import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import StatusUpdateFormForSuper from '@/components/sAdminDashboard/airTikcetDocManagement/modal/StatusUpdateFormForSuper';
import StudentFinderModalForSuperAdmin from '@/components/sAdminDashboard/studentManagement/modal/StudentFinderModalForSuperAdmin';
import { useUpdateUserDocStatusForAgentMutation } from '@/slice/services/agent/agentDocumentServices';
import { useGetAllUserDocRequestQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import { useRouter } from 'next/router';
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
const StudentDocumentUploadRquestForSuperAdmin = () => {
  const [searchTermForRequest, setSearchTermForRequest] = useState('');
  const [searchTermForSubmitedData, setSearchTermForSubmitedData] =
    useState('');
  const [currentPageForRequest, setCurrentPageForRequest] = useState(0);
  const [currentPageForSubmittedData, setCurrentPageForSubmittedData] =
    useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const router = useRouter();

  const [rejectStatusInitialValues, setRejectStatusInitialValues] = useState({
    notes: '',
  });

  // api requested
  const { docRequestTableHeaderDataWithoutActionForSuperAdmin = [] } =
    DataObjectComponent();

  const {
    data: allDocumentRequestForSuperAdminData,
    error: allDocumentRequestForSuperAdminError,
    isLoading: allDocumentRequestForSuperAdminIsLoading,
    refetch: allDocumentRequestForSuperAdminRefetch,
  } = useGetAllUserDocRequestQuery();

  const [updateDocumentRequest] = useUpdateUserDocStatusForAgentMutation();

  //  search input change function
  const handleSearchChangeForRequest = (e) =>
    setSearchTermForRequest(e.target.value);
  const handleSearchChangeForSubmittedData = (e) =>
    setSearchTermForSubmitedData(e.target.value);

  // Memoized Data Processing
  const { requestedAndRejectedData, submittedData } = useMemo(
    () => ({
      requestedAndRejectedData:
        allDocumentRequestForSuperAdminData?.data?.filter(
          (item) => item.status === 'requested' || item.status === 'rejected'
        ) || [],
      submittedData:
        allDocumentRequestForSuperAdminData?.data?.filter(
          (item) => item.status === 'submitted'
        ) || [],
    }),
    [allDocumentRequestForSuperAdminData]
  );

  // Filter data for search option
  const isfilteredData =
    requestedAndRejectedData?.length > 0 &&
    requestedAndRejectedData?.filter((item) =>
      item?.title?.toLowerCase().includes(searchTermForRequest.toLowerCase())
    );

  // Filter data for search option
  const isfilteredDataForSubmittedData =
    submittedData?.length > 0 &&
    submittedData?.filter((item) =>
      item?.title
        ?.toLowerCase()
        .includes(searchTermForSubmitedData.toLowerCase())
    );

  // Status Mutation

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    const student_id = values.student_id;

    // Redirect to the student profile page
    router.push({
      pathname: `/dashboard/super-admin/students/${student_id}`,
      query: { tab: 3, request: true },
    });
  };

  const handleStatusChange = async (user_document_id, status) => {
    const updatedDataStatus = { user_document_id, status };
    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        allDocumentRequestForSuperAdminRefetch();
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
      user_document_id: docId,
      status: 'rejected',
    };

    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        allDocumentRequestForSuperAdminRefetch();
        togModal();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };
  const togModal = (application_document_id) => {
    setDocId(application_document_id);
    setOpenModal(!openModal);
  };

  const HEADER_ACTION_FOR_SUPER = [
    {
      title: 'Action',
      key: 'actions',
      render: (item) => {
        if (item.requested_by.role === 'agent') {
          return <span>-</span>;
        }
        return (
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
                <div
                  className="text-primary"
                  onClick={() => togModal(item?._id)}
                >
                  <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                  Rejected
                </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
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
              <h3 className="fs-1 fw-semibold">
                All Document Requested And Rejected
              </h3>
              <SearchComponent
                searchTerm={searchTermForRequest}
                handleSearchChange={handleSearchChangeForRequest}
              />
            </CardHeader>
            {
              <StudentFinderModalForSuperAdmin
                formHeader={' Find And Select Student *'}
                isOpen={addModalIsOpen}
                onClose={() => {
                  setAddModalIsOpen(!addModalIsOpen);
                }}
                onSubmit={handleSubmit}
                formSubmit={'Submit for Request'}
              />
            }

            <CardBody>
              {allDocumentRequestForSuperAdminIsLoading ? (
                <LoaderSpiner />
              ) : allDocumentRequestForSuperAdminError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={docRequestTableHeaderDataWithoutActionForSuperAdmin}
                  data={isfilteredData ? isfilteredData : []}
                  currentPage={currentPageForRequest}
                  setCurrentPage={setCurrentPageForRequest}
                  perPageData={10}
                  searchTerm={searchTermForRequest}
                  handleSearchChange={handleSearchChangeForRequest}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="fs-1 fw-semibold">All Submiteed Document</h3>
              <SearchComponent
                searchTerm={searchTermForSubmitedData}
                handleSearchChange={handleSearchChangeForSubmittedData}
              />
            </CardHeader>
            <CardBody>
              {allDocumentRequestForSuperAdminIsLoading ? (
                <LoaderSpiner />
              ) : allDocumentRequestForSuperAdminError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={[
                    ...docRequestTableHeaderDataWithoutActionForSuperAdmin,
                    ...HEADER_ACTION_FOR_SUPER,
                  ]}
                  data={
                    isfilteredDataForSubmittedData
                      ? isfilteredDataForSubmittedData
                      : []
                  }
                  currentPage={currentPageForSubmittedData}
                  setCurrentPage={setCurrentPageForSubmittedData}
                  perPageData={10}
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

export default StudentDocumentUploadRquestForSuperAdmin;
