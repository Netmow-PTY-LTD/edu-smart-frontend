import React, { useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch } from 'react-redux';
import ReactSelect from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';
import { Col, Input, Label, Row } from 'reactstrap';

const DetailsInfo = ({
  userInfo,
  setUserInfo,
  handleAllUserRegistration,
  subdomain,
  handleInputChange,
  handledate_of_birthChange,
  changeHandler,
  isLoading,
  currency,
  errorMessage,
  locationName,
  setLocationName,
  socialRef,
}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const [locationString, setLocationString] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const currencyOption = [{ label: 'USD', value: 'USD' }];

  console.log(socialRef);

  return (
    <>
      <div className="fs-3">
        <ToastContainer />
        <div className="m-5">
          <div>
            <h5 className="quote-color fs-22 pb-2 fw-semibold text-secondary-alt">
              Let’s fill the form to complete your registration successfully.
            </h5>
            <p className="text-danger text-bold">* All Fields Are Required</p>
          </div>

          <div className="mt-3">
            <form
              onSubmit={(e) => handleAllUserRegistration(e)}
              className="needs-validation"
            >
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      name="first_name"
                      onChange={handleInputChange}
                      type="text"
                      className="form-control fs-4"
                      id="firstName"
                      placeholder="Enter Your First Name"
                      value={
                        socialRef ? userInfo?.first_name : userInfo?.first_name
                      }
                      disabled={socialRef ? true : false}
                      required
                    />
                    <div className="invalid-feedback">Name is required</div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                      Last Name
                    </label>
                    <input
                      name="last_name"
                      onChange={handleInputChange}
                      type="text"
                      className="form-control fs-4"
                      id="last_name"
                      placeholder="Enter Your Last Name"
                      value={
                        socialRef ? userInfo?.last_name : userInfo?.last_name
                      }
                      disabled={socialRef ? true : false}
                      required
                    />
                    <div className="invalid-feedback">Name is required</div>
                  </div>
                </Col>
                {subdomain === 'localhost' || !subdomain ? (
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="organisationName" className="form-label">
                        Team or Club Name <span className="text-danger">*</span>
                      </label>
                      <input
                        name="organisation_name"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control fs-4"
                        id="organisationName"
                        placeholder="Enter organisation name"
                        required
                      />
                      <div className="invalid-feedback">
                        Organisation name is required
                      </div>
                    </div>
                  </Col>
                ) : (
                  ''
                )}
                {subdomain === 'localhost' || !subdomain ? (
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="subdomain" className="form-label">
                        Subdomain name (part of URL, cannot be changed){' '}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name="subdomain"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control fs-4"
                        id="subdomain"
                        placeholder="Enter subdomain"
                        required
                      />
                      {errorMessage && (
                        <div className="text-danger mt-1">*{errorMessage}</div>
                      )}
                    </div>
                  </Col>
                ) : (
                  ''
                )}
                <Col md={6}>
                  <div className=" mb-3 w-100">
                    <div>
                      <label htmlFor="address_1" className="form-label">
                        Address Line 1 <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex align-items-center justify-content-between gap-4">
                        <Input
                          name="address_line_1"
                          onChange={handleInputChange}
                          value={
                            locationName?.street_number && locationName?.route
                              ? `${locationName?.street_number} ${locationName?.route}`
                              : userInfo?.address_line_1 || ''
                          }
                          type="text"
                          className="form-control fs-4"
                          id="address_1"
                          placeholder="Enter Your Address"
                          required
                          disabled={
                            locationName?.street_number && locationName?.route
                              ? true
                              : false
                          }
                        />

                        <i
                          onClick={() => setOpenModal(!openModal)}
                          style={{ width: '48px', padding: '8px 8px 8px 8px' }}
                          className="ri-map-pin-fill fs-1 button text-center text-white cursor-pointer"
                        ></i>
                      </div>
                      <div className="invalid-feedback">
                        Please enter Your Addsess
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="address_1" className="form-label">
                      Address Line 2
                      {/* <span className="text-danger">*</span> */}
                    </label>
                    <input
                      name="address_line_2"
                      onChange={handleInputChange}
                      type="text"
                      className="form-control fs-4"
                      id="address_1"
                      placeholder="Enter Your Addsess "
                      // required
                    />
                    <div className="invalid-feedback">
                      Please enter Your Addsess
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      name="city"
                      onChange={handleInputChange}
                      value={
                        locationName?.locality
                          ? `${locationName?.locality}`
                          : userInfo?.city || ''
                      }
                      disabled={locationName?.locality ? true : false}
                      type="text"
                      className="form-control fs-4"
                      id="city"
                      placeholder="Enter Your City"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter Your City
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      name="state"
                      onChange={handleInputChange}
                      value={
                        locationName?.administrative_area_level_1
                          ? `${locationName?.administrative_area_level_1}`
                          : userInfo?.state || ''
                      }
                      disabled={
                        locationName?.administrative_area_level_1 ? true : false
                      }
                      type="text"
                      className="form-control fs-4"
                      id="state"
                      placeholder="Enter State"
                      required
                    />
                    <div className="invalid-feedback">Please enter state </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="zip" className="form-label">
                      Zip Code <span className="text-danger">*</span>
                    </label>
                    <Input
                      name="zip"
                      onChange={handleInputChange}
                      value={
                        locationName?.postal_code
                          ? `${locationName?.postal_code} `
                          : userInfo?.zip || ''
                      }
                      disabled={locationName?.postal_code ? true : false}
                      type="text"
                      className="form-control fs-4"
                      id="zip"
                      placeholder="Enter Zip Code"
                      required
                    />

                    <div className="invalid-feedback">
                      Please enter Zip Code
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label htmlFor="countryInput" className="form-label">
                      Country <span className="text-danger">*</span>
                    </Label>

                    <ReactSelect
                      options={options}
                      value={
                        locationName?.country
                          ? {
                              label: locationName?.country,
                              value: locationName?.country,
                            }
                          : options.find(
                              (option) => option.label === userInfo?.country
                            ) || null
                      }
                      isDisabled={locationName?.country ? true : false}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Work Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      name="phone"
                      onChange={handleInputChange}
                      type="tel"
                      className="form-control fs-4"
                      id="phone"
                      placeholder="Enter work phone"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter work phone
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  {subdomain === 'localhost' || !subdomain ? (
                    <div className="mb-3">
                      <label htmlFor="regFeeInput" className="form-label">
                        Player Registration Fee{' '}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name="reg_fee"
                        onChange={handleInputChange}
                        type="number"
                        className="form-control fs-4"
                        id="regFeeInput"
                        placeholder="Enter Reg Fee"
                        required
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>

              <div className="mt-4 text-center">
                {isLoading ? (
                  <h2>Loading...</h2>
                ) : (
                  <input
                    disabled={isLoading}
                    type="submit"
                    value="Complete Registration"
                    className="btn button fs-2 fw-semibold text-secondary-alt"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsInfo;
