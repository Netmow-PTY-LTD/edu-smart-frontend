import CommonTableComponent from '@/components/common/CommonTableComponent';
import Layout from '@/components/layout';
import { useGetApplicationsQuery } from '@/slice/services/common/applicationService';
import {
  agentEarnigsHeaders,
  studentApplicationsHeaders,
} from '@/utils/common/data';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

export default function StudentApplications() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const perPageData = 9;

  const { data: applicationData, isLoading: applicationLoading } =
    useGetApplicationsQuery();

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <div className="container-fluid">
            <div>
              <Row>
                <Col xl={12}>
                  <Card>
                    <CardHeader className="text-primary fw-semibold fs-2">
                      Student's University Applications
                    </CardHeader>
                    <CardBody className="mh-100">
                      <CommonTableComponent
                        headers={[...studentApplicationsHeaders]}
                        data={applicationData?.data || []}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        perPageData={perPageData}
                        emptyMessage="No Data found yet."
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
