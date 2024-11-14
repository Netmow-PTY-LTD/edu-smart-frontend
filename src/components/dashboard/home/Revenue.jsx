/* eslint-disable no-unused-vars */
import { getRevenueChartsData } from '@/slices/thunks';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { createSelector } from 'reselect';
import { RevenueCharts } from './DashboardEcommerceCharts';

const Revenue = () => {
  const dispatch = useDispatch();

  const [chartData, setchartData] = useState([]);

  // const selectDashboardData = createSelector(
  //   (state) => state.DashboardEcommerce?.revenueData,
  //   (revenueData) => revenueData
  // );
  // // Inside your component
  // const revenueData = useSelector(selectDashboardData);

  // useEffect(() => {
  //   setchartData(revenueData);
  // }, [revenueData]);

  // const onChangeChartPeriod = (pType) => {
  //   dispatch(getRevenueChartsData(pType));
  // };

  // useEffect(() => {
  //   dispatch(getRevenueChartsData('all'));
  // }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader className="border-0 align-items-center  d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Revenue</h4>
          <div className="d-flex gap-1">
            <button
              type="button"
              className="btn btn-soft-secondary btn-sm"
              onClick={() => {
                // onChangeChartPeriod('all');
              }}
            >
              ALL
            </button>
            <button
              type="button"
              className="btn btn-soft-secondary btn-sm"
              onClick={() => {
                // onChangeChartPeriod('month');
              }}
            >
              1M
            </button>
            <button
              type="button"
              className="btn btn-soft-secondary btn-sm"
              onClick={() => {
                // onChangeChartPeriod('halfyear');
              }}
            >
              6M
            </button>
            <button
              type="button"
              className="btn btn-soft-primary btn-sm"
              onClick={() => {
                // onChangeChartPeriod('year');
              }}
            >
              1Y
            </button>
          </div>
        </CardHeader>

        <CardHeader className="p-4 border-0 bg-light-subtle ">
          <Row className="g-0 text-center">
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1 fs-14">
                  <CountUp start={0} end={7585} duration={3} separator="," />
                </h5>
                <p className="fs-2 text-muted mb-0">Orders</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1 fs-14">
                  <CountUp
                    suffix="k"
                    prefix="$"
                    start={0}
                    decimals={2}
                    end={22.89}
                    duration={3}
                  />
                </h5>
                <p className="fs-2 text-muted mb-0">Earnings</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1 fs-14">
                  <CountUp start={0} end={367} duration={3} />
                </h5>
                <p className="fs-2 text-muted mb-0">Refunds</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0 border-end-0">
                <h5 className="mb-1 fs-14 qoute_color">
                  <CountUp
                    start={0}
                    end={18.92}
                    decimals={2}
                    duration={3}
                    suffix="%"
                  />
                </h5>
                <p className="fs-2 text-muted mb-0">Conversation Ratio</p>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody className=" pb-2">
          <div className="w-100">
            <div dir="ltr">
              {typeof window !== 'undefined' && (
                <RevenueCharts
                  series={[
                    {
                      name: 'series-1',
                      data: [30, 40, 45, 50, 49, 60, 70, 91],
                    },
                  ]}
                  dataColors='["--vz-light",  "--vz-primary", "--vz-secondary"]'
                />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Revenue;
