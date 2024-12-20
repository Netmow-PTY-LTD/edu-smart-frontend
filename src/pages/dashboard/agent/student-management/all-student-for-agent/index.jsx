import CommonTableComponent from '@/components/common/CommonTableComponent';
import Layout from '@/components/layout';
import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllStudentsForAgent = () => {
  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card>
            <CardHeader>
              <h3>All Students</h3>
            </CardHeader>
            <CardBody>
              <CommonTableComponent emptyMessage="No Data found yet." />
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AllStudentsForAgent;
