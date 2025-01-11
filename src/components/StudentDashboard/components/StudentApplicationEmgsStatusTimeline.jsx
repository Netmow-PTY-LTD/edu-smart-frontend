import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetEmgsStatusTimelineQuery } from '@/slice/services/common/applicationService';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';

export default function StudentApplicationEmgsStatusTimeline({
  setActiveTab,
  currentTimeline,
}) {
  const { data: timelineData, isLoading: timelineLoading } =
    useGetEmgsStatusTimelineQuery(currentTimeline, {
      skip: !currentTimeline,
    });
  return (
    <>
      {timelineLoading ? (
        <LoaderSpiner />
      ) : (
        <Row>
          <div className="d-flex justify-content-between my-3">
            <Button
              className="btn btn-danger fs-14 mt-3"
              onClick={() => setActiveTab('1')}
            >
              <i className="ri-arrow-left-line me-2"></i>
              Back
            </Button>
          </div>
          <Col lg={12}>
            <div>
              <h3 className="fs-22 text-center my-4">Timeline Status</h3>
              <div className="timeline">
                {timelineData?.data?.map((item, index) => (
                  <div
                    key={index + 1}
                    className={`${(index + 1) % 2 === 0 ? 'timeline-item right' : 'timeline-item left'}`}
                  >
                    <i className="icon ri-stack-line"></i>
                    <div className="date">
                      {moment(item?.createdAt).format('DD-MM-YYYY')}
                    </div>
                    <div className="content">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          {item?.image?.url && (
                            <Image
                              src={item?.image?.url}
                              alt=""
                              className="avatar-sm rounded"
                            />
                          )}
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h3>{item?.title}</h3>
                          <p className="text-muted mb-2">{item?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
