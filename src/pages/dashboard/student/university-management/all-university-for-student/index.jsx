import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import DataObjectComponent from '@/utils/common/data';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllUniversityForStudent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const {
    studentImageAndNameHeaderDataForStudentDashboard,
    universityHeadersData,
  } = DataObjectComponent();

  const { data: universityData, isLoading: universityDataIsLoading } =
    useGetAllUniversityQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    universityData?.data?.length > 0 &&
    universityData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {universityDataIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h2>All Registered University</h2>

                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>

              <CardBody>
                <CommonTableComponent
                  headers={[
                    studentImageAndNameHeaderDataForStudentDashboard,
                    ...universityHeadersData,
                  ]}
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
    </Layout>
  );
};

export default AllUniversityForStudent;
