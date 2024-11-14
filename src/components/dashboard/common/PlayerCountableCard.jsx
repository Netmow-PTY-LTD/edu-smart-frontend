import { playerProfileData } from '@/utils/common/data/dashboardEcommerce';
import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody, Col, Row } from 'reactstrap';

const PlayerCountableCard = ({
  data,
  userInfoData,
  seasonalGamesNumber,
  specialEventsNUmber,
  invoicesNumber,
}) => {
  return (
    <>
      <Col>
        <Row className="grid g-5">
          {(userInfoData?.role === 'admin'
            ? playerProfileData
            : userInfoData?.role === 'guardian'
              ? playerProfileData
              : userInfoData?.role === 'player'
                ? playerProfileData
                : []
          ).map((item, key) => (
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
                        {item?.label === 'Total Team' ? (
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              prefix={item.prefix}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={data?.team?.length}
                              decimals={item.decimals}
                              duration={4}
                            />
                          </span>
                        ) : item?.label === 'Seasonal GAMEs' ? (
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              prefix={item.prefix}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={seasonalGamesNumber}
                              decimals={item.decimals}
                              duration={4}
                            />
                          </span>
                        ) : item?.label === 'Special Events' ? (
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              prefix={item.prefix}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={specialEventsNUmber}
                              decimals={item.decimals}
                              duration={4}
                            />
                          </span>
                        ) : item?.label === 'TOTAL Invoices' ? (
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              prefix={item.prefix}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={invoicesNumber}
                              decimals={item.decimals}
                              duration={4}
                            />
                          </span>
                        ) : (
                          ''
                        )}
                      </h4>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};

export default PlayerCountableCard;
