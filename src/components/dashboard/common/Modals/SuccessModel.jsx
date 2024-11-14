import Script from 'next/script';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Loader from '../Loader';

const SuccessModel = ({
  title,
  secondTitle,
  rightBtn,
  leftBtn,
  backBtn,
  goToInvoice,
  id,
  paidByCashIsLoading,
  setAdd_success_modal,
  add_success_modal,
}) => {
  return (
    <div>
      <Modal
        id="success-Payment"
        tabIndex="-1"
        isOpen={add_success_modal}
        centered
      >
        <ModalBody className="text-center p-5 my-5">
          <div className="text-end">
            <button
              type="button"
              onClick={() => setAdd_success_modal(!add_success_modal)}
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
                width: '250px',
                height: '250px',
              }}
            ></lord-icon>

            <h4 className="mb-3 mt-4 fs-1">{title}</h4>
            <p className="text-muted fs-3 mb-4">{secondTitle}</p>
            <div className="hstack gap-3 justify-content-center fs-2 py-3 ">
              {leftBtn &&
                (paidByCashIsLoading ? (
                  <Loader />
                ) : (
                  <button
                    disabled={paidByCashIsLoading}
                    onClick={() => goToInvoice(id)}
                    className="button text-light p-3"
                  >
                    {leftBtn}
                  </button>
                ))}

              <button
                onClick={() => setAdd_success_modal(!add_success_modal)}
                className="button text-light p-3"
              >
                {rightBtn}
              </button>
            </div>
            {backBtn === 'no' ? (
              ''
            ) : (
              <div className="hstack gap-3 justify-content-center fs-2 py-3 ">
                <button
                  type="button"
                  onClick={() => setAdd_success_modal(!add_success_modal)}
                  className=" text-primary p-3"
                >
                  <i className="ri-arrow-left-line align-bottom text-muted pe-2"></i>
                  Back
                </button>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SuccessModel;
