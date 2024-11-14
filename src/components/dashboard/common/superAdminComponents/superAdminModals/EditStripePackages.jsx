import Image from 'next/image';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from 'reactstrap';

const EditStripePackages = ({ openModal, setOpenModal, id }) => {
  const [formData, setFormData] = useState({
    plink_live: '',
    plink_test: '',
    buy_url_live: '',
    buy_url_test: '',
    plink_live_one: '',
    plink_test_one: '',
    buy_url_live_one: '',
    buy_url_test_one: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  return (
    <>
      <Modal isOpen={openModal} centered size="lg">
        <div className="modal-header">
          <h5 className="fs-2 w-100">Update Stripe Product</h5>
          <button
            type="button"
            onClick={() => setOpenModal(!openModal)}
            className="btn-close fs-2"
          ></button>
        </div>
        <ModalBody>
          <Card>
            <CardHeader className="d-flex ">
              <Image
                src={''}
                alt=""
                height={50}
                width={60}
                className=""
              ></Image>
              <h5 className="card-title ms-2 fs-1">Starter</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="plinkInput" className="form-label fs-3">
                        PLINK LIVE (USD)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="plinkInput"
                        placeholder="Enter a name"
                        name="plink_live"
                        value={formData?.plink_live}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="plinktestInput"
                        className="form-label fs-3"
                      >
                        PLINK Test (USD)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="plinktestInput"
                        placeholder="Enter a name"
                        name="plink_test"
                        value={formData?.plink_test}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="buyurlInput" className="form-label fs-3">
                        BUY URL LIVE (USD)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="buyurlInput"
                        placeholder="Enter a name"
                        name="buy_url_live"
                        value={formData?.buy_url_live}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="buyurltestInput"
                        className="form-label fs-3"
                      >
                        BUY URL Test (USD)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="buyurltestInput"
                        placeholder="Enter a name"
                        name="buy_url_test"
                        value={formData?.buy_url_test}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="plinkoneInput"
                        className="form-label fs-3"
                      >
                        PLINK LIVE (MYR)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="plinkoneInput"
                        placeholder="Enter a name"
                        name="plink_live_one"
                        value={formData?.plink_live_one}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="plinktestoneInput"
                        className="form-label fs-3"
                      >
                        PLINK TEST (MYR)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="plinktestoneInput"
                        placeholder="Enter a name"
                        name="plink_test_one"
                        value={formData?.plink_test_one}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="buyurloneInput"
                        className="form-label fs-3"
                      >
                        BUY URL LIVE (MYR)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="buyurloneInput"
                        placeholder="Enter a name"
                        name="buy_url_live_one"
                        value={formData?.buy_url_live_one}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="buyurltestoneInput"
                        className="form-label fs-3"
                      >
                        BUY URL TEST (MYR)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="buyurltestoneInput"
                        placeholder="Enter a name"
                        name="buy_url_test_one"
                        value={formData?.buy_url_test_one}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-center mt-3">
                      <button
                        type="button"
                        className="button p-3 text-light"
                        onClick={'handleSubmit'}
                      >
                        Update
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditStripePackages;
