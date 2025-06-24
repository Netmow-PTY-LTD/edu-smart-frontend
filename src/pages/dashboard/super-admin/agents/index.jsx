import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import CreateAgentModal from '@/components/sAdminDashboard/modals/CreateAgentModal';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import DataObjectComponent from '@/utils/common/data';

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AllAgentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const { agentNameAndImageHeaderDataForSuperAdmin, agentsHeaders = [] } =
    DataObjectComponent();

  const {
    data: allAgentsData,
    isLoading: allagentsIsloading,
    refetch,
  } = useGetAllAgentQuery();

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
      <ToastContainer></ToastContainer>
      <div className="page-content">
        <div className="container-fluid">
          {allagentsIsloading ? (
            <LoaderSpiner />
          ) : (
            <div className="h-100">
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2 gap-md-0">
                  <button
                    onClick={() => setAddModalIsOpen(true)}
                    className="button px-3 py-2"
                  >
                    Add New Partner
                  </button>
                  <h2>All Partner's</h2>

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
      <CreateAgentModal
        openModal={addModalIsOpen}
        closeModal={() => {
          setAddModalIsOpen(false);
          refetch(); // Refetch agents when modal closes
        }}
      />
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default AllAgentsPage;
