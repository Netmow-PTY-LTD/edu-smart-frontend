import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Form, FieldArray } from 'formik';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { toast } from 'react-toastify';
import {
  useCreateUserDocRequestForAgentForAllMutation,
  useUpdateSingleDocumentForStudentByAllUserMutation,
} from '@/slice/services/common/commonDocumentService';

const AutoAcceptedDocumentUploadModal = ({
  isOpen,
  onClose,
  formHeader = 'Upload Documents',
  formSubmit = 'Upload',
  student_id,
}) => {
  const [createDocumentRequest] =
    useCreateUserDocRequestForAgentForAllMutation();
  const [submitSingleDocument] =
    useUpdateSingleDocumentForStudentByAllUserMutation();

  const handleUpload = async (documents, actions) => {
    try {
      const submited_date = new Date().toISOString();

      const requests = documents.map(async (doc) => {
        if (!doc.file) {
          throw new Error(`Missing file for document: ${doc.title}`);
        }

        // Step 1: Create document request
        const created = await createDocumentRequest({
          title: doc.title,
          description: '',
          // student_id,
          student_id:'67d2a2d425eb11e4e222b774',
          status: 'submitted',
          submited_date,
        }).unwrap();

        const id = created?.data?._id;
        if (!id) throw new Error('Missing document ID');

        // Step 2: Upload full form data
        const formData = new FormData();
        formData.append('id', id);
        formData.append('document', doc.file);
        formData.append('title', doc.title || '');
        formData.append('description', 'na');
        formData.append('status', 'accepted');
        formData.append('submited_date', submited_date);

        await submitSingleDocument(formData).unwrap();
        toast.success(`Uploaded: ${doc.title}`);
      });

      await Promise.all(requests);

      actions.setSubmitting(false);
      actions.resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || 'Upload failed!');
      actions.setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} centered size="xl">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{ documents: [] }}
          onSubmit={(values, actions) =>
            handleUpload(values.documents, actions)
          }
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <FieldArray name="documents">
                {({ push, remove }) => (
                  <>
                    {/* <Row className="mb-3">
                      <Col md={12}>
                        <button
                          type="button"
                          style={{ background: 'none' }}
                          onClick={() =>
                            document.getElementById('file-upload').click()
                          }
                        >
                          <i
                            className="ri-gallery-upload-fill"
                            style={{ fontSize: '4rem' }}
                          ></i>
                          <span className="ms-2 fs-5">Choose Files</span>
                        </button>

                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          hidden
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const newDocs = files.map((file) => ({
                              file,
                              title: file.name
                                .split('.')
                                .slice(0, -1)
                                .join('.'),
                            }));
                            setFieldValue('documents', [
                              ...values.documents,
                              ...newDocs,
                            ]);
                          }}
                        />
                      </Col>
                    </Row> */}

                    <Row className="mb-3">
                      <Col md={12}>
                        <div
                          onClick={() =>
                            document.getElementById('file-upload').click()
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDragEnter={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const files = Array.from(e.dataTransfer.files);
                            const newDocs = files.map((file) => ({
                              file,
                              title: file.name
                                .split('.')
                                .slice(0, -1)
                                .join('.'),
                            }));
                            setFieldValue('documents', [
                              ...values.documents,
                              ...newDocs,
                            ]);
                          }}
                          className="border border-2 border-dashed rounded p-5 d-flex flex-column justify-content-center align-items-center text-center cursor-pointer"
                          style={{
                            minHeight: '180px',
                            backgroundColor: '#f8f9fa',
                          }}
                        >
                          <i
                            className="ri-gallery-upload-fill"
                            style={{ fontSize: '4rem' }}
                          ></i>
                          <p className="mt-2 fs-5 fw-semibold">
                            Click or Drag & Drop to Upload Files
                          </p>
                        </div>

                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          hidden
                           accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt"
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const newDocs = files.map((file) => ({
                              file,
                              title: file.name
                                .split('.')
                                .slice(0, -1)
                                .join('.'),
                            }));
                            setFieldValue('documents', [
                              ...values.documents,
                              ...newDocs,
                            ]);
                          }}
                        />
                      </Col>
                    </Row>

                    <Row>
                      {values.documents.map((doc, index) => (
                        <Col md={3} key={index} className="mb-4">
                          <div className="border rounded p-2 h-100 d-flex flex-column justify-content-between">
                            <div>
                              <label className="form-label">
                                Document Title
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={doc.title}
                                onChange={(e) =>
                                  setFieldValue(
                                    `documents[${index}].title`,
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div className="mt-2">
                              {doc.file?.type?.startsWith('image/') ? (
                                <img
                                  src={URL.createObjectURL(doc.file)}
                                  alt="Preview"
                                  className="img-fluid rounded"
                                  style={{
                                    maxHeight: '150px',
                                    objectFit: 'cover',
                                  }}
                                />
                              ) : (
                                <p className="mt-2">📄 {doc.file?.name}</p>
                              )}
                            </div>

                            <button
                              type="button"
                              className="btn btn-sm btn-danger mt-2"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </Col>
                      ))}
                    </Row>

                    <Row>
                      <Col md={12} className="my-3 text-end">
                        <SubmitButton isSubmitting={isSubmitting}>
                          {formSubmit}
                        </SubmitButton>
                      </Col>
                    </Row>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AutoAcceptedDocumentUploadModal;
