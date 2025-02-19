import CommonTableComponent from '@/components/common/CommonTableComponent';
import PackageInvoiceComponent from '@/components/common/PackageInvoiceComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useGetPackagePaymentReportQuery,
  useGetSinglePackagePaymentReportQuery,
} from '@/slice/services/common/paymentReportServices';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { brandlogo, superAdminData } from '@/utils/common/data';
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

const PackageInvoiceForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [packageId, setPackageId] = useState('');
  const perPageData = 10;

  const { data: userInfodata } = useGetUserInfoQuery();

  const {
    data: packagePaymentData,
    error: packagePaymentDataError,
    isLoading: packagePaymentDataLoading,
    refetch: packagePaymentDataRefetch,
  } = useGetPackagePaymentReportQuery();

  const {
    data: getSinglePackagePaymentReportData,
    error: getSinglePackagePaymentReportDataError,
    isLoading: getSinglePackagePaymentReportDataLoading,
    refetch: getSinglePackagePaymentReportDataRefetch,
  } = useGetSinglePackagePaymentReportQuery(packageId);

  console.log(packagePaymentData);
  console.log(getSinglePackagePaymentReportData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = packagePaymentData?.data?.filter((item) => {
    const fullName =
      `${item?.agent?.first_name || ''} ${item?.agent?.last_name || ''}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  const packagePaymentHeadersWithoutAction = [
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
      title: 'Agent Name',
      key: 'agent',
      render: (item) => (
        <div>
          {item?.agent?.first_name || item?.agent?.last_name
            ? `${item.agent.first_name} ${item.agent.last_name}`
            : '-'}
        </div>
      ),
    },

    {
      title: 'Package Name',
      key: 'agent_package',
      render: (item) => (
        <div>{item?.agent_package?.package?.name ?? 'N/A'}</div>
      ),
    },

    {
      title: 'Package Amount',
      key: 'package_amount',
      render: (item) => (
        <div>{item?.agent_package?.package?.price ?? 'N/A'}</div>
      ),
    },
    {
      title: 'Discount ',
      key: 'discount',
      render: (item) => (
        <div>{item?.agent_package?.package?.price - item?.paid_amount}</div>
      ),
    },
    {
      title: 'Paid ',
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
          className={` badge fw-semibold text-center me-4 ${item?.status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">{item?.status ?? ''}</span>
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
                  setPackageId(item?._id);
                  setOpenInvoiceModal(true);
                  getSinglePackagePaymentReportDataRefetch(item?._id);
                }
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
            {packagePaymentDataLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <div className="text-primary fw-semibold fs-2">
                    Package Payment Report
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={[
                      ...packagePaymentHeadersWithoutAction,
                      ActionData,
                    ]}
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
            <PackageInvoiceComponent
              open={openInvoiceModal}
              close={() => {
                setPackageId(''), setOpenInvoiceModal(false);
              }}
              loading={getSinglePackagePaymentReportDataLoading}
              addressData={superAdminData}
              billingAddressData={
                getSinglePackagePaymentReportData?.data?.agent
              }
              tableData={[getSinglePackagePaymentReportData?.data]}
              printInvoice={printInvoice}
              subtotal={getSinglePackagePaymentReportData?.data?.paid_amount}
              total={getSinglePackagePaymentReportData?.data?.paid_amount}
              currency={'MYR'}
              payment_status={getSinglePackagePaymentReportData?.data?.status}
              logoData={brandlogo}
              invoice_no={getSinglePackagePaymentReportData?.data}
              payment_method={
                getSinglePackagePaymentReportData?.data?.payment_method
              }
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default PackageInvoiceForSuperAdmin;
