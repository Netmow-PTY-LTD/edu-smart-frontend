import {
  getAllCnameSettings,
  updateCnameSettings,
} from '@/slices/dashboard/adminDashboard/Actions/cnameRecordActions';
import {
  getAlladdDNSSettings,
  updateDnsSettings,
} from '@/slices/dashboard/adminDashboard/Actions/dnsRecordActions';
import {
  getAlladdNSSettings,
  updateNsSettings,
} from '@/slices/dashboard/adminDashboard/Actions/nsRecordActions';
import {
  emptyUpdateCnameSettings,
  emptyUpdateDnsSettings,
  emptyUpdateNsSettings,
} from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import Loader from '../Loader';

const EditDnsManagementModal = ({
  modal_edit,
  setModal_edit,
  title,
  Btn,
  id,
}) => {
  const [formData, setFormData] = useState({
    host_name: '',
    value: '',
  });

  const dispatch = useDispatch();

  const {
    data: updateDnsData,
    isLoading: updateDnsIsLoading,
    error: updateDnsError,
  } = useSelector((state) => state.AdminDashboard.updateDnsSettings);

  useEffect(() => {
    if (updateDnsData?.message && updateDnsError === null) {
      dispatch(emptyUpdateDnsSettings());
      dispatch(getAlladdDNSSettings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateDnsData?.message, updateDnsError]);

  const {
    data: updateNsData,
    isLoading: updateNsIsLoading,
    error: updateNsError,
  } = useSelector((state) => state.AdminDashboard.updateNsSettings);

  useEffect(() => {
    if (updateNsData?.message && updateNsError === null) {
      dispatch(emptyUpdateNsSettings());
      dispatch(getAlladdNSSettings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateNsData?.message, updateNsError]);

  const {
    data: updateCnameData,
    isLoading: updateCnameIsLoading,
    error: updateCnameError,
  } = useSelector((state) => state.AdminDashboard.updateCnameSettings);

  useEffect(() => {
    if (updateCnameData?.message && updateCnameError === null) {
      dispatch(emptyUpdateCnameSettings());
      dispatch(getAllCnameSettings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateCnameData?.message, updateCnameError]);

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDNSSubmit = (e) => {
    e.preventDefault();

    let dnsAllData = {};
    if (formData?.host_name) {
      dnsAllData = { ...dnsAllData, host_name: formData?.host_name };
    }
    if (formData?.value) {
      dnsAllData = { ...dnsAllData, value: formData?.value };
    }

    const dnsMainData = { ...dnsAllData, id: id };

    dispatch(updateDnsSettings(dnsMainData)).then(() => {
      resetForm();
    });
  };

  const handleNSSubmit = (e) => {
    e.preventDefault();
    let nsAllData = {};
    if (formData?.host_name) {
      nsAllData = { ...nsAllData, host_name: formData?.host_name };
    }
    if (formData?.value) {
      nsAllData = { ...nsAllData, value: formData?.value };
    }

    const nsMainData = { ...nsAllData, id: id };

    dispatch(updateNsSettings(nsMainData)).then(() => {
      resetForm();
    });
  };

  const handleCNameSubmit = (e) => {
    e.preventDefault();
    let cnameAllData = {};
    if (formData?.host_name) {
      cnameAllData = { ...cnameAllData, host_name: formData?.host_name };
    }
    if (formData?.value) {
      cnameAllData = { ...cnameAllData, value: formData?.value };
    }

    const cnameMainData = { ...cnameAllData, id: id };

    dispatch(updateCnameSettings(cnameMainData)).then(() => {
      resetForm();
    });
  };

  // close button function
  const resetForm = () => {
    setFormData({
      host_name: '',
      value: '',
    });

    setModal_edit(!modal_edit);
  };

  return (
    <Modal isOpen={modal_edit} centered={true}>
      <ModalHeader className="fs-1" toggle={resetForm}>
        <h4 className="fs-1">{title}</h4>
      </ModalHeader>
      <ModalBody className="">
        <Form id="dnsManagement-form">
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Label htmlFor="host_nameInput" className="form-label fs-3">
                  Host Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="host_nameInput"
                  placeholder="Enter a name"
                  name="host_name"
                  value={formData.host_name}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Label htmlFor="valueInput" className="form-label fs-3">
                  Value
                </Label>
                <Input
                  type="number"
                  className="form-control"
                  id="valueInput"
                  placeholder="Enter a value "
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
          </Row>
        </Form>
        {title === 'Update DNS Record' ? (
          <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
            {updateDnsIsLoading ? (
              <Loader />
            ) : (
              <button
                disabled={updateDnsIsLoading}
                type="button"
                className="button text-light fs-2 p-3"
                data-bs-dismiss="modal"
                onClick={handleDNSSubmit}
              >
                {Btn}
              </button>
            )}
          </div>
        ) : (
          ''
        )}
        {title === 'Update NS Record' ? (
          <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
            {updateNsIsLoading ? (
              <Loader />
            ) : (
              <button
                disabled={updateNsIsLoading}
                type="button"
                className="button text-light fs-2 p-3"
                data-bs-dismiss="modal"
                onClick={handleNSSubmit}
              >
                {Btn}
              </button>
            )}
          </div>
        ) : (
          ''
        )}
        {title === 'Update Cname Record' ? (
          <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
            {updateCnameIsLoading ? (
              <Loader />
            ) : (
              <button
                disabled={updateCnameIsLoading}
                type="button"
                className="button text-light fs-2 p-3"
                data-bs-dismiss="modal"
                onClick={handleCNameSubmit}
              >
                {Btn}
              </button>
            )}
          </div>
        ) : (
          ''
        )}
      </ModalBody>
    </Modal>
  );
};

export default EditDnsManagementModal;
