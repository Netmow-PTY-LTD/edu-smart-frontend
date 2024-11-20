import Script from 'next/script';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Loader from '../constants/Loader/Loader';

const DeleteModal = ({
  Open,
  close,
  id,
  handleDelete,
  gid,
  deleteBtn,
  handleSpecialDutyRosterDelete,
  inactive,
  isloading,
}) => {
  return (
    <Modal fade={true} isOpen={Open} toggle={close} centered={true}>
      <ModalBody className="py-5">
        <div className="mt-2 text-center">
          <Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="hover"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4 className="fs-2">Are you sure ?</h4>
            <p className="text-muted mx-4 mb-0">
              {inactive
                ? 'Are you sure you want to make this record inactive?'
                : 'Are you sure you want to remove this record?'}
            </p>
          </div>
        </div>
        <div className="d-flex gap-4 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light fs-2"
            data-bs-dismiss="modal"
            onClick={close}
          >
            Close
          </button>

          {deleteBtn === 'specialEvents' ? (
            isloading ? (
              <Loader />
            ) : (
              <button
                type="button"
                className="btn w-sm btn-danger fs-2"
                id="delete-record"
                onClick={() => handleSpecialDutyRosterDelete(id, gid)}
              >
                Yes, Delete It !
              </button>
            )
          ) : isloading ? (
            <Loader />
          ) : (
            <button
              type="button"
              className="btn w-sm btn-danger fs-2"
              id="delete-record"
              onClick={() => handleDelete(id, gid)}
            >
              {inactive ? 'Yes, Make It Inactive' : 'Yes, Delete It !'}
            </button>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
