import Layout from '@/components/layout';
import EmailSettings from '@/components/sAdminDashboard/Settings/EmailSettings';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function AgentEmailSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <EmailSettings />
        </div>
      </div>
    </Layout>
  );
}
