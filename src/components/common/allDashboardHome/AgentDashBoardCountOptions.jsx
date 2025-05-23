import Link from 'next/link';
import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody, Col, Row } from 'reactstrap';

const AgentDashBoardCountOptions = ({
  firstElementData,
  secondElementData,
  thirdElementData,
  fourthElementData,
  userInfoData,
  fithElement,
  sixthElement,
  sevenElement,
  eightElement,
}) => {
  const accountantWidgetsData = [
    {
      id: 1,
      label: 'Total File',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-3-fill',
      link: 'Application',
      decimals: '0',
      pathName: `/dashboard/${userInfoData?.role?.split('_')?.join('-')}/applications`,
    },
    {
      id: 2,
      label: 'Total Earning',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-3-fill',
      link: ['Paid Earnings', 'Unpaid Earnings'], // ✅ Array of labels
      pathName: [
        `/dashboard/${userInfoData?.role?.split('_')?.join('-')}/total-paid-amount`,
        `/dashboard/${userInfoData?.role?.split('_')?.join('-')}/total-pending-amount`,
      ], // ✅ Array of paths
      decimals: '2',
    },

    {
      id: 3,
      label: 'Total Incentive',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-3-fill',
      link: 'Report',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.role?.split('_')?.join('-')}/payment-report/application-payment`,
    },
    {
      id: 4,
      label: 'Total Hot Commission',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-3-fill',
      link: 'Report',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.role?.split('_')?.join('-')}/payment-report/application-payment`,
    },
  ];

  const valueById = {
    1: firstElementData,
    2: secondElementData,
    3: thirdElementData,
    4: fourthElementData,
    5: fithElement,
    6: sixthElement,
    7: sevenElement,
    8: eightElement,
  };

  return (
    <Col id="countcart" md={12}>
      <Row className="grid g-5">
        {(userInfoData?.role === 'agent' ? accountantWidgetsData : []).map(
          (item) => (
            <Col xl={3} md={6} key={item.id}>
              <Card className="card-animate p-4">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="fs-2 text-uppercase fw-medium text-black text-truncate mb-0">
                        {item.label}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-18 fw-semibold ff-secondary my-3 text-black">
                        <CountUp
                          start={0}
                          prefix={item.prefix}
                          suffix={item.suffix}
                          end={valueById[item.id] || 0}
                          decimals={item.decimals}
                          duration={4}
                        />
                      </h4>
                      {/* <Link
                        href={item?.pathName || ''}
                        className="text-decoration-underline text-black"
                      >
                        {item.link}
                      </Link> */}
                      {Array.isArray(item?.link) &&
                      Array.isArray(item?.pathName) ? (
                        <div className="d-flex gap-2 flex-wrap">
                          {item.link.map((label, index) => (
                            <span key={index}>
                              <Link
                                href={item.pathName[index]}
                                className="text-decoration-underline text-black"
                              >
                                {label}
                              </Link>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <Link
                          href={item?.pathName}
                          className="text-decoration-underline text-black"
                        >
                          {item?.link}
                        </Link>
                      )}
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span style={{ fontSize: 35 }}>
                        <i className={`${item.icon} third-color`}></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Col>
  );
};

export default AgentDashBoardCountOptions;
