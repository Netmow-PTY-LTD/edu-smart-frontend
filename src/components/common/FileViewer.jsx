import Image from 'next/image';
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
    <div className="flex-inline">
      {/* File Preview Buttons */}
      {files?.length > 0 ? (
        files.map((file, index) => (
          <button
            key={index}
            className="button fw-bold fs-4 me-2 px-3 py-1 "
            onClick={() => handlePreview(file.url)}
          >
            Preview
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
                  <Image
                    src={selectedFile}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="rounded shadow-sm"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    priority
                  />
                )
              ) : (
                <p>No file selected</p>
              )}

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
