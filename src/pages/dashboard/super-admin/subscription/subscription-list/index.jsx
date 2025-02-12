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

const AllSubscriptionForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allSubscriptionData, setAllSubscriptionData] = useState('');
  const perPageData = 10;

  const {
    data: getSubscriptionData,
    error: getSubscriptionError,
    isLoading: getSubscriptionIsLoading,
    refetch: getSubscriptionRefetch,
  } = useGetNewsLetterSubscriptionInSuperAdminQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getSubscriptionData?.data?.length > 0 &&
    getSubscriptionData?.data.filter((item) =>
      item?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const allSubscriberHeaderAction = {
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
        <DropdownMenu className="ms-3">
          <DropdownItem className="fw-medium">
            <i class="ri-check-double-fill me-2 text-success fw-bold"></i>
            Subscribe
          </DropdownItem>
          <DropdownItem className="fw-medium">
            <i class="ri-close-line me-2 text-danger fw-bold"></i>
            Unsubscribe
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };
  const subscriptionHeadersWithoutAction = [
    {
      title: 'email',
      key: 'email',
    },
    {
      title: 'Verification',
      key: 'isVerified',
      render: (item) => (
        <div>
          {item.isVerified ? (
            <p>Valid Subscriber</p>
          ) : (
            <p>Invalid Subscriber</p>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <div>{item.status ? <p>Active</p> : <p>Inactive</p>}</div>
      ),
    },
  ];

  useEffect(() => {
    setAllSubscriptionData([
      ...subscriptionHeadersWithoutAction,
      allSubscriberHeaderAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {getSubscriptionIsLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <div className="text-primary fs-2 fw-semibold">
                    All Subscription List
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={allSubscriptionData}
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

export default AllSubscriptionForSuperAdmin;
