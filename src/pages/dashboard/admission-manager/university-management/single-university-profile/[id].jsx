import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AllDepartmentForAdmissionManager from '@/components/sAdminDashboard/commponents/AllDepartmentForAdmissionManager';
import CourseCategoriesForAdmissionManager from '@/components/sAdminDashboard/commponents/CourseCategoriesForAdmissionManager';
import CoursesForAdmissionManager from '@/components/sAdminDashboard/commponents/CoursesForAdmissionManager';
import ManageUniversityForSuperAdmin from '@/components/sAdminDashboard/commponents/ManageUniversityForSuperAdmin';
import UniversityProfileOverview from '@/components/sAdminDashboard/commponents/UniversityProfileOverview';
import { useGetAllCourseCategoriesForAdmissionManagerQuery } from '@/slice/services/admission manager/courseCategoriesServiceForAdmissionManager';
import { useGetCourseForAdmissionManagerQuery } from '@/slice/services/admission manager/courseServiceForAdmissionManager';
import { useGetDepartmentForAdmissionManagerQuery } from '@/slice/services/admission manager/departmentServiceForAdmissionManager';
import { useGetSingleUniversityForAdmissionManagerQuery } from '@/slice/services/admission manager/universityServiceForAdmissionManager';
import {
  categoryHeaders,
  courseHeaders,
  departmentHeaders,
} from '@/utils/common/data';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';

const SingleUniversityProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');
  const [currentPage, setCurrentPage] = useState(0);

  const university_id = router.query.id;

  const {
    data: getSingleUniversityForAdmissionManagerData,
    isLoading: getSingleUniversityForAdmissionManagerIsLoading,
    refetch: getSingleUniversityForAdmissionManagerRefetch,
  } = useGetSingleUniversityForAdmissionManagerQuery(university_id, {
    skip: !university_id,
  });

  const {
    data: getDepartmentForAdmissionManagerData,
    error: getDepartmentForAdmissionManagerError,
    isLoading: getDepartmentForAdmissionManagerIsLoading,
    refetch: getDepartmentForAdmissionManagerRefetch,
  } = useGetDepartmentForAdmissionManagerQuery(university_id, {
    skip: !university_id,
  });

  const {
    data: getAllCourseCategoriesForAdmissionManagerData,
    error: getAllCourseCategoriesForAdmissionManagerDataError,
    isLoading: getAllCourseCategoriesForAdmissionManagerDataIsLoading,
    refetch: getAllCourseCategoriesForAdmissionManagerDataRefetch,
  } = useGetAllCourseCategoriesForAdmissionManagerQuery(university_id, {
    skip: !university_id,
  });

  const {
    data: getCourseForAdmissionManagerData,
    error: getCourseForAdmissionManagerError,
    isLoading: getCourseForAdmissionManagerIsLoading,
    refetch: getCourseForAdmissionManagerRefetch,
  } = useGetCourseForAdmissionManagerQuery(university_id, {
    skip: !university_id,
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <Layout>
        <div className="page-content ">
          <ToastContainer />
          {getSingleUniversityForAdmissionManagerIsLoading ||
          getDepartmentForAdmissionManagerIsLoading ||
          getAllCourseCategoriesForAdmissionManagerDataIsLoading ||
          getCourseForAdmissionManagerIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Container fluid>
              <ProfileBgCover
                profileData={getSingleUniversityForAdmissionManagerData?.data}
              />
              <Row className="mt-5 px-3">
                <Col lg={12} className="mt-5">
                  <div>
                    <div className="d-flex mb-5">
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
                            <i className="ri-list-unordered d-inline-block d-md-none"></i>{' '}
                            <span className="d-none d-md-inline-block">
                              Department
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem className="fs-14">
                          <NavLink
                            // href="#activities"
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              active: activeTab === '3',
                            })}
                            onClick={() => {
                              toggleTab('3');
                            }}
                          >
                            <i className="ri-list-unordered d-inline-block d-md-none"></i>{' '}
                            <span className="d-none d-md-inline-block">
                              Course Categories
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
                            <i className="ri-list-unordered d-inline-block d-md-none"></i>{' '}
                            <span className="d-none d-md-inline-block">
                              Courses
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
                            <i className="ri-list-unordered d-inline-block d-md-none"></i>{' '}
                            <span className="d-none d-md-inline-block">
                              Manage University Website
                            </span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <div className="d-flex gap-3 flex-shrink-1 ">
                        <Link
                          href={`/university/${university_id}`}
                          target="_blank"
                          className="button px-3 py-2"
                        >
                          <i className="ri-links-fill align-bottom"></i> Visit
                          University Pages
                        </Link>
                      </div>
                    </div>
                    {activeTab === '1' && (
                      <UniversityProfileOverview
                        headers={departmentHeaders}
                        categoryHeaders={categoryHeaders}
                        courseHeaders={courseHeaders}
                        profileData={
                          getSingleUniversityForAdmissionManagerData?.data
                        }
                        allDepartmentData={
                          getDepartmentForAdmissionManagerData?.data
                        }
                        allCategoryData={
                          getAllCourseCategoriesForAdmissionManagerData?.data
                        }
                        allCourseData={getCourseForAdmissionManagerData?.data}
                      />
                    )}
                    {activeTab === '2' && (
                      <AllDepartmentForAdmissionManager
                        university_id={university_id}
                      />
                    )}
                    {activeTab === '3' && (
                      <CourseCategoriesForAdmissionManager
                        university_id={university_id}
                        allDepartmentData={
                          getDepartmentForAdmissionManagerData?.data
                        }
                      />
                    )}
                    {activeTab === '4' && (
                      <CoursesForAdmissionManager
                        university_id={university_id}
                        allDepartmentData={
                          getDepartmentForAdmissionManagerData?.data
                        }
                        allCategoryData={
                          getAllCourseCategoriesForAdmissionManagerData?.data
                        }
                      />
                    )}
                    {activeTab === '5' && (
                      <ManageUniversityForSuperAdmin
                        university_id={university_id}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SingleUniversityProfile;
