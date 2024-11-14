import React from 'react';
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

const RegisteredClientsDetails = ({ openModal, setOpenModal, id }) => {
  return (
    <>
      <Modal isOpen={openModal} centered={true} size="md">
        <div className="modal-header">
          <h5 className="fs-2 w-100">VIEW Details</h5>
          <button
            type="button"
            onClick={() => setOpenModal(!openModal)}
            className="btn-close fs-1"
          ></button>
        </div>
        <ModalBody>
          <Card class="card">
            <CardBody class="card-body">
              <Row>
                <Col xl={12}>
                  <FormGroup class="form-group">
                    <Label for="field-2" class="control-label">
                      Verify
                    </Label>
                    <Input
                      disabled
                      type="text"
                      class="form-control"
                      value={''}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col xl={12}>
                  <FormGroup class="form-group">
                    <Label for="field-1" class="control-label">
                      VES
                    </Label>
                    <Input
                      disabled
                      type="text"
                      class="form-control"
                      value={''}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={12}>
                  <FormGroup class="form-group">
                    <Label for="field-1" class="control-label">
                      GS Step
                    </Label>
                    <Input
                      disabled
                      type="text"
                      class="form-control"
                      value={''}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={12}>
                  <FormGroup class="form-group">
                    <Label for="field-2" class="control-label">
                      Status
                    </Label>

                    <Input
                      disabled
                      type="text"
                      class="form-control"
                      value={''}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={12}>
                  <FormGroup class="form-group">
                    <Label for="field-1" class="control-label">
                      Guardians
                    </Label>
                    <Input
                      disabled
                      type="text"
                      class="form-control"
                      value={''}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={12}>
                  <FormGroup class="form-group">
                    <Label for="field-1" class="control-label">
                      Players
                    </Label>
                    <Input
                      disabled
                      type="text"
                      class="form-control"
                      value={''}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col xl={12}>
                  <FormGroup class="form-group">
                    <Label for="field-1" class="control-label">
                      Products
                    </Label>
                    <Input
                      disabled
                      type="text"
                      class="form-control"
                      value={''}
                      readOnly
                    />
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

export default RegisteredClientsDetails;
