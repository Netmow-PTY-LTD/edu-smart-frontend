import ApplicationEmgsStatusTimeline from '@/components/agentDashboard/studentManagement/singleStudentProfile/ApplicationEmgsStatusTimeline';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import PaymentOption from '@/components/common/PaymentOption';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import ApplicationDocumentsModal from '@/components/sAdminDashboard/modals/ApplicationDocumentsModal';
import ApplicationEmgsStatusTimelineModal from '@/components/sAdminDashboard/modals/ApplicationEmgsStatusTimelineModal';
import StudentApplicationEmgsStatusTimeline from '@/components/StudentDashboard/components/StudentApplicationEmgsStatusTimeline';
import { useGetRecentApplicationsQuery } from '@/slice/services/common/applicationService';
import { useSslCommerzPaymentIntendMutation } from '@/slice/services/common/paymentService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useSingleGetApplicationQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/public/application/applicationServiceNew';
import DataObjectComponent from '@/utils/common/data';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select'; // if not already imported

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

export default function StudentApplications() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTimeline, setCurrentTimeline] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [emgsId, setEmgsId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const perPageData = 9;

  const { studentApplicationsHeaders = [] } = DataObjectComponent();

  const {
    data: applicationData,
    isLoading: applicationLoading,
    refetch: applicationDataRefetch,
  } = useGetRecentApplicationsQuery();


  
  const { data: userInfoData, isLoading: userInfoLoading } =
    useGetUserInfoQuery();

  const {
    data: singleGetApplicationData,
    isLoading: singleGetApplicationLoading,
  } = useSingleGetApplicationQuery(applicationId, {
    skip: !applicationId,
  });

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();

  const [
    updateApplicationStatus,
    {
      data: updateApplicationStatusData,
      isLoading: updateApplicationStatusIsLoading,
      isError: updateApplicationStatusIsError,
    },
  ] = useUpdateApplicationStatusMutation();

  useEffect(() => {
    if (updateApplicationStatusData?.success && !hasUpdated) {
      toast.success('Application Payment successfull');
      applicationDataRefetch();
      router.push(`/dashboard/agent/applications`);
      setHasUpdated(true);
    } else if (updateApplicationStatusData?.error) {
      toast.error(
        updateApplicationStatusData?.error?.message || 'Application failed'
      );
      setHasUpdated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateApplicationStatusData, hasUpdated]);

  useEffect(() => {
    if (router?.query?.payment_status === 'faild') {
      toast.error('Payment Failed');
    }
    if (router?.query?.payment_status === 'cancel') {
      toast.error('Payment Cancelled');
    }
    if (router?.query?.application_status === 'submitted') {
      applicationDataRefetch();
    }
  }, [router?.query?.payment_status]);

  useEffect(() => {
    const { payment_status, transaction_id, application_id } = router.query;

    if (
      payment_status === 'success' &&
      transaction_id &&
      application_id &&
      !hasUpdated &&
      !updateApplicationStatusIsLoading
    ) {
      updateApplicationStatus({
        status: 'paid',
        transaction_id,
        application_id,
      })
        .unwrap()
        .then(() => {
          setHasUpdated(true);
        })
        .catch((error) => {
          // toast.error('Something went wrong while updating application');
        });
    }
  }, [
    router.query,
    hasUpdated,
    updateApplicationStatus,
    updateApplicationStatusIsLoading,
  ]);

  const sslCommerzPaymentHandler = async () => {
    const price = singleGetApplicationData?.data?.course?.price;
    const faild_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/applications/?payment_status=faild`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/agent/applications/?payment_status=faild`;
    const success_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/applications/?payment_status=success`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/agent/applications/?payment_status=success`;
    const cancel_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/applications/?payment_status=cancel`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/agent/applications/?payment_status=cancel`;
    const course_id = singleGetApplicationData?.data?.course?._id;
    const currency = 'MYR';

    try {
      const response = await sslCommerzPaymentIntend({
        price,
        faild_url,
        success_url,
        cancel_url,
        course_id,
        currency,
        application_id: applicationId,
      }).unwrap();

      if (response.success && response?.data?.gatewayPageURL) {
        window.location.href = response?.data?.gatewayPageURL;
      } else {
        toast.error('Payment failed');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleViewEmgsStatus = (id) => {
    setCurrentTimeline(id);
    setActiveTab('2');
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const searchInItem = (item, searchTerm) => {
    if (!searchTerm) return true; // If no search term, return all items

    if (typeof item === 'object' && item !== null) {
      return Object.values(item).some((value) =>
        searchInItem(value, searchTerm)
      );
    }

    return String(item).toLowerCase().includes(searchTerm.toLowerCase());
  };


useEffect(() => {
  if (router?.query?.search) {
    setSelectedStatus({
      label: router.query.search
        .replace(/_/g, ' ') // make it human readable
        .replace(/\b\w/g, (c) => c.toUpperCase()), // capitalize
      value: router.query.search,
    });
  }
}, [router?.query?.search]);


const [selectedStatus, setSelectedStatus] = useState(null); // Add to your state

const handleStatusFilterChange = (selectedOption) => {
  setSelectedStatus(selectedOption);

  const query = { ...router.query };
  if (selectedOption) {
    query.search = selectedOption.value;
  } else {
    delete query.search;
  }

  router.push({
    pathname: router.pathname,
    query,
  }, undefined, { shallow: true }); // prevents full reload
};


const isfilteredData =
  applicationData?.data?.length > 0
    ? applicationData.data
        .filter((item) => {
          const matchesSearch = searchInItem(item, searchTerm);
          const matchesStatus = selectedStatus ? item?.status === selectedStatus.value : true;
          return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.localeCompare(a.createdAt); // DESC order
        })
    : [];



const statusOptions = [
  { label: 'Submitted', value: 'pending', icon: 'ri-check-fill' },
  { label: 'Review In', value: 'review_in', icon: 'ri-search-eye-line' },
  { label: 'File Requested', value: 'file_requested', icon: 'ri-folder-received-line' },
  { label: 'Ready For EMGS', value: 'ready_for_emgs', icon: 'ri-send-plane-line' },
  { label: 'File Under EMGS', value: 'file_under_emgs', icon: 'ri-file-search-line' },
  { label: 'Ready For Tuition', value: 'ready_for_tuition', icon: 'ri-graduation-cap-line' },
  { label: 'Tuition Under Processed', value: 'tuition_under_processed', icon: 'ri-loop-right-line' },
  { label: 'Accepted', value: 'accepted', icon: 'ri-check-line' },
  { label: 'Rejected', value: 'rejected', icon: 'ri-close-line' },
];




  const EmgsStatusActionData = {
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
        <DropdownMenu className="ms-2">
          {item?.payment_status === 'pending' ? (
            <DropdownItem>
              <div
                onClick={() => {
                  setApplicationId(item?._id), setOpenPaymentModal(true);
                }}
                className="text-primary"
              >
                <i className="ri-bank-card-fill me-2"></i>
                Pay Now
              </div>
            </DropdownItem>
          ) : (
            ''
          )}

          <DropdownItem>
              <div
                onClick={() => {
                  setApplicationId(item?._id);
                  setModalOpen(true);
                }}
                className="text-primary"
              >
              <i className="ri-eye-fill me-2"></i>
                View Documents
              </div>
          </DropdownItem>
          <DropdownItem>
   
               <div
                onClick={() => {
                  setEmgsId(item?.emgs_status);
                  setIsTimelineModalOpen(true);
                }}
                className="text-primary"
              >
              <i className="ri-eye-fill me-2"></i>
                View EMGS Status
              </div>

          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  return (
    <Layout>
      {applicationLoading ? (
        <LoaderSpiner />
      ) : activeTab === '1' ? (
        <div className="page-content">
          <ToastContainer />
          <div className="h-100">
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                       <CardHeader className="text-primary fw-semibold fs-2">
                        Student's University Applications
                        <SearchComponent
                          searchTerm={searchTerm}
                          handleSearchChange={handleSearchChange}
                        />
                          <div style={{ minWidth: 200 }}>
                            <Select
                              value={selectedStatus}
                              onChange={handleStatusFilterChange}
                              isClearable
                              placeholder="Filter by Status"
                              options={statusOptions.map((status) => ({
                                value: status.value,
                                label: status.label,
                              }))}
                            />
                          </div>
                      </CardHeader>

                      <CardBody className="mh-100">
                        {updateApplicationStatusIsLoading ? (
                          <LoaderSpiner />
                        ) : (
                          <CommonTableComponent
                            headers={[
                              ...studentApplicationsHeaders,
                              EmgsStatusActionData,
                            ]}
                            data={isfilteredData || []}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            perPageData={perPageData}
                            emptyMessage="No Data found yet."
                          />
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="page-content">
          <div className="h-100">
            <div className="container-fluid">
              <div>
                <ApplicationEmgsStatusTimeline
                  setActiveTab={setActiveTab}
                  currentTimeline={currentTimeline}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {openPaymentModal && (
        <Modal isOpen={openPaymentModal} centered size="lg">
          <ModalHeader
            toggle={() => {
              setApplicationId(''), setOpenPaymentModal(false);
            }}
          >
            Select Payment Option {}
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <div className="w-50 mx-auto">
                  <PaymentOption
                    sslCommerzPaymentHandler={() => sslCommerzPaymentHandler()}
                  />
                </div>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      )}

            <ApplicationEmgsStatusTimelineModal
              isOpen={isTimelineModalOpen}
              onClose={() => setIsTimelineModalOpen(false)}
              currentTimeline={emgsId}
            />
                <ApplicationDocumentsModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              applicationId={applicationId}
            />
    </Layout>
  );
}
