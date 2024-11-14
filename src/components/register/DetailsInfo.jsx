import React, { useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch } from 'react-redux';
import ReactSelect from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';
import { Input, Label } from 'reactstrap';
import Loader from '../dashboard/common/Loader';
import GoogleLocationModal from '../dashboard/common/Modals/GoogleLocationModal';

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
            <h5 className="quote-color fs-2 pb-2">
              {!subdomain
                ? "Let's get started to build your SquadDeck Team"
                : 'Enter your necessary information'}
            </h5>
            <p className="text-danger text-bold">* All Fields Are Required</p>
          </div>

          <div className="mt-3">
            <form
              onSubmit={(e) => handleAllUserRegistration(e)}
              className="needs-validation"
            >
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
                  value={socialRef ? userInfo?.last_name : userInfo?.last_name}
                  disabled={socialRef ? true : false}
                  required
                />
                <div className="invalid-feedback">Name is required</div>
              </div>

              {subdomain && userInfo?.user_role === 'player' ? (
                <div className="mb-3">
                  <label htmlFor="selectuser" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>

                  <select
                    id="selectuser"
                    className="form-select fs-4"
                    required
                    name="gender"
                    onChange={handleInputChange}
                  >
                    <option>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              ) : (
                ''
              )}
              {subdomain && userInfo?.user_role === 'player' ? (
                <div className="mb-3">
                  <Label htmlFor="date_of_birthInput" className="form-label">
                    Date of Birth
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    onChange={handledate_of_birthChange}
                    placeholder="Select Date"
                    required
                  />
                </div>
              ) : (
                ''
              )}
              {subdomain && userInfo?.user_role === 'player' ? (
                <div className="mb-3">
                  <Label htmlFor="heightInput" className="form-label">
                    Height
                  </Label>
                  <div className="input-group">
                    <input
                      name="height"
                      onChange={handleInputChange}
                      type="number"
                      id="heightInput"
                      className="form-control fs-4"
                      placeholder="Enter Height"
                      required
                    />
                    <span className="input-group-text fs-12">CM</span>
                  </div>
                </div>
              ) : (
                ''
              )}
              {subdomain && userInfo?.user_role === 'player' ? (
                <div className="mb-3">
                  <Label htmlFor="weightInput" className="form-label">
                    Weight
                  </Label>
                  <div className="input-group">
                    <input
                      name="weight"
                      onChange={handleInputChange}
                      type="number"
                      id="weightInput"
                      className="form-control fs-4"
                      placeholder="Enter Weight"
                      required
                    />
                    <span className="input-group-text fs-12">KG</span>
                  </div>
                </div>
              ) : (
                ''
              )}

              {/* {subdomain && userInfo?.user_role === 'player' ? (
               <div className="mb-3">
                 <Label htmlFor="jerseyNumberInput" className="form-label">
                   Jersey Number
                 </Label>
                 <div>
                   <input
                     type={'text'}
                     className="form-control"
                     id="jerseyNumberInput"
                     name="jersey_number"
                     onChange={handleInputChange}
                     placeholder="Enter Jersey No"
                   />
                 </div>
               </div>
             ) : (
               ''
             )} */}

              {subdomain === 'localhost' || !subdomain ? (
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
              ) : (
                ''
              )}

              {subdomain === 'localhost' || !subdomain ? (
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
              ) : (
                ''
              )}

              {subdomain === 'localhost' || !subdomain ? (
                <div className="mb-3">
                  <Label htmlFor="category" className="form-label">
                    Sports Category
                  </Label>
                  <select
                    name="sports_category"
                    value={userInfo?.sports_category}
                    id="category"
                    className="form-select fs-4 mb-4"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Sports</option>
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

                  {userInfo?.sports_category === 'other' ? (
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
                </div>
              ) : (
                ''
              )}

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
                  {
                    <GoogleLocationModal
                      open={openModal}
                      close={() => {
                        setOpenModal(!openModal);
                      }}
                      setLocationName={setLocationName}
                      locationName={locationName}
                      setLocationString={setLocationString}
                      locationString={locationString}
                    />
                  }
                  <div className="invalid-feedback">
                    Please enter Your Addsess
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address_1" className="form-label">
                  Address Line 2{/* <span className="text-danger">*</span> */}
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
                <div className="invalid-feedback">Please enter Your City</div>
              </div>

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

                <div className="invalid-feedback">Please enter Zip Code</div>
              </div>

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
                <div className="invalid-feedback">Please enter work phone</div>
              </div>

              {/* {subdomain === 'localhost' || (!subdomain && currency) ? (
               <div className="mb-3">
                 <label htmlFor="currency" className="form-label">
                   Currency
                 </label>
                 <input
                   disabled
                   type="text"
                   className="form-control fw-semibold fs-4"
                   id="currency"
                   value={currency}
                 />
               </div>
             ) : (
               ''
             )} */}
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

              <div className="mt-4 ">
                {isLoading ? (
                  <Loader />
                ) : (
                  <input
                    disabled={isLoading}
                    type="submit"
                    value="Register"
                    className="btn button text-light w-100 fs-2"
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
