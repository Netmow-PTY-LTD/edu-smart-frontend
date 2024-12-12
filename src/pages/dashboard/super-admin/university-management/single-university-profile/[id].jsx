import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AllCourseForSuperAdmin from '@/components/sAdminDashboard/commponents/AllCourseForSuperAdmin';
import AllDepartmentForSuperAdmin from '@/components/sAdminDashboard/commponents/AllDepartmentForSuperAdmin';
import CourseCategories from '@/components/sAdminDashboard/commponents/CourseCategories';
import ManageUniversityForSuperAdmin from '@/components/sAdminDashboard/commponents/ManageUniversityForSuperAdmin';
import UniversityProfileOverview from '@/components/sAdminDashboard/commponents/UniversityProfileOverview';
import { useGetAllCourseCategoriesQuery } from '@/slice/services/super admin/courseCategoriesService';
import { useGetCourseQuery } from '@/slice/services/super admin/courseService';
import { useGetDepartmentQuery } from '@/slice/services/super admin/departmentService';
import { useGetSingleUniversityQuery } from '@/slice/services/super admin/universityService';
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
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });


  
  
  const {
    data: getDepartmentData,
    error: getDepartmentError,
    isLoading: getDepartmentIsLoading,
    refetch: getDepartmentRefetch,
  } = useGetDepartmentQuery(university_id, { skip: !university_id });

  const {
    data: getAllCategoriesData,
    error: getAllCategoriesError,
    isLoading: getAllCategoriesIsLoading,
    refetch: getAllCategoriesRefetch,
  } = useGetAllCourseCategoriesQuery(university_id, { skip: !university_id });

  const {
    data: getCourseData,
    error: getCourseError,
    isLoading: getCourseIsLoading,
    refetch: getCourseRefetch,
  } = useGetCourseQuery(university_id, { skip: !university_id });

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
          {getSingleUniversityIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Container fluid>
              <ProfileBgCover profileData={getSingleUniversityData?.data} />
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
                              Manage University
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
                          <i className="ri-links-fill align-bottom"></i> visit
                          University Pages
                        </Link>
                      </div>
                    </div>
                    {activeTab === '1' && (
                      <UniversityProfileOverview
                        headers={departmentHeaders}
                        categoryHeaders={categoryHeaders}
                        courseHeaders={courseHeaders}
                        profileData={getSingleUniversityData?.data}
                        allDepartmentData={getDepartmentData?.data}
                        allCategoryData={getAllCategoriesData?.data}
                        allCourseData={getCourseData?.data}
                      />
                    )}
                    {activeTab === '2' && (
                      <AllDepartmentForSuperAdmin
                        university_id={university_id}
                      />
                    )}
                    {activeTab === '3' && (
                      <CourseCategories
                        university_id={university_id}
                        allDepartmentData={getDepartmentData?.data}
                      />
                    )}
                    {activeTab === '4' && (
                      <AllCourseForSuperAdmin
                        university_id={university_id}
                        allDepartmentData={getDepartmentData?.data}
                        allCategoryData={getAllCategoriesData?.data}
                      />
                    )}
                    {activeTab === '5' && (
                      <ManageUniversityForSuperAdmin
                        university_id={university_id}
                        getSingleUniversityData={getSingleUniversityData}
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
