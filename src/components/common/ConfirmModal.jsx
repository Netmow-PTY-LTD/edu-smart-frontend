import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Loader from '../constants/Loader/Loader';
import Image from 'next/image';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  isSuccess,
  title = 'Are you sure?',
  message = 'Do you want to proceed with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
}) => {
  return (
    <Modal fade={true} isOpen={isOpen} toggle={onClose} centered={true}>
      <ModalBody className="py-5">
        <div className="mt-2 text-center">
          <Image
            src="/assets/images/news-letter.jpg"
            alt="News Letter Image"
            width={100}
            height={100}
          />
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4 className="fs-2">{isSuccess ? 'Success!' : title}</h4>
            <p className="text-muted mx-4 mb-0">
              {isSuccess ? 'Your action was successful.' : message}
            </p>
          </div>
        </div>
        <div className="d-flex gap-4 justify-content-center mt-4 mb-2">
          {!isSuccess && (
            <button
              type="button"
              className="btn w-sm btn-light fs-2"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}

          {isLoading ? (
            <Loader />
          ) : isSuccess ? (
            <button
              type="button"
              className="btn w-sm btn-success fs-2"
              onClick={onClose}
            >
              Done
            </button>
          ) : (
            <button
              type="button"
              className={`btn w-sm btn-${confirmColor} fs-2`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmModal;
