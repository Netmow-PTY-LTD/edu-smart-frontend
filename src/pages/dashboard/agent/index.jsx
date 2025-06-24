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
import { Button, ButtonGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import DashBoardCardApplication from '@/components/common/allDashboardHome/DashBoardCardApplication';

// import ProtectedRoute from '@/components/protectedRoutes';

const AgentDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: userInfodata } = useGetUserInfoQuery();
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFilterCard, setShowFilterCard] = useState(false);

  const {
    data: applicationData,
    isLoading: applicationLoading,
    refetch: applicationDataRefetch,
  } = useGetRecentApplicationsQuery();

  const filteredApplications = applicationData?.data?.filter((item) => {
    const itemDate = dayjs(item?.createdAt);

    const isAfterStart = startDate
      ? itemDate.isAfter(dayjs(startDate).startOf('day'))
      : true;
    const isBeforeEnd = endDate
      ? itemDate.isBefore(dayjs(endDate).endOf('day'))
      : true;

    return isAfterStart && isBeforeEnd;
  });

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetApplicationPaymentReportQuery();

  const thisAgentPaymentDataByReport = getApplicationPaymentData?.data?.filter(
    (item) => item?.student?.agent === userInfodata?.data?._id
  );

  const filteredPayments = thisAgentPaymentDataByReport?.filter((item) => {
    const itemDate = dayjs(item?.createdAt);

    const isAfterStart = startDate
      ? itemDate.isAfter(dayjs(startDate).startOf('day'))
      : true;
    const isBeforeEnd = endDate
      ? itemDate.isBefore(dayjs(endDate).endOf('day'))
      : true;
    return isAfterStart && isBeforeEnd;
  });

  const totalAgentEarning = filteredPayments?.reduce(
    (total, item) => total + (item.agent_payout_amount || 0),
    0
  );

  const totalAgentIncentive = filteredPayments?.reduce(
    (total, item) => total + (item.agent_commission || 0),
    0
  );

  const totalAgentHotCommission = filteredPayments?.reduce(
    (total, item) => total + (item.agent_commision_by_hot_offer || 0),
    0
  );

  console.log('AgentID', userInfodata?.data?._id);
  console.log('applicationData', applicationData);
  console.log('filteredApplications', filteredApplications);
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

  // if (userInfodata?.data?.package_choice) {
  //   router.push('/dashboard/agent/upgrade');
  //   return;
  // }

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
      <div className="page-content agent-dashboard-wrapper">
        <div className="container-fluid">
          {allStudentForAgentIsLoading || earningLoading ? (
            <LoaderSpiner />
          ) : (
            <>
              <Row className="align-items-center mb-4">
                <Col md={6}>
                  <WelcomingMessage data={userInfodata?.data} />
                </Col>

                <Col md={6}>
                  <div className="d-flex justify-content-end">
                    <button
                      className="button p-3 cursor-pointer"
                      onClick={() => setShowFilterCard((prev) => !prev)}
                    >
                      {showFilterCard ? 'Hide Filter' : 'Filter Card'}
                    </button>
                  </div>
                </Col>
              </Row>
              <Row className='justify-content-end'>
                {showFilterCard && (
                  <>
                    <Col md={3} className='d-flex align-items-center justify-content-end gap-1'>
                      <label className="form-label fs-2 pe-2 mb-0">From:</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control big-datepicker"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Start Date"
                      />
                    </Col>

                    <Col md={3} className='d-flex align-items-center justify-content-end gap-1'>
                      <label className="form-label fs-2 pe-2 mb-0">End:</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control big-datepicker"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select End Date"
                        minDate={startDate}
                        disabled={!startDate} // ⛔ Disabled until startDate is selected
                      />
                    </Col>
                  </>
                )}
              </Row>
              
              <Row className="pb-5">
                <h1 className="p-3">Applications Overview</h1>
                <Col xs={12} className="mb-4">
                  <DashBoardCardApplication />
                </Col>
              </Row>
              <Row className="pb-5">
                <h1 className='p-3'>Financial Overview </h1>
                <AgentDashBoardCountOptions
                  userInfoData={userInfodata?.data}
                  firstElementData={filteredApplications?.length}
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
