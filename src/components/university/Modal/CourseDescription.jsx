import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';

// CourseDescription Component
const CourseDescription = ({ isOpen, onClose, description }) => {
  return (
    <Modal
      isOpen={isOpen}
      centered
      size="lg"
      toggle={onClose}
      fullscreen
      style={{ zIndex: 1050 }} // Ensures modal is always on top
    >
      {/* Modal Header with Close Button */}
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        Course Description
      </ModalHeader>

      {/* Modal Body */}
      <ModalBody>
        <div
          className="description-text editor-container"
          style={{
            maxHeight: '80vh', // Enables scrolling for long descriptions
            overflowY: 'auto',
            paddingBottom: '60px', // Prevents content from overlapping sticky button
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Sticky Close Button */}
        <div
          className="text-end"
          style={{
            position: 'sticky',
            bottom: 0,
            background: 'white',
            padding: '10px',
            boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Creates visual separation
            zIndex: 1051, // Ensures button stays on top
          }}
        >
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CourseDescription;
