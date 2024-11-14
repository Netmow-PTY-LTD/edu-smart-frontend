import { forgotPassword } from '@/slices/dashboard/adminDashboard/Actions/authActions';
import { emptyUpdateForgotPassword } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import Loader from './Loader';

const ForgotPasswordModal = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.forgotPassword
  );

  useEffect(() => {
    if (data?.message && error === null) {
      toast.success(data?.message);
      dispatch(emptyUpdateForgotPassword());
      setTimeout(() => {
        setOpenModal(!openModal);
        setEmail('');
      }, 1000);
    }
    if (error) {
      toast.error(error);
      dispatch(emptyUpdateForgotPassword());
    }
  }, [data?.message, dispatch, error, openModal, setOpenModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword({ email: email }));
  };

  return (
    <div>
      <Modal isOpen={openModal} centered>
        <ModalHeader className="fs-2" toggle={() => setOpenModal(!openModal)}>
          Forgot Password
        </ModalHeader>
        <ModalBody>
          <ToastContainer />
          <Form>
            <Row>
              <Col>
                <label htmlFor="username" className="form-label fs-2 pb-2">
                  User Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onPaste={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control fs-3 p-3"
                  placeholder="Enter Your Email"
                  required
                />
              </Col>
            </Row>
            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end mt-3">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    disabled={isLoading}
                    type="button"
                    className="button p-3 fs-4 text-light"
                    onClick={handleSubmit}
                  >
                    Sent
                  </button>
                )}
              </div>
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ForgotPasswordModal;
