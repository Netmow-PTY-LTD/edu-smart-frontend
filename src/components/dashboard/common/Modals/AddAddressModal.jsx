import React, { useState } from 'react';
import { Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddAddressModal = () => {
  const [modal, setModal] = useState(false);
  const togglemodal = () => {
    setModal(!modal);
  };
  return (
    <>
      {/* modal Add Address */}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={togglemodal}
      >
        <ModalHeader
          toggle={() => {
            setModal(!modal);
          }}
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Address
          </h5>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Name"
              />
            </div>

            <div className="mb-3">
              <Label for="addaddress-textarea" className="form-label">
                Address
              </Label>
              <textarea
                className="form-control"
                id="addaddress-textarea"
                placeholder="Enter Address"
                rows="2"
              ></textarea>
            </div>

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Phone
              </Label>
              <Input
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Phone No."
              />
            </div>

            <div className="mb-3">
              <Label for="state" className="form-label">
                Address Type
              </Label>
              <select className="form-select" id="state" data-plugin="choices">
                <option value="homeAddress">Home (7am to 10pm)</option>
                <option value="officeAddress">Office (11am to 7pm)</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Save
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddAddressModal;
