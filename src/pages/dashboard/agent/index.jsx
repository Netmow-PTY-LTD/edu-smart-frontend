import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import Layout from '@/components/layout';
import { useAllStudentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { studentsHeadersWithLogoLinkInAgent, studentsHeadersWithoutAction } from '@/utils/common/data';

import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AgentDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: userInfodata } = useGetUserInfoQuery();

  const {
    data: allStudentForAgentData,
    error: allStudentForAgentError,
    isLoading: allStudentForAgentIsLoading,
    refetch: allStudentForAgentRefetch,
  } = useAllStudentForAgentQuery();

  // useEffect(() => {
  // const token = Cookies.get('token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     // window.location.href = '/auth/login';
  //   }
  // }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="h-100">
                <WelcomingMessage data={userInfodata?.data} />

                <Row xxl={12} className="g-5">
                  <Col xxl={12}>
                    <LatestRegistered
                      tableHead={'Latest Registered Students'}
                      headers={studentsHeadersWithLogoLinkInAgent}
                      data={
                        allStudentForAgentData?.data
                          ? allStudentForAgentData?.data
                          : []
                      }
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
export default AgentDashboard;
