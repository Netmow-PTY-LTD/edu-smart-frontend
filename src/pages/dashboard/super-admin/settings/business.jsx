import Layout from '@/components/layout';
import BusinessSettings from '@/components/sAdminDashboard/Settings/BusinessSettings';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function SuperAdminBusinessSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <BusinessSettings />
        </div>
      </div>
    </Layout>
  );
}
