import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import { useGetDocumentRequestForStudentQuery } from '@/slice/services/student/studentSubmitDocumentService';
import {
  studentAndLogoData,
  universityHeadersWithoutAction,
} from '@/utils/common/data';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const StudentDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allRegisteredUniversitydata, setAllRegisteredUniversitydata] =
    useState('');
  const router = useRouter();
  const { data: userInfodata, isLoading: userInfoIsLoading } =
    useGetUserInfoQuery();
  const { data: universityData, isLoading: universityIsLoading } =
    useGetAllUniversityQuery();
  const {
    data: getDocumentRequestForStudentData,
    isLoading: getDocumentRequestForStudentIsLoading,
    refetch: getDocumentRequestForStudentRefetch,
  } = useGetDocumentRequestForStudentQuery();

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
      ...universityHeadersWithoutAction.slice(0, -1),
    ]);
  }, []);

  useEffect(() => {
    const course_choice = Cookies.get('course_choice');
    const universityId = Cookies.get('universityId');

    if (course_choice && universityId) {
      router.push(
        `/dashboard/student/university-management/single-university-profile/${universityId}/course/${course_choice}`
      );
      Cookies.remove('course_choice');
      Cookies.remove('universityId');
    }
  }, [router]);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          {universityIsLoading ||
          userInfoIsLoading ||
          getDocumentRequestForStudentIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Row>
              <Col>
                <div className="h-100">
                  <WelcomingMessage data={userInfodata?.data} />

                  <Row xxl={12} className="g-5">
                    <Col xxl={12}>
                      <LatestRegistered
                        tableHead={'Recent University'}
                        headers={allRegisteredUniversitydata}
                        data={universityData?.data ? universityData?.data : []}
                      />
                    </Col>
                    {/* <Col xxl={6}>
                      <LatestRegistered
                        tableHead={'My Applied Universities'}
                        // headers={}
                        // data={}
                      />
                    </Col> */}
                    {/* <Col xxl={12}>
                      <LatestRegistered
                        tableHead={'Document Upload Request'}
                        headers={studentSubmittedDocumentsHeaderWithoutAction}
                        data={getDocumentRequestForStudentData?.data}
                      />
                    </Col> */}
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
export default StudentDashboard;
