import Layout from '@/components/layout';
import EmailSettings from '@/components/sAdminDashboard/Settings/EmailSettings';
import React from 'react';

export default function AgentEmailSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <EmailSettings />
        </div>
      </div>
    </Layout>
  );
}
