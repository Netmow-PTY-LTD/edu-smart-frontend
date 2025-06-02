import AirportPickupChargeInvoice from '@/components/common/AirportPickupChargeInvoice';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import InvoicesComponentForMultipleData from '@/components/common/InvoicesComponentForMultipleData';
import InvoicesComponentForMultipleDataTuitionFeeAgent from '@/components/common/InvoicesComponentForMultipleDataTuitionFeeAgent';
import InvoicesForEmgs from '@/components/common/InvoicesForEmgs';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useAddEmgsTimelineMutation,
  useGetRecentApplicationsQuery,
  useUpdatePaymentApplicationStatusMutation,
} from '@/slice/services/common/applicationService';

import {
  useGetApplicationPaymentReportQuery,
  useGetSingleApplicationPaymentReportQuery,
} from '@/slice/services/common/paymentReportServices';
import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
import DataObjectComponent, { brandlogo } from '@/utils/common/data';

import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
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

const ApplicationInvoiceInSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [openInvoiceEmgsModal, setOpenInvoiceEmgsModal] = useState(false);

  const [openInvoiceModalTuition, setOpenInvoiceModalTuition] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [openInvoiceAirportPickupModal, setOpenInvoiceAirportPickupModal] =
    useState(false);
  const router = useRouter();
  const app_id = router.query.app_id;
  const emgs = router.query.emgs;
  const tuition = router.query.tuition;
  const pickup = router.query.pickup;

  const perPageData = 10;

  const { superAdminData, applicationHeadersWithoutAction = [] } =
    DataObjectComponent();

  const {
    data: applicationData,
    isLoading: applicationLoading,
    refetch: applicationDataRefetch,
  } = useGetRecentApplicationsQuery();

  const pendingApplications =
    applicationData?.data?.filter(
      (app) => app.status === 'pending' && app.emgs_payment_status === 'pending'
    ) || [];

  const { studentApplicationsHeaders = [] } = DataObjectComponent();
  const filteredStudentApplicationsHeaders = studentApplicationsHeaders.filter(
    (header) =>
      header.key !== 'tuition_fee_payment_status' &&
      header.key !== 'pickup_status'
  );

  const {
    data: singleGetApplicationData,
    isLoading: singleGetApplicationLoading,
    refetch: getSingleApplicationDataRefetch,
  } = useSingleGetApplicationQuery(applicationId, {
    skip: !applicationId,
  });

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetApplicationPaymentReportQuery();

  const {
    data: getSingleApplicationPaymentReportData,
    error: getSingleApplicationPaymentReportDataError,
    isLoading: getSingleApplicationPaymentReportDataLoading,
    refetch: getSingleApplicationPaymentReportDataRefetch,
  } = useGetSingleApplicationPaymentReportQuery(applicationId);

  useEffect(() => {
    if (app_id && !applicationId) {
      const singlereportid =
        getSingleApplicationPaymentReportData?.data?.length > 0 &&
        getSingleApplicationPaymentReportData?.data.find(
          (item) =>
            item?.application?._id === app_id &&
            item?.payment_reason === 'application_emgs'
        );

      if (singlereportid?._id) {
        setApplicationId(singlereportid._id);
        if (tuition) {
          setOpenInvoiceModalTuition(true);
        } else if (pickup) {
          setOpenInvoiceAirportPickupModal(true);
        } else if (emgs) {
          setOpenInvoiceModal(true);
        }
        getSingleApplicationPaymentReportDataRefetch(singlereportid._id);
        router.replace({
          pathname: router.pathname,
          query: {}, // Clears the query parameters
        });
      }
    }
  }, [
    app_id,
    emgs,
    applicationId,
    getSingleApplicationPaymentReportData?.data,
    getSingleApplicationPaymentReportDataRefetch,
    router,
    tuition,
    pickup,
  ]);

  useEffect(() => {
    if (app_id && emgs === 'yes' && !openInvoiceEmgsModal) {
      setApplicationId(app_id);
      setOpenInvoiceEmgsModal(true);
      getSingleApplicationPaymentReportDataRefetch(app_id);

      // Clear query params so it doesn’t reopen on every render
      router.replace(
        {
          pathname: router.pathname,
          query: {},
        },
        undefined,
        { shallow: true }
      );
    }
  }, [
    app_id,
    emgs,
    openInvoiceEmgsModal,
    router,
    getSingleApplicationPaymentReportDataRefetch,
  ]);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = getApplicationPaymentData?.data?.filter((item) => {
    // Convert the entire item object to a string (excluding any undefined or null values)
    const itemString = JSON.stringify(item).toLowerCase();

    const isValidPaymentReason = item?.payment_reason === 'application_emgs';

    return (
      itemString.includes(searchTerm.toLowerCase()) && isValidPaymentReason
    );
  });

  const handleShowInvoice = () => {
    // setOpenInvoiceModal()
  };

  const ActionData = {
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
          <DropdownItem>
            <div
              onClick={() => {
                if (item?._id) {
                  setApplicationId(item?._id);
                  setOpenInvoiceModal(true);
                  getSingleApplicationPaymentReportDataRefetch(item?._id);
                }
              }}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View Emgs Invoice
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                if (item?._id) {
                  setApplicationId(item?._id);
                  setOpenInvoiceModalTuition(true);
                  getSingleApplicationPaymentReportDataRefetch(item?._id);
                }
              }}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View Tuition Invoice
            </div>
          </DropdownItem>
          {item?.application?.airport_pickup_invoice_status === 'active' ? (
            <DropdownItem>
              <div
                onClick={() => {
                  if (item?._id) {
                    setApplicationId(item?._id);
                    setOpenInvoiceAirportPickupModal(true);
                    getSingleApplicationPaymentReportDataRefetch(item?._id);
                  }
                }}
                className="text-primary"
              >
                <i className="ri-eye-fill me-2"></i>
                View Airport Pickup Charge Invoice
              </div>
            </DropdownItem>
          ) : (
            ''
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  const ActionDataInvoicePending = {
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
          <DropdownItem>
            <div
              onClick={() => {
                if (item?._id) {
                  setApplicationId(item?._id);
                  setOpenInvoiceEmgsModal(true);
                  getApplicationPaymentDataRefetch(item?._id);
                }
              }}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View Emgs Invoice
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  const printInvoice = () => {
    window.print();
  };

  const { query } = router;
  const [toastShown, setToastShown] = useState(false);

  const [
    updateApplicationStatus,
    { data: updateApplicationStatusData, error, isLoading },
  ] = useUpdatePaymentApplicationStatusMutation();

  useEffect(() => {
    if (
      query.payment_status === 'success' &&
      (query.transaction_reason === 'application_tuition_fee' ||
        query.transaction_reason === 'application_airport_pickup_charge' ||
        query.transaction_reason === 'application_emgs')
    ) {
      updateApplicationStatus({
        transaction_id: query.transaction_id,
        status: 'paid',
        payment_method: query.payment_method,
        transaction_reason: query.transaction_reason,
        id: query.application_id,
        paid_amount: query.paid_amount,
      });
      applicationDataRefetch();
    }
  }, [applicationDataRefetch, query, updateApplicationStatus]);

  //Insert TimeLine By Payment Start

  const [insertTimelineExist, setInsertTimelineExist] = useState(null);
  const isInsertingRef = useRef(false); // to avoid double trigger inside effect
  const [addEmgsTimeline] = useAddEmgsTimelineMutation();

  const {
    data: singleGetApplicationDataForEmgs,
    isLoading: singleGetApplicationDataForEmgsLoading,
    refetch: getSingleGetApplicationDataForEmgsRefetch,
  } = useSingleGetApplicationQuery(query?.application_id, {
    skip: !query?.application_id,
  });

  useEffect(() => {
    if (!query?.application_id) return;

    const localStorageKey = `${query.transaction_reason}-${query.application_id}`;

    // Skip if already inserted in localStorage or already in state (prevents double calls)
    if (
      localStorage.getItem(localStorageKey) ||
      insertTimelineExist === localStorageKey
    ) {
      return;
    }

    // Avoid duplicate calls in same render cycle
    if (isInsertingRef.current) return;
    isInsertingRef.current = true;

    const statusInsertEmgs = async () => {
      try {
        const { payment_status, transaction_reason, application_id } = query;

        if (
          payment_status === 'success' &&
          (transaction_reason === 'application_tuition_fee' ||
            transaction_reason === 'application_airport_pickup_charge' ||
            transaction_reason === 'application_emgs' ||
            transaction_reason === 'application_registration_fee') // Add other valid reasons as needed
        ) {
          const { data: refetchedAppData } =
            await getSingleGetApplicationDataForEmgsRefetch();

          const emgsStatusId =
            refetchedAppData?.data?.emgs_status ||
            singleGetApplicationDataForEmgs?.data?.emgs_status;

          if (!emgsStatusId) {
            toast.error('Missing EMGS status ID.');
            return;
          }

          let title = '';
          let description = '';
          let invoiceUrl = '';

          switch (transaction_reason) {
            case 'application_tuition_fee':
              title = 'Tuition Fee Payment Received';
              description =
                'Thank you for your tuition payment. We will now proceed to the next step in your application.';
              invoiceUrl = `/application-invoices?app_id=${application_id}&tuition=yes`;
              break;

            case 'application_airport_pickup_charge':
              title = 'Airport Pickup Payment Received';
              description =
                'We have received your payment for airport pickup. Our support team will follow up with further instructions soon.';
              invoiceUrl = `/application-invoices?app_id=${application_id}&pickup=yes`;
              break;

            case 'application_emgs':
              title = 'EMGS Payment Received';
              description =
                'Your EMGS payment has been successfully received. Our assessment team will now review your application.';
              invoiceUrl = `/application-invoices?app_id=${application_id}&emgs=yes`;
              break;

            case 'application_registration_fee':
              title = 'Registration Fee Payment Received';
              description =
                'We have received your registration fee. Your account setup will be finalized shortly.';
              invoiceUrl = `/application-invoices?app_id=${application_id}&registration=yes`;
              break;

            default:
              title = 'Payment Received';
              description =
                'We have received your payment. Please check your dashboard for more details.';
              invoiceUrl = `/application-invoices?app_id=${application_id}`;
              break;
          }

          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append('invoiceUrl', invoiceUrl);
          formData.append('id', emgsStatusId);

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            localStorage.setItem(localStorageKey, 'true');
            setInsertTimelineExist(localStorageKey);
          } else {
            toast.error('Failed to add payment timeline.');
          }
        }
      } catch (error) {
        console.error('Error inserting payment timeline:', error);
        toast.error('An error occurred while updating the payment status.');
      } finally {
        isInsertingRef.current = false;
      }
    };

    statusInsertEmgs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.payment_status, query.transaction_reason, query.application_id]);

  //Insert TimeLine By Payment End

  useEffect(() => {
    if (!toastShown && (updateApplicationStatusData || error)) {
      if (query.transaction_reason === 'application_airport_pickup_charge') {
        setOpenInvoiceAirportPickupModal(true);
      }
      if (query.transaction_reason === 'application_tuition_fee') {
        setOpenInvoiceModalTuition(true);
      }
      applicationDataRefetch();
      getApplicationPaymentDataRefetch();
      setApplicationId(query.report_id);

      getSingleApplicationPaymentReportDataRefetch(query.report_id);

      if (updateApplicationStatusData) {
        toast.success('Payment is successful!');
      } else if (error) {
        toast.error('Payment update failed!');
      }

      setToastShown(true);
    }
  }, [
    applicationDataRefetch,
    error,
    getApplicationPaymentDataRefetch,
    getSingleApplicationPaymentReportDataRefetch,
    query.report_id,
    query.transaction_reason,
    toastShown,
    updateApplicationStatusData,
  ]);

  useEffect(() => {
    if (!isLoading) {
      setToastShown(false);
    }
  }, [isLoading]);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {getApplicationPaymentDataLoading || singleGetApplicationLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <div className="text-primary fw-semibold fs-2">
                    Application Invoice
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={[
                      ...filteredStudentApplicationsHeaders,
                      ActionDataInvoicePending,
                    ]}
                    data={pendingApplications ? pendingApplications : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                  />
                </CardBody>

                <CardHeader className="d-flex justify-content-between align-items-center">
                  <div className="text-primary fw-semibold fs-2">
                    Application Invoice- Processing
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>
                <CardBody>
                  <CommonTableComponent
                    headers={[...applicationHeadersWithoutAction, ActionData]}
                    data={filteredData ? filteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                  />
                </CardBody>
              </Card>
            )}
          </div>

          {
            <InvoicesForEmgs
              open={openInvoiceEmgsModal}
              close={() => {
                setApplicationId(''), setOpenInvoiceEmgsModal(false);
              }}
              dataDetails={singleGetApplicationData?.data}
              addressData={superAdminData}
              logoData={brandlogo}
            />
          }

          {
            <InvoicesComponentForMultipleData
              open={openInvoiceModal}
              close={() => {
                setApplicationId(''), setOpenInvoiceModal(false);
              }}
              loading={getSingleApplicationPaymentReportDataLoading}
              addressData={superAdminData}
              billingAddressData={
                getSingleApplicationPaymentReportData?.data?.applied_by
              }
              tableData={[getSingleApplicationPaymentReportData?.data]}
              printInvoice={printInvoice}
              subtotal={
                getSingleApplicationPaymentReportData?.data?.paid_amount
              }
              total={getSingleApplicationPaymentReportData?.data?.paid_amount}
              currency={'MYR'}
              payment_status={
                getSingleApplicationPaymentReportData?.data?.application
                  ?.payment_status
              }
              logoData={brandlogo}
              invoice_no={getSingleApplicationPaymentReportData?.data}
            />
          }

          {
            <InvoicesComponentForMultipleDataTuitionFeeAgent
              open={openInvoiceModalTuition}
              close={() => {
                setApplicationId(''), setOpenInvoiceModalTuition(false);
              }}
              loading={getSingleApplicationPaymentReportDataLoading}
              addressData={superAdminData}
              billingAddressData={
                getSingleApplicationPaymentReportData?.data?.applied_by
              }
              tableData={[getSingleApplicationPaymentReportData?.data]}
              printInvoice={printInvoice}
              subtotal={
                getSingleApplicationPaymentReportData?.data?.paid_amount
              }
              total={getSingleApplicationPaymentReportData?.data?.paid_amount}
              currency={'MYR'}
              payment_status={
                getSingleApplicationPaymentReportData?.data?.application
                  ?.payment_status
              }
              logoData={brandlogo}
              invoice_no={getSingleApplicationPaymentReportData?.data}
            />
          }

          {
            <AirportPickupChargeInvoice
              open={openInvoiceAirportPickupModal}
              close={() => {
                setApplicationId('');
                router.push({ query: {} });
                setOpenInvoiceAirportPickupModal(false);
              }}
              loading={getSingleApplicationPaymentReportDataLoading}
              addressData={superAdminData}
              billingAddressData={
                getSingleApplicationPaymentReportData?.data?.applied_by
              }
              tableData={[getSingleApplicationPaymentReportData?.data]}
              invoice_no={getSingleApplicationPaymentReportData?.data}
              logoData={brandlogo}
              currency={'MYR'}
              printInvoice={printInvoice}
              subtotal={
                getSingleApplicationPaymentReportData?.data?.paid_amount
              }
              total={getSingleApplicationPaymentReportData?.data?.paid_amount}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationInvoiceInSuperAdmin;
