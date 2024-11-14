/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Loader from './Loader';

const ProfileSettings = ({
  setFormData,
  formData,
  setErrors,
  errors,
  handleSubmit,
  isLoading,
  setCountry,
  country,
}) => {
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value ? value : '');
  };

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  useEffect(() => {
    if (userInfoData) {
      setFormData({
        first_name: userInfoData?.first_name,
        last_name: userInfoData?.last_name,
        gender: userInfoData?.gender,
        date_of_birth: userInfoData?.date_of_birth,
        height: userInfoData?.height,
        weight: userInfoData?.weight,
        email: userInfoData?.email,
        phone: userInfoData?.phone,
        address_line_1: userInfoData?.address_line_1,
        address_line_2: userInfoData?.address_line_2,
        city: userInfoData?.city,
        state: userInfoData?.state,
        zip: userInfoData?.zip,
      });

      setCountry({
        label: userInfoData?.country,
        value: userInfoData?.country,
      });
    }
  }, [setCountry, setFormData, userInfoData]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        userInfoData?.profile_image &&
        typeof userInfoData?.profile_image === 'object' &&
        userInfoData?.profile_image?.uploadedImage
      ) {
        try {
          const response = await fetch(
            userInfoData?.profile_image?.uploadedImage
          );
          const blob = await response.blob();
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
          const newData = {
            ...userInfoData,
            image: file,
          };
          setFormData(newData);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchData();
  }, [setFormData, userInfoData]);

  // handle date of birth change
  const handledate_of_birthChange = (selectedDates, dateStr) => {
    setFormData({
      ...formData,
      date_of_birth: dateStr,
    });
  };

  // for input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'height') {
      setFormData({
        ...formData,
        [name]: value.toString() + ' CM',
      });
    } else if (name === 'weight') {
      setFormData({
        ...formData,
        [name]: value.toString() + ' KG',
      });
    } else if (type === 'file') {
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

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="card-title">Profile Settings</CardHeader>
        <CardBody className="p-5">
          <ToastContainer />
          <Form>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="fullNameInput" className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="fullNameInput"
                    placeholder="Enter your first name"
                    name="first_name"
                    value={formData?.first_name}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="userName" className="form-label">
                    Last Name
                  </Label>
                  <Input
                    type={['text', 'number']}
                    className="form-control"
                    id="userName"
                    placeholder="Enter your last name"
                    name="last_name"
                    value={formData?.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              {userInfoData?.role === 'guardian' ? (
                ''
              ) : (
                <Col lg={6}>
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
                      onInput={handleInputChange}
                    >
                      <option value={formData?.gender}>
                        Selected : {formData?.gender}
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </Col>
              )}

              {userInfoData?.role === 'player' ? (
                <>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="date_of_birthInput"
                        className="form-label"
                      >
                        Date of Birth
                      </Label>
                      <Flatpickr
                        className="form-control"
                        options={{
                          dateFormat: 'd M, Y',
                        }}
                        value={formData?.date_of_birth}
                        onChange={handledate_of_birthChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="heightInput" className="form-label">
                        Height
                      </Label>
                      <div className="input-group">
                        <Input
                          onChange={handleInputChange}
                          onBlur={handleInputChange}
                          onFocus={handleInputChange}
                          type="number"
                          name="height"
                          className="form-control"
                          id="heightInput"
                          value={
                            formData?.height
                              ? formData?.height.replace(/\D/g, '').trim()
                              : ''
                          }
                        />
                        <span className="input-group-text fs-12">CM</span>
                      </div>
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="weightInput" className="form-label">
                        Weight
                      </Label>
                      <div className="input-group">
                        <Input
                          onChange={handleInputChange}
                          onBlur={handleInputChange}
                          onFocus={handleInputChange}
                          type="number"
                          name="weight"
                          className="form-control"
                          id="weightInput"
                          value={
                            formData?.weight
                              ? formData?.weight.replace(/\D/g, '').trim()
                              : ''
                          }
                        />
                        <span className="input-group-text fs-12">KG</span>
                      </div>
                    </div>
                  </Col>
                </>
              ) : (
                ''
              )}

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="email" className="form-label">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    readOnly
                    disabled
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phone" className="form-label">
                    Phone
                  </Label>
                  <Input
                    type={'tel'}
                    className="form-control"
                    id="phone"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>

              {userInfoData?.role === 'manager' ||
              userInfoData?.role === 'trainer' ? (
                ''
              ) : (
                <>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="addressliine1" className="form-label">
                        Address Line 1
                      </Label>
                      <Input
                        type={'text'}
                        className="form-control"
                        id="addressliine1"
                        placeholder="Enter your address 1"
                        name="address_line_1"
                        value={formData.address_line_1}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="addressliine1" className="form-label">
                        Address Line 2
                      </Label>
                      <Input
                        type={'text'}
                        className="form-control"
                        id="addressliine1"
                        placeholder="Enter your address 2"
                        name="address_line_2"
                        value={formData?.address_line_2}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="city" className="form-label">
                        City
                      </Label>
                      <Input
                        type={'text'}
                        className="form-control"
                        id="city"
                        placeholder="Enter your city"
                        name="city"
                        value={formData?.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="state" className="form-label">
                        State
                      </Label>
                      <Input
                        type={'text'}
                        className="form-control"
                        id="state"
                        placeholder="Enter your state"
                        name="state"
                        value={formData?.state}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="zip" className="form-label">
                        Zip
                      </Label>
                      <Input
                        type={'number'}
                        className="form-control"
                        id="zip"
                        placeholder="Enter your user name"
                        name="zip"
                        value={formData?.zip}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="countryInput" className="form-label">
                        Country
                      </Label>

                      <Select
                        options={options}
                        value={country}
                        onChange={changeHandler}
                      />
                    </div>
                  </Col>
                </>
              )}

              <Col xl={6} className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="imageInput" className="form-label">
                    Image{' '}
                    <small className="mb-2 fs-10 text-danger">
                      (Max. 300px X 300px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </small>
                  </label>
                  <Input
                    type="file"
                    className="form-control"
                    id="imageInput"
                    name="image"
                    onChange={handleInputChange}
                  />
                  {formData?.image && (
                    <div>
                      <img
                        src={
                          typeof formData?.image === 'string'
                            ? formData?.profile_image?.uploadedImage
                            : URL.createObjectURL(new Blob([formData?.image]))
                        }
                        alt="img"
                        style={{ maxHeight: '70px', marginTop: '10px' }}
                      />
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button p-3 text-light"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfileSettings;
