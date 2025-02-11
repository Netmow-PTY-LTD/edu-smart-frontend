import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import HotOfferBanner from '@/components/common/HotOfferBanner';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetEarningsQuery } from '@/slice/services/agent/agentEarningsService';
import { useAllStudentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllHotOfferQuery } from '@/slice/services/public/package/publicPackageService';
import {
  agentEarnigsHeaders,
  studentAndLogoDataForAgentDashboard,
  studentsHeadersWithLogoLinkInAgent,
} from '@/utils/common/data';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AgentDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: userInfodata } = useGetUserInfoQuery();

  const router = useRouter();

  const {
    data: allStudentForAgentData,
    error: allStudentForAgentError,
    isLoading: allStudentForAgentIsLoading,
    refetch: allStudentForAgentRefetch,
  } = useAllStudentForAgentQuery();

  const {
    data: getAllHotOfferData,
    isLoading: getAllHotOfferIsLoading,
    refetch: getAllHotOfferRefetch,
  } = useGetAllHotOfferQuery();

  const { data: earningData, isLoading: earningLoading } =
    useGetEarningsQuery();

  // useEffect(() => {
  // const token = Cookies.get('token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     // window.location.href = '/auth/login';
  //   }
  // }, []);

  console.log(userInfodata?.data?.package_choice);

  if (userInfodata?.data?.package_choice) {
    //console.log('working');
    router.push('/dashboard/agent/upgrade');
  }

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          {allStudentForAgentIsLoading || earningLoading ? (
            <LoaderSpiner />
          ) : (
            <Row className="g-5">
              <Col xl={10}>
                <div className="h-100">
                  <WelcomingMessage data={userInfodata?.data} />

                  <Row xxl={12} className="g-5">
                    <Col xxl={12}>
                      <LatestRegistered
                        tableHead={'Latest Registered Students'}
                        headers={[
                          studentAndLogoDataForAgentDashboard,
                          ...studentsHeadersWithLogoLinkInAgent.slice(1),
                        ]}
                        data={
                          allStudentForAgentData?.data
                            ? allStudentForAgentData?.data
                            : []
                        }
                      />
                    </Col>
                    <Col xl={12}>
                      <LatestRegistered
                        tableHead={'Agents Earnings'}
                        headers={[...agentEarnigsHeaders]}
                        data={earningData?.data || []}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col xl={2}>
                <div className="my-5 gap-5">
                  {getAllHotOfferData?.data?.length > 0
                    ? getAllHotOfferData?.data.map((item, index) => (
                        <HotOfferBanner
                          key={index}
                          height="140px"
                          width="265px"
                          data={item}
                        />
                      ))
                    : ''}
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
export default AgentDashboard;
