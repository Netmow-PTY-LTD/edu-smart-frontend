import Link from 'next/link';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

const FileViewer = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggle = () => setOpenModal(!openModal);

  const handlePreview = (fileUrl) => {
    if (!fileUrl || typeof fileUrl !== 'string') {
      console.error('Invalid file URL!');
      return;
    }
    setSelectedFile(fileUrl);
    toggle();
  };

  return (
    <div>
      {/* File Preview Buttons */}
      {files?.length > 0 ? (
        files.map((file, index) => (
          <button
            key={index}
            className="button px-4 py-2 "
            onClick={() => handlePreview(file.url)}
          >
            Preview File
          </button>
        ))
      ) : (
        <p>No files found</p>
      )}

      {/* Modal for File Preview */}
      <Modal isOpen={openModal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>
          <h5>File Preview</h5>
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody className="text-center">
              {selectedFile ? (
                selectedFile.endsWith('.pdf') ? (
                  <iframe
                    src={`https://docs.google.com/gview?url=${selectedFile}&embedded=true`}
                    width="100%"
                    height="500px"
                    title="PDF Preview"
                  ></iframe>
                ) : (
                  <img
                    src={selectedFile}
                    alt="Preview"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )
              ) : (
                <p>No file selected</p>
              )}
              {/* Download Button at Bottom */}
              <div className="text-center p-3">
                <Link target="_blank" href={selectedFile}>
                  <Button
                    color="success"
                    className="button px-4 py-2 "
                    disabled={!selectedFile}
                  >
                    Download File
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FileViewer;
