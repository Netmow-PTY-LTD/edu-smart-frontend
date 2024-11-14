import { teamProfileData } from '@/utils/common/data/dashboardEcommerce';
import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody, Col, Row } from 'reactstrap';

const TeamProfileCountUpCard = ({
  mainData,
  gameSchedulesNumber,
  trainingSchedulesNumber,
  sponsorsNumber,
}) => {
  return (
    <>
      <Row className="grid g-5">
        {(teamProfileData || [])?.map((item, key) => (
          <Col xl={3} md={6} key={key} className="">
            <Card className="card-animate p-2">
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                      {item.label}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between">
                  <div className="avatar-sm flex-shrink-0 mb-5">
                    <span
                      className={
                        'avatar-title  rounded p-5 bg-' +
                        item.bgcolor +
                        '-subtle'
                      }
                    >
                      <i className={` text-${item.bgcolor} ${item.icon}`}></i>
                    </span>
                  </div>
                  <div>
                    <h4 className="fs-18 fw-semibold ff-secondary my-4 p-2">
                      {item?.label === 'TOTAL PLAYER' ? (
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            separator={item.separator}
                            end={mainData?.total_player}
                            decimals={item.decimals}
                            duration={4}
                          />
                        </span>
                      ) : item?.label === 'game schedule' ? (
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            separator={item.separator}
                            end={gameSchedulesNumber}
                            decimals={item.decimals}
                            duration={4}
                          />
                        </span>
                      ) : item?.label === 'training schedule' ? (
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            separator={item.separator}
                            end={trainingSchedulesNumber}
                            decimals={item.decimals}
                            duration={4}
                          />
                        </span>
                      ) : (
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            separator={item.separator}
                            end={sponsorsNumber}
                            decimals={item.decimals}
                            duration={4}
                          />
                        </span>
                      )}
                    </h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TeamProfileCountUpCard;
