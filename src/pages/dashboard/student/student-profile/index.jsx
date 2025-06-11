import AirTicketDocumentRequestPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/AirTicketDocumentRequestPage';
import ApplicationEmgsStatus from '@/components/agentDashboard/studentManagement/singleStudentProfile/ApplicationEmgsStatus';
import AppliedUniversityPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/AppliedUniversityPage';
import DocumentPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/DocumentPage';
import DocumentRequestPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/DocumentRequestPage';
import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AllStudentApplications from '@/components/StudentDashboard/components/AllStudentApplications';
import AllUploadDocumentsComponent from '@/components/StudentDashboard/components/AllUploadDocumentsComponent';
import EmgsStatus from '@/components/StudentDashboard/components/EmgsStatus';
import StudentAirTicketDocumentSection from '@/components/StudentDashboard/components/StudentAirTicketDocumentSection';
import SubmittedDocumentsViewer from '@/components/StudentDashboard/components/SubmittedDocumentsViewer';
import { useSingleStudentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row } from 'reactstrap';

const SingleStudentForAgent = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('1');

  //  ------------------- Just for UI example this data will come from API -----------------------
  const { data: userInfodata, error, isLoading } = useGetUserInfoQuery();
  console.log('userInfodata', userInfodata);

  const student_id = userInfodata?.data?._id;

  const {
    data: getSingleStudent,
    isLoading: getSingleStudenIsLoadingForStudent,
    refetch: getSingleStudenRefetch,
  } = useGetUserInfoQuery();

  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    }
  }, [router.query.tab, getSingleStudent?.data]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);

      const newQuery = { ...router.query };
      delete newQuery.tab;

      router.replace(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true } // Prevents a full page reload
      );
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {getSingleStudenIsLoadingForStudent ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <ProfileBgCover profileData={getSingleStudent?.data} />
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
                          Applied University & EMGS Status
                        </span>
                      </NavLink>
                    </NavItem>
                    {/* <NavItem className="fs-14">
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
                    </NavItem> */}

                    <NavItem className="fs-14">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: activeTab === '6',
                        })}
                        onClick={() => {
                          toggleTab('6');
                        }}
                      >
                        <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                        <span className="d-none d-md-inline-block">
                          Air Ticket Document Request
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
                      <AllOverviewInfoCard data={getSingleStudent?.data} />
                    </Col>
                  </div>
                )}
                {activeTab === '2' && (
                  <div style={{ marginTop: '50px' }}>
                    <SubmittedDocumentsViewer student_id={student_id} />
                  </div>
                )}
                {activeTab === '3' && (
                  <div style={{ marginTop: '50px' }}>
                    <AllUploadDocumentsComponent student_id={student_id} />
                  </div>
                )}
                {activeTab === '4' && (
                  <div>
                    <AllStudentApplications id={student_id} />
                  </div>
                )}
                {activeTab === '5' && (
                  <div>
                    <EmgsStatus student_id={student_id} />
                  </div>
                )}

                {activeTab === '6' && (
                  <div style={{ marginTop: '50px' }}>
                    <StudentAirTicketDocumentSection student_id={student_id} />
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

export default SingleStudentForAgent;
