import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUniversityQuery } from '@/slice/services/super admin/universityService';
import {
  superAdminNameAndLogoData,
  universityHeadersWithoutAction,
} from '@/utils/common/data';

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

const AllUniversityForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allSubscriptionData, setAllSubscriptionData] = useState('');
  const perPageData = 10;

  const {
    data: getUniversityData,
    error: getUniversityError,
    isLoading: getUniversityIsLoading,
    refetch: getUniversityRefetch,
  } = useGetUniversityQuery();

  const handleSubscription = async (id) => {
    try {
      // const result = await updateSubscription(id).unwrap();
      // if (result) {
      //   toast.success(result?.message);
      //   getUniversityRefetch();
      // }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getUniversityData?.data?.length > 0 &&
    getUniversityData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const allSubscriberHeaderAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <UncontrolledDropdown className="card-header-dropdown">
        <DropdownToggle
          tag="a"
          className="text-reset dropdown-btn"
          role="button"
        >
          <span className="button px-3">
            <i className="ri-more-fill align-middle"></i>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-menu-end">
          <DropdownItem>
            <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
            Subscribe
          </DropdownItem>
          <DropdownItem>
            <i className="ri-pencil-fill align-start me-2 text-muted"></i>
            Unsubscribe
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  useEffect(() => {
    setAllSubscriptionData([
      superAdminNameAndLogoData, // it changable
      ...universityHeadersWithoutAction, // it changable
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
            {getUniversityIsLoading ? (
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

export default AllUniversityForSuperAdmin;
