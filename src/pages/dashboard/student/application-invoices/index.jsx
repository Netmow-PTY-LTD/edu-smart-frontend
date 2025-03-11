import AirportPickupChargeInvoice from '@/components/common/AirportPickupChargeInvoice';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import InvoicesComponentForMultipleData from '@/components/common/InvoicesComponentForMultipleData';
import InvoicesComponentForMultipleDataTuitionFeeStudent from '@/components/common/InvoicesComponentForMultipleDataTuitionFeeStudent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useUpdatePaymentApplicationStatusMutation } from '@/slice/services/common/applicationService';
import {
  useGetApplicationPaymentReportQuery,
  useGetSingleApplicationPaymentReportQuery,
} from '@/slice/services/common/paymentReportServices';
import DataObjectComponent, { brandlogo } from '@/utils/common/data';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const [openInvoiceModalTuition, setOpenInvoiceModalTuition] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [openInvoiceAirportPickupModal, setOpenInvoiceAirportPickupModal] =
    useState(false);
  const perPageData = 10;

  const { superAdminData, applicationHeadersForStudent } =
    DataObjectComponent();

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

  const printInvoice = () => {
    window.print();
  };

  const router = useRouter();
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
        query.transaction_reason === 'application_airport_pickup_charge')
    ) {
      updateApplicationStatus({
        transaction_id: query.transaction_id,
        status: 'paid',
        payment_method: query.payment_method,
        transaction_reason: query.transaction_reason,
        id: query.application_id,
        paid_amount: query.paid_amount,
      });
    }
  }, [query, updateApplicationStatus]);

  useEffect(() => {
    if (!toastShown && (updateApplicationStatusData || error)) {
      if (query.transaction_reason === 'application_airport_pickup_charge') {
        setOpenInvoiceAirportPickupModal(true);
      }
      if (query.transaction_reason === 'application_tuition_fee') {
        setOpenInvoiceModalTuition(true);
      }
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
            {getApplicationPaymentDataLoading ? (
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
                    headers={[...applicationHeadersForStudent, ActionData]}
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
            <InvoicesComponentForMultipleDataTuitionFeeStudent
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
