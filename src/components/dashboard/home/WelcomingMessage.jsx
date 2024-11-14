/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Col, Row } from 'reactstrap';

const WelcomingMessage = ({ data }) => {
  return (
    <>
      <Row className="mb-4 pb-2">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-2 mb-1 text-uppercase text-black">
                Welcome, {`${data?.first_name || ''} ${data?.last_name || ''}`}!
              </h4>
              <p className="fs-3 text-black mb-0">
                Here's what's happening with your site today.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default WelcomingMessage;
