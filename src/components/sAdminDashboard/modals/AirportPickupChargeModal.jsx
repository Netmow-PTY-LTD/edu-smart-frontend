import Loader from '@/components/constants/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

const AirportPickupChargeModal = ({
  openModal,
  closeModal,
  modalTitle,
  submitTitle,
  handleChangeAirportPichupCharge,
  applicationId,
  editPickupChargeData,
  isLoading,
  checkAirportPickupStatus,
}) => {
  const [chargeAmount, setChargeAmount] = useState('');
  const [selectStatus, setSelectStatus] = useState('');

  useEffect(() => {
    if (editPickupChargeData?.data?.airport_pickup_charge != null) {
      setChargeAmount(editPickupChargeData?.data?.airport_pickup_charge);
      setSelectStatus(
        editPickupChargeData?.data?.airport_pickup_invoice_status || 'active'
      );
    } else {
      setChargeAmount('');
      setSelectStatus('active');
    }
  }, [editPickupChargeData]);

  const handleChargeAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || !isNaN(value)) {
      setChargeAmount(value);
    }
  };

  const handleSelectStatusChange = (e) => {
    setSelectStatus(e.target.value);
  };

  return (
    <Modal isOpen={openModal} centered size="md">
      <ModalHeader toggle={closeModal}>{modalTitle}</ModalHeader>
      <ModalBody>
        <form onSubmit={handleChangeAirportPichupCharge}>
          <div className="mb-4">
            <Label className="fs-2" htmlFor="airport_pickup_charge">
              {' '}
              Charge Amount
            </Label>
            <input
              type="number"
              className="form-control fs-2"
              id="airport_pickup_charge"
              name="airport_pickup_charge"
              placeholder="Enter charge amount"
              value={chargeAmount}
              onChange={handleChargeAmountChange}
            />
          </div>

          <div className="mb-4" hidden>
            <input
              type="text"
              className="form-control"
              name="application_id"
              value={applicationId}
            />
          </div>

          <div className="mb-4">
            <Label className="fs-2" htmlFor="airport_pickup_invoice_status">
              Select Charge Status
            </Label>
            <select
              className="form-select fs-2"
              id="airport_pickup_invoice_status"
              name="airport_pickup_invoice_status"
              value={selectStatus}
              onChange={handleSelectStatusChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {checkAirportPickupStatus === 'paid' ? (
            <div className="d-flex align-items-center justify-content-center ">
              <span className="badge bg-success-subtle text-success fs-2">
                {'Already Is Paid'}
              </span>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <div className="button px-4 py-2">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    style={{
                      background: 'transparent',
                    }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {submitTitle}
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AirportPickupChargeModal;
