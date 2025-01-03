import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import { userDummyImage } from '@/utils/common/data';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AllAgentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const { data: userInfodata } = useGetUserInfoQuery();

  const { data: allAgentsData, isLoading: allagentsIsloading } =
    useGetAllAgentQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allAgentsData?.data?.length > 0 &&
    allAgentsData?.data.filter(
      (item) =>
        item?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const agentsHeaders = [
    {
      title: 'Name',
      key: 'profile_image',
      render: (item) => (
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0 me-1">
            <Link href={``} className="text-reset">
              <Image
                src={
                  item?.profile_image?.url
                    ? item?.profile_image?.url
                    : `${userDummyImage}`
                }
                alt="User"
                height={60}
                width={60}
                className="avatar-md p-1 me-3 align-middle rounded-circle"
              />
            </Link>
          </div>
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              <Link href={``} className="text-reset">
                {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
              </Link>
            </h5>
          </div>
        </div>
      ),
    },

    { title: 'Email', key: 'email' },
    { title: 'Phone', key: 'phone' },
    {
      title: 'Country',
      key: 'country',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.country ? <span>{item.country}</span> : '-'}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          {allagentsIsloading ? (
            <LoaderSpiner />
          ) : (
            <div className="h-100">
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h2>All Agents</h2>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <CommonTableComponent
                    headers={agentsHeaders}
                    data={isFilteredData ? isFilteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                  />
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default AllAgentsPage;
