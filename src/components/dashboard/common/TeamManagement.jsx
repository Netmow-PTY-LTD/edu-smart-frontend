import Pagination from '@/components/dashboard/common/Pagination';
import { getTotalPlayer } from '@/slices/dashboard/adminDashboard/Actions/playerActions';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import image from '../../../../public/images/home/football.jpg';

const TeamManagement = ({ thisTeamPlayers }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const dispatch = useDispatch();
  const { data: totalPlayerData } = useSelector(
    (state) => state.AdminDashboard.totalPlayer
  );

  useEffect(() => {
    dispatch(getTotalPlayer());
  }, [dispatch]);
  return (
    <>
      <Col xl={6}>
        <Card>
          <CardTitle className="fs-2 fw-semibold card-title border border-bottom p-4">
            Team Management
          </CardTitle>
          <Row className="p-5">
            <Col xl={6}>
              <Card className="border border-1">
                <CardHeader className="fs-2 fw-medium">
                  This Teams Players
                  <span className="button text-white px-2  fs-4 ms-2">
                    {thisTeamPlayers}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="d-flex bg-soft-warning">
                    <div className="flex-shrink-0">
                      <Image
                        src={image ? image : `${userDummyImage}`}
                        alt="User"
                        className="avatar-lg rounded-circle p-3"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex-grow-1 ms-2">
                        <h6 className="card-title">Oliver Phillips</h6>
                        <p className="text-muted mb-0">Player</p>
                      </div>
                    </div>
                    {/* <div className="fs-1">
                        <i className="mdi mdi-drag-vertical"></i>
                      </div> */}
                  </div>
                  {''.length <= 0 && (
                    <div className="empty-table-dialog-container">
                      <span className="text-center">
                        {"Don't found any players for the team."}
                      </span>
                    </div>
                  )}
                </CardBody>
                <CardFooter>
                  <Pagination
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 20,
                    }}
                    data={''}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                  />
                </CardFooter>
              </Card>
            </Col>
            <Col xl={6}>
              <Card className="border border-1">
                <CardHeader className="fs-2 fw-medium">
                  Total Players
                  <span className="button text-white px-2 fs-4 ms-2">
                    {totalPlayerData?.totalPlayers}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="d-flex bg-soft-warning">
                    <div className="flex-shrink-0">
                      <Image
                        src={image ? image : `${userDummyImage}`}
                        alt="User"
                        className="avatar-lg rounded-circle p-3"
                      />
                    </div>
                    <div className="p-3 ">
                      <div className="flex-grow-1 ms-2">
                        <h6 className="card-title">Oliver Phillips</h6>
                        <p className="text-muted mb-0">Player</p>
                      </div>
                    </div>
                    {/* <div className="fs-1">
                        <i className="mdi mdi-drag-vertical"></i>
                      </div> */}
                  </div>
                  {''.length <= 0 && (
                    <div className="empty-table-dialog-container">
                      <span className="text-center">
                        {"Don't found any players."}
                      </span>
                    </div>
                  )}
                </CardBody>
                <CardFooter>
                  <Pagination
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 20,
                    }}
                    data={''}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                  />
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default TeamManagement;
