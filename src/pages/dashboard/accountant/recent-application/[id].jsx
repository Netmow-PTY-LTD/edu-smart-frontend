/* eslint-disable @next/next/no-img-element */
import ApplicationDocumentUpload from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/ApplicationDocumentUpload';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import Layout from '@/components/layout';
import { useUpdateApplicationDocumentDocMutation } from '@/slice/services/common/commonDocumentService';
import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useCustomData } from '@/utils/common/data/customeData';
import { downloadFilesAsPDF } from '@/utils/dwonloadFilesAsPdf';
import { useAddEmgsTimelineMutation, useGetRecentApplicationsQuery, useUpdateApplicationStatusMutation } from '@/slice/services/common/applicationService';

const SingleApplicationsPage = () => {
  const router = useRouter();
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
  } = useSingleGetApplicationQuery(router?.query?.id);

  const [updateDocument] = useUpdateApplicationDocumentDocMutation();

  const documentFiles = singleGetApplicationData?.data?.documents ?? [];

  const allFileUrls = documentFiles
    .flatMap((doc) => (doc.files ?? []).map((file) => file.url))
    .filter(Boolean);

  console.log('All File URLs:', allFileUrls);

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



  console.log("singleGetApplicationData", singleGetApplicationData?.data?.status);




  const toggleModal = () => setModalOpen(!modalOpen);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    toggleModal();
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

  // ✨ NEW: Download all files as one PDF

  const handleDownloadAllDocument = () => {
    if (!allFileUrls) {
      toast.error('No documents available to download');
      return;
    }
    // 'Downloading all documents as a single PDF...
    downloadFilesAsPDF(
      allFileUrls,
      'Downloading all documents as a single PDF...'
    );
  };

    const {
      data: recentApplicationData,
      isLoading: recentApplicationLoading,
      refetch: recentApplicationRefetch,
    } = useGetRecentApplicationsQuery();
  
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
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

        window.location.reload(); // ✅ Reload after timeline added


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

  const statusOrder = ['review_in', 'file_requested', 'ready_for_emgs'];
const currentStatus = singleGetApplicationData?.data?.status;

const isStatusReached = (status) => {
  return statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus);
};


  if (singleGetApplicationLoading) return <div>Loading...</div>;
  return (
    <Layout>
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">

            



            <Card>
              <h1 className="py-4 px-3 text-capitalize text-primary fw-semibold border-bottom">
                📄 All Submitted Documents
              </h1>
              <CardBody>
                {/* Upload & Download Section */}
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



                       {customData?.paneltext !== 'agent' && customData?.paneltext !== 'student' && (
                          <>
                            <button
                              onClick={() =>
                                handleChangeApplicationStatus({
                                  id: singleGetApplicationData?.data?._id,
                                  status: 'review_in',
                                  emgs_id: singleGetApplicationData?.data?.emgs_status,
                                })
                              }
                              className={`btn d-flex align-items-center ${
                                currentStatus === 'review_in' ? 'btn-success' : 'btn-outline-primary'
                              }`}
                              disabled={isStatusReached('review_in')}
                            >
                              <i className="ri-search-eye-line me-2"></i>
                              Review In
                            </button>

                            <button
                              onClick={() =>
                                handleChangeApplicationStatus({
                                  id: singleGetApplicationData?.data?._id,
                                  status: 'file_requested',
                                  emgs_id: singleGetApplicationData?.data?.emgs_status,
                                })
                              }
                              className={`btn d-flex align-items-center ${
                                currentStatus === 'file_requested' ? 'btn-success' : 'btn-outline-primary'
                              }`}
                              disabled={isStatusReached('file_requested')}
                            >
                              <i className="ri-folder-received-line me-2"></i>
                              File Requested
                            </button>

                            <button
                              onClick={() =>
                                handleChangeApplicationStatus({
                                  id: singleGetApplicationData?.data?._id,
                                  status: 'ready_for_emgs',
                                  emgs_id: singleGetApplicationData?.data?.emgs_status,
                                })
                              }
                              className={`btn d-flex align-items-center ${
                                currentStatus === 'ready_for_emgs' ? 'btn-success' : 'btn-outline-primary'
                              }`}
                              disabled={isStatusReached('ready_for_emgs')}
                            >
                              <i className="ri-send-plane-line me-2"></i>
                              Ready For EMGS
                            </button>
                            </>
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

                {/* Documents Section */}
                <div className="row">
                  {documents.map((item, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-5">
                      <div className="p-3 border rounded shadow-sm h-100">
                        <div className="mb-3">
                          <h5 className="text-primary fw-semibold text-capitalize">
                            {item?.title?.split('[')[0]?.replace(/[_/]/g, ' ')}
                          </h5>
                        </div>

                        {/* Editable Fields */}
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

                        {/* Description and Files */}
                        {item.description && (
                          <p className="text-muted small mt-2">
                            📌 {item.description}
                          </p>
                        )}
                        {item.files?.map((file, fileIndex) => (
                          <div
                            key={fileIndex}
                            className="mb-3 position-relative"
                          >
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
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>Image Preview</ModalHeader>
        <ModalBody>
          {selectedImage && (
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={selectedImage}
                alt="Preview"
                className="img-fluid rounded"
                style={{ objectFit: 'contain', maxHeight: '80vh' }}
              />
            </div>
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
        applicationId={router?.query?.id}
        applicationDocumentId={documentToUploadTo?._id}
        onUploadSuccess={() => router.replace(router.asPath)}
      />

      <style jsx>{`
        .page-content {
          font-size: 2rem; /* Double the base font size */
        }
        /* Buttons bigger font */
        button.btn {
          font-size: 1.5rem;
        }
        /* Badge bigger font */
        .badge {
          font-size: 1.25rem;
        }
        /* Increase textarea and select font */
        textarea,
        select,
        input {
          font-size: 1.5rem;
        }
        /* Increase heading sizes */
        h1 {
          font-size: 3rem;
        }
        h5 {
          font-size: 2.2rem;
        }
        /* Paragraph */
        p {
          font-size: 1.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default SingleApplicationsPage;

// /* eslint-disable @next/next/no-img-element */
// import ApplicationDocumentUpload from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/ApplicationDocumentUpload';
// import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
// import Layout from '@/components/layout';
// import { useUpdateApplicationDocumentDocMutation } from '@/slice/services/common/commonDocumentService';
// import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardBody,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Input,
// } from 'reactstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import { useCustomData } from '@/utils/common/data/customeData';
// import jsPDF from 'jspdf'; // ✨ NEW
// import { downloadFilesAsPDF } from '@/utils/dwonloadFilesAsPdf';

// const SingleApplicationsPage = () => {
//   const router = useRouter();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const customData = useCustomData();

//   const {
//     data: singleGetApplicationData,
//     isLoading: singleGetApplicationLoading,
//     refetch: singleGetApplicationRefetch,
//   } = useSingleGetApplicationQuery(router?.query?.id);

//   const [updateDocument] = useUpdateApplicationDocumentDocMutation();

//   const documentFiles = singleGetApplicationData?.data?.documents ?? [];

//   const allFileUrls = documentFiles
//     .flatMap((doc) => (doc.files ?? []).map((file) => file.url))
//     .filter(Boolean);

//   console.log('All File URLs:', allFileUrls);

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

//   const toggleModal = () => setModalOpen(!modalOpen);

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     toggleModal();
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

//   // ✨ NEW: Download all files as one PDF

//   const handleDownloadAllDocument = () => {
//     if (!allFileUrls) {
//       toast.error('No documents available to download');
//       return;
//     }
//     // 'Downloading all documents as a single PDF...
//     downloadFilesAsPDF(
//       allFileUrls,
//       'Downloading all documents as a single PDF...'
//     );
//   };

//   if (singleGetApplicationLoading) return <div>Loading...</div>;

//   return (
//     <Layout>
//       <ToastContainer />
//       <div className="page-content">
//         <div className="container-fluid">
//           <div className="h-100">
//             <Card>
//               <h1 className="py-4 px-3 text-capitalize text-primary fw-semibold border-bottom">
//                 📄 All Submitted Documents
//               </h1>
//               <CardBody>
//                 {/* Upload & Download Section */}
//                 <div className="d-flex justify-content-between align-items-center my-4 flex-wrap gap-3">
//                   <div className="text-center">
//                     <h5 className="text-primary fw-bold mb-3">
//                       Upload New Documents
//                     </h5>
//                     <button
//                       className="btn btn-lg btn-outline-primary"
//                       onClick={() => setUploadModalOpen(true)}
//                     >
//                       ➕ Upload Document
//                     </button>
//                   </div>
//                   <div>
//                     <button
//                       className="btn btn-lg btn-success"
//                       onClick={handleDownloadAllDocument}
//                     >
//                       📥 Download All Files as PDF
//                     </button>
//                   </div>
//                 </div>

//                 {/* Documents Section */}
//                 <div className="row">
//                   {documents.map((item, index) => (
//                     <div key={index} className="col-md-6 col-lg-4 mb-5">
//                       <div className="p-3 border rounded shadow-sm h-100">
//                         <div className="mb-3">
//                           <h5 className="text-primary fw-semibold text-capitalize">
//                             {item?.title?.split('[')[0]?.replace(/[_/]/g, ' ')}
//                           </h5>
//                         </div>

//                         {/* Editable Fields */}
//                         {editingIndex === index ? (
//                           <>
//                             <Input
//                               type="textarea"
//                               value={item.description}
//                               onChange={(e) => {
//                                 const updatedDocs = [...documents];
//                                 updatedDocs[index].description = e.target.value;
//                                 setDocuments(updatedDocs);
//                               }}
//                               placeholder="Enter description"
//                               className="mb-2"
//                             />
//                             <Input
//                               type="select"
//                               value={item.status}
//                               onChange={(e) => {
//                                 const updatedDocs = [...documents];
//                                 updatedDocs[index].status = e.target.value;
//                                 setDocuments(updatedDocs);
//                               }}
//                               className="mb-3"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="requested">Requested</option>
//                               <option value="rejected">Rejected</option>
//                               <option value="approved">Approved</option>
//                             </Input>
//                             <div className="d-flex gap-2">
//                               <button
//                                 className="btn btn-success w-100"
//                                 onClick={() => handleSubmitChange(index)}
//                               >
//                                 ✅ Submit
//                               </button>
//                               <button
//                                 className="btn btn-outline-secondary w-100"
//                                 onClick={() => setEditingIndex(null)}
//                               >
//                                 ❌ Cancel
//                               </button>
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             {customData.paneltext !== 'student' ? (
//                               <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <button
//                                   className="btn btn-outline-dark"
//                                   onClick={() => setEditingIndex(index)}
//                                 >
//                                   ✏️ Request Change
//                                 </button>
//                                 <span
//                                   className={`badge rounded-pill px-3 py-2 fs-6 ${
//                                     item.status === 'pending'
//                                       ? 'bg-warning text-dark'
//                                       : item.status === 'approved'
//                                         ? 'bg-success'
//                                         : item.status === 'requested'
//                                           ? 'bg-danger'
//                                           : 'bg-secondary'
//                                   }`}
//                                 >
//                                   {item.status}
//                                 </span>
//                               </div>
//                             ) : (
//                               (item.status === 'requested' ||
//                                 item.status !== 'pending') && (
//                                 <span
//                                   className={`badge rounded-pill px-3 py-2 fs-6 ${
//                                     item.status === 'approved'
//                                       ? 'bg-success'
//                                       : item.status === 'requested'
//                                         ? 'bg-danger'
//                                         : 'bg-warning text-dark'
//                                   }`}
//                                 >
//                                   {item.status}
//                                 </span>
//                               )
//                             )}
//                           </>
//                         )}

//                         {/* Description and Files */}
//                         {item.description && (
//                           <p className="text-muted small mt-2">
//                             📌 {item.description}
//                           </p>
//                         )}
//                         {item.files?.map((file, fileIndex) => (
//                           <div key={fileIndex} className="mb-3">
//                             {file?.url?.endsWith('.pdf') ? (
//                               <a
//                                 href={file.url}
//                                 download={file.public_id}
//                                 className="btn btn-outline-primary btn-sm"
//                               >
//                                 📥 Download PDF
//                               </a>
//                             ) : (
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
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       <Modal isOpen={modalOpen} toggle={toggleModal} centered>
//         <ModalHeader toggle={toggleModal}>Image Preview</ModalHeader>
//         <ModalBody>
//           {selectedImage && (
//             <div className="d-flex justify-content-center align-items-center">
//               <img
//                 src={selectedImage}
//                 alt="Preview"
//                 className="img-fluid rounded"
//                 style={{ objectFit: 'contain', maxHeight: '80vh' }}
//               />
//             </div>
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
//         applicationId={router?.query?.id}
//         applicationDocumentId={documentToUploadTo?._id}
//         onUploadSuccess={() => router.replace(router.asPath)}
//       />
//     </Layout>
//   );
// };

// export default SingleApplicationsPage;

// /* eslint-disable @next/next/no-img-element */
// import ApplicationDocumentUpload from '@/components/agentDashboard/studentManagement/singleStudentProfile/modal/ApplicationDocumentUpload';
// import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
// import Layout from '@/components/layout';
// import { useUpdateApplicationDocumentDocMutation } from '@/slice/services/common/commonDocumentService';
// import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardBody,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Input,
// } from 'reactstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import { useCustomData } from '@/utils/common/data/customeData';

// const SingleApplicationsPage = () => {
//   const router = useRouter();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const customData = useCustomData();

//   const {
//     data: singleGetApplicationData,
//     isLoading: singleGetApplicationLoading,
//     refetch: singleGetApplicationRefetch,
//   } = useSingleGetApplicationQuery(router?.query?.id);

//   const [updateDocument] = useUpdateApplicationDocumentDocMutation();

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

//   const toggleModal = () => setModalOpen(!modalOpen);

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     toggleModal();
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

//   if (singleGetApplicationLoading) return <div>Loading...</div>;

//   return (
//     <Layout>
//       <ToastContainer />
//       <div className="page-content">
//         <div className="container-fluid">
//           <div className="h-100">
//             <Card>
//               <h1 className="py-4 px-3 text-capitalize text-primary fw-semibold">
//                 All Submitted Documents
//               </h1>
//               <CardBody className="mh-100">
//                 {/* Upload Section */}
//                 <div className="d-flex justify-content-center">
//                   <div className="mb-4">
//                     <h5 className="text-primary fw-semibold">
//                       Upload New Documents
//                     </h5>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => setUploadModalOpen(true)}
//                     >
//                       Upload Document
//                     </button>
//                   </div>
//                 </div>

//                 {/* Documents */}
//                 <div className="row">
//                   {documents.map((item, index) => (
//                     <div key={index} className="col-md-4 mb-4">
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
//                             className="mb-2"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="requested">Requested</option>
//                             <option value="rejected">Rejected</option>
//                             <option value="approved">Approved</option>
//                           </Input>

//                           <div className="d-flex gap-2 mb-2">
//                             <button
//                               className="button px-4 py-3 fw-bold btn btn-secondary"
//                               onClick={() => handleSubmitChange(index)}
//                             >
//                               Submit
//                             </button>
//                             <button
//                               className="btn btn-secondary btn-sm"
//                               onClick={() => setEditingIndex(null)}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           {customData.paneltext !== 'student' ? (
//                             <>
//                               <div className="d-flex align-items-center gap-3">
//                                 <button
//                                   className="button px-4 py-3 fw-bold btn btn-secondary"
//                                   onClick={() => setEditingIndex(index)}
//                                   style={{ height: '38px' }} // optional: to keep consistent height if needed
//                                 >
//                                   Request Change
//                                 </button>

//                                 {item.status === 'pending' ? (
//                                   <span className="badge bg-warning text-dark text-capitalize">
//                                     Submitted
//                                   </span>
//                                 ) : item.status === 'requested' ||
//                                   item.status === 'rejected' ? (
//                                   <span className="badge bg-danger text-capitalize">
//                                     {item.status}
//                                   </span>
//                                 ) : (
//                                   <span className="badge bg-warning text-dark text-capitalize">
//                                     {item.status}
//                                   </span>
//                                 )}
//                               </div>
//                             </>
//                           ) : (
//                             // Show status if status is 'requested' OR status is NOT 'pending'
//                             (item.status === 'requested' ||
//                               item.status !== 'pending') && (
//                               <span className="badge bg-warning text-dark text-capitalize">
//                                 {item.status}
//                               </span>
//                             )
//                           )}
//                         </>
//                       )}

//                       <h5 className="fs-2 text-capitalize text-primary fw-semibold">
//                         {item?.title
//                           ?.split('[')[0]
//                           ?.split('_')
//                           .join(' ')
//                           ?.split('/')
//                           .join(' ')}
//                       </h5>

//                       {/* Show description above each image/file */}
//                       {item.files?.map((file, fileIndex) => (
//                         <div key={fileIndex} className="file-preview mb-3">
//                           {item.description && (
//                             <p
//                               className="text-muted mb-1"
//                               style={{ fontSize: '1.5rem' }}
//                             >
//                               {item.description}
//                             </p>
//                           )}

//                           {file?.url?.endsWith('.pdf') ? (
//                             <a
//                               href={file.url}
//                               download={file.public_id}
//                               className="btn btn-link"
//                             >
//                               Download PDF
//                             </a>
//                           ) : (
//                             <img
//                               src={file.url}
//                               alt={`file-preview-${fileIndex}`}
//                               width="100%"
//                               height="auto"
//                               onClick={() => handleImageClick(file.url)}
//                               className="cursor-pointer rounded"
//                               style={{ objectFit: 'contain' }}
//                             />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       <Modal isOpen={modalOpen} toggle={toggleModal} centered>
//         <ModalHeader toggle={toggleModal}>Image Preview</ModalHeader>
//         <ModalBody>
//           {selectedImage && (
//             <div className="d-flex justify-content-center align-items-center">
//               <img
//                 src={selectedImage}
//                 alt="Selected"
//                 className="img-fluid"
//                 style={{
//                   maxWidth: '100%',
//                   maxHeight: '100%',
//                   objectFit: 'contain',
//                 }}
//               />
//             </div>
//           )}
//         </ModalBody>
//       </Modal>

//       <ApplicationDocumentUpload
//         isOpen={uploadModalOpen}
//         onClose={() => {
//           setUploadModalOpen(false);
//           singleGetApplicationRefetch();
//         }}
//         applicationId={router?.query?.id}
//         applicationDocumentId={documentToUploadTo?._id}
//         onUploadSuccess={() => router.replace(router.asPath)}
//       />
//     </Layout>
//   );
// };

// export default SingleApplicationsPage;
