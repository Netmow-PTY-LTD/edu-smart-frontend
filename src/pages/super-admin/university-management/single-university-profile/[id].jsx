import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AllCourseForSuperAdmin from '@/components/sAdminDashboard/commponents/AllCourseForSuperAdmin';
import AllDepartmentForSuperAdmin from '@/components/sAdminDashboard/commponents/AllDepartmentForSuperAdmin';
import CourseCategories from '@/components/sAdminDashboard/commponents/CourseCategories';
import UniversityProfileOverview from '@/components/sAdminDashboard/commponents/UniversityProfileOverview';
import { useGetAllCourseCategoriesQuery } from '@/slice/services/courseCategoriesService';
import { useGetCourseQuery } from '@/slice/services/courseService';
import { useGetDepartmentQuery } from '@/slice/services/departmentService';
import { useGetSingleUniversityQuery } from '@/slice/services/universityService';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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

  const headers = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Department Name', key: 'name' },
    {
      title: 'Course Category',
      key: 'categories',
      render: (item, index) =>
        item?.categories?.length > 0
          ? item?.categories?.map((category) => (
              <span key={index} className="d-flex flex-column text-capitalize">
                {category?.name}
              </span>
            ))
          : '-',
    },
    {
      title: 'Courses',
      key: 'courses',
      render: (item, index) =>
        item?.courses?.length > 0
          ? item.map((course) => (
              <span key={index} className="d-flex flex-column text-capitalize">
                {course}
              </span>
            ))
          : '-',
    },

    { title: 'Description', key: 'description' },
  ];

  const categoryHeaders = [
    {
      title: 'SN',
      key: 'key',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Course Category ', key: 'name' },
    {
      title: 'Department ',
      key: 'department',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.department?.name}
        </span>
      ),
    },
    { title: 'Description', key: 'description' },
  ];

  return (
    <>
      <Layout>
        <div className="page-content ">
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
                              Applications
                            </span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      {/* <div className="d-flex gap-3 flex-shrink-1 pb-5 me-3">
                        <div
                          type="button"
                          // onClick={() => togEditModal(mainId)}
                          className="button px-3 py-2"
                        >
                          <i className="ri-edit-box-line align-bottom"></i> Edit
                          Profile
                        </div>
                      </div> */}
                    </div>
                    {activeTab === '1' && (
                      <UniversityProfileOverview
                        headers={headers}
                        categoryHeaders={categoryHeaders}
                        profileData={getSingleUniversityData?.data}
                        allDepartmentData={getDepartmentData?.data}
                        allCategoryData={getAllCategoriesData?.data}
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
                    {activeTab === '5' && ''}
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
