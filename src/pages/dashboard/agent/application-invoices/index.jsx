import CommonTableComponent from '@/components/common/CommonTableComponent';
import InvoicesComponentForMultipleData from '@/components/common/InvoicesComponentForMultipleData';
import InvoicesComponentForMultipleDataTuitionFeeAgent from '@/components/common/InvoicesComponentForMultipleDataTuitionFeeAgent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useUpdatePaymentApplicationStatusMutation } from '@/slice/services/common/applicationService';
import {
  useGetApplicationPaymentReportQuery,
  useGetSingleApplicationPaymentReportQuery,
} from '@/slice/services/common/paymentReportServices';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { brandlogo, superAdminData } from '@/utils/common/data';
import moment from 'moment';
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

  const perPageData = 10;

  const { data: userInfodata } = useGetUserInfoQuery();

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

  console.log(getApplicationPaymentData);
  console.log(getSingleApplicationPaymentReportData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = getApplicationPaymentData?.data?.filter((item) => {
    const fullName =
      `${item?.student?.first_name || ''} ${item?.student?.last_name || ''}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  const handleShowInvoice = () => {
    // setOpenInvoiceModal()
  };

  const applicationHeadersWithoutAction = [
    {
      title: 'Invoice No',
      key: 'createdAt',
      render: (item) => (
        <div>
          {item?.createdAt
            ? `INV-${new Date(item.createdAt).getFullYear().toString().slice(-2)}${(new Date(item.createdAt).getMonth() + 1).toString().padStart(2, '0')}${new Date(item.createdAt).getDate().toString().padStart(2, '0')}-${new Date(item.createdAt).getHours().toString().padStart(2, '0')}${new Date(item.createdAt).getMinutes().toString().padStart(2, '0')}${new Date(item.createdAt).getSeconds().toString().padStart(2, '0')}`
            : ''}
        </div>
      ),
    },
    {
      title: 'Name',
      key: 'student',
      render: (item) => (
        <div>
          {item?.student?.first_name + ' ' + item?.student?.last_name ?? 'N/A'}
        </div>
      ),
    },

    {
      title: 'Application ID',
      key: 'application',
      render: (item) => <div>{item?._id ?? 'N/A'}</div>,
    },

    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? 'N/A'}</div>
      ),
    },
    {
      title: 'Emgs Payment',
      key: 'emgs_payment_status',
      render: (item) => (
        <p
          className={` badge fw-semibold text-center me-4 ${item?.application?.emgs_payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.application?.emgs_payment_status ?? ''}
          </span>
        </p>
      ),
    },
    {
      title: 'Tuition Payment',
      key: 'tuition_fee_payment_status',
      render: (item) => (
        <p
          className={` badge fw-semibold text-center me-4 ${item?.application?.tuition_fee_payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.application?.tuition_fee_payment_status ?? ''}
          </span>
        </p>
      ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
    },
  ];

  const ActionData = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      // console.log(item),
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
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  const printInvoice = () => {
    window.print();
  };

  const router = useRouter();
  const { query } = router; // Extract URL parameters
  const [toastShown, setToastShown] = useState(false);

  const [
    updateApplicationStatus,
    { data: updateApplicationStatusData, error, isLoading },
  ] = useUpdatePaymentApplicationStatusMutation();

  useEffect(() => {
    if (
      query.payment_status === 'success' &&
      query.transaction_reason === 'application_tuition_fee'
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
      getApplicationPaymentDataRefetch();
      setApplicationId(query.report_id);
      setOpenInvoiceModalTuition(true);
      getSingleApplicationPaymentReportDataRefetch(query.report_id);

      setTimeout(() => {
        router.replace(
          {
            pathname: router.pathname,
            query: '',
          },
          undefined,
          { shallow: true }
        );
      }, 1000);

      if (updateApplicationStatusData) {
        toast.success('Payment is successful!');
      } else if (error) {
        toast.error('Payment update failed!');
      }

      setToastShown(true); // Prevent multiple toasts
    }
  }, [
    updateApplicationStatusData,
    error,
    getApplicationPaymentDataRefetch,
    getSingleApplicationPaymentReportDataRefetch,
    query.report_id,
    toastShown,
    router,
  ]);

  useEffect(() => {
    if (!isLoading) {
      setToastShown(false); // Reset when loading is done, so the toast can be shown again for future payments
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
                    Application Payment Report
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
              //   generatePDF,
              printInvoice={printInvoice}
              //   payButton,
              //   goToPay,
              //   chargesType,
              //   invoice,
              //   superAdmin,
              subtotal={
                getSingleApplicationPaymentReportData?.data?.paid_amount
              }
              //   gst,
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
              //   generatePDF,
              printInvoice={printInvoice}
              //   payButton,
              //   goToPay,
              //   chargesType,
              //   invoice,
              //   superAdmin,
              subtotal={
                getSingleApplicationPaymentReportData?.data?.paid_amount
              }
              //   gst,
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
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationInvoiceInSuperAdmin;
