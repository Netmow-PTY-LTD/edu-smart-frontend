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


  console.log("applicationId", applicationId);

  const {
    data: singleGetApplicationData,
    isLoading: singleGetApplicationLoading,
    refetch: singleGetApplicationRefetch,
  } = useSingleGetApplicationQuery(applicationId);

  const [updateDocument] = useUpdateApplicationDocumentDocMutation();
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const [addEmgsTimeline] = useAddEmgsTimelineMutation();
  const {
    refetch: recentApplicationRefetch,
  } = useGetRecentApplicationsQuery();

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

  const handleDownloadAllDocument = () => {
    if (!allFileUrls) {
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
