import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllCourseCategoriesQuery } from '@/slice/services/super admin/courseCategoriesService';
import { useGetCourseQuery } from '@/slice/services/super admin/courseService';
import { useGetDepartmentQuery } from '@/slice/services/super admin/departmentService';
import DataObjectComponent from '@/utils/common/data';

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const UniversityAdministratorDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const { data: userInfodata } = useGetUserInfoQuery();
  const perPageData = 10;

  const { departmentHeaders, categoryHeaders, courseHeaders } =
    DataObjectComponent();

  const {
    data: getDepartmentData,
    error: getDepartmentError,
    isLoading: getDepartmentIsLoading,
    refetch: getDepartmentRefetch,
  } = useGetDepartmentQuery(userInfodata?.data?._id, {
    skip: !userInfodata?.data?._id,
  });

  const {
    data: getAllCategoriesData,
    error: getAllCategoriesError,
    isLoading: getAllCategoriesIsLoading,
    refetch: getAllCategoriesRefetch,
  } = useGetAllCourseCategoriesQuery(userInfodata?.data?._id, {
    skip: !userInfodata?.data?._id,
  });

  const {
    data: getCourseData,
    error: getCourseError,
    isLoading: getCourseIsLoading,
    refetch: getCourseRefetch,
  } = useGetCourseQuery(userInfodata?.data?._id, {
    skip: !userInfodata?.data?._id,
  });

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/auth/login';
    }
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="h-100">
                <WelcomingMessage data={userInfodata?.data} />
                <Row></Row>

                <Row xxl={12} className="g-5">
                  <Col xxl={12}>
                    <Card>
                      <CardHeader>Latest Departments</CardHeader>
                      <CardBody>
                        <CommonTableComponent
                          headers={departmentHeaders}
                          data={
                            getDepartmentData?.data
                              ? getDepartmentData?.data
                              : []
                          }
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          emptyMessage="No Data found yet."
                        />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xxl={6}>
                    <Card>
                      <CardHeader>Latest Programs</CardHeader>
                      <CardBody>
                        <CommonTableComponent
                          headers={categoryHeaders}
                          data={
                            getAllCategoriesData?.data
                              ? getAllCategoriesData?.data
                              : []
                          }
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          emptyMessage="No Data found yet."
                        />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xxl={6}>
                    <Card>
                      <CardHeader>Latest Courses</CardHeader>
                      <CardBody>
                        <CommonTableComponent
                          headers={courseHeaders}
                          data={getCourseData?.data ? getCourseData?.data : []}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          emptyMessage="No Data found yet."
                        />
                      </CardBody>
                    </Card>
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
export default UniversityAdministratorDashboard;
