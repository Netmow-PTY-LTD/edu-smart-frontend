import CommonTableComponent from '@/components/common/CommonTableComponent';
import Layout from '@/components/layout';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllDocumentForAgentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const perPageData = 10;

  
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <Card>
              <CardHeader>
                <h3 className="">All Document</h3>
              </CardHeader>
              <CardBody>
                <CommonTableComponent emptyMessage="No Data found yet." />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllDocumentForAgentDashboard;
