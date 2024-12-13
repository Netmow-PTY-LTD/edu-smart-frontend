import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import {
  studentAndLogoData,
  universityHeadersWithoutAction,
} from '@/utils/common/data';

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const StudentDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allRegisteredUniversitydata, setAllRegisteredUniversitydata] =
    useState('');
  const { data: userInfodata } = useGetUserInfoQuery();
  const { data: universityData } = useGetAllUniversityQuery();

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
      studentAndLogoData,
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

                <Row xxl={12} className="g-5">
                  <Col xxl={12}>
                    <LatestRegistered
                      tableHead={'All Registered University'}
                      headers={allRegisteredUniversitydata}
                      data={universityData?.data ? universityData?.data : []}
                    />
                  </Col>
                  <Col xxl={6}>
                    <LatestRegistered
                      tableHead={'My Applied Universities'}
                      // headers={}
                      // data={}
                    />
                  </Col>
                  <Col xxl={6}>
                    <LatestRegistered
                      tableHead={'Document Upload Request'}
                      // headers={}
                      // data={}
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
export default StudentDashboard;
