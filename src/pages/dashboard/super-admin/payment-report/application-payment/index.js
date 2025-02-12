import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetNewsLetterSubscriptionInSuperAdminQuery } from '@/slice/services/super admin/newsLetterSubscription';

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

const ApplicationPaymentForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationPaymentData, setApplicationPaymentData] = useState('');
  const perPageData = 10;

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetNewsLetterSubscriptionInSuperAdminQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getApplicationPaymentData?.data?.length > 0 &&
    getApplicationPaymentData?.data.filter((item) =>
      item?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // const applicationPaymentHeaderAction = {
  //   title: 'Action',
  //   key: 'actions',
  //   render: (item) => (
  //     <UncontrolledDropdown className="card-header-dropdown">
  //       <DropdownToggle
  //         tag="a"
  //         className="text-reset dropdown-btn"
  //         role="button"
  //       >
  //         <span className="button px-3">
  //           <i className="ri-more-fill align-middle"></i>
  //         </span>
  //       </DropdownToggle>
  //       <DropdownMenu className="dropdown-menu dropdown-menu-end">
  //         <DropdownItem>
  //           <i class="ri-check-double-fill me-2"></i>
  //           Subscribe
  //         </DropdownItem>
  //         <DropdownItem>
  //           <i class="ri-close-line me-2"></i>
  //           Unsubscribe
  //         </DropdownItem>
  //       </DropdownMenu>
  //     </UncontrolledDropdown>
  //   ),
  // };

  const applicationHeadersWithoutAction = [
    {
      title: 'Student Name',
      key: 'studentName',
    },
    {
      title: 'Application ID',
      key: 'applicationId',
    },
    {
      title: 'Applied By',
      key: 'appliedBy',
    },
    {
      title: 'Paid Amount',
      key: 'paidAmount',
    },
    {
      title: 'University Price',
      key: 'universityPrice',
    },
    {
      title: 'Agent Package',
      key: 'agentPackage',
      render: (item) => <div>{item.agentPackage ?? 'N/A'}</div>,
    },
    {
      title: 'Package Commission %',
      key: 'packageCommissionPercentage',
      render: (item) => <div>{item.packageCommissionPercentage ?? 'N/A'}</div>,
    },
    {
      title: 'Hot Offer Commission %',
      key: 'hotOfferCommissionPercentage',
      render: (item) => <div>{item.hotOfferCommissionPercentage ?? 'N/A'}</div>,
    },
    {
      title: 'Package Commission Amount',
      key: 'packageCommissionAmount',
    },
    {
      title: 'Hot Offer Commission Amount',
      key: 'hotOfferCommissionAmount',
    },
    {
      title: 'Super Admin Profit',
      key: 'superAdminProfit',
    },
    {
      title: 'Payment Date',
      key: 'paymentDate',
    },
    {
      title: 'Payment Method',
      key: 'paymentMethod',
    },
  ];

  useEffect(() => {
    setApplicationPaymentData([
      ...applicationHeadersWithoutAction,
      // applicationPaymentHeaderAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {!getApplicationPaymentDataLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={applicationPaymentData}
                    data={isfilteredData ? isfilteredData : []}
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
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationPaymentForSuperAdmin;
