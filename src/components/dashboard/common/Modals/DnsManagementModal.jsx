import {
  addCnameSettings,
  getAllCnameSettings,
} from '@/slices/dashboard/adminDashboard/Actions/cnameRecordActions';
import {
  addDNSSettings,
  getAlladdDNSSettings,
} from '@/slices/dashboard/adminDashboard/Actions/dnsRecordActions';
import {
  addNSSettings,
  getAlladdNSSettings,
} from '@/slices/dashboard/adminDashboard/Actions/nsRecordActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
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

const DnsManagementModal = ({ isOpen, toggle, title, Btn }) => {
  const [formData, setFormData] = useState({
    host_name: '',
    value: '',
  });

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the form error
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const dispatch = useDispatch();
  const {
    data: dnsData,
    isLoading: dnsIsLoading,
    error: dnsError,
  } = useSelector((state) => state.AdminDashboard.dnsSettings);
  const {
    data: nsData,
    isLoading: nsIsLoading,
    error: nsError,
  } = useSelector((state) => state.AdminDashboard.nsSettings);
  const {
    data: cnameData,
    isLoading: cnameIsLoading,
    error: cnameError,
  } = useSelector((state) => state.AdminDashboard.cnameSettings);

  // close button function
  const resetForm = () => {
    setFormData({
      host_name: '',
      value: '',
    });

    setErrors({});
    toggle();
  };

  useEffect(() => {
    if (dnsData?.message && dnsError === null) {
      // toast.success(dnsData?.message);
      dispatch(getAlladdDNSSettings());

      // resetForm();
    }
    // if (dnsError) {
    //   toast.error(dnsError);
    // }
  }, [dispatch, dnsData?.message, dnsError, formData]);

  useEffect(() => {
    if (nsData?.message && nsError === null) {
      // toast.success(nsData?.message);

      dispatch(getAlladdNSSettings());

      // toggle();
    }
    // if (nsError) {
    //   toast.error(nsError);
    // }
  }, [dispatch, formData, nsData?.message, nsError]);

  useEffect(() => {
    if (cnameData?.message && cnameError === null) {
      // toast.success(cnameData?.message);
      dispatch(getAllCnameSettings());
      // toggle();
    }
    // if (cnameError) {
    //   toast.error(cnameError);
    // }
  }, [cnameData?.message, cnameError, dispatch, formData]);

  const handleDNSSubmit = (e) => {
    e.preventDefault();


    // Perform form validation
    const newErrors = {};

    if (!formData.host_name) {
      newErrors.host_name = 'Host Name is required';
    }
    if (!formData.value) {
      newErrors.value = 'Value is required';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(addDNSSettings(formData));
      setTimeout(() => {
        resetForm();
      }, 500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleNSSubmit = (e) => {
    e.preventDefault();


    const newErrors = {};

    if (!formData.host_name) {
      newErrors.host_name = 'Host Name is required';
    }
    if (!formData.value) {
      newErrors.value = 'Value is required';
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(addNSSettings(formData));
      setTimeout(() => {
        resetForm();
      }, 500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCNameSubmit = (e) => {
    e.preventDefault();


    const newErrors = {};

    if (!formData.host_name) {
      newErrors.host_name = 'Host Name is required';
    }
    if (!formData.value) {
      newErrors.value = 'Value is required';
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(addCnameSettings(formData));
      setTimeout(() => {
        resetForm();
      }, 500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} centered={true}>
      <ModalHeader className="fs-1" toggle={toggle}>
        <h4 className="fs-1">{title}</h4>
      </ModalHeader>
      <ModalBody className="">
        <ToastContainer />
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
                {errors.host_name && (
                  <div className="text-danger fs-3">{errors.host_name}</div>
                )}
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
                {errors.value && (
                  <div className="text-danger fs-3">{errors.value}</div>
                )}
              </div>
            </Col>
          </Row>
        </Form>
        {title === 'DNS Record Add' ? (
          <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
            {dnsIsLoading ? (
              <Loader />
            ) : (
              <button
                disabled={dnsIsLoading}
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
        {title === 'NS Record Add' ? (
          <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
            {nsIsLoading ? (
              <Loader />
            ) : (
              <button
                disabled={nsIsLoading}
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
        {title === 'CNAME Record Add' ? (
          <div className="d-flex gap-4 justify-content-center mt-4 mb-4">
            {cnameIsLoading ? (
              <Loader />
            ) : (
              <button
                disabled={cnameIsLoading}
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

export default DnsManagementModal;
