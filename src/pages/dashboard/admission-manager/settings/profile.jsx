import Layout from '@/components/layout';
import UserProfile from '@/components/sAdminDashboard/Settings/UserProfile';
import React from 'react';

export default function SuperAdminProfileSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <UserProfile />
        </div>
      </div>
    </Layout>
  );
}
