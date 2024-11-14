import classnames from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Collapse } from 'reactstrap';

import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Link from 'next/link';

const RecentActivity = () => {
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(true);
  const [col3, setcol3] = useState(true);

  function togglecol1() {
    setcol1(!col1);
  }

  function togglecol2() {
    setcol2(!col2);
  }

  function togglecol3() {
    setcol3(!col3);
  }
  return (
    <>
      <Col lg={9}>
        <Card className="p-3">
          <CardHeader>
            <div className="d-sm-flex align-items-center">
              <h5 className="card-title flex-grow-1 my-3">Recent Activity</h5>
            </div>
          </CardHeader>
          <CardBody>
            <div className="profile-timeline">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div
                  className="accordion-item border-0 mb-3"
                  onClick={togglecol1}
                >
                  <div className="accordion-header" id="headingOne">
                    <Link
                      href=""
                      className={classnames(
                        'accordion-button',
                        'p-2',
                        'shadow-none',
                        { collapsed: !col1 }
                      )}
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0 ">
                          <Image
                            src={`${userDummyImage}`}
                            alt=""
                            className="avatar-md rounded-circle"
                          />
                        </div>
                        <div className="flex-grow-1 ms-4">
                          <h6 className="fs-2 mb-3">
                            Subscriptions a seasonal game
                          </h6>
                          <small className="text-muted fs-4">
                            Under 15 game play on 05:16PM
                          </small>
                        </div>
                      </div>
                    </Link>
                    <Collapse
                      id="collapseOne"
                      className="accordion-collapse"
                      isOpen={col1}
                    >
                      <div className="accordion-body ms-5 ps-5">
                        In an awareness campaign, it is vital for people to
                        begin put 2 and 2 together and begin to recognize your
                        cause. Too much or too little spacing, as in the example
                        below, can make things unpleasant for the reader. The
                        goal is to make your text as comfortable to read as
                        possible. A wonderful serenity has taken possession of
                        my entire soul, like these sweet mornings of spring
                        which I enjoy with my whole heart.
                      </div>
                    </Collapse>
                  </div>
                </div>
                <div className="accordion-item border-0" onClick={togglecol2}>
                  <div className="accordion-header" id="headingOne">
                    <Link
                      href=""
                      className={classnames(
                        'accordion-button',
                        'p-2',
                        'shadow-none',
                        { collapsed: !col2 }
                      )}
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0 ">
                          <Image
                            src={`${userDummyImage}`}
                            alt=""
                            className="avatar-md rounded-circle"
                          />
                        </div>
                        <div className="flex-grow-1 ms-4">
                          <h6 className="fs-2 mb-3">
                            Subscriptions a seasonal game
                          </h6>
                          <small className="text-muted fs-4">
                            Under 15 game play on 05:16PM
                          </small>
                        </div>
                      </div>
                    </Link>
                    <Collapse
                      id="collapseOne"
                      className="accordion-collapse"
                      isOpen={col2}
                    >
                      <div className="accordion-body ms-5 ps-5">
                        In an awareness campaign, it is vital for people to
                        begin put 2 and 2 together and begin to recognize your
                        cause. Too much or too little spacing, as in the example
                        below, can make things unpleasant for the reader. The
                        goal is to make your text as comfortable to read as
                        possible. A wonderful serenity has taken possession of
                        my entire soul, like these sweet mornings of spring
                        which I enjoy with my whole heart.
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default RecentActivity;
