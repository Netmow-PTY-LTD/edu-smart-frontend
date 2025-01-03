import Layout from '@/components/layout';
import PasswordSettings from '@/components/sAdminDashboard/Settings/PasswordSettings';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function StudentPasswordSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <PasswordSettings />
        </div>
      </div>
    </Layout>
  );
}
