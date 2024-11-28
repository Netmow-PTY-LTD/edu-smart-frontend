import DashBoardCountOptions from '@/components/common/allDashboardHome/DashBoardCountOptions';
import LatestRegisteredPlayer from '@/components/common/allDashboardHome/LatestRegisteredPlayer';
import LatestTeams from '@/components/common/allDashboardHome/LatestTeams';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/auth/login';
    }
  }, []);

  if (!isAuthenticated) {
    return <LoaderSpiner />;
  }

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
