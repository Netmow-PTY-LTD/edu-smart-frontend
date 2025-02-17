import CommonTableComponent from '@/components/common/CommonTableComponent';
import InvoicesComponentForMultipleData from '@/components/common/InvoicesComponentForMultipleData';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useGetApplicationPaymentReportQuery,
  useGetSingleApplicationPaymentReportQuery,
} from '@/slice/services/common/paymentReportServices';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { superAdminData } from '@/utils/common/data';
import moment from 'moment';
import React, { useState } from 'react';
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
  } = useGetSingleApplicationPaymentReportQuery(applicationId, {
    skip: !applicationId,
  });

  console.log(getSingleApplicationPaymentReportData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = getApplicationPaymentData?.data?.filter((item) => {
    const fullName =
      `${item?.student?.first_name || ''} ${item?.student?.last_name || ''}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

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
          {item?.student?.first_name || item?.student?.last_name
            ? `${item.student.first_name} ${item.student.last_name}`
            : '-'}
        </div>
      ),
    },

    {
      title: 'Application ID',
      key: 'application',
      render: (item) => <div>{item?._id ?? 'N/A'}</div>,
    },

    {
      title: 'Paid Amount',
      key: 'paid_amount',
    },

    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? 'N/A'}</div>
      ),
    },
    {
      title: 'Payment Status',
      key: 'payment_status',
      render: (item) => (
        <p
          className={` badge fw-semibold text-center me-4 ${item?.application?.payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.application?.payment_status ?? ''}
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
                setApplicationId(item?._id);
                setOpenInvoiceModal(true);
              }}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View Invoice
            </div>
          </DropdownItem>
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
              // invoice=
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
              logoData={'/edusmart-Final-Logo-Final-Logo.png'}
              invoice_no={getSingleApplicationPaymentReportData?.data}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationInvoiceInSuperAdmin;
