import Layout from '@/components/layout';
import DomainDnsSettings from '@/components/sAdminDashboard/Settings/DomainDNSManagement/DomainDnsSettings';
import React from 'react';

export default function SuperAdminDomainSttings() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <DomainDnsSettings />
        </div>
      </div>
    </Layout>
  );
}
