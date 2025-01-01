import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllStudentQuery } from '@/slice/services/public/student/publicStudentService';
import { studentsHeadersWithLogoLink } from '@/utils/common/data';

import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AllStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allStudentsData, isLoading: allStudentsIsLoading } =
    useGetAllStudentQuery();

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          {allStudentsIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Row>
              <Col>
                <div className="h-100">
                  <LatestRegistered
                    tableHead={'Latest Registered Students'}
                    headers={studentsHeadersWithLogoLink}
                    data={allStudentsData?.data ? allStudentsData?.data : []}
                  />
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
export default AllStudentsPage;
