import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetEmgsStatusTimelineQuery } from '@/slice/services/common/applicationService';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Row } from 'reactstrap';
import AddEmgsModal from './modal/AddEmgsModal';
import { userDummyImage } from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';

export default function ApplicationEmgsStatusTimeline({
  setActiveTab,
  currentTimeline,
}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const customData = useCustomData();

  const {
    data: timelineData,
    isLoading: timelineLoading,
    refetch: timelineRefe,
  } = useGetEmgsStatusTimelineQuery(currentTimeline, {
    skip: !currentTimeline,
  });

  return (
    <>
      <ToastContainer />
      {timelineLoading ? (
        <LoaderSpiner />
      ) : (
        <Row>
          <div className="d-flex justify-content-between my-3">
            <Button
              className="button fs-14 mt-3"
              onClick={() => setActiveTab('1')}
            >
              <i className="ri-arrow-left-line me-2"></i>
              Back
            </Button>
            <Button
              className="button fs-14 mt-3"
              onClick={() => timelineRefe()}
            >
              <i className="ri-refresh-line me-2"></i>
            </Button>
            {customData.paneltext !== 'student' && (
              <Button
                className="button fs-14 mt-3"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="ri-add-line me-2"></i> Add New Status
              </Button>
            )}
          </div>
          <Col lg={12}>
            <div>
              <h3 className="fs-22 text-center my-4">Timeline Status</h3>
              <div className="timeline">
                {[...(timelineData?.data || [])]
                  ?.sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                  )
                  ?.map((item, index) => (
                    <div
                      key={index + 1}
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
                          <div className="flex-shrink-0">
                            {item?.image?.url && (
                              <>
                                <Image
                                  src={item?.image?.url || userDummyImage}
                                  alt="Uploaded Image"
                                  width={0}
                                  height={0}
                                  className="avatar-md rounded"
                                />
                              </>
                            )}
                          </div>

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
                              <i className="ri-download-2-line me-1"></i>{' '}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
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
    </>
  );
}

// import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
// import { useGetEmgsStatusTimelineQuery } from '@/slice/services/common/applicationService';
// import moment from 'moment';
// import Image from 'next/image';
// import React from 'react';
// import { ToastContainer } from 'react-toastify';
// import { Button, Col, Row } from 'reactstrap';
// import AddEmgsModal from './modal/AddEmgsModal';
// import { userDummyImage } from '@/utils/common/data';

// export default function ApplicationEmgsStatusTimeline({
//   setActiveTab,
//   currentTimeline,
// }) {
//   const [isModalOpen, setIsModalOpen] = React.useState(false);

//   const {
//     data: timelineData,
//     isLoading: timelineLoading,
//     refetch: timelineRefe,
//   } = useGetEmgsStatusTimelineQuery(currentTimeline, {
//     skip: !currentTimeline,
//   });

//   return (
//     <>
//       <ToastContainer />
//       {timelineLoading ? (
//         <LoaderSpiner />
//       ) : (
//         <Row>
//           <div className="d-flex justify-content-between my-3">
//             <Button
//               className="button fs-14 mt-3"
//               onClick={() => setActiveTab('1')}
//             >
//               <i className="ri-arrow-left-line me-2"></i>
//               Back
//             </Button>
//             <Button
//               className="button fs-14 mt-3"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <i className="ri-add-line me-2"></i> Add New Status
//             </Button>
//           </div>
//           <Col lg={12}>
//             <div>
//               <h3 className="fs-22 text-center my-4">Timeline Status</h3>
//               <div className="timeline">
//                 {timelineData?.data?.map((item, index) => (
//                   <div
//                     key={index + 1}
//                     className={`${(index + 1) % 2 === 0 ? 'timeline-item right' : 'timeline-item left'}`}
//                   >
//                     <i className="icon ri-stack-line"></i>
//                     <div className="date">
//                       {moment(item?.createdAt).format('DD-MM-YYYY')}
//                     </div>
//                     <div className="content">
//                       <div className="d-flex">
//                         <div className="flex-shrink-0">
//                           {item?.image?.url && (
//                             <Image
//                               src={item?.image?.url || userDummyImage}
//                               alt=""
//                               width={0}
//                               height={0}
//                               className="avatar-md rounded"
//                             />
//                           )}
//                         </div>
//                         <div className="flex-grow-1 ms-3">
//                           <h3>{item?.title}</h3>
//                           <p className="text-muted mb-2">{item?.description}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       )}
//       <AddEmgsModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         dataRefetch={timelineRefe}
//         emgs_status_id={currentTimeline}
//       />
//     </>
//   );
// }
