import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import Layout from '@/components/layout';
import AllDepartmentForSuperAdmin from '@/components/sAdminDashboard/commponents/AllDepartmentForSuperAdmin';
import UniversityProfileOverview from '@/components/sAdminDashboard/commponents/UniversityProfileOverview';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

const SingleUniversityProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');

  const university_id = router.query.id;

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const headers = [
    {
      title: 'Logo',
      key: 'logo',
      render: (item) => (
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0 me-1">
            <Link
              href={`/super-admin/university-management/single-university-profile/${item?._id}`}
              className="text-reset"
            >
              <Image
                src={item?.logo?.url ? item?.logo?.url : `${userDummyImage}`}
                alt="User"
                height={60}
                width={60}
                className="avatar-md p-1 me-3 align-middle rounded-circle"
              />
            </Link>
          </div>
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              <Link href={''} className="text-reset">
                {`${item.name} `}
              </Link>
            </h5>
          </div>
        </div>
      ),
    },

    { title: 'Description', key: 'description' },
    { title: 'Code', key: 'code' },
    {
      title: 'Address',
      key: 'address',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.address_line_1 ? <span>{item.address_line_1}</span> : '-'}
          {item?.address_line_2 ? <span>{item.address_line_2}</span> : '-'}
          {item?.city ? <span>{item.city}</span> : '-'}
          {item?.state ? <span>{item.state}</span> : '-'}
          {item?.zip ? <span>{item.zip}</span> : '-'}
          {item?.country ? <span>{item.country}</span> : '-'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (item) => (
        <UncontrolledDropdown className="card-header-dropdown">
          <DropdownToggle
            tag="a"
            className="text-reset dropdown-btn"
            role="button"
          >
            <span className="button px-3">
              <i className="ri-more-fill align-middle"></i>
            </span>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu dropdown-menu-end">
            <DropdownItem>
              <div
                // onClick={() => handleEditButtonClick(item?._id)}
                className="text-primary"
              >
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
            <DropdownItem>
              <div
                // onClick={() => handleDeleteButtonClick(item._id)}
                className="text-primary"
              >
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Delete
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  console.log(university_id);

  return (
    <>
      <Layout>
        <div className="page-content ">
          {/* {singlePlayerIsLoading ? (
            <LoaderSpiner />
          ) : ( */}
          <Container fluid>
            <ProfileBgCover singlePlayerData={''} />
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
                    <UniversityProfileOverview headers={headers} />
                  )}
                  {activeTab === '2' && (
                    <AllDepartmentForSuperAdmin university_id={university_id} />
                  )}
                  {activeTab === '3' && ''}
                  {activeTab === '4' && ''}
                  {activeTab === '5' && ''}
                </div>
              </Col>
            </Row>
          </Container>
          {/* )} */}
        </div>
      </Layout>
    </>
  );
};

export default SingleUniversityProfile;
