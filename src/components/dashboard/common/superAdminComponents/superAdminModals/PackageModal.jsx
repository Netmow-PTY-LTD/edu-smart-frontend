/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react';
import ReactSelect from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from 'reactstrap';
import Loader from '../../Loader';

const PackageModal = ({
  openModal,
  title,
  formData,
  handleInputChange,
  errors,
  handleSelect,
  handleSubmit,
  Btn,
  resetForm,
  isLoading,
  id,
  data,
  countryChangeHandler,
  currency,
  fieldCount,
  setFieldCount,
  subscriptions,
  setSubscriptions,
  editFieldCount,
  setEditFieldCount,
}) => {
  const options = useMemo(() => countryList().getData(), []);

  const renderFields = () => {
    const subscriptionData = subscriptions;

    return subscriptionData?.map((subscription, i) => (
      <React.Fragment key={i}>
        <div className="d-flex align-items-center justify-content-center text-danger my-3">
          NOTE: Can Select Multiple Country, Currency And Package Fee.
        </div>

        <Col lg={4}>
          <div className="mb-3">
            <Label htmlFor={`countryInput-${i}`} className="form-label">
              Country
            </Label>
            <ReactSelect
              options={options}
              onChange={(selectedOption) =>
                countryChangeHandler(selectedOption, i)
              }
              value={options.find(
                (option) => option.label === subscription?.country
              )}
              required
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb-3">
            <label htmlFor={`currency-${i}`} className="form-label">
              Currency
            </label>
            <input
              disabled
              type="text"
              className="form-control fw-semibold fs-4"
              id={`currency-${i}`}
              value={subscription?.currency || ''}
              readOnly
            />
          </div>
        </Col>

        <Col lg={4}>
          <div className="mb-3">
            <Label htmlFor={`packageFeeInput-${i}`} className="form-label fs-3">
              Package Fee
            </Label>
            <Input
              type="text"
              name={`packageFee-${i}`}
              className="form-control"
              id={`packageFeeInput-${i}`}
              placeholder="Enter a fee"
              value={subscription?.price || ''}
              onChange={(e) => handleInputChange(e, i)}
            />
            {errors?.subscription_fees && (
              <div className="text-danger fs-3 my-2">
                {errors.subscription_fees}
              </div>
            )}
          </div>
        </Col>
      </React.Fragment>
    ));
  };

  const handleAddField = (e) => {
    e.preventDefault();

    const newId =
      subscriptions.length > 0
        ? Math.max(...subscriptions.map((sub) => sub.id)) + 1
        : 1;

    const newSubscription = {
      id: newId,
      country: '',
      currency: '',
      price: '',
    };

    if (title === 'Edit Package') {
      setEditFieldCount((prevCount) => prevCount + 1);
    } else {
      setFieldCount((prevCount) => prevCount + 1);
    }

    setSubscriptions((prevSubscriptions) => [
      ...prevSubscriptions,
      newSubscription,
    ]);
  };

  const handleRemoveField = (e) => {
    e.preventDefault();

    if (subscriptions.length > 1) {
      if (title === 'Edit Package') {
        setEditFieldCount((prevCount) => prevCount - 1);
      } else {
        setFieldCount((prevCount) => prevCount - 1);
      }

      const newArray = subscriptions.slice(0, subscriptions.length - 1);
      setSubscriptions(newArray);
    }
  };

  return (
    <>
      <Modal isOpen={openModal} centered={true} size="xl" scrollable>
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <ModalBody className="">
          <ToastContainer />
          <Form>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="nameInput" className="form-label fs-3">
                    Package Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder="Enter a name"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                  />
                  {errors?.name && (
                    <div className="text-danger fs-3 my-2">{errors?.name}</div>
                  )}
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="serial_no" className="form-label fs-3">
                    Serial No
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="serial_no"
                    placeholder="Enter serial no"
                    name="serial_no"
                    value={formData?.serial_no || data?.serial_no}
                    onChange={handleInputChange}
                  />
                  {errors?.serial_no && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.serial_no}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="custompriceInput" className="form-label fs-3">
                    Custom Price
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="custompriceInput"
                    placeholder="Enter a name"
                    name="price"
                    value={formData?.price || data?.price}
                    onChange={handleInputChange}
                  />
                  {errors?.price && (
                    <div className="text-danger fs-3 my-2">{errors?.price}</div>
                  )}
                </div>
              </Col>

              <Col xl={4}>
                <div className="mb-3">
                  <Label htmlFor="teamsInput" className="form-label fs-3">
                    Teams
                  </Label>
                  <div>
                    <Input
                      type="text"
                      className="fs-4"
                      placeholder="Enter Name"
                      id="teamsInput"
                      name="num_of_team"
                      value={formData?.num_of_team || data?.num_of_team}
                      onChange={handleInputChange}
                    />
                    {errors?.num_of_team && (
                      <div className="text-danger fs-3 my-2">
                        {errors?.num_of_team}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col xl={4}>
                <div className="mb-3">
                  <Label htmlFor="playeresInput" className="form-label fs-3">
                    Players
                  </Label>
                  <div>
                    <Input
                      type="text"
                      className="fs-4"
                      placeholder="Enter Name"
                      id="playeresInput"
                      name="num_of_player"
                      value={formData?.num_of_player || data?.num_of_player}
                      onChange={handleInputChange}
                    />
                    {errors?.num_of_player && (
                      <div className="text-danger fs-3 my-2">
                        {errors?.num_of_player}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="domainInput" className="form-label fs-3">
                    Domain{' '}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="domainInput"
                    placeholder="Enter a name"
                    name="domain"
                    value={formData?.domain || data?.domain}
                    onChange={handleInputChange}
                  />
                  {errors?.domain && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.domain}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="productsInput" className="form-label fs-3">
                    Products{' '}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="productsInput"
                    placeholder="Enter a name"
                    name="num_of_products"
                    value={formData?.num_of_products || data?.num_of_products}
                    onChange={handleInputChange}
                  />
                  {errors?.num_of_products && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.num_of_products}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="websiteInput" className="form-label fs-3">
                    Website
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="websiteInput"
                    placeholder="Enter a name"
                    name="website"
                    value={formData?.website || data?.website}
                    onChange={handleInputChange}
                  />
                  {errors?.website && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.website}
                    </div>
                  )}
                </div>
              </Col>
              {renderFields()}
              <Col xxl={12}>
                <div className="d-flex align-items-center justify-content-center gap-5 my-3">
                  <button
                    className="badge bg-success-subtle px-2 fs-4 text-success"
                    onClick={handleAddField}
                  >
                    Add Subscription Fees
                  </button>
                  <button
                    className="badge bg-danger-subtle px-2 fs-4 text-danger"
                    onClick={handleRemoveField}
                  >
                    Remove Subscription Fees
                  </button>
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="customInput" className="form-label fs-3">
                    Custom Website{' '}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="customInput"
                    placeholder="Enter a name"
                    name="custom_website"
                    value={formData?.custom_website || data?.custom_website}
                    onChange={handleInputChange}
                  />
                  {errors?.custom_website && (
                    <div className="text-danger fs-3 my-2">
                      {errors?.custom_website}
                    </div>
                  )}
                </div>
              </Col>
              <Col xl={6}>
                <div className="mb-3">
                  <Label htmlFor="imageInput" className="form-label fs-3">
                    Icon
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="imageInput"
                    name="icon"
                    onChange={handleInputChange}
                  />
                  {data?.icon ? (
                    <div>
                      <img
                        style={{
                          maxHeight: '70px',
                          marginTop: '10px',
                        }}
                        src={`/${data.icon}`}
                        alt=""
                      />
                    </div>
                  ) : formData?.icon ? (
                    <div>
                      <img
                        style={{
                          maxHeight: '70px',
                          marginTop: '10px',
                        }}
                        src={`/${formData.icon}`}
                        alt=""
                      />
                    </div>
                  ) : null}

                  {errors?.icon && (
                    <div className="text-danger fs-3 my-2">{errors?.icon}</div>
                  )}
                </div>
              </Col>
              <Col xl={4}>
                <FormGroup
                  switch
                  className="d-flex align-items-center justify-content-start ms-5"
                >
                  <Input
                    className="fs-1 me-3"
                    type="switch"
                    defaultChecked={
                      formData?.coach_management || data?.coach_management
                    }
                    name="coach_management"
                    onClick={(selected) => handleSelect('coach_management')}
                  />
                  <Label check className="fs-2 mt-2">
                    Coach
                  </Label>
                </FormGroup>
              </Col>
              <Col xl={4}>
                <FormGroup
                  switch
                  className="d-flex align-items-center justify-content-start ms-4"
                >
                  <Input
                    className="fs-1 me-3"
                    type="switch"
                    defaultChecked={
                      formData?.manager_management || data?.manager_management
                    }
                    name="manager_management"
                    onClick={(selected) => handleSelect('manager_management')}
                  />
                  <Label check className="fs-2 mt-2">
                    Manager
                  </Label>
                </FormGroup>
              </Col>
              <Col xl={4}>
                <FormGroup
                  switch
                  className="d-flex align-items-center justify-content-start ms-4"
                >
                  <Input
                    className="fs-1 me-3"
                    type="switch"
                    defaultChecked={formData?.ads || data?.ads}
                    onClick={(selected) => handleSelect('ads')}
                  />
                  <Label check className="fs-2 mt-2">
                    Ads
                  </Label>
                </FormGroup>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end mt-3">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button fs-2 p-3 text-light"
                      onClick={handleSubmit}
                    >
                      {Btn}
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PackageModal;
