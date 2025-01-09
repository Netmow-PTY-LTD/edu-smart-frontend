import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetEarningsQuery } from '@/slice/services/agent/agentEarningsService';
import { agentEarnigsHeaders } from '@/utils/common/data';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

export default function Earnings() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  const { data: earningData, isLoading: earningLoading } =
    useGetEarningsQuery();

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {earningLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Agent's Earnings
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[...agentEarnigsHeaders]}
                          data={earningData?.data || []}
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
          )}
        </div>
      </div>
    </Layout>
  );
}
