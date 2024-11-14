import React from 'react';
import { Col } from 'reactstrap';
import Loader from '../Loader';

const ChangeEmail = ({
  header,
  title,
  setEmail,
  sendMail,
  errors,
  isLoading,
}) => {
  return (
    <>
      <Col lg={6}>
        <div>
          <div className="mt-5">
            <h5 className="fs-1 fw-bold">{header}</h5>
            <p className="text-muted fs-3">{title}</p>
          </div>

          <div className="mt-3">
            <form>
              <div className="mb-3">
                <label htmlFor="useremail" className="form-label fs-2 mb-1">
                  New Email <span className="text-danger ">*</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control fs-3 p-3 mb-2"
                  placeholder="Enter Your New Email Address"
                  required
                />
                {errors && <span className="text-danger fs-3">{errors}</span>}
              </div>

              <Col lg={12}>
                <div className="hstack my-5 justify-content-center">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      onClick={(e) => sendMail(e)}
                      type="button"
                      className="button p-3 text-light"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Col>
            </form>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ChangeEmail;
