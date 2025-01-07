import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import React from 'react';

const UpgradePackageInAgentdashboard = () => {
  const { data: userInfodata } = useGetUserInfoQuery();

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <div className="sqdk-pricing-table my-5 gap-5">
              <SinglePackageComponent />
              <SinglePackageComponent />
              <SinglePackageComponent />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpgradePackageInAgentdashboard;
