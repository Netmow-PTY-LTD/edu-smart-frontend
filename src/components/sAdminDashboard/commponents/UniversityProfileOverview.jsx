import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import CountableCard from '@/components/common/alldashboardCommon/CountableCard';
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
    <Row className="grid g-5 ">
      <Col xxl={3}>
        <AllOverviewInfoCard data={data} />
      </Col>
      <Col xl={9}>
        <CountableCard
          data={data}
          userInfoData={'userInfoData'}
          seasonalGamesNumber={seasonalGamesNumber}
          specialEventsNUmber={specialEventsNUmber}
          invoicesNumber={invoicesNumber}
        />

        <div className="mt-5">
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              {/* {userInfoData?.role === 'admin' ? ( */}
              <CommonTableComponent
                headers={headers}
                emptyMessage="No Data found yet."
              />
              {/* ) : (
          ''
        )} */}
            </CardBody>
          </Card>
        </div>
        <Row xxl={12} className="g-5">
          <Col xxl={12}>{'userInfoData'?.role === 'player' ? '' : ''}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default UniversityProfileOverview;
