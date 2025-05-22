import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAgentYearlyBonusQuery } from '@/slice/services/agent/agentEarningsService';

import DataObjectComponent from '@/utils/common/data';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const AgentApplicationList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);
  const { data: yearlyBonous, isLoading: yearlyBonousLoading } =
    useGetAgentYearlyBonusQuery();
  const singleUserYearlyBonous =
    yearlyBonous?.data?.find((item) => item._id === router?.query?.id)
      ?.applications || [];

  const { studentApplicationsHeaders = [] } = DataObjectComponent();

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {yearlyBonousLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Partner Application Data
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[...studentApplicationsHeaders]}
                          data={singleUserYearlyBonous}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={10}
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
};

export default AgentApplicationList;
