import AgentDashBoardCountOptions from '@/components/common/allDashboardHome/AgentDashBoardCountOptions';
import DashBoardCountOptions from '@/components/common/allDashboardHome/DashBoardCountOptions';
import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import HotOfferBanner from '@/components/common/HotOfferBanner';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetEarningsQuery } from '@/slice/services/agent/agentEarningsService';
import { useAllStudentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import {
  useGetApplicationsQuery,
  useGetRecentApplicationsQuery,
} from '@/slice/services/common/applicationService';
import { useGetApplicationPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllHotOfferQuery } from '@/slice/services/public/package/publicPackageService';
import DataObjectComponent from '@/utils/common/data';
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
    data: applicationData,
    isLoading: applicationLoading,
    refetch: applicationDataRefetch,
  } = useGetRecentApplicationsQuery();

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetApplicationPaymentReportQuery();

  const thisAgentPaymentDataByReport = getApplicationPaymentData?.data?.filter(
    (item) => item?.student?.agent === userInfodata?.data?._id
  );

  const totalAgentEarning = thisAgentPaymentDataByReport?.reduce(
    (total, item) => total + (item.agent_payout_amount || 0),
    0
  );

  const totalAgentIncentive = thisAgentPaymentDataByReport?.reduce(
    (total, item) => total + (item.agent_commission || 0),
    0
  );

  const totalAgentHotCommission = thisAgentPaymentDataByReport?.reduce(
    (total, item) => total + (item.agent_commision_by_hot_offer || 0),
    0
  );

  console.log('AgentID', userInfodata?.data?._id);
  console.log('applicationData', applicationData);
  console.log('getApplicationPaymentData', getApplicationPaymentData);
  console.log('thisAgentPaymentDataByReport', thisAgentPaymentDataByReport);
  console.log('totalAgentEarning', totalAgentEarning);
  console.log('totalAgentIncentive', totalAgentIncentive);
  console.log('totalAgentHotCommission', totalAgentHotCommission);

  const {
    studentsImageAndNameHeaderDataInAgentDashboard,
    agentEarnigsHeaders = [],
    studentsHeaders = [],
  } = DataObjectComponent();

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

  if (userInfodata?.data?.package_choice) {
    router.push('/dashboard/agent/upgrade');
    return;
  }

  const course_choice = Cookies.get('course_choice');
  const universityId = Cookies.get('universityId');

  let destination;

  if (userInfodata?.data?.role === 'student') {
    destination = 'single-university-profile';
  }

  if (userInfodata?.data?.role === 'agent') {
    destination = 'single-university-profile-for-agent';
  }

  if (course_choice && universityId && destination) {
    router.push(
      `/dashboard/${userInfodata?.data?.role}/university-management/${destination}/${universityId}/course/${course_choice}`
    );
    Cookies.remove('course_choice');
    Cookies.remove('universityId');
    return;
  }

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          {allStudentForAgentIsLoading || earningLoading ? (
            <LoaderSpiner />
          ) : (
            <>
              <Row className="pb-5">
                <AgentDashBoardCountOptions
                  userInfoData={userInfodata?.data}
                  firstElementData={applicationData?.data?.length}
                  secondElementData={totalAgentEarning}
                  thirdElementData={totalAgentIncentive}
                  fourthElementData={totalAgentHotCommission}
                  // fithElement={totalIncome?.data?.totalUniversityPayout?.toFixed(
                  //   2
                  // )}
                  // sixthElement={totalIncome?.data?.totalPaidAgentPayout?.toFixed(
                  //   2
                  // )}
                  // sevenElement={totalIncome?.data?.totalPendingAgentPayout?.toFixed(
                  //   2
                  // )}
                  // eightElement={totalIncome?.data?.totalSuperAdminProfit?.toFixed(
                  //   2
                  // )}
                  gstAndCurrencyData={''}
                  paidSum={''}
                  unPaidSum={''}
                />
              </Row>

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
                      {/* <Col xl={12}>
                      <LatestRegistered
                        tableHead={'Agents Earnings'}
                        headers={[...agentEarnigsHeaders]}
                        data={earningData?.data || []}
                      />
                    </Col> */}
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default AgentDashboard;
