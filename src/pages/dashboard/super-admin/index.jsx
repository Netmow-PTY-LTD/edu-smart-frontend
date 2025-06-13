import DashBoardCardApplication from '@/components/common/allDashboardHome/DashBoardCardApplication';
import DashBoardCountOptions from '@/components/common/allDashboardHome/DashBoardCountOptions';
import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import RouteList from '@/components/common/allDashboardHome/RouteList';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import { useGetAllStudentQuery } from '@/slice/services/public/student/publicStudentService';
import { useGetToatalIncomeInSuperAdminQuery } from '@/slice/services/super admin/superAdminStatsServices';
import { useGetUniversityQuery } from '@/slice/services/super admin/universityService';
import DataObjectComponent from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';

import React from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const SuperAdminDashboard = () => {
  const customData = useCustomData();

  const { data: userInfodata, isLoading: userInfoIsLoading } =
    useGetUserInfoQuery();

  const { data: getUniversityData, isLoading: getUniversityIsLoading } =
    useGetUniversityQuery();

  const { data: allAgentsData, isLoading: allAgentsIsLoading } =
    useGetAllAgentQuery();

  const { data: allStudentsData, isLoading: allStudentsIsLoading } =
    useGetAllStudentQuery();

  const { data: totalIncome } = useGetToatalIncomeInSuperAdminQuery();

  const {
    universityLogoAndNameHeaderDataForSuperAdminDashboard = [],
    universityHeadersData = [],
    agentNameAndImageHeaderDataForSuperAdmin = [],
    agentsHeaders = [],
    studentImageAndNameHeaderDataForSuperAdmin = [],
    studentsHeaders = [],
  } = DataObjectComponent();

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          {getUniversityIsLoading ||
          allAgentsIsLoading ||
          allStudentsIsLoading ||
          userInfoIsLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="h-100">
              <WelcomingMessage data={userInfodata?.data} />

              {userInfodata?.data?.role === 'super_admin' &&
                process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development' && (
                  <RouteList />
                )}

              {/* <Row className="pb-5">
                <DashBoardCardApplication>

                </DashBoardCardApplication>
                <DashBoardCountOptions
                  userInfoData={userInfodata?.data}
                  firstElementData={getUniversityData?.data?.length}
                  secondElementData={allAgentsData?.data?.length}
                  thirdElementData={allStudentsData?.data?.length}
                  fourthElementData={totalIncome?.data?.totalReceiveAmount?.toFixed(
                    2
                  )}
                  fithElement={totalIncome?.data?.totalUniversityPayout?.toFixed(
                    2
                  )}
                  sixthElement={totalIncome?.data?.totalPaidAgentPayout?.toFixed(
                    2
                  )}
                  sevenElement={totalIncome?.data?.totalPendingAgentPayout?.toFixed(
                    2
                  )}
                  eightElement={totalIncome?.data?.totalSuperAdminProfit?.toFixed(
                    2
                  )}
                  gstAndCurrencyData={''}
                  paidSum={''}
                  unPaidSum={''}
                />
              </Row> */}

                {(userInfodata?.data?.role === 'super_admin' || userInfodata?.data?.role === 'admission_manager') && (
                  <Row className="pb-5">
                    <h1 className="p-3">Applications Overview</h1>
                    <Col xs={12} className="mb-4">
                      <DashBoardCardApplication />
                    </Col>
                  </Row>
                )}
                              
              <Row className="pb-5">
                 <h1 className='p-3'>Registration & Financial Overview </h1>
                <Col xs={12}>
                  <DashBoardCountOptions
                    userInfoData={userInfodata?.data}
                    firstElementData={getUniversityData?.data?.length}
                    secondElementData={allAgentsData?.data?.length}
                    thirdElementData={allStudentsData?.data?.length}
                    fourthElementData={totalIncome?.data?.totalReceiveAmount?.toFixed(2)}
                    fithElement={totalIncome?.data?.totalUniversityPayout?.toFixed(2)}
                    sixthElement={totalIncome?.data?.totalPaidAgentPayout?.toFixed(2)}
                    sevenElement={totalIncome?.data?.totalPendingAgentPayout?.toFixed(2)}
                    eightElement={totalIncome?.data?.totalSuperAdminProfit?.toFixed(2)}
                    gstAndCurrencyData={''}
                    paidSum={''}
                    unPaidSum={''}
                  />
                </Col>
              </Row>






              <Row xxl={12} className="g-5">
                {customData.showInSuperAdmin ? (
                  <Col xxl={12}>
                    <LatestRegistered
                      tableHead={'Latest Registered University'}
                      headers={[
                        universityLogoAndNameHeaderDataForSuperAdminDashboard,
                        ...universityHeadersData,
                      ]}
                      data={
                        getUniversityData?.data ? getUniversityData?.data : []
                      }
                    />
                  </Col>
                ) : (
                  ''
                )}

                {customData.hideInAccountant ? (
                  ''
                ) : (
                  <>
                    <Col xxl={6}>
                      <LatestRegistered
                        tableHead={'Latest Registered Agents'}
                        headers={[
                          agentNameAndImageHeaderDataForSuperAdmin,
                          ...agentsHeaders,
                        ]}
                        data={allAgentsData?.data ? allAgentsData?.data : []}
                      />
                    </Col>
                    <Col xxl={6}>
                      <LatestRegistered
                        tableHead={'Latest Registered Students'}
                        headers={[
                          studentImageAndNameHeaderDataForSuperAdmin,
                          ...studentsHeaders,
                        ]}
                        data={
                          allStudentsData?.data ? allStudentsData?.data : []
                        }
                      />
                    </Col>
                  </>
                )}
              </Row>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default SuperAdminDashboard;
