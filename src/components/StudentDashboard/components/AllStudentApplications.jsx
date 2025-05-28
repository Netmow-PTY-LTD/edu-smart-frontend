import CommonTableComponent from '@/components/common/CommonTableComponent';
import PaymentOption from '@/components/common/PaymentOption';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import StudentApplicationEmgsStatusTimeline from '@/components/StudentDashboard/components/StudentApplicationEmgsStatusTimeline';
import { useGetApplicationsQuery } from '@/slice/services/common/applicationService';
import { useSslCommerzPaymentIntendMutation } from '@/slice/services/common/paymentService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useSingleGetApplicationQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/public/application/applicationServiceNew';
import DataObjectComponent from '@/utils/common/data';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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

const AllStudentApplications = ({
  onPaymentSuccess = () => {},
  showLayout = false,
  showToast = true,
}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTimeline, setCurrentTimeline] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  const perPageData = 9;

  const { studentApplicationsHeaders = [] } = DataObjectComponent();
  const {
    data: applicationData,
    isLoading: applicationLoading,
    refetch: applicationDataRefetch,
  } = useGetApplicationsQuery();
  const { data: userInfoData, isLoading: userInfoLoading } =
    useGetUserInfoQuery();
  const {
    data: singleGetApplicationData,
    isLoading: singleGetApplicationLoading,
  } = useSingleGetApplicationQuery(applicationId, { skip: !applicationId });

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();
  const [
    updateApplicationStatus,
    {
      data: updateApplicationStatusData,
      isLoading: updateApplicationStatusIsLoading,
    },
  ] = useUpdateApplicationStatusMutation();

  useEffect(() => {
    if (updateApplicationStatusData?.success && !hasUpdated) {
      showToast && toast.success('Application Payment successful');
      applicationDataRefetch();
      onPaymentSuccess();
      setHasUpdated(true);
    } else if (updateApplicationStatusData?.error) {
      showToast &&
        toast.error(
          updateApplicationStatusData?.error?.message || 'Application failed'
        );
      setHasUpdated(true);
    }
  }, [updateApplicationStatusData, hasUpdated]);

  const sslCommerzPaymentHandler = async () => {
    const price =
      singleGetApplicationData?.data?.course?.emgs_fee ||
      singleGetApplicationData?.data?.course?.price;

    const domain =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
    const course_id = singleGetApplicationData?.data?.course?._id;
    const currency = 'MYR';

    try {
      const response = await sslCommerzPaymentIntend({
        price,
        faild_url: `${domain}/dashboard/student/applications/?payment_status=faild`,
        success_url: `${domain}/dashboard/student/applications/?payment_status=success`,
        cancel_url: `${domain}/dashboard/student/applications/?payment_status=cancel`,
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
          {item?.payment_status === 'pending' && (
            <DropdownItem
              onClick={() => {
                setApplicationId(item?._id);
                setOpenPaymentModal(true);
              }}
            >
              <i className="ri-bank-card-fill me-2 text-primary"></i>
              Pay Now
            </DropdownItem>
          )}
          <DropdownItem onClick={() => handleViewEmgsStatus(item?.emgs_status)}>
            <i className="ri-eye-fill me-2 text-primary"></i>
            View EMGS Status
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  // const filteredData = applicationData?.data?.filter(
  //   (item) => item?.emgs_payment_status !== 'pending'
  // );

  const filteredData = applicationData?.data
    ?.slice() // clone the array to avoid mutating original data
    ?.sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt);
      const dateB = new Date(a.updatedAt || a.createdAt);
      return dateA - dateB;
    });

  const MainContent = (
    <>
      {showToast && <ToastContainer />}
      {applicationLoading ? (
        <LoaderSpiner />
      ) : activeTab === '1' ? (
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="text-primary fw-semibold fs-2">
                Student's University Applications
              </CardHeader>
              <CardBody>
                {updateApplicationStatusIsLoading ? (
                  <LoaderSpiner />
                ) : (
                  <CommonTableComponent
                    headers={[
                      ...studentApplicationsHeaders,
                      EmgsStatusActionData,
                    ]}
                    data={filteredData || []}
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
      ) : (
        <StudentApplicationEmgsStatusTimeline
          setActiveTab={setActiveTab}
          currentTimeline={currentTimeline}
        />
      )}

      {openPaymentModal && (
        <Modal isOpen={openPaymentModal} centered size="lg">
          <ModalHeader
            toggle={() => {
              setApplicationId('');
              setOpenPaymentModal(false);
            }}
          >
            Select Payment Option
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
    </>
  );

  return showLayout ? (
    <div className="page-content">
      <div className="h-100">
        <div className="container-fluid">{MainContent}</div>
      </div>
    </div>
  ) : (
    MainContent
  );
};

export default AllStudentApplications;
