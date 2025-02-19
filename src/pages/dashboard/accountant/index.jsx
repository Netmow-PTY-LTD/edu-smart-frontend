import DashBoardCountOptions from '@/components/common/allDashboardHome/DashBoardCountOptions';
import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import { useGetAllStudentQuery } from '@/slice/services/public/student/publicStudentService';
import { useGetToatalIncomeInSuperAdminQuery } from '@/slice/services/super admin/superAdminStatsServices';
import { useGetUniversityQuery } from '@/slice/services/super admin/universityService';
import {
  agentNameAndImageHeaderDataForAccountantDashboard,
  agentsHeaders,
} from '@/utils/common/data';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AccountantDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: userInfodata, isLoading: userInfoIsLoading } =
    useGetUserInfoQuery();
  const { data: getUniversityData, isLoading: getUniversityIsLoading } =
    useGetUniversityQuery();
  const { data: allAgentsData, isLoading: allAgentsIsLoading } =
    useGetAllAgentQuery();
  const { data: allStudentsData, isLoading: allStudentsIsLoading } =
    useGetAllStudentQuery();
  const { data: totalIncome } = useGetToatalIncomeInSuperAdminQuery();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/auth/login';
    }
  }, []);

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
            <Row>
              <Col>
                <div className="h-100">
                  <WelcomingMessage data={userInfodata?.data} />
                  <Row>
                    <DashBoardCountOptions
                      userInfoData={userInfodata?.data}
                      firstElementData={allAgentsData?.data?.length}
                      secondElementData={totalIncome?.data?.totalReceiveAmount}
                      thirdElementData={
                        totalIncome?.data?.totalUniversityPayout
                      }
                      fourthElementData={totalIncome?.data?.totalAgentPayout}
                      fithElement={totalIncome?.data?.totalSuperAdminProfit}
                    />
                  </Row>

                  <Row className="g-5">
                    <Col xxl={12}>
                      <LatestRegistered
                        tableHead={'Latest Registered Agents'}
                        headers={[
                          agentNameAndImageHeaderDataForAccountantDashboard,
                          ...agentsHeaders,
                        ]}
                        data={allAgentsData?.data ? allAgentsData?.data : []}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default AccountantDashboard;
