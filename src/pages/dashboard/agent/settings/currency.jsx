import Layout from '@/components/layout';
import CurrencySettings from '@/components/sAdminDashboard/Settings/CurrencySettings';
import React from 'react';

export default function AgentCurrencySettings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <CurrencySettings />
        </div>
      </div>
    </Layout>
  );
}
