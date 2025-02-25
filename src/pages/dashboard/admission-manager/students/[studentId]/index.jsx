import ApplicationEmgsStatus from '@/components/agentDashboard/studentManagement/singleStudentProfile/ApplicationEmgsStatus';
import AppliedUniversityPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/AppliedUniversityPage';
import DocumentPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/DocumentPage';
import DocumentRequestPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/DocumentRequestPage';
import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetSingleStudentForAdmissionManagerQuery } from '@/slice/services/admission manager/studentServiceForAdmissionManager';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row } from 'reactstrap';

const SingleStudentPageForAdmissionManagerDashboard = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('1');

  const student_id = router.query.studentId;

  const {
    data: getSingleStudentForAdmissionManagerData,
    isLoading: getSingleStudentForAdmissionManagerIsLoading,
    refetch: getSingleStudentForAdmissionManagerRefetch,
  } = useGetSingleStudentForAdmissionManagerQuery(student_id, {
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
          {getSingleStudentForAdmissionManagerIsLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <ProfileBgCover
                profileData={getSingleStudentForAdmissionManagerData?.data}
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
                        <span className="d-none d-md-inline-block">
                          Overview
                        </span>
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

                    <NavItem className="fs-14">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTab === '5',
                        })}
                        onClick={() => {
                          toggleTab('5');
                        }}
                      >
                        <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                        <span className="d-none d-md-inline-block">
                          EMGS Status
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div className="d-flex gap-3 flex-shrink-1 "></div>
                </div>

                {activeTab === '1' && (
                  <div style={{ marginTop: '50px' }}>
                    {/* <OverviewPage /> */}
                    <Col xl={12}>
                      <AllOverviewInfoCard
                        data={getSingleStudentForAdmissionManagerData?.data}
                      />
                    </Col>
                  </div>
                )}
                {activeTab === '2' && (
                  <div style={{ marginTop: '50px' }}>
                    <DocumentPage
                      student_id={student_id}
                      getSingleStudent={getSingleStudentForAdmissionManagerData}
                      refetchSingleStudent={
                        getSingleStudentForAdmissionManagerRefetch
                      }
                      sigleStudentIsLoading={
                        getSingleStudentForAdmissionManagerIsLoading
                      }
                    />
                  </div>
                )}
                {activeTab === '3' && (
                  <div style={{ marginTop: '50px' }}>
                    <DocumentRequestPage
                      student_id={student_id}
                      getSingleStudent={getSingleStudentForAdmissionManagerData}
                      refetchSingleStudent={
                        getSingleStudentForAdmissionManagerRefetch
                      }
                      sigleStudentIsLoading={
                        getSingleStudentForAdmissionManagerIsLoading
                      }
                    />
                  </div>
                )}
                {activeTab === '4' && (
                  <div>
                    <AppliedUniversityPage id={student_id} />
                  </div>
                )}

                {activeTab === '5' && (
                  <div>
                    <ApplicationEmgsStatus student_id={student_id} />
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

export default SingleStudentPageForAdmissionManagerDashboard;
