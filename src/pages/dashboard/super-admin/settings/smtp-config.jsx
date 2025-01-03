import Layout from '@/components/layout';
import SMTPSettings from '@/components/sAdminDashboard/Settings/SMTPSettings';
import React from 'react';

export default function SuperAdminEmailConfig() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <SMTPSettings />
        </div>
      </div>
    </Layout>
  );
}
