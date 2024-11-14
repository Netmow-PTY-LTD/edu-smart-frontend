import Script from 'next/script';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const CloseSuccessModal = ({
  closeSuccessModal,
  setCloseSuccessModal,
  title,
}) => {
  return (
    <div>
      {/* success modal */}
      <Modal
        id="success-Payment"
        tabIndex="-1"
        isOpen={closeSuccessModal}
        centered
      >
        <ModalBody className="text-center p-4 my-3">
          <div className="text-end">
            <button
              type="button"
              onClick={() => setCloseSuccessModal(!closeSuccessModal)}
              className="btn-close text-end fs-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="mt-2">
            <Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
            <lord-icon
              src="https://cdn.lordicon.com/lupuorrc.json"
              trigger="loop"
              style={{
                width: '150px',
                height: '150px',
              }}
            ></lord-icon>

            <h4 className="mb-3 mt-4 fs-1">{title}</h4>

            <div className="hstack gap-3 justify-content-center fs-2 py-3 ">
              <button
                type="button"
                onClick={() => setCloseSuccessModal(!closeSuccessModal)}
                className="button text-light p-3"
              >
                Close
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CloseSuccessModal;
