import React from 'react';
import { Button, Col, Row } from 'reactstrap';

export default function ApplicationEmgsStatusTimeline({ setActiveTab, data }) {
  return (
    <Row>
      <div className="d-flex justify-content-between my-3">
        <Button
          className="btn btn-danger fs-14 mt-3"
          onClick={() => setActiveTab('1')}
        >
          <i className="ri-arrow-left-line me-2"></i>
          Back
        </Button>
        <Button className="button fs-14 mt-3">
          <i className="ri-add-line me-2"></i> Add New Status
        </Button>
      </div>
      <Col lg={12}>
        <div>
          <h3 className="fs-22 text-center my-4">Timeline Status</h3>
          <div className="timeline">
            {data?.map((item, index) => (
              <div
                key={index + 1}
                className={`${(index + 1) % 2 === 0 ? 'timeline-item right' : 'timeline-item left'}`}
              >
                <i className="icon ri-stack-line"></i>
                <div className="date">15 Dec 2021</div>
                <div className="content">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      {/* <img
                src={avatar5}
                alt=""
                className="avatar-sm rounded"
              /> */}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <p className="text-muted mb-2">
                        Wish someone a sincere ‘good luck in your new job’ with
                        these sweet messages. Make sure you pick out a good luck
                        new job card to go with the words, and pop a beautiful
                        bunch of flowers from our gift range in your basket, to
                        make them feel super special.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}
