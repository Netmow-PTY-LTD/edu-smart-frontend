import { singleContactMessageForSAdmin } from '@/slices/dashboard/superAdminDashboard/superAdminActions/contactMessageActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from 'reactstrap';

const ContactMsgDetailsModal = ({ openModal, setOpenModal, id }) => {
  const dispatch = useDispatch();
  const [contactMsg, setContactMsg] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(singleContactMessageForSAdmin(id));
      setContactMsg(response.payload);
    };
    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  return (
    <>
      <Modal isOpen={openModal} centered={true} size="xl">
        <div className="modal-header">
          <h5 className="fs-2 w-100">VIEW MESSAGE</h5>
          <button
            type="button"
            onClick={() => setOpenModal(!openModal)}
            className="btn-close fs-1"
          ></button>
        </div>
        <ModalBody>
          <Card className="card">
            <CardBody className="card-body">
              <Row>
                <Col xl={6}>
                  <FormGroup className="form-group">
                    <Label for="field-2" className="control-label">
                      SENDER NAME
                    </Label>
                    <Input
                      disabled
                      type="text"
                      className="form-control"
                      value={contactMsg?.name}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col xl={6}>
                  <FormGroup className="form-group">
                    <Label for="field-1" className="control-label">
                      SUBJECT
                    </Label>
                    <Input
                      disabled
                      type="text"
                      className="form-control"
                      value={contactMsg?.subject}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={4}>
                  <FormGroup className="form-group">
                    <Label for="field-1" className="control-label">
                      EMAIL
                    </Label>
                    <Input
                      disabled
                      type="text"
                      className="form-control"
                      value={contactMsg?.email}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={4}>
                  <FormGroup className="form-group">
                    <Label for="field-2" className="control-label">
                      DATE
                    </Label>

                    <Input
                      disabled
                      type="text"
                      className="form-control"
                      value={
                        new Date(contactMsg?.createdAt).toLocaleDateString(
                          'en-US',
                          { year: 'numeric', month: 'short', day: '2-digit' }
                        ) +
                        ' ' +
                        new Date(contactMsg?.createdAt).toLocaleTimeString(
                          'en-US',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )
                      }
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={4}>
                  <FormGroup className="form-group">
                    <Label for="field-1" className="control-label">
                      PHONE NO.
                    </Label>
                    <Input
                      disabled
                      type="text"
                      className="form-control"
                      value={contactMsg?.phone}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={12}>
                  <FormGroup className="form-group">
                    <Label for="field-1" className="control-label">
                      MESSAGE
                    </Label>
                    <textarea
                      disabled
                      type="text"
                      className="form-control h-100"
                      value={contactMsg?.message}
                      rows="15"
                      readOnly
                    ></textarea>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContactMsgDetailsModal;
