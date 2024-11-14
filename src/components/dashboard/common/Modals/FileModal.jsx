import Script from 'next/script';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const FileModal = ({ toggle, isOpen, title, leftBtn, rightBtn }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true}>
      <ModalHeader className="fs-1 p-5" toggle={toggle}></ModalHeader>
      <ModalBody className="py-5">
        <div className="mt-2 text-center">
          <Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
          <lord-icon
            src="https://cdn.lordicon.com/nocovwne.json"
            trigger="hover"
            style={{
              width: '170px',
              height: '170px',
            }}
          ></lord-icon>

          <div className="mt-4 pt-2 mx-4 mx-sm-5">
            <h4 className="fs-1">{title}</h4>
            {/* <p className="text-muted mx-4 mb-0">You want to export CSV file?</p> */}
          </div>
        </div>
        <div className="d-flex gap-4 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="button text-light fs-2 px-3"
            data-bs-dismiss="modal"
            onClick={toggle}
          >
            {leftBtn}
          </button>
          <button
            type="button"
            className="button text-light fs-2 px-3 py-1"
            data-bs-dismiss="modal"
            onClick={toggle}
          >
            {rightBtn}
          </button>
          {/* <CSVLink
            data={'data'}
            type="button"
            onClick={toggle}
            className="button text-center  text-light fs-3 w-sm pt-3  "
            id="delete-record"
          >
            
          </CSVLink> */}
        </div>
      </ModalBody>
    </Modal>
  );
};

FileModal.propTypes = {
  onCloseClick: PropTypes.func,
  data: PropTypes.any,
  show: PropTypes.any,
};

export default FileModal;
