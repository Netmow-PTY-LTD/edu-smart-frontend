import Layout from '@/components/layout';
import PasswordSettings from '@/components/sAdminDashboard/Settings/PasswordSettings';
import React from 'react';

export default function AgentPasswordSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <PasswordSettings />
        </div>
      </div>
    </Layout>
  );
}
