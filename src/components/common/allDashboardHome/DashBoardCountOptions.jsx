import DataObjectComponent from '@/utils/common/data';
import Link from 'next/link';
import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody, Col, Row } from 'reactstrap';

const DashBoardCountOptions = ({
  firstElementData,
  secondElementData,
  thirdElementData,
  fourthElementData,
  userInfoData,
  fithElement,
  sixthElement,
  sevenElement,
  eightElement,
  gstAndCurrencyData,
  paidSum,
  unPaidSum,
  allEarningManagementCommonData,
}) => {
  const {
    supperAdminWidgetsData,
    agentProfileWidgetData,
    admissionManagerWidgetsData,
    accountantWidgetsData,
  } = DataObjectComponent();

  return (
    <>
      <Col id="countcart" md={12}>
        <Row className="grid g-5">
          {(userInfoData?.role === 'super_admin'
            ? supperAdminWidgetsData
            : userInfoData?.role === 'agent_profile'
              ? agentProfileWidgetData
              : userInfoData?.role === 'admission_manager'
                ? admissionManagerWidgetsData
                : userInfoData?.role === 'accountant'
                  ? accountantWidgetsData
                  : []
          )?.map((item, key) => (
            <Col xl={3} md={6} key={key} className="">
              <Card className="card-animate p-4">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="fs-2 text-uppercase fw-medium text-black text-truncate mb-0 ">
                        {item?.label}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-18 fw-semibold ff-secondary my-3 text-black">
                          <span className="counter-value">
                          {item?.id === 1 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={firstElementData}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.id === 2 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={secondElementData}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.id === 3 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={thirdElementData}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}

                          {item?.id === 4 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={fourthElementData}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.id === 5 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={fithElement}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.id === 6 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={sixthElement}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.id === 7 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={sevenElement}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.id === 8 ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={eightElement}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                        </span>
                      </h4>
                      <Link
                        href={item?.pathName ? item?.pathName : ''}
                        className="text-decoration-underline text-black"
                      >
                        {item?.link}
                      </Link>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span
                        style={{
                          fontSize: 35,
                        }}
                      >
                        <i className={`${item?.icon} third-color`}></i>
                      </span>
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

export default DashBoardCountOptions;
