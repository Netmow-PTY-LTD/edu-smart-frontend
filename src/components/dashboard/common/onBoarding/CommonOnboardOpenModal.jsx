/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const CommonOnboardOpenModal = ({
  isOpen,
  toggle,
  title,
  img,
  startTheTourHandler,
  contentTitle,
}) => {
  return (
    <Modal isOpen={isOpen} centered size="lg" style={{ width: '600px' }}>
      <ModalHeader
        className="onbording-modal-header fs-1 fw-bold "
        toggle={toggle}
      >
        <p
          style={{
            color: '#03076A',
            fontSize: '26px',
            fontWeight: 600,
          }}
        >
          {title}
        </p>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 p-4">
        <div className="df fs-18 fw-medium">
          {contentTitle}
          <div className="d-flex align-items-center justify-content-center my-4">
            <img className="w-100" src={img} alt="" />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="p-4">
        <div className="d-flex align-items-center justify-content-between w-100">
          <span
            style={{
              color: '#162a73',
            }}
            className="text-decoration-underline fs-2 fw-semibold"
          >
            I will explore myself
          </span>
          <button
            onClick={() => startTheTourHandler(title)}
            className="button p-4 text-white text-capitalize d-flex align-items-center justify-content-center gap-4"
          >
            <span>Start the tour</span>
            <i className="ri-arrow-right-line fs-1"></i>
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default CommonOnboardOpenModal;
