/* eslint-disable @next/next/no-img-element */
import ApplicationDocumentUpload from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/ApplicationDocumentUpload';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import { useUpdateApplicationDocumentDocMutation } from '@/slice/services/common/commonDocumentService';
import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
import { useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Card,
  CardBody,
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useCustomData } from '@/utils/common/data/customeData';
import { downloadFilesAsPDF } from '@/utils/dwonloadFilesAsPdf';
import {
  useAddEmgsTimelineMutation,
  useGetRecentApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/common/applicationService';

const ApplicationDocumentsModal = ({ isOpen, onClose, applicationId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const customData = useCustomData();

  const {
    data: singleGetApplicationData,
    isLoading: singleGetApplicationLoading,
    refetch: singleGetApplicationRefetch,
  } = useSingleGetApplicationQuery(applicationId);

  const [updateDocument] = useUpdateApplicationDocumentDocMutation();
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const { refetch: recentApplicationRefetch } = useGetRecentApplicationsQuery();

  const documentFiles = singleGetApplicationData?.data?.documents ?? [];

  const allFileUrls = documentFiles
    .flatMap((doc) => (doc.files ?? []).map((file) => file.url))
    .filter(Boolean);

  const documentToUploadTo =
    singleGetApplicationData?.data?.documents?.find(
      (doc) => doc.title === 'passport[0]'
    ) ?? singleGetApplicationData?.data?.documents?.[0];

  useEffect(() => {
    if (singleGetApplicationData?.data?.documents) {
      const clonedDocuments = JSON.parse(
        JSON.stringify(singleGetApplicationData.data.documents)
      );
      setDocuments(clonedDocuments);

      const fetchImages = async () => {
        await Promise.all(
          singleGetApplicationData.data.documents.flatMap((doc) =>
            doc.files?.map((file) => convertImageUrlToFile(file.url))
          )
        );
      };
      fetchImages();
    }
  }, [singleGetApplicationData]);

  // ✅ Auto-change status from 'pending' to 'review_in'
  useEffect(() => {
    const shouldAutoUpdate =
      singleGetApplicationData?.data?.status === 'pending' &&
      customData?.paneltext !== 'agent' &&
      customData?.paneltext !== 'student';

    if (shouldAutoUpdate) {
      handleChangeApplicationStatus({
        id: singleGetApplicationData?.data?._id,
        status: 'review_in',
        emgs_id: singleGetApplicationData?.data?.emgs_status,
      });
    }
  }, [
    singleGetApplicationData?.data?._id,
    singleGetApplicationData?.data?.status,
    customData?.paneltext,
  ]);

  const toggleImageModal = () => setModalOpen(!modalOpen);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    toggleImageModal();
  };

  const handleSubmitChange = async (index) => {
    const doc = documents[index];
    try {
      await updateDocument({
        document_id: doc._id,
        data: {
          description: doc.description,
          status: doc.status,
        },
      }).unwrap();
      toast.success('Document updated successfully.');
      setEditingIndex(null);
    } catch (err) {
      toast.error('Failed to update document. Please try again.');
    }
  };


    const [addEmgsTimeline] = useAddEmgsTimelineMutation();
    const handleChangeApplicationStatus = async (data) => {
      try {
        if (data.status === 'pickupGenerated') {
          const formData = new FormData();
          formData.append(
            'title',
            'Airport Pickup Charge Generated — Action Required'
          );
          formData.append(
            'description',
            'Your Airport Pickup Charge has been successfully generated. Please review and complete the payment to confirm your airport pickup arrangement. You can access the invoice using the link below.'
          );
          formData.append(
            'invoiceUrl',
            `/application-invoices?app_id=${data?.id}&pickup=yes`
          );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // emgs_status_id
  
          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('Airport Pickup Charge timeline added successfully!');
          } else {
            toast.error('Failed to add Airport Pickup Charge timeline.');
          }
          return;
        }
  
        const response = await updateApplicationStatus(data);
  
        if (response?.data?.success) {
          toast.success(
            response?.data?.message || 'Application status updated successfully!'
          );
          recentApplicationRefetch();
          singleGetApplicationRefetch();
          // ✅ If status is 'processing', send FormData to addEmgsTimeline
  
          if (data.status === 'pending') {
            const formData = new FormData();
            formData.append('title', 'File Assessment Submitted');
            formData.append(
              'description',
              'Your file assessment has been submitted and will be reviewed shortly. The status will be updated once the review process begins.'
            );
            // formData.append(
            //   'invoiceUrl',
            //   `/application-invoices?app_id=${data?.id}&emgs=yes`
            // );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // This is your emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('EMGS timeline added successfully!');
            } else {
              toast.error('Failed to add EMGS timeline.');
            }
          }
  
          if (data.status === 'review_in') {
            const formData = new FormData();
            formData.append('title', 'File Assessment Submitted — Under Review');
            formData.append(
              'description',
              'Your submitted documents are currently under review by our team. Please check back soon for updates on your application status.'
            );
            // formData.append(
            //   'invoiceUrl',
            //   `/application-invoices?app_id=${data?.id}&emgs=yes`
            // );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // This is your emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('EMGS timeline added successfully!');
            } else {
              toast.error('Failed to add EMGS timeline.');
            }
          }
  
          if (data.status === 'file_requested') {
            const formData = new FormData();
            formData.append('title', 'Additional Documents Required');
            formData.append(
              'description',
              'We need additional documents to proceed with your application. Please check your application details and upload the required files as soon as possible.'
            );
            // formData.append(
            //   'invoiceUrl',
            //   `/application-invoices?app_id=${data?.id}&emgs=yes`
            // );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // This is your emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('EMGS timeline added successfully!');
            } else {
              toast.error('Failed to add EMGS timeline.');
            }
          }
  
          if (data.status === 'ready_for_emgs') {
            const formData = new FormData();
            formData.append('title', 'Ready for EMGS Submission & Payment');
            formData.append(
              'description',
              'Your file has passed internal assessment and is now ready to be submitted to EMGS. The EMGS invoice is now available and ready for payment.'
            );
            formData.append(
              'invoiceUrl',
              `/application-invoices?app_id=${data?.id}&emgs=yes`
            );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // This is your emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('EMGS timeline added successfully!');
            } else {
              toast.error('Failed to add EMGS timeline.');
            }
          }
          if (data.status === 'file_under_emgs') {
            const formData = new FormData();
            formData.append('title', 'File Under EMGS Review');
            formData.append(
              'description',
              'Your documents have been submitted to EMGS and are currently being reviewed. We will notify you once EMGS has provided feedback.'
            );
            // formData.append(
            //   'invoiceUrl',
            //   `/application-invoices?app_id=${data?.id}&emgs=yes`
            // );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // This is your emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('EMGS timeline added successfully!');
            } else {
              toast.error('Failed to add EMGS timeline.');
            }
          }
  
          if (data.status === 'ready_for_tuition') {
            const formData = new FormData();
            formData.append('title', 'Ready for Tuition Payment');
            formData.append(
              'description',
              'Your application has progressed successfully. You may now proceed with the tuition payment to continue your enrollment process.'
            );
            formData.append(
              'invoiceUrl',
              `/application-invoices?app_id=${data?.id}&tuition=yes`
            );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // This is your emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('EMGS timeline added successfully!');
            } else {
              toast.error('Failed to add EMGS timeline.');
            }
          }
  
          if (data.status === 'tuition_under_processed') {
            const formData = new FormData();
            formData.append('title', 'Tuition Payment is Being Processed');
            formData.append(
              'description',
              'Your tuition payment is currently under verification. We will update your status once the payment has been confirmed.'
            );
            // formData.append(
            //   'invoiceUrl',
            //   `/application-invoices?app_id=${data?.id}&tuition=yes`
            // );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // This is your emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('EMGS timeline added successfully!');
            } else {
              toast.error('Failed to add EMGS timeline.');
            }
          }
  
          if (data.status === 'accepted') {
            const formData = new FormData();
            formData.append('title', 'Application Accepted');
            formData.append(
              'description',
              'Congratulations! Your application has been accepted. Please check your application dashboard, EMGS status, or email for further instructions and next steps.'
            );
            // formData.append(
            //   'invoiceUrl',
            //   `/application-invoices?app_id=${data?.id}&tuition=yes`
            // );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success('Tuition fee timeline added successfully!');
            } else {
              toast.error('Failed to add Tuition fee timeline.');
            }
          }
  
          if (data.status === 'rejected') {
            const formData = new FormData();
            formData.append(
              'title',
              'Application Cancelled — Final Status Update'
            );
            formData.append(
              'description',
              'We regret to inform you that your application has been cancelled. If you believe this was an error or you need further clarification, please contact our support team. Thank you for your interest and understanding.'
            );
            // formData.append(
            //   'invoiceUrl',
            //   `/application-invoices?app_id=${data?.id}&pickup=yes`
            // );
            formData.append('image', data?.image); // Ensure this is a File or Blob object
            formData.append('id', data?.emgs_id); // emgs_status_id
  
            const timelineResponse = await addEmgsTimeline(formData);
            if (timelineResponse?.data?.success) {
              // toast.success(
              //   'Application cancellation timeline added successfully!'
              // );
            } else {
              toast.error('Failed to add application cancellation timeline.');
            }
          }
        } else {
          toast.error(
            response?.error?.data?.message ||
              'Failed to update application status.'
          );
        }
      } catch (error) {
        console.error('Error updating application status:', error);
        toast.error('An error occurred while updating the status.');
      }
    };
  
  const handleDownloadAllDocument = () => {
    if (!allFileUrls || allFileUrls.length === 0) {
      toast.error('No documents available to download');
      return;
    }
    downloadFilesAsPDF(
      allFileUrls,
      'Downloading all documents as a single PDF...'
    );
  };

  const currentStatus = singleGetApplicationData?.data?.status;
  const statusOrder = ['review_in', 'file_requested', 'ready_for_emgs'];
  const isStatusReached = (status) =>
    statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus);

  if (singleGetApplicationLoading) return null;

  return (
    <>
      <ToastContainer />
      <Modal isOpen={isOpen} toggle={onClose} size="xl" centered scrollable>
        <ModalHeader toggle={onClose}>
          Application Documents — {singleGetApplicationData?.data?.student?.name}
        </ModalHeader>
        <ModalBody>
          <Card>
            <h1 className="py-4 px-3 text-capitalize text-primary fw-semibold border-bottom">
              📄 All Submitted Documents
            </h1>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center my-4 flex-wrap gap-3">
                <div className="text-center">
                  <h5 className="text-primary fw-bold mb-3">
                    Upload New Documents
                  </h5>
                  <button
                    className="btn btn-lg btn-outline-primary"
                    onClick={() => setUploadModalOpen(true)}
                  >
                    ➕ Upload Document
                  </button>
                </div>

                {customData?.paneltext !== 'agent' &&
                  customData?.paneltext !== 'student' && (
                    <div className="d-flex gap-2 flex-wrap">
                      {['review_in', 'file_requested', 'ready_for_emgs'].map(
                        (statusKey) => (
                          <button
                            key={statusKey}
                            onClick={() =>
                              handleChangeApplicationStatus({
                                id: singleGetApplicationData?.data?._id,
                                status: statusKey,
                                emgs_id:
                                  singleGetApplicationData?.data?.emgs_status,
                              })
                            }
                            className={`btn d-flex align-items-center ${
                              currentStatus === statusKey
                                ? 'btn-success'
                                : 'btn-outline-primary'
                            }`}
                            disabled={isStatusReached(statusKey)}
                          >
                            {statusKey
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </button>
                        )
                      )}
                    </div>
                  )}

                <div>
                  <button
                    className="btn btn-lg btn-success"
                    onClick={handleDownloadAllDocument}
                  >
                    📥 Download All Files as PDF
                  </button>
                </div>
              </div>

              <div className="row">
                {documents.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-5">
                    <div className="p-3 border rounded shadow-sm h-100">
                      <div className="mb-3">
                        <h5 className="text-primary fw-semibold text-capitalize">
                          {item?.title?.split('[')[0]?.replace(/[_/]/g, ' ')}
                        </h5>
                      </div>

                      {editingIndex === index ? (
                        <>
                          <Input
                            type="textarea"
                            value={item.description}
                            onChange={(e) => {
                              const updatedDocs = [...documents];
                              updatedDocs[index].description = e.target.value;
                              setDocuments(updatedDocs);
                            }}
                            placeholder="Enter description"
                            className="mb-2"
                          />
                          <Input
                            type="select"
                            value={item.status}
                            onChange={(e) => {
                              const updatedDocs = [...documents];
                              updatedDocs[index].status = e.target.value;
                              setDocuments(updatedDocs);
                            }}
                            className="mb-3"
                          >
                            <option value="pending">Pending</option>
                            <option value="requested">Requested</option>
                            <option value="rejected">Rejected</option>
                            <option value="approved">Approved</option>
                          </Input>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-success w-100"
                              onClick={() => handleSubmitChange(index)}
                            >
                              ✅ Submit
                            </button>
                            <button
                              className="btn btn-outline-secondary w-100"
                              onClick={() => setEditingIndex(null)}
                            >
                              ❌ Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {customData.paneltext !== 'student' ? (
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <button
                                className="btn btn-outline-dark"
                                onClick={() => setEditingIndex(index)}
                              >
                                ✏️ Request Change
                              </button>
                              <span
                                className={`badge rounded-pill px-3 py-2 fs-6 ${
                                  item.status === 'pending'
                                    ? 'bg-warning text-dark'
                                    : item.status === 'approved'
                                    ? 'bg-success'
                                    : item.status === 'requested'
                                    ? 'bg-danger'
                                    : 'bg-secondary'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          ) : (
                            (item.status === 'requested' ||
                              item.status !== 'pending') && (
                              <span
                                className={`badge rounded-pill px-3 py-2 fs-6 ${
                                  item.status === 'approved'
                                    ? 'bg-success'
                                    : item.status === 'requested'
                                    ? 'bg-danger'
                                    : 'bg-warning text-dark'
                                }`}
                              >
                                {item.status}
                              </span>
                            )
                          )}
                        </>
                      )}

                      {item.description && (
                        <p className="text-muted small mt-2">
                          📌 {item.description}
                        </p>
                      )}
                      {item.files?.map((file, fileIndex) => (
                        <div key={fileIndex} className="mb-3 position-relative">
                          {file?.url?.endsWith('.pdf') ? (
                            <div className="d-flex align-items-center gap-2">
                              <a
                                href={file.url}
                                download={file.public_id}
                                className="btn btn-outline-primary btn-sm"
                              >
                                📥 Download PDF
                              </a>
                            </div>
                          ) : (
                            <>
                              <img
                                src={file.url}
                                alt={`preview-${fileIndex}`}
                                className="img-fluid rounded cursor-pointer border"
                                onClick={() => handleImageClick(file.url)}
                                style={{
                                  objectFit: 'contain',
                                  maxHeight: '250px',
                                }}
                              />
                              <a
                                href={file.url}
                                download
                                className="btn btn-outline-primary btn-lg mt-2"
                              >
                                📥
                              </a>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>

      {/* Image Preview Modal */}
      <Modal isOpen={modalOpen} toggle={toggleImageModal} centered>
        <ModalHeader toggle={toggleImageModal}>Image Preview</ModalHeader>
        <ModalBody>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              className="img-fluid rounded mx-auto d-block"
              style={{ objectFit: 'contain', maxHeight: '80vh' }}
            />
          )}
        </ModalBody>
      </Modal>

      {/* Upload Modal */}
      <ApplicationDocumentUpload
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          singleGetApplicationRefetch();
        }}
        applicationId={applicationId}
        applicationDocumentId={documentToUploadTo?._id}
        onUploadSuccess={() => singleGetApplicationRefetch()}
      />
    </>
  );
};

export default ApplicationDocumentsModal;




// /* eslint-disable @next/next/no-img-element */
// import ApplicationDocumentUpload from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/ApplicationDocumentUpload';
// import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
// import { useUpdateApplicationDocumentDocMutation } from '@/slice/services/common/commonDocumentService';
// import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
// import { useEffect, useState } from 'react';
// import {
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Input,
//   Card,
//   CardBody,
// } from 'reactstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import { useCustomData } from '@/utils/common/data/customeData';
// import { downloadFilesAsPDF } from '@/utils/dwonloadFilesAsPdf';
// import {
//   useAddEmgsTimelineMutation,
//   useGetRecentApplicationsQuery,
//   useUpdateApplicationStatusMutation,
// } from '@/slice/services/common/applicationService';

// const ApplicationDocumentsModal = ({ isOpen, onClose, applicationId }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const customData = useCustomData();


//   console.log("applicationId", applicationId);

//   const {
//     data: singleGetApplicationData,
//     isLoading: singleGetApplicationLoading,
//     refetch: singleGetApplicationRefetch,
//   } = useSingleGetApplicationQuery(applicationId);


  
//   const [updateDocument] = useUpdateApplicationDocumentDocMutation();
//   const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
//   const [addEmgsTimeline] = useAddEmgsTimelineMutation();
//   const {
//     refetch: recentApplicationRefetch,
//   } = useGetRecentApplicationsQuery();

//   const documentFiles = singleGetApplicationData?.data?.documents ?? [];

//   const allFileUrls = documentFiles
//     .flatMap((doc) => (doc.files ?? []).map((file) => file.url))
//     .filter(Boolean);

//   const documentToUploadTo =
//     singleGetApplicationData?.data?.documents?.find(
//       (doc) => doc.title === 'passport[0]'
//     ) ?? singleGetApplicationData?.data?.documents?.[0];

//   useEffect(() => {
//     if (singleGetApplicationData?.data?.documents) {
//       const clonedDocuments = JSON.parse(
//         JSON.stringify(singleGetApplicationData.data.documents)
//       );
//       setDocuments(clonedDocuments);

//       const fetchImages = async () => {
//         await Promise.all(
//           singleGetApplicationData.data.documents.flatMap((doc) =>
//             doc.files?.map((file) => convertImageUrlToFile(file.url))
//           )
//         );
//       };
//       fetchImages();
//     }
//   }, [singleGetApplicationData]);

//   const toggleImageModal = () => setModalOpen(!modalOpen);
//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     toggleImageModal();
//   };

//   const handleSubmitChange = async (index) => {
//     const doc = documents[index];
//     try {
//       await updateDocument({
//         document_id: doc._id,
//         data: {
//           description: doc.description,
//           status: doc.status,
//         },
//       }).unwrap();
//       toast.success('Document updated successfully.');
//       setEditingIndex(null);
//     } catch (err) {
//       toast.error('Failed to update document. Please try again.');
//     }
//   };

//   const handleDownloadAllDocument = () => {
//     if (!allFileUrls) {
//       toast.error('No documents available to download');
//       return;
//     }
//     downloadFilesAsPDF(
//       allFileUrls,
//       'Downloading all documents as a single PDF...'
//     );
//   };

//   const currentStatus = singleGetApplicationData?.data?.status;
//   const statusOrder = ['review_in', 'file_requested', 'ready_for_emgs'];
//   const isStatusReached = (status) =>
//     statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus);

//   if (singleGetApplicationLoading) return null;

//   return (
//     <>
//       <ToastContainer />
//       <Modal isOpen={isOpen} toggle={onClose} size="xl" centered scrollable>
//         <ModalHeader toggle={onClose}>
//           Application Documents — {singleGetApplicationData?.data?.student?.name}
//         </ModalHeader>
//         <ModalBody>
//           <Card>
//             <h1 className="py-4 px-3 text-capitalize text-primary fw-semibold border-bottom">
//               📄 All Submitted Documents
//             </h1>
//             <CardBody>
//               <div className="d-flex justify-content-between align-items-center my-4 flex-wrap gap-3">
//                 <div className="text-center">
//                   <h5 className="text-primary fw-bold mb-3">
//                     Upload New Documents
//                   </h5>
//                   <button
//                     className="btn btn-lg btn-outline-primary"
//                     onClick={() => setUploadModalOpen(true)}
//                   >
//                     ➕ Upload Document
//                   </button>
//                 </div>

//                 {customData?.paneltext !== 'agent' &&
//                   customData?.paneltext !== 'student' && (
//                     <div className="d-flex gap-2 flex-wrap">
//                       {['review_in', 'file_requested', 'ready_for_emgs'].map(
//                         (statusKey) => (
//                           <button
//                             key={statusKey}
//                             onClick={() =>
//                               handleChangeApplicationStatus({
//                                 id: singleGetApplicationData?.data?._id,
//                                 status: statusKey,
//                                 emgs_id:
//                                   singleGetApplicationData?.data?.emgs_status,
//                               })
//                             }
//                             className={`btn d-flex align-items-center ${
//                               currentStatus === statusKey
//                                 ? 'btn-success'
//                                 : 'btn-outline-primary'
//                             }`}
//                             disabled={isStatusReached(statusKey)}
//                           >
//                             {statusKey
//                               .replace(/_/g, ' ')
//                               .replace(/\b\w/g, (l) => l.toUpperCase())}
//                           </button>
//                         )
//                       )}
//                     </div>
//                   )}

//                 <div>
//                   <button
//                     className="btn btn-lg btn-success"
//                     onClick={handleDownloadAllDocument}
//                   >
//                     📥 Download All Files as PDF
//                   </button>
//                 </div>
//               </div>

//               <div className="row">
//                 {documents.map((item, index) => (
//                   <div key={index} className="col-md-6 col-lg-4 mb-5">
//                     <div className="p-3 border rounded shadow-sm h-100">
//                       <div className="mb-3">
//                         <h5 className="text-primary fw-semibold text-capitalize">
//                           {item?.title?.split('[')[0]?.replace(/[_/]/g, ' ')}
//                         </h5>
//                       </div>

//                       {editingIndex === index ? (
//                         <>
//                           <Input
//                             type="textarea"
//                             value={item.description}
//                             onChange={(e) => {
//                               const updatedDocs = [...documents];
//                               updatedDocs[index].description = e.target.value;
//                               setDocuments(updatedDocs);
//                             }}
//                             placeholder="Enter description"
//                             className="mb-2"
//                           />
//                           <Input
//                             type="select"
//                             value={item.status}
//                             onChange={(e) => {
//                               const updatedDocs = [...documents];
//                               updatedDocs[index].status = e.target.value;
//                               setDocuments(updatedDocs);
//                             }}
//                             className="mb-3"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="requested">Requested</option>
//                             <option value="rejected">Rejected</option>
//                             <option value="approved">Approved</option>
//                           </Input>
//                           <div className="d-flex gap-2">
//                             <button
//                               className="btn btn-success w-100"
//                               onClick={() => handleSubmitChange(index)}
//                             >
//                               ✅ Submit
//                             </button>
//                             <button
//                               className="btn btn-outline-secondary w-100"
//                               onClick={() => setEditingIndex(null)}
//                             >
//                               ❌ Cancel
//                             </button>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           {customData.paneltext !== 'student' ? (
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                               <button
//                                 className="btn btn-outline-dark"
//                                 onClick={() => setEditingIndex(index)}
//                               >
//                                 ✏️ Request Change
//                               </button>
//                               <span
//                                 className={`badge rounded-pill px-3 py-2 fs-6 ${
//                                   item.status === 'pending'
//                                     ? 'bg-warning text-dark'
//                                     : item.status === 'approved'
//                                       ? 'bg-success'
//                                       : item.status === 'requested'
//                                         ? 'bg-danger'
//                                         : 'bg-secondary'
//                                 }`}
//                               >
//                                 {item.status}
//                               </span>
//                             </div>
//                           ) : (
//                             (item.status === 'requested' ||
//                               item.status !== 'pending') && (
//                               <span
//                                 className={`badge rounded-pill px-3 py-2 fs-6 ${
//                                   item.status === 'approved'
//                                     ? 'bg-success'
//                                     : item.status === 'requested'
//                                       ? 'bg-danger'
//                                       : 'bg-warning text-dark'
//                                 }`}
//                               >
//                                 {item.status}
//                               </span>
//                             )
//                           )}
//                         </>
//                       )}

//                       {item.description && (
//                         <p className="text-muted small mt-2">
//                           📌 {item.description}
//                         </p>
//                       )}
//                       {item.files?.map((file, fileIndex) => (
//                         <div key={fileIndex} className="mb-3 position-relative">
//                           {file?.url?.endsWith('.pdf') ? (
//                             <div className="d-flex align-items-center gap-2">
//                               <a
//                                 href={file.url}
//                                 download={file.public_id}
//                                 className="btn btn-outline-primary btn-sm"
//                               >
//                                 📥 Download PDF
//                               </a>
//                             </div>
//                           ) : (
//                             <>
//                               <img
//                                 src={file.url}
//                                 alt={`preview-${fileIndex}`}
//                                 className="img-fluid rounded cursor-pointer border"
//                                 onClick={() => handleImageClick(file.url)}
//                                 style={{
//                                   objectFit: 'contain',
//                                   maxHeight: '250px',
//                                 }}
//                               />
//                               <a
//                                 href={file.url}
//                                 download
//                                 className="btn btn-outline-primary btn-lg mt-2"
//                               >
//                                 📥
//                               </a>
//                             </>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardBody>
//           </Card>
//         </ModalBody>
//       </Modal>

//       {/* Image Preview Modal */}
//       <Modal isOpen={modalOpen} toggle={toggleImageModal} centered>
//         <ModalHeader toggle={toggleImageModal}>Image Preview</ModalHeader>
//         <ModalBody>
//           {selectedImage && (
//             <img
//               src={selectedImage}
//               alt="Preview"
//               className="img-fluid rounded mx-auto d-block"
//               style={{ objectFit: 'contain', maxHeight: '80vh' }}
//             />
//           )}
//         </ModalBody>
//       </Modal>

//       {/* Upload Modal */}
//       <ApplicationDocumentUpload
//         isOpen={uploadModalOpen}
//         onClose={() => {
//           setUploadModalOpen(false);
//           singleGetApplicationRefetch();
//         }}
//         applicationId={applicationId}
//         applicationDocumentId={documentToUploadTo?._id}
//         onUploadSuccess={() => singleGetApplicationRefetch()}
//       />
//     </>
//   );
// };

// export default ApplicationDocumentsModal;
