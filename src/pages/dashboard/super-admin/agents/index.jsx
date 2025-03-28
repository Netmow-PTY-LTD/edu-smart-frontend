import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import DataObjectComponent from '@/utils/common/data';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AllAgentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  const { agentNameAndImageHeaderDataForSuperAdmin, agentsHeaders = [] } =
    DataObjectComponent();

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
                    headers={[
                      agentNameAndImageHeaderDataForSuperAdmin,
                      ...agentsHeaders,
                    ]}
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
