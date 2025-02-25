import CommonTableComponent from '@/components/common/CommonTableComponent';
import PaymentOption from '@/components/common/PaymentOption';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import StudentApplicationEmgsStatusTimeline from '@/components/StudentDashboard/components/StudentApplicationEmgsStatusTimeline';
import { useGetRecentApplicationsQuery } from '@/slice/services/common/applicationService';
import { useSslCommerzPaymentIntendMutation } from '@/slice/services/common/paymentService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useSingleGetApplicationQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/public/application/applicationServiceNew';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

export default function StudentApplications() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTimeline, setCurrentTimeline] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  const perPageData = 9;

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
              onClick={() =>
                router.push(`/dashboard/agent/applications/${item?._id}`)
              }
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View Documents
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => handleViewEmgsStatus(item?.emgs_status)}
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

  const studentApplicationsHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },
    {
      title: 'University',
      key: 'university',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.university?.name ? item?.university?.name : '-'}
        </span>
      ),
    },
    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.course?.name ? item?.course?.name : '-'}
        </span>
      ),
    },
    {
      title: 'Student Name',
      key: 'student_name',
      render: (item) => (
        <Link
          href={`/dashboard/agent/student-management/single-student-for-agent/${item?.student?._id}`}
          className="d-flex flex-column text-capitalize fw-medium"
        >
          {item?.student?._id
            ? item?.student?.first_name + ' ' + item?.student?.last_name
            : '-'}
        </Link>
      ),
    },
    {
      title: 'Applied By',
      key: 'applied_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.applied_by?.first_name && item?.applied_by?.last_name
            ? `${item?.applied_by?.first_name ? item?.applied_by?.first_name : ''} ${item?.applied_by?.last_name ? item?.applied_by?.last_name : ''}`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Emgs Payment',
      key: 'emgs_payment_status',
      render: (item) => (
        <>
          <span
            className={` rounded-4 px-5 py-1 fw-medium text-capitalize ${item?.emgs_payment_status === 'paid' ? 'bg-third-color text-primary' : item?.emgs_payment_status === 'pending' ? ' bg-danger-subtle text-danger text-center' : ''}`}
          >
            {item?.emgs_payment_status ?? '-'}
          </span>
        </>
      ),
    },
    {
      title: 'Tuition Payment',
      key: 'tuition_fee_payment_status',
      render: (item) => (
        <>
          <span
            className={` rounded-4 px-5 py-1 fw-medium text-capitalize ${item?.tuition_fee_payment_status === 'paid' ? 'bg-third-color text-primary' : item?.tuition_fee_payment_status === 'pending' ? ' bg-danger-subtle text-danger text-center' : ''}`}
          >
            {item?.tuition_fee_payment_status ?? '-'}
          </span>
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <>
          <span
            className={`fw-semibold px-4 py-1 rounded-4 text-capitalize ${item?.status === 'accepted' ? 'bg-third-color text-primary' : item?.status === 'rejected' ? 'bg-danger-subtle text-danger' : item?.status === 'pending' ? 'bg-warning-subtle text-warning' : ''}`}
          >
            {item?.status ?? '-'}
          </span>
        </>
      ),
    },
  ];

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
                            data={applicationData?.data || []}
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
                <StudentApplicationEmgsStatusTimeline
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
    </Layout>
  );
}
