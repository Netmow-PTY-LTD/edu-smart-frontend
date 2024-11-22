import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const UniversityProfileOverview = ({
  data,
  seasonalGamesNumber,
  specialEventsNUmber,
  invoicesNumber,
  headers,
}) => {
  return (
    <>
      <Row className="grid g-5">
        <Col xxl={3}>
          <AllOverviewInfoCard data={data} />
        </Col>
        <Col xl={9} className=''>
          <Row className="g-5">
            <Col xl={6}>
              <div>
                <Card>
                  <CardHeader></CardHeader>
                  <CardBody>
                    <CommonTableComponent
                      headers={headers}
                      emptyMessage="No Data found yet."
                    />
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col xl={6}>
              <div>
                <Card>
                  <CardHeader></CardHeader>
                  <CardBody>
                    <CommonTableComponent
                      headers={headers}
                      emptyMessage="No Data found yet."
                    />
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
          <Row className='g-5'>
            <Col xl={6}>
              <div>
                <Card>
                  <CardHeader></CardHeader>
                  <CardBody>
                    <CommonTableComponent
                      headers={headers}
                      emptyMessage="No Data found yet."
                    />
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col xl={6}>
              <div>
                <Card>
                  <CardHeader></CardHeader>
                  <CardBody>
                    <CommonTableComponent
                      headers={headers}
                      emptyMessage="No Data found yet."
                    />
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UniversityProfileOverview;
