import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import Layout from '@/components/layout';
import AppliedUniversityPageSuper from '@/components/sAdminDashboard/students/singleStudentProfile/AppliedUniversityPageSuper';
import DocumentRequestPageSuper from '@/components/sAdminDashboard/students/singleStudentProfile/DocumentRequestPageSuper';
import OverviewPageStudentSuper from '@/components/sAdminDashboard/students/singleStudentProfile/OverviewPageStudentSuper';
import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Container, Nav, NavItem, NavLink, Row } from 'reactstrap';

const SingleStudentForSuperAdmin = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('1');

  //  ------------------- Just for UI example this data will come from API -----------------------
  const student_id = router.query.id;

  const {
    data: getSingleUniversityDataForStudent,
    isLoading: getSingleUniversityIsLoadingForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(student_id, {
    skip: !student_id,
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Container fluid>
            <ProfileBgCover
              profileData={getSingleUniversityDataForStudent?.data}
            />
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
                      <span className="d-none d-md-inline-block">Overview</span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="fs-14">
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: activeTab === '2',
                      })}
                      onClick={() => {
                        toggleTab('2');
                      }}
                    >
                      <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                      <span className="d-none d-md-inline-block">
                        Documents
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="fs-14">
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: activeTab === '3',
                      })}
                      onClick={() => {
                        toggleTab('3');
                      }}
                    >
                      <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                      <span className="d-none d-md-inline-block">
                        Document Request
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="fs-14">
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: activeTab === '4',
                      })}
                      onClick={() => {
                        toggleTab('4');
                      }}
                    >
                      <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                      <span className="d-none d-md-inline-block">
                        Applied University
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <div className="d-flex gap-3 flex-shrink-1 "></div>
              </div>

              {activeTab === '1' && (
                <div style={{ marginTop: '50px' }}>
                  <OverviewPageStudentSuper />
                </div>
              )}
              {activeTab === '2' && (
                <div style={{ marginTop: '50px' }}>
                  <DocumentRequestPageSuper />
                </div>
              )}
              {activeTab === '3' && (
                <div style={{ marginTop: '50px' }}>
                  <DocumentRequestPageSuper />
                </div>
              )}
              {activeTab === '4' && (
                <div style={{ marginTop: '50px' }}>
                  <AppliedUniversityPageSuper />
                </div>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default SingleStudentForSuperAdmin;
