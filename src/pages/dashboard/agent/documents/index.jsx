import DocumentPage from '@/components/agentDashboard/studentManagement/singleStudentProfile/DocumentPage';
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
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
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
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);


  const customData = useCustomData();

  const {
      data: userInfodata,
      isLoading: userInfoIsLoading,
      refetch: getUserInfoRefetch,
    } = useGetUserInfoQuery();

  const agent_id = userInfodata?.data?._id;

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

  // const agentEarningsHeaderAction = {
  //   title: 'Action',
  //   key: 'actions',
  //   render: (item) => (
  //     <UncontrolledDropdown direction="end">
  //       <DropdownToggle
  //         tag="a"
  //         className="text-reset dropdown-btn"
  //         role="button"
  //       >
  //         <span className="button px-3">
  //           <i className="ri-more-fill align-middle"></i>
  //         </span>
  //       </DropdownToggle>
  //       <DropdownMenu className="ms-2">
  //         <DropdownItem>
  //           <div
  //             onClick={() => handleEarningStatusUpdate(item._id, 'paid')}
  //             className="text-primary"
  //           >
  //             <i className="ri-check-double-fill align-start me-2 text-success"></i>
  //             Mark as Paid
  //           </div>
  //         </DropdownItem>
  //         <DropdownItem>
  //           <div
  //             onClick={() => handleEarningStatusUpdate(item._id, 'unpaid')}
  //             className="text-primary"
  //           >
  //             <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
  //             Mark as Unpaid
  //           </div>
  //         </DropdownItem>
  //         <DropdownItem>
  //           <div
  //             onClick={() => handleEarningStatusUpdate(item._id, 'pending')}
  //             className="text-primary"
  //           >
  //             <i className="ri-loader-2-fill align-start me-2 text-muted"></i>
  //             Mark as Pending
  //           </div>
  //         </DropdownItem>
  //       </DropdownMenu>
  //     </UncontrolledDropdown>
  //   ),
  // };

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
              <div style={{marginTop:'100px'}}>
              <Row >
                <Col xl={12}>
                  <DocumentPage
                    student_id={agent_id}
                    getSingleStudent={getSingleAgent}
                    refetchSingleStudent={getSingleAgentRefetch}
                    sigleStudentIsLoading={getSingleAgentIsLoading}
                  />
                </Col>
              </Row>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleAgentInSuperAdminDashboard;
