import React, { useMemo } from 'react';
import ReactSelect from 'react-select';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';
import { Form, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Loader from '../Loader';

const CountryWiseChargeModal = ({
  openModal,
  closeModal,
  title,
  formData,
  handleInputChange,
  errors,
  loading,
  handleSubmit,
  changeCountryHandler,
  currency,
  submitBtn,
}) => {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <>
      <Modal isOpen={openModal} centered size="md">
        <ModalHeader toggle={closeModal}>{title}</ModalHeader>
        <ModalBody>
          <ToastContainer />
          <Form>
            <div className="mb-4">
              <Label htmlFor="category-title" className="form-label">
                Select Country
              </Label>

              <ReactSelect
                options={options}
                onChange={changeCountryHandler}
                required
              />
              {errors?.country && (
                <div className="text-danger fs-3 mt-2">{errors?.country}</div>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="chargeInput" className="form-label">
                Charge
              </Label>
              <input
                type="number"
                className="form-control fw-semibold fs-4"
                id="chargeInput"
                name="charge"
                onChange={handleInputChange}
                required
              />
              {errors?.charge && (
                <div className="text-danger fs-3 mt-2">{errors?.charge}</div>
              )}
            </div>
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
            <div className="flex align-items-center justify-content-center hstack w-100">
              {loading ? (
                <Loader />
              ) : (
                <button
                  disabled={loading}
                  type="button"
                  onClick={handleSubmit}
                  className=" d- mx-auto button p-2 text-white fs-4 "
                >
                  {submitBtn}
                </button>
              )}
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CountryWiseChargeModal;
