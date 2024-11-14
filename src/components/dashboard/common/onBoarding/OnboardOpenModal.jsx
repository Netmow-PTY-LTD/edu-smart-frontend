import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const OnboardOpenModal = ({
  isOpen,
  toggle,
  handleLetsGo,
  talkToExpertHandler,
}) => {
  return (
    <Modal isOpen={isOpen} centered size="lg">
      <ModalHeader className="fs-1 px-5 py-4" toggle={toggle}>
        <p className="fs-1">Welcome To SquadDeck</p>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 p-5">
        <div className="fs-18 fw-medium">
          Unlock the full benefits of SquadDeck and maximize your exposure
          without missing any opportunities.
        </div>
        <div className="d-flex align-items-center justify-content-between p-5 third-color rounded-3">
          <div>
            <h1 className="qoute_color">Setup Club or Team & Brand Details</h1>
            <p className="qoute_color">
              Please provide your Club or Team & brand details.
            </p>
          </div>
          <button
            onClick={handleLetsGo}
            className="button text-white p-3 px-5 d-flex align-items-center rounded-4 lets-go"
          >
            Let's Go
            <i className="ri-arrow-right-line fs-1 ms-2" aria-hidden="true"></i>
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-5 p-5 text-dark rounded-3 bg-body">
          <div>
            <h1>Book An Appointment</h1>
            <p className="text-wrap">
              Contact our support team to discuss or take help from the support
              team.
            </p>
          </div>
          <button
            onClick={() => talkToExpertHandler()}
            className="btn py-4 px-5 fw-semibold text-nowrap d-flex align-items-center border border-2 text-dark border-primary rounded-4"
          >
            Talk To Expert
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default OnboardOpenModal;
