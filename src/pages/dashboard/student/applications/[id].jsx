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
