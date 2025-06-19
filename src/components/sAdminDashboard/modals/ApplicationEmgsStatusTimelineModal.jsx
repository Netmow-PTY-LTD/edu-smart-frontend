import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetEmgsStatusTimelineQuery } from '@/slice/services/common/applicationService';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { userDummyImage } from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';
import AddEmgsModal from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/AddEmgsModal';

export default function ApplicationEmgsStatusTimelineModal({
  isOpen,
  onClose,
  currentTimeline,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customData = useCustomData();
  const timelineEndRef = useRef(null);

  const {
    data: timelineData,
    isLoading: timelineLoading,
    refetch: timelineRefe,
  } = useGetEmgsStatusTimelineQuery(currentTimeline, {
    skip: !currentTimeline,
  });

  useEffect(() => {
    if (isOpen) timelineRefe();
  }, [isOpen]);

  // Scroll to bottom when timeline updates
 useEffect(() => {
  if (!timelineLoading && isOpen && timelineEndRef.current) {
    const timeout = setTimeout(() => {
      timelineEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100); // short delay to ensure DOM is ready

    return () => clearTimeout(timeout);
  }
}, [timelineLoading, isOpen, timelineData]);


  return (
    <>
      <ToastContainer />
      <Modal isOpen={isOpen} toggle={onClose} size="xl" centered scrollable>
        <ModalHeader toggle={onClose}>  EMGS & Application Timeline Status</ModalHeader>
        <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {timelineLoading ? (
            <LoaderSpiner />
          ) : (
            <>
              {/* Sticky top bar */}
              <div
                className="d-flex justify-content-between sticky-top bg-white pb-3 px-3 border-bottom"
                style={{ zIndex: 10 }}
              >
                <Button className="btn btn-danger fs-14" onClick={onClose}>
                  <i className="ri-close-line me-2"></i> Close
                </Button>
                <Button className="button fs-14" onClick={timelineRefe}>
                  <i className="ri-refresh-line me-2"></i> Refresh
                </Button>
                {customData.paneltext !== 'student' && (
                  <Button
                    className="button fs-14"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <i className="ri-add-line me-2"></i> Add New Status
                  </Button>
                )}
              </div>

              {/* Timeline Content */}
              <div className="timeline">
                {[...(timelineData?.data || [])]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        (index + 1) % 2 === 0
                          ? 'timeline-item right'
                          : 'timeline-item left'
                      }`}
                    >
                      <i className="icon ri-stack-line"></i>
                      <div className="date">
                        {moment(item?.createdAt).format('DD-MM-YYYY')}
                      </div>
                      <div className="content">
                        <div className="d-flex">
                          {item?.image?.url && (
                            <Image
                              src={item?.image?.url || userDummyImage}
                              alt="Uploaded"
                              width={50}
                              height={50}
                              className="avatar-md rounded"
                            />
                          )}
                          <div className="flex-grow-1 ms-3">
                            <h3>{item?.title}</h3>
                            <p className="text-muted mb-2">
                              {item?.description}
                            </p>

                            {item?.invoiceUrl && (
                              <a
                                href={`https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/${customData.paneltext}${item.invoiceUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-primary"
                              >
                                Invoice
                              </a>
                            )}
                          </div>
                          {item?.image?.url && (
                            <a
                              href={item?.image?.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-success mt-2 align-self-start"
                              title="Download"
                            >
                              <i className="ri-download-2-line me-1"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                {/* Scroll-to-bottom anchor */}
                <div ref={timelineEndRef} />
              </div>
            </>
          )}

          <AddEmgsModal
            isOpen={isModalOpen}
            onClose={() => {
              timelineRefe();
              setIsModalOpen(false);
            }}
            dataRefetch={timelineRefe}
            emgs_status_id={currentTimeline}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
