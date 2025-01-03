import Layout from '@/components/layout';
import PaymentSettings from '@/components/sAdminDashboard/Settings/PaymentBox/PaymentSettings';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function SuperAdminPaymentSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <PaymentSettings />
        </div>
      </div>
    </Layout>
  );
}
