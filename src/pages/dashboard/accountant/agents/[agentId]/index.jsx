import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import SingleCountCard from '@/components/common/SingleCountCard';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AgentTotalPaidAmountForSuperAdmin from '@/components/sAdminDashboard/earning/AgentTotalPaidAmountForSuperAdmin';
import TotalAgentPayoutInAgentForSuperAdmin from '@/components/sAdminDashboard/earning/AgentTotalPaidAmountForSuperAdmin';
import AgentTotalPendingAmountForSuperAdmin from '@/components/sAdminDashboard/earning/AgentTotalPendingAmountForSuperAdmin';
import UpdateAgentModal from '@/components/sAdminDashboard/modals/UpdateAgentModal';
import AgentFamilyTripForSuperAdmin from '@/components/sAdminDashboard/packageManagement/AgentFamilyTripForSuperAdmin';
import AgentPackageHistoryForSuperAdmin from '@/components/sAdminDashboard/packageManagement/AgentPackageHistoryForSuperAdmin';
import AgentYearlyBonousForSuperAdmin from '@/components/sAdminDashboard/packageManagement/AgentYearlyBonousForSuperAdmin';
import { useGetSingleAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import {
  useGetAgentEarningsQuery,
  useUpdateAgentEarningsMutation,
} from '@/slice/services/super admin/agentService';
import DataObjectComponent from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';

import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

const SingleAgentInSuperAdminDashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const [activeTab, setActiveTab] = useState('1');
  const agent_id = router.query.agentId;
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const customData = useCustomData();

  const {
    studentImageAndNameHeaderDataForSuperAdmin,
    agentEarnigsHeaders,
    studentsHeaders = [],
  } = DataObjectComponent();

  const {
    data: getSingleAgent,
    isLoading: getSingleAgentIsLoading,
    refetch: getSingleAgentRefetch,
  } = useGetSingleAgentQuery(agent_id, {
    skip: !agent_id,
  });

  const {
    data: agentEarningsData,
    isLoading: agentEarningLoading,
    refetch: agentEarningRefetch,
  } = useGetAgentEarningsQuery(agent_id);

  const [updateAgentEarnings] = useUpdateAgentEarningsMutation();

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

  const handleEarningStatusUpdate = async (id, status) => {
    try {
      const response = await updateAgentEarnings({
        id,
        status,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        agentEarningRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;

      toast.error(errorMessage);
    }
  };

  const agentEarningsHeaderAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <UncontrolledDropdown direction="end">
        <DropdownToggle
          tag="a"
          className="text-reset dropdown-btn"
          role="button"
        >
          <span className="button px-3">
            <i className="ri-more-fill align-middle"></i>
          </span>
        </DropdownToggle>
        <DropdownMenu className="ms-2">
          <DropdownItem>
            <div
              onClick={() => handleEarningStatusUpdate(item._id, 'paid')}
              className="text-primary"
            >
              <i className="ri-check-double-fill align-start me-2 text-success"></i>
              Mark as Paid
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => handleEarningStatusUpdate(item._id, 'unpaid')}
              className="text-primary"
            >
              <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
              Mark as Unpaid
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => handleEarningStatusUpdate(item._id, 'pending')}
              className="text-primary"
            >
              <i className="ri-loader-2-fill align-start me-2 text-muted"></i>
              Mark as Pending
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ToastContainer />
          {getSingleAgentIsLoading || agentEarningLoading ? (
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
                    {customData.hideforadmissionmanger ? (
                      ''
                    ) : (
                      <>
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
                              Earning Paid Payout
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
                              Earning Pending Payout
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
                              Family Trip
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
                              Yearly Bonous
                            </span>
                          </NavLink>
                        </NavItem>
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
                              Package History
                            </span>
                          </NavLink>
                        </NavItem>
                        <button
                          className="button p-2 ms-auto"
                          onClick={() => {
                            setAddModalIsOpen(true);
                          }}
                        >
                          <i className="ri-edit-box-line me-1"></i>
                          Edit Profile
                        </button>
                      </>
                    )}
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
                            All Students For Partner
                            <SearchComponent
                              searchTerm={searchTerm}
                              handleSearchChange={handleSearchChange}
                            />
                          </CardHeader>
                          <CardBody>
                            <CommonTableComponent
                              headers={[
                                studentImageAndNameHeaderDataForSuperAdmin,
                                ...studentsHeaders,
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

                {customData.showInSuperAdmin ? (
                  <>
                    {activeTab === '2' && (
                      <div style={{ marginTop: '30px' }}>
                        <AgentTotalPaidAmountForSuperAdmin
                          agent_id={agent_id}
                        />
                      </div>
                    )}
                    {activeTab === '3' && (
                      <div style={{ marginTop: '30px' }}>
                        <AgentTotalPendingAmountForSuperAdmin
                          agent_id={agent_id}
                        />
                      </div>
                    )}
                    {activeTab === '4' && (
                      <div style={{ marginTop: '30px' }}>
                        <AgentFamilyTripForSuperAdmin agent_id={agent_id} />
                      </div>
                    )}
                    {activeTab === '5' && (
                      <div style={{ marginTop: '30px' }}>
                        <AgentYearlyBonousForSuperAdmin agent_id={agent_id} />
                      </div>
                    )}
                    {activeTab === '6' && (
                      <div style={{ marginTop: '30px' }}>
                        <AgentPackageHistoryForSuperAdmin agent_id={agent_id} />
                      </div>
                    )}
                  </>
                ) : (
                  ''
                )}
              </Row>
            </div>
          )}
        </div>
      </div>

      <UpdateAgentModal
        openModal={addModalIsOpen}
        closeModal={() => {
          setAddModalIsOpen(false);
          getSingleAgentRefetch(); // This ensures fresh data is loaded after closing
        }}
        agentDetails={getSingleAgent}
      />
    </Layout>
  );
};

export default SingleAgentInSuperAdminDashboard;
