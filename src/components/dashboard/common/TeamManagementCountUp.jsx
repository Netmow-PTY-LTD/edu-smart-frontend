import { getTotalTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import { getAllPlayer } from '@/slices/dashboard/adminDashboard/Actions/playerActions';
import { teamManagementWidgets } from '@/utils/common/data/dashboardEcommerce';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';

const TeamManagementCountUp = () => {
  const dispatch = useDispatch();
  const [activePlayers, setActivePlayers] = useState(0);
  const [inActivePlayers, setInActivePlayers] = useState(0);

  const {
    data: totalPlayerData,
    isLoading: totalPlayerIsLoading,
    error: totalPlayerError,
  } = useSelector((state) => state.AdminDashboard.player);

  useEffect(() => {
    dispatch(getAllPlayer());
  }, [dispatch]);

  const {
    data: totalTeamData,
    isLoading: totalTeamIsLoading,
    error: totalTeamError,
  } = useSelector((state) => state.AdminDashboard.totalTeam);

  useEffect(() => {
    dispatch(getTotalTeam());
  }, [dispatch]);

  useEffect(() => {
    const active =
      totalPlayerData?.length > 0 &&
      totalPlayerData.filter((pl) => pl?.payment_status === 'paid');
    const inactive =
      totalPlayerData?.length > 0 &&
      totalPlayerData.filter((pl) => pl?.payment_status === 'unpaid');
    setActivePlayers(active);
    setInActivePlayers(inactive);
  }, [totalPlayerData]);

  return (
    <>
      <Col md={12}>
        <Row className="grid g-5">
          {teamManagementWidgets?.map((item, key) => (
            <Col xl={3} md={6} key={key} className="">
              <Card className="card-animate p-4">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium fs-3 text-muted text-truncate mb-0 ">
                        {item?.label}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between">
                    <div className="avatar-sm flex-shrink-0 mb-5 my-3">
                      <span
                        className={
                          'avatar-title rounded p-5 bg-' +
                          item?.bgcolor +
                          '-subtle'
                        }
                      >
                        <i
                          className={` text-${item?.bgcolor} ${item?.icon}`}
                        ></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary my-3">
                        <span className="counter-value">
                          {item?.label === 'Total Teams' ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={totalTeamData?.totalteams}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}

                          {item?.label === 'Total Players' ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={totalPlayerData?.length}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.label === 'Active Players' ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={activePlayers?.length}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                          {item?.label === 'Inactive Players' ? (
                            <CountUp
                              start={0}
                              prefix={item?.prefix}
                              suffix={item?.suffix}
                              end={inActivePlayers?.length}
                              decimals={item?.decimals}
                              duration={4}
                            />
                          ) : (
                            ''
                          )}
                        </span>
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

export default TeamManagementCountUp;
