/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Col, Form, Modal, ModalBody } from 'reactstrap';
import Loader from '../Loader';

const ImportDataModal = ({
  isOpen,
  handleCSVFileUploads,
  error,
  setError,
  setUploadsFile,
  csvIsLoading,
  handleImportClose,
  handleDownloadTemplateCSV,
  headTitle,
  noteData,
}) => {
  // this is for input csv file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadsFile(file);
    }
    setError('');
  };

  return (
    <>
      <Modal isOpen={isOpen} centered size="xl" scrollable>
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{headTitle}</h5>

          <button
            type="button"
            onClick={handleImportClose}
            className="btn-close fs-1"
          ></button>
        </div>

        <ModalBody>
          <ToastContainer />
          <div className="d-flex align-items-center justify-content-between fs-3 gap-2 my-3 mb-5">
            <p className="text-danger">
              {noteData}
              
            </p>
            <div
              onClick={handleDownloadTemplateCSV}
              className=" button p-3 text-white"
            >
              Demo CSV Template
              <i className="ri-download-2-fill ms-2 fs-1 fw-bold"></i>
            </div>
          </div>
          <Form>
            <Col xl={12} className="col-lg-12 mb-5">
              <div className="mb-3 fs-3">
                <label htmlFor="fileInput" className="form-label ">
                  Import File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept=".csv"
                />
                {error && <div className="text-danger mt-2">{error}</div>}
              </div>
            </Col>

            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end my-3">
                {csvIsLoading ? (
                  <Loader />
                ) : (
                  <button
                    disabled={csvIsLoading}
                    type="button"
                    className="button p-3 text-light fs-3"
                    onClick={handleCSVFileUploads}
                  >
                    Upload
                  </button>
                )}
              </div>
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ImportDataModal;
