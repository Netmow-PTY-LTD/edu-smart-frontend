import Layout from '@/components/layout';
import BusinessSettings from '@/components/sAdminDashboard/Settings/BusinessSettings';
import React from 'react';

export default function SuperAdminBusinessSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <BusinessSettings />
        </div>
      </div>
    </Layout>
  );
}
