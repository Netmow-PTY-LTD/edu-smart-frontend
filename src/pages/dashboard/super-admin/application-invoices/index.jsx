import AirportPickupChargeInvoice from '@/components/common/AirportPickupChargeInvoice';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import InvoicesComponentForMultipleData from '@/components/common/InvoicesComponentForMultipleData';
import InvoicesComponentForMultipleDataTuitionFee from '@/components/common/InvoicesComponentForMultipleDataTuitionFee';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useGetApplicationPaymentReportQuery,
  useGetSingleApplicationPaymentReportQuery,
} from '@/slice/services/common/paymentReportServices';
import DataObjectComponent, { brandlogo } from '@/utils/common/data';
import { useRouter } from 'next/router';
import path from 'path';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
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
  const [openInvoiceAirportPickupModal, setOpenInvoiceAirportPickupModal] =
    useState(false);
  const [applicationId, setApplicationId] = useState('');
  const router = useRouter();
  const app_id = router.query.app_id;
  const emgs = router.query.emgs;
  const tuition = router.query.tuition;
  const pickup = router.query.pickup;

  const perPageData = 10;

  const { superAdminData = [], applicationHeadersWithoutAction = [] } =
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

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = getApplicationPaymentData?.data?.filter((item) => {
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
            <InvoicesComponentForMultipleDataTuitionFee
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
                setApplicationId(''), setOpenInvoiceAirportPickupModal(false);
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
