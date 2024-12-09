import Layout from '@/components/layout';
import AllDepartmentForSuperAdmin from '@/components/sAdminDashboard/commponents/AllDepartmentForSuperAdmin';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import React from 'react';

const UniveresityDepartmentPage = () => {
  const { data: userInfodata } = useGetUserInfoQuery();

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <AllDepartmentForSuperAdmin university_id={userInfodata?.data?._id} />
        </div>
      </div>
    </Layout>
  );
};

export default UniveresityDepartmentPage;
