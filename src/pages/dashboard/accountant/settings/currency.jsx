import Layout from '@/components/layout';
import CurrencySettings from '@/components/sAdminDashboard/Settings/CurrencySettings';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function CurrencySettingsForAccountantDashboard() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <CurrencySettings />
        </div>
      </div>
    </Layout>
  );
}
