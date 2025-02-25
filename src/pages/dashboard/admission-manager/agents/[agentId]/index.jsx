import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import SingleCountCard from '@/components/common/SingleCountCard';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetSingleAgentForAdmissionManagerQuery } from '@/slice/services/admission manager/agentServiceForAdmissionManager';
import {
  studentImageAndNameHeaderDataForAdmissionManager,
  studentsHeaders,
} from '@/utils/common/data';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const SingleAgentPageForAdmissionManagerDashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const agent_id = router.query.agentId;

  const {
    data: getSingleAgentForAdmissionManagerData,
    isLoading: getSingleAgentForAdmissionManagerIsLoading,
    refetch: getSingleAgentForAdmissionManagerRefetch,
  } = useGetSingleAgentForAdmissionManagerQuery(agent_id, {
    skip: !agent_id,
  });

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    getSingleAgentForAdmissionManagerData?.data?.students?.length > 0 &&
    getSingleAgentForAdmissionManagerData?.data?.students.filter(
      (item) =>
        item?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ToastContainer />
          {getSingleAgentForAdmissionManagerIsLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <ProfileBgCover
                profileData={getSingleAgentForAdmissionManagerData?.data}
              />

              <Row style={{ marginTop: '17%' }}>
                <Col xl={6}>
                  <AllOverviewInfoCard
                    data={getSingleAgentForAdmissionManagerData?.data}
                  />
                </Col>

                <Col xl={6}>
                  <SingleCountCard
                    data={{
                      start: `${0}`,
                      end: `${getSingleAgentForAdmissionManagerData?.data?.students?.length || 0}`,
                      label: 'Registered Students',
                      counter: '4',
                      bgcolor: 'info',
                      icon: 'ri-group-fill',
                      link: 'View all',
                      pathName: '',
                    }}
                  />
                </Col>
                <Col xl={12}>
                  <Card id="viewstudents">
                    <CardHeader className="text-primary fw-semibold fs-2">
                      All Students For Agent
                      <SearchComponent
                        searchTerm={searchTerm}
                        handleSearchChange={handleSearchChange}
                      />
                    </CardHeader>
                    <CardBody>
                      <CommonTableComponent
                        headers={[
                          studentImageAndNameHeaderDataForAdmissionManager,
                          ...studentsHeaders.slice(1),
                        ]}
                        data={isFilteredData || []}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        perPageData={perPageData}
                        searchTerm={searchTerm}
                        handleSearchChange={handleSearchChange}
                        emptyMessage="No Data found yet."
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleAgentPageForAdmissionManagerDashboard;
