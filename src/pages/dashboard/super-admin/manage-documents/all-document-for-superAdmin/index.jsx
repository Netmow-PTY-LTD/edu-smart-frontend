import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllUserSubmittedDocumentQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllDocumentForSuperAdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const perPageData = 10;

  const { docSubmittedTableHeaderDataWithoutActionForSuperAdmin = [] } =
    DataObjectComponent();

  const {
    data: allSubmittedDocumentForSuperAdminData,
    error: allSubmittedDocumentForSuperAdminError,
    isLoading: allSubmittedDocumentForSuperAdminIsLoading,
    refetch: allSubmittedDocumentForSuperAdminRefetch,
  } = useGetAllUserSubmittedDocumentQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allSubmittedDocumentForSuperAdminData?.data?.length > 0 &&
    allSubmittedDocumentForSuperAdminData?.data.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <Card>
              <CardHeader>
                <h3 className="fs-1 fw-semibold">All Submitted Documents </h3>
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>
              <CardBody>
                {allSubmittedDocumentForSuperAdminIsLoading ? (
                  <LoaderSpiner />
                ) : allSubmittedDocumentForSuperAdminError ? (
                  <div>Error loading data....</div>
                ) : (
                  <CommonTableComponent
                    headers={
                      docSubmittedTableHeaderDataWithoutActionForSuperAdmin
                    }
                    data={isFilteredData ? isFilteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                  />
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllDocumentForSuperAdminDashboard;
