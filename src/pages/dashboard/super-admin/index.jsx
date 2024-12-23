import DashBoardCountOptions from '@/components/common/allDashboardHome/DashBoardCountOptions';
import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import { useGetAllStudentQuery } from '@/slice/services/public/student/publicStudentService';
import { useGetUniversityQuery } from '@/slice/services/super admin/universityService';
import {
  agentsHeadersWithoutAction,
  studentsHeadersWithoutAction,
  superAdminNameAndLogoData,
  universityHeadersWithoutAction,
} from '@/utils/common/data';

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const SuperAdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allRegisteredUniversitydata, setAllRegisteredUniversitydata] =
    useState('');
  const { data: userInfodata } = useGetUserInfoQuery();
  const { data: getUniversityData } = useGetUniversityQuery();
  const { data: allAgentsData } = useGetAllAgentQuery();
  const { data: allStudentsData } = useGetAllStudentQuery();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/auth/login';
    }
  }, []);

  useEffect(() => {
    setAllRegisteredUniversitydata([
      superAdminNameAndLogoData,
      ...universityHeadersWithoutAction,
    ]);
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="h-100">
                <WelcomingMessage data={userInfodata?.data} />
                <Row>
                  <DashBoardCountOptions
                    userInfoData={userInfodata?.data}
                    firstElementData={getUniversityData?.data?.length}
                    secondElementData={allAgentsData?.data?.length}
                    thirdElementData={allStudentsData?.data?.length}
                    gstAndCurrencyData={''}
                    fourthElementData={''}
                    paidSum={''}
                    unPaidSum={''}
                  />
                </Row>

                <Row xxl={12} className="g-5">
                  <Col xxl={12}>
                    <LatestRegistered
                      tableHead={'Latest Registered University'}
                      headers={allRegisteredUniversitydata}
                      data={
                        getUniversityData?.data ? getUniversityData?.data : []
                      }
                    />
                  </Col>
                  <Col xxl={6}>
                    <LatestRegistered
                      tableHead={'Latest Registered Agents'}
                      headers={agentsHeadersWithoutAction}
                      data={allAgentsData?.data ? allAgentsData?.data : []}
                    />
                  </Col>
                  <Col xxl={6}>
                    <LatestRegistered
                      tableHead={'Latest Registered Students'}
                      headers={studentsHeadersWithoutAction}
                      data={allStudentsData?.data ? allStudentsData?.data : []}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default SuperAdminDashboard;
