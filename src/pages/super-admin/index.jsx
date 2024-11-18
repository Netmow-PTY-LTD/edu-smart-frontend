import DashBoardCountOptions from '@/components/common/allDashboardHome/DashBoardCountOptions';
import LatestRegisteredPlayer from '@/components/common/allDashboardHome/LatestRegisteredPlayer';
import LatestTeams from '@/components/common/allDashboardHome/LatestTeams';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import Layout from '@/components/layout';
import React from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AdminDashboard = () => {

  // useEffect(() => {
  //   if (router?.query?.token) {
  //     localStorage.setItem('token', router.query.token);
  //   }
  //   if (localStorage.getItem('token') && router.query.token) {
  //     window?.location?.assign(
  //       window?.location?.origin + window?.location?.pathname
  //     );
  //   }
  // }, [router?.query?.token]);

  return (
    <Layout>
      <div className="page-content">
        <div className="px-4 mb-4 container-fluid">
          <Row>
            <Col>
              <div className="h-100">
                <WelcomingMessage data={''} />
                <Row>
                  <DashBoardCountOptions
                    userInfoData={{ role: 'super-admin' }}
                    firstElementData={''}
                    secondElementData={''}
                    thirdElementData={''}
                    gstAndCurrencyData={''}
                    fourthElementData={''}
                    paidSum={''}
                    unPaidSum={''}
                  />
                </Row>
                {/* <Revenue /> */}
                <Row id="quickdatatable" xxl={12} className="grid g-5">
                  <Col xxl={6}>
                    <LatestRegisteredPlayer userInfoData={''} data={''} />
                  </Col>

                  <LatestTeams />
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
export default AdminDashboard;
