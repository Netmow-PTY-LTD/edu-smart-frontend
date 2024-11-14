import React from 'react';
import { Form, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

const ContactMessageViewModal = ({ isOpen, toggle, data }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader className="fs-1 fw-bolder" toggle={toggle}>
        <h5 className="modal-title mb-0">View Contact Message </h5>
      </ModalHeader>
      <ModalBody>
        <Form>
          <div className="mb-4">
            <Label htmlFor="sender-name" className="form-label">
              Sender Name
            </Label>
            <Input
              type="text"
              className="form-control"
              id="sender-name"
              placeholder="sender name"
              value={data?.name}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="sender-email" className="form-label">
              Sender Email
            </Label>
            <Input
              type="text"
              className="form-control"
              id="sender-email"
              placeholder="sender email"
              value={data?.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="subject" className="form-label">
              Subject
            </Label>
            <Input
              type="text"
              className="form-control"
              id="subject"
              placeholder="subject"
              value={data?.subject}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="date" className="form-label">
              Date
            </Label>
            <Input
              type="text"
              className="form-control"
              id="date"
              placeholder="date"
              value={data?.createdAt}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="phone" className="form-label">
              Phone No.
            </Label>
            <Input
              type="text"
              className="form-control"
              id="phone"
              placeholder="phone"
              value={data?.phone}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="message" className="form-label">
              Message
            </Label>
            <textarea className="form-control" readOnly>
              {data?.message}
            </textarea>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ContactMessageViewModal;
