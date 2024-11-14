import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardTitle, Col, Row, Table } from 'reactstrap';
import Maps from './Maps';
import SponsorsCard from './SponsorsCard';

const EventsOverview = ({
  id,
  mainData,
  sponsorsData,
  loading,
  eventsIdForRemoveSponsor,
}) => {
  return (
    <Row className="grid g-5 pt-5">
      <ToastContainer />
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle>Info</CardTitle>
            <div className="table-responsive">
              <Table className="table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="ps-0" scope="row">
                      Description
                    </th>
                    <td className="text-muted text-wrap d-flex">
                      <span className="d-inline-block me-2">:</span>
                      <span className="d-inline-block">
                        {mainData?.description}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="ps-0" scope="row">
                      Date
                    </th>
                    <td className="text-muted text-wrap d-flex">
                      <span className="d-inline-block me-2">:</span>
                      <span className="d-inline-block">
                        {(mainData?.game_id?.date?.length > 0 &&
                          mainData?.game_id?.date
                          .filter(
                            (d) =>
                              new Date(d?.date).setHours(0, 0, 0, 0) >=
                              new Date().setHours(0, 0, 0, 0)
                          )
                            .map((d, i) => (
                              <h5 key={i} className="fs-14 my-1 fw-normal">
                                {`${new Date(d?.date).toLocaleDateString()} - ${new Date(
                                  `2000-01-01T${d?.start_time}:00`
                                ).toLocaleString('en-US', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                })} To ${new Date(
                                  `2000-01-01T${d?.end_time}:00`
                                ).toLocaleString('en-US', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                })}`}
                              </h5>
                            ))) ||
                          (mainData?.date?.length > 0 &&
                            mainData?.date
                            .filter(
                              (d) =>
                                new Date(d?.date).setHours(0, 0, 0, 0) >=
                                new Date().setHours(0, 0, 0, 0)
                            )
                              .map((d, i) => (
                                <h5 key={i} className="fs-14 my-1 fw-normal">
                                  {`${new Date(d?.date).toLocaleDateString()} - ${new Date(
                                    `2000-01-01T${d?.start_time}:00`
                                  ).toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                  })} To ${new Date(
                                    `2000-01-01T${d?.end_time}:00`
                                  ).toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                  })}`}
                                </h5>
                              )))}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="ps-0" scope="row">
                      Location
                    </th>
                    <td className="text-muted text-wrap d-flex">
                      <span className="d-inline-block me-2">:</span>
                      <span className="d-inline-block">
                        {mainData?.event_vanue || mainData?.vanue}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xl={3} className="mt-0">
        <SponsorsCard
          data={sponsorsData}
          loading={loading}
          eventsIdForRemoveSponsor={eventsIdForRemoveSponsor}
          className="pt-0"
        />
      </Col>
      <Col xl={9} className="mt-0">
        {/* <Col lg={12}><RSVPStatusCard /></Col> */}
        <Maps place={mainData?.event_vanue || mainData?.vanue} />
      </Col>
    </Row>
  );
};

export default EventsOverview;
