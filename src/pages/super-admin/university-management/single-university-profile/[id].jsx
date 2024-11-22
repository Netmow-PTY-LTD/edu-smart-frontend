import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import CourseCategories from '@/components/sAdminDashboard/commponents/CourseCategories';
import AllCourseForSuperAdmin from '@/components/sAdminDashboard/commponents/AllCourseForSuperAdmin';
import AllDepartmentForSuperAdmin from '@/components/sAdminDashboard/commponents/AllDepartmentForSuperAdmin';
import UniversityProfileOverview from '@/components/sAdminDashboard/commponents/UniversityProfileOverview';
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
  } = useGetDepartmentQuery();

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
          ? item.map((category) => {
              <span className="d-flex flex-column text-capitalize">
                {category}
              </span>;
            })
          : '-',
    },
    {
      title: 'Courses',
      key: 'courses',
      render: (item, index) =>
        item?.courses?.length > 0
          ? item.map((course) => {
              <span className="d-flex flex-column text-capitalize">
                {course}
              </span>;
            })
          : '-',
    },

    { title: 'Description', key: 'description' },

    // {
    //   title: 'Action',
    //   key: 'actions',
    //   render: (item) => (
    //     <UncontrolledDropdown className="card-header-dropdown">
    //       <DropdownToggle
    //         tag="a"
    //         className="text-reset dropdown-btn"
    //         role="button"
    //       >
    //         <span className="button px-3">
    //           <i className="ri-more-fill align-middle"></i>
    //         </span>
    //       </DropdownToggle>
    //       <DropdownMenu className="dropdown-menu dropdown-menu-end">
    //         <DropdownItem>
    //           <div
    //             onClick={() => handleEditButtonClick(item?._id)}
    //             className="text-primary"
    //           >
    //             <i className="ri-pencil-fill align-start me-2 text-muted"></i>
    //             Edit
    //           </div>
    //         </DropdownItem>
    //         <DropdownItem>
    //           <div
    //             onClick={() => handleDeleteButtonClick(item._id)}
    //             className="text-primary"
    //           >
    //             <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
    //             Delete
    //           </div>
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </UncontrolledDropdown>
    //   ),
    // },
  ];
  console.log(getDepartmentData);

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
                    <div className="d-flex">
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
                      <div className="d-flex gap-3 flex-shrink-1 pb-5">
                        <div
                          type="button"
                          // onClick={() => togEditModal(mainId)}
                          className="button px-3 py-2"
                        >
                          <i className="ri-edit-box-line align-bottom"></i> Edit
                          Profile
                        </div>
                      </div>
                    </div>
                    {activeTab === '1' && (
                      <UniversityProfileOverview
                        headers={headers}
                        profileData={getSingleUniversityData?.data}
                        allDepartmentData={getDepartmentData?.data}
                      />
                    )}
                    {activeTab === '2' && (
                      <AllDepartmentForSuperAdmin
                        university_id={university_id}
                      />
                    )}
                    {activeTab === '3' && (
                      <CourseCategories
                        headers={headers}
                        university_id={university_id}
                      />
                    )}
                    {activeTab === '4' && (
                      <AllCourseForSuperAdmin
                        allDepartmentData={getDepartmentData?.data}
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
