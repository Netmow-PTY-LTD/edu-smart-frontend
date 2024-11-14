import Script from 'next/script';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Loader from '../Loader';

const SaveChangesModal = ({
  toggle,
  isOpen,
  title,
  leftBtn,
  rightBtn,
  middleBtn,
  handleSubmit,
  loading,
  id,
}) => {
  return (
    <Modal isOpen={isOpen} centered={true}>
      <ModalHeader className="fs-1" toggle={toggle}>
        {title}
      </ModalHeader>
      <ModalBody>
        <div className="mt-2 text-center">
          <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
          {title === 'Upgrade This Package' ? (
            <lord-icon
              src="https://cdn.lordicon.com/afchdjfd.json"
              trigger="loop"
              delay="2000"
              colors="primary:#162a73,secondary:#9344e8"
              style={{ width: '100px', height: '100px' }}
            ></lord-icon>
          ) : (
            ''
          )}

          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4 className="fs-2">Are you sure ?</h4>
            <p className="text-muted mx-4 mb-0">
              Are you sure you want to {title} ?
            </p>
          </div>
        </div>

        <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
          {leftBtn ? (
            <button
              type="button"
              className="button text-light fs-2 px-3 py-1"
              data-bs-dismiss="modal"
              onClick={toggle}
            >
              {leftBtn}
            </button>
          ) : (
            ''
          )}

          {middleBtn ? (
            <button
              type="button"
              className="second-btn text-light fs-2 px-3 py-1 "
              data-bs-dismiss="modal"
              onClick={toggle}
            >
              {middleBtn}
            </button>
          ) : (
            ''
          )}

          {rightBtn ? (
            loading ? (
              <Loader />
            ) : (
              <button
                type="button"
                className="button text-light fs-2 px-3"
                onClick={() => handleSubmit(id)}
              >
                {rightBtn}
              </button>
            )
          ) : (
            ''
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SaveChangesModal;
