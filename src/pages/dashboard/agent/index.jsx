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
  studentsHeaders,
  studentsImageAndNameHeaderDataInAgentDashboard,
} from '@/utils/common/data';
import Cookies from 'js-cookie';
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

  console.log(userInfodata?.data?.role);

  if (userInfodata?.data?.package_choice) {
    //console.log('working');
    router.push('/dashboard/agent/upgrade');
    return;
  }

  const course_choice = Cookies.get('course_choice');
  const universityId = Cookies.get('universityId');

  console.log(course_choice);
  console.log(universityId);

  let destination;

  if (userInfodata?.data?.role === 'student') {
    destination = 'single-university-profile';
  }

  if (userInfodata?.data?.role === 'agent') {
    destination = 'single-university-profile-for-agent';
  }

  console.log(destination);

  if (course_choice && universityId && destination) {
    console.log('working');

    router.push(
      `/dashboard/${userInfodata?.data?.role}/university-management/${destination}/${universityId}/course/${course_choice}`
    );

    Cookies.remove('course_choice');
    Cookies.remove('universityId');
    return;
  } else {
    console.error(
      'Missing data: Check if userInfodata, course_choice, universityId, or destination is undefined'
    );
  }

  // if (
  //   course_choice != null && // Check if course_choice is not null or undefined
  //   universityId != null && // Check if universityId is not null or undefined
  //   destination != null && // Check if destination is not null or undefined
  //   course_choice !== '' && // Ensure course_choice is not an empty string
  //   universityId !== '' && // Ensure universityId is not an empty string
  //   destination !== '' // Ensure destination is not an empty string
  // ) {
  //   console.log('working');

  //   router.push(
  //     `/dashboard/${userInfodata?.data?.role}/university-management/${destination}/${universityId}/course/${course_choice}`
  //   );
  //   Cookies.remove('course_choice');
  //   Cookies.remove('universityId');
  //   return;
  // } else {
  //   console.error(
  //     'Missing data: Check if course_choice, universityId, or destination is null, undefined, or empty'
  //   );
  // }

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
                          studentsImageAndNameHeaderDataInAgentDashboard,
                          ...studentsHeaders,
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
