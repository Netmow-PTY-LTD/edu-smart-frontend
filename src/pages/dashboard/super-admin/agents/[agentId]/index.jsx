import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import SingleCountCard from '@/components/common/SingleCountCard';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetSingleAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import { studentsHeadersWithLogoLink } from '@/utils/common/data';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';

const SingleAgentInSuperAdminDashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const [activeTab, setActiveTab] = useState('1');

  const agent_id = router.query.agentId;

  const {
    data: getSingleAgent,
    isLoading: getSingleAgentIsLoading,
    refetch: getSingleAgentRefetch,
  } = useGetSingleAgentQuery(agent_id, {
    skip: !agent_id,
  });

  const { data: userInfodata } = useGetUserInfoQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    getSingleAgent?.data?.students?.length > 0 &&
    getSingleAgent?.data?.students.filter(
      (item) =>
        item?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  console.log(getSingleAgent?.data?.students[0]);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {getSingleAgentIsLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <ProfileBgCover profileData={getSingleAgent?.data} />
              <Row>
                <div style={{ marginTop: '10rem' }} className="d-flex">
                  <Nav
                    pills
                    className="animation-nav profile-nav gap-4 gap-lg-4 flex-grow-1"
                    role="tablist"
                  >
                    <NavItem className="fs-14">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTab === '1',
                        })}
                        onClick={() => {
                          toggleTab('1');
                        }}
                      >
                        <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                        <span className="d-none d-md-inline-block">
                          Overview
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div className="d-flex gap-3 flex-shrink-1 "></div>
                </div>

                {activeTab === '1' && (
                  <div style={{ marginTop: '30px' }}>
                    <Row>
                      <Col xl={6}>
                        <AllOverviewInfoCard data={getSingleAgent?.data} />
                      </Col>

                      <Col xl={6}>
                        <SingleCountCard
                          data={{
                            start: `${0}`,
                            end: `${getSingleAgent?.data?.students?.length || 0}`,
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
                              headers={[...studentsHeadersWithLogoLink]}
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
              </Row>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleAgentInSuperAdminDashboard;
