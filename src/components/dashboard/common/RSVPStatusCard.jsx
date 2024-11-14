import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

const RSVPStatusCard = () => {
  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <CardTitle className="fw-medium mb-2 flex-grow-1">
            RSVP Status
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={4}>
              <Card>
                <CardBody className=" pt-3 pb-3">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fw-medium text-muted mb-0">
                        Yes
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="qoute_color fs-14 mb-0">24.24 %</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary">20</h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-light-subtle rounded fs-1">
                        <i className="ri-thumb-up-line qoute_color"></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody className=" pt-3 pb-3">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fw-medium text-muted mb-0">
                        No
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="qoute_color fs-14 mb-0">24.24 %</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary">20</h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-light-subtle rounded fs-1">
                        <i className="ri-thumb-up-line qoute_color"></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody className=" pt-3 pb-3">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fw-medium text-muted mb-0">
                        Maybe
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="qoute_color fs-14 mb-0">24.24 %</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary">20</h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-light-subtle rounded fs-1">
                        <i className="ri-thumb-up-line qoute_color"></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default RSVPStatusCard;
