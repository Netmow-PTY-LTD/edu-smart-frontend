import Layout from '@/components/layout';
import PaymentSettings from '@/components/sAdminDashboard/Settings/PaymentBox/PaymentSettings';
import React from 'react';

export default function AgentPaymentSettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <PaymentSettings />
        </div>
      </div>
    </Layout>
  );
}
