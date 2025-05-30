import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetEmgsStatusTimelineQuery } from '@/slice/services/common/applicationService';
import { userDummyImage } from '@/utils/common/data';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { Col, Row } from 'reactstrap';

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
          <div className="d-flex align-items-center justify-content-between my-3">
            <btn
              className="button fs-2 mt-3 px-4 py-2"
              onClick={() => setActiveTab('1')}
            >
              <i className="ri-arrow-left-line me-2"></i>
              Back
            </btn>
          </div>
          <Col lg={12}>
            <div>
              <h3 className="fs-22 text-center my-4">Timeline Status</h3>
              <div className="timeline ">
                {timelineData?.data?.map((item, index) => (
                  <div
                    key={index + 1}
                    className={`${(index + 1) % 2 === 0 ? 'timeline-item right ' : 'timeline-item left '}`}
                  >
                    <i className="icon ri-stack-line card-animate"></i>
                    <div className="date ">
                      {moment(item?.createdAt).format('DD-MM-YYYY')}
                    </div>

                    <div className="content card-animate rounded-4">
                      <div className="d-flex ">
                        <div className="flex-shrink-0">
                          {item?.image?.url && (
                            <Image
                              src={item?.image?.url || userDummyImage}
                              alt=""
                              width={0}
                              height={0}
                              className="avatar-md rounded"
                            />
                          )}
                        </div>
                        <div className="flex-grow-1 ms-3 ">
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
