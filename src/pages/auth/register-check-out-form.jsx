import Loader from '@/components/dashboard/common/Loader';
import { stripePaymentForPackageByAdmin } from '@/slices/dashboard/adminDashboard/Actions/paymentActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import classnames from 'classnames';
import { countryToCurrencyData } from 'get-currency-by-country';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import countryList from 'react-select-country-list';
import {
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import StripePaymentForPackage from './stripe-payment-for-package';

const RegisterCheckOutForm = ({
  activeTab,
  toggleTab,
  formData,
  handleInputChange,
  errors,
  changeHandler,
  handleRegisterSubmit,
  total,
  stripeKeyData,
  registrationIsLoading,
  setSelectedCurrency,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripePromise = loadStripe(stripeKeyData?.stripeSettings?.stripe_key);

  const {
    data: stripePaymentData,
    isLoading: stripePaymentIsLoading,
    error: stripePaymentError,
  } = useSelector(
    (state) => state.AdminDashboard.stripePaymentForPackageByAdmin
  );

  useEffect(() => {
    dispatch(
      stripePaymentForPackageByAdmin({
        price: parseFloat(total),
      })
    );
  }, [dispatch, total]);

  console.log(formData?.country?.label);

  const allCountries = useMemo(() => countryList().getData(), []);
  const countryData =
    countryToCurrencyData[
      formData?.country?.label === 'Bangladesh' ? 'Bangladesh' : 'United States'
    ];
  const currency = countryData?.currency;

  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency, setSelectedCurrency]);

  const options = {
    clientSecret: stripePaymentData?.clientSecret,
  };

  return (
    <>
      <Card>
        <CardBody>
          <>
            <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
              <Nav
                pills
                className="nav nav-pills nav-justified custom-nav"
                role="tablist"
              >
                <NavItem role="presentation">
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames(
                      {
                        active: activeTab === 1,
                        done: activeTab <= 2 && activeTab > 0,
                      },
                      'p-3 fs-15'
                    )}
                    // onClick={() => {
                    //   toggleTab(1);
                    // }}
                  >
                    <i className="ri-bank-card-line fs-16 rounded-circle align-middle me-2">
                      {' '}
                    </i>
                    Personal Info
                  </NavLink>
                </NavItem>
                {total === 0 || total === '0.00' ? (
                  ''
                ) : (
                  <>
                    <NavItem role="presentation">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames(
                          {
                            active: activeTab === 2,
                            done: activeTab <= 3 && activeTab > 1,
                          },
                          'p-3 fs-15'
                        )}
                        // onClick={() => {
                        //   toggleTab(2);
                        // }}
                      >
                        <i className="ri-bank-card-line fs-16 rounded-circle align-middle me-2">
                          {' '}
                        </i>
                        Payment Info
                      </NavLink>
                    </NavItem>
                    <NavItem role="presentation">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames(
                          {
                            active: activeTab === 3,
                            done: activeTab <= 4 && activeTab > 2,
                          },
                          'p-3 fs-15'
                        )}
                        // onClick={() => {
                        //   toggleTab(3);
                        // }}
                      >
                        <i className="ri-checkbox-circle-line fs-16  rounded-circle align-middle me-2"></i>
                        Finish
                      </NavLink>
                    </NavItem>
                  </>
                )}
              </Nav>
            </div>

            <Row>
              <Col xxl={12}>
                <TabContent activeTab={activeTab} className="w-100">
                  <TabPane tabId={1} className="p-5">
                    <form>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="useremail" className="form-label">
                              Email
                            </Label>
                            <Input
                              type="email"
                              id="useremail"
                              className="form-control"
                              name="email"
                              value={formData?.email}
                              placeholder="Enter Your Email"
                              onChange={handleInputChange}
                              required
                            />
                            {errors.email && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label
                              htmlFor="password-input"
                              className="form-label"
                            >
                              Password
                            </Label>
                            <Input
                              type={passwordShow ? 'text' : 'password'}
                              id="password-input"
                              className="form-control"
                              name="password"
                              value={formData?.password}
                              placeholder="Enter Your Password"
                              onChange={handleInputChange}
                            />
                            {errors.password && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.password}
                              </div>
                            )}
                            <button
                              className="position-absolute end-0 top-0 pt-5  fs-2 text-decoration-none text-muted password-addon p-4"
                              type="button"
                              onClick={() => setPasswordShow(!passwordShow)}
                              style={{ backgroundColor: 'transparent' }}
                            >
                              <i
                                className={`${
                                  passwordShow
                                    ? 'ri-eye-off-line align-middle'
                                    : 'ri-eye-fill align-middle'
                                }`}
                              ></i>
                            </button>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Confirm Password
                            </Label>
                            <Input
                              type={confirmPasswordShow ? 'text' : 'password'}
                              id="confirmPassword"
                              className="form-control"
                              name="confirm_password"
                              value={formData?.confirm_password}
                              placeholder="Enter Your Confirm Password"
                              onChange={handleInputChange}
                            />
                            {errors.confirm_password && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.confirm_password}
                              </div>
                            )}
                            <button
                              className="position-absolute end-0 top-0 pt-5 fs-2 text-decoration-none text-muted password-addon p-4"
                              type="button"
                              onClick={() =>
                                setConfirmPasswordShow(!confirmPasswordShow)
                              }
                              style={{ backgroundColor: 'transparent' }}
                            >
                              <i
                                className={`${
                                  confirmPasswordShow
                                    ? 'ri-eye-off-line align-middle'
                                    : 'ri-eye-fill align-middle'
                                }`}
                              ></i>
                            </button>
                          </div>
                        </Col>

                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="firstName" className="form-label">
                              First Name
                            </Label>
                            <Input
                              type="text"
                              id="firstName"
                              className="form-control"
                              name="first_name"
                              value={formData?.first_name}
                              placeholder="Enter Your First Name"
                              onChange={handleInputChange}
                            />
                            {errors.first_name && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.first_name}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="lastName" className="form-label">
                              Last Name
                            </Label>
                            <Input
                              type="text"
                              id="lastName"
                              className="form-control"
                              name="last_name"
                              value={formData?.last_name}
                              placeholder="Enter Your last_name"
                              onChange={handleInputChange}
                            />
                            {errors.last_name && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.last_name}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="genderInput" className="form-label">
                              Gender
                            </Label>
                            <select
                              className="form-select"
                              id="genderInput"
                              name="gender"
                              value={formData?.gender}
                              onChange={handleInputChange}
                            >
                              <option>Please Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                            {errors.gender && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.gender}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={4}>
                          <div className="mb-3">
                            <Label
                              htmlFor="organisationName"
                              className="form-label"
                            >
                              Organisation name
                            </Label>
                            <Input
                              name="organisation_name"
                              value={formData?.organisation_name}
                              placeholder="Enter Your Organisation Name"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control fs-4"
                              id="organisationName"
                              required
                            />
                            {errors.organisation_name && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.organisation_name}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="subdomain" className="form-label">
                              Subdomain name (part of URL, cannot be changed)
                            </Label>
                            <Input
                              name="subdomain"
                              value={formData?.subdomain}
                              onChange={handleInputChange}
                              type="text"
                              className="form-control fs-4"
                              id="subdomain"
                              placeholder="Enter subdomain"
                              required
                            />
                            {errors.subdomain && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.subdomain}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="category" className="form-label">
                              Sports Category
                            </Label>

                            <select
                              name="sports_category"
                              value={formData?.sports_category}
                              id="category"
                              className="form-select fs-4 mb-4"
                              required
                              onChange={handleInputChange}
                            >
                              <option value={''}>Select Sports</option>
                              <option value="Baseball">Baseball</option>
                              <option value="Basketball">Basketball</option>
                              <option value="Cricket">Cricket</option>
                              <option value="Football">Football</option>
                              <option value="Boxing">Boxing</option>
                              <option value="Hockey">Hockey</option>
                              <option value="Netball">Netball</option>
                              <option value="Soccer">Soccer</option>
                              <option value="Rugby">Rugby</option>
                              <option value="Volleyball">Volleyball</option>
                              <option value="other">Other</option>
                            </select>

                            {formData?.sports_category === 'other' ? (
                              <Input
                                name="other_sports"
                                onChange={handleInputChange}
                                type="text"
                                className="form-control fs-4"
                                id="category"
                                placeholder="Enter Sports Name"
                                required
                              />
                            ) : (
                              ''
                            )}
                            {errors.sports_category ? (
                              <div className="text-danger fs-4 mt-1">
                                {errors.sports_category}
                              </div>
                            ) : formData?.sports_category === 'other' ? (
                              <div className="text-danger fs-4 mt-1">
                                {errors.other_sports}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="phone" className="form-label">
                              Work Phone
                            </Label>
                            <Input
                              name="phone"
                              value={formData?.phone}
                              onChange={handleInputChange}
                              type="number"
                              className="form-control fs-4"
                              id="phone"
                              placeholder="Enter work phone"
                              required
                            />
                            {errors.phone && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.phone}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="address_1" className="form-label">
                              Address Line 1
                            </Label>
                            <Input
                              name="address_line_1"
                              value={formData?.address_line_1}
                              onChange={handleInputChange}
                              type="text"
                              className="form-control fs-4"
                              id="address_1"
                              placeholder="Enter Your Addsess "
                              required
                            />
                            {errors.address_line_1 && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.address_line_1}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="address_1" className="form-label">
                              Address Line 2{/*  */}
                            </Label>
                            <Input
                              name="address_line_2"
                              value={formData?.address_line_2}
                              onChange={handleInputChange}
                              type="text"
                              className="form-control fs-4"
                              id="address_1"
                              placeholder="Enter Your Addsess "
                              // required
                            />
                            {errors.address_line_2 && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.address_line_2}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="city" className="form-label">
                              City
                            </Label>
                            <Input
                              name="city"
                              value={formData?.city}
                              onChange={handleInputChange}
                              type="text"
                              className="form-control fs-4"
                              id="city"
                              placeholder="Enter Your City"
                              required
                            />
                            {errors.city && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.city}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="state" className="form-label">
                              State
                            </Label>
                            <Input
                              name="state"
                              value={formData?.state}
                              onChange={handleInputChange}
                              type="text"
                              className="form-control fs-4"
                              id="state"
                              placeholder="Enter State"
                              required
                            />
                            {errors.state && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.state}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="zip" className="form-label">
                              Zip Code
                            </Label>
                            <Input
                              name="zip"
                              value={formData?.zip}
                              onChange={handleInputChange}
                              type="number"
                              className="form-control fs-4"
                              id="zip"
                              placeholder="Enter Zip Code"
                              required
                            />
                            {errors.zip && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.zip}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={4}>
                          <div className="mb-3">
                            <Label
                              htmlFor="countryInput"
                              className="form-label"
                            >
                              Country
                            </Label>

                            <ReactSelect
                              isDisabled={
                                router?.query?.country ? formData?.country : ''
                              }
                              className="fs-2"
                              options={allCountries}
                              value={formData?.country}
                              onChange={changeHandler}
                              required
                            />
                            {errors.country && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.country}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="currency" className="form-label">
                              Currency
                            </Label>
                            <Input
                              disabled
                              type="text"
                              className="form-control fw-semibold fs-4"
                              id="currency"
                              value={currency}
                              placeholder="By Selecting Country You Can See Currency"
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <label htmlFor="regFeeInput" className="form-label">
                              Player Registration Fee
                            </label>
                            <input
                              name="reg_fee"
                              value={formData?.reg_fee}
                              onChange={handleInputChange}
                              type="number"
                              className="form-control fs-4"
                              id="regFeeInput"
                              placeholder="Enter Reg Fee"
                              required
                            />
                            {errors.reg_fee && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.reg_fee}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="mb-3 form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="termsCheck"
                              name="terms"
                              checked={formData?.terms || false}
                              onChange={handleInputChange}
                              required
                            />
                            <label
                              className="form-check-label fs-4"
                              htmlFor="termsCheck"
                            >
                              I agree to the{' '}
                              <a href="/terms-and-conditions" target="_blank">
                                Terms and Conditions
                              </a>
                            </label>
                            {errors.terms && (
                              <div className="text-danger fs-4 mt-1">
                                {errors.terms}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>

                      <div className="hstack d-flex align-items-center justify-content-end mt-4">
                        {registrationIsLoading ? (
                          <Loader />
                        ) : (
                          <button
                            onClick={(e) => handleRegisterSubmit(e)}
                            type="submit"
                            className="button px-3 py-2 text-light fs-2 right ms-auto"
                            disabled={registrationIsLoading}
                          >
                            {total === 0 || total === '0.00'
                              ? 'Register'
                              : 'Next'}
                            {total === 0 || total === '0.00' ? (
                              ''
                            ) : (
                              <i className="ri-skip-right-line ps-2"></i>
                            )}
                          </button>
                        )}
                      </div>
                    </form>
                  </TabPane>
                  {total === 0 || total === '0.00' ? (
                    ''
                  ) : (
                    <>
                      <TabPane tabId={2} className="p-3 ">
                        <Row>
                          {options?.clientSecret && (
                            <Elements stripe={stripePromise} options={options}>
                              <StripePaymentForPackage
                                activeTab={activeTab}
                                toggleTab={toggleTab}
                                loading={loading}
                                setLoading={setLoading}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                                formData={formData}
                              />
                            </Elements>
                          )}
                        </Row>
                      </TabPane>

                      {/* Payment Finished Message   */}
                      <TabPane tabId={3} id="pills-finish">
                        <div className="text-center py-5 w-100">
                          <div className="mb-4">
                            <Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
                            <lord-icon
                              src="https://cdn.lordicon.com/lupuorrc.json"
                              trigger="loop"
                              style={{
                                width: '150px',
                                height: '150px',
                              }}
                            ></lord-icon>
                          </div>
                          <h5 className="fs-2">
                            Thank you ! Your Payment is Completed !
                          </h5>
                          <p className="text-muted">
                            You will receive an confirmation email with details
                            of your order.
                          </p>
                        </div>
                      </TabPane>
                    </>
                  )}
                </TabContent>
              </Col>
            </Row>
          </>
        </CardBody>
      </Card>
    </>
  );
};

export default RegisterCheckOutForm;
