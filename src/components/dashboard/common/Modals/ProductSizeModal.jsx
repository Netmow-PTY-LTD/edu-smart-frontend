import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Form, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Loader from '../Loader';

const ProductSizeModal = ({
  open,
  close,
  formData,
  setFormData,
  onChangeHandler,
  handleSubmit,
  loading,
  errors,
  sizeId,
  sizeData,
}) => {
  useEffect(() => {
    const matchedData =
      sizeData?.length > 0 && sizeData.filter((size) => size?._id === sizeId);

    setFormData(matchedData[0]);
  }, [sizeData, sizeId, setFormData]);

  return (
    <Modal isOpen={open} centered>
      <ModalHeader className="fs-2" toggle={() => close()}>
        Add Size
      </ModalHeader>
      <ModalBody>
        <ToastContainer />
        <Form>
          <div className="mb-4">
            <Label htmlFor="size-title" className="form-label">
              Size
            </Label>
            <Input
              type="text"
              className="form-control"
              id="size-title"
              name="size_name"
              placeholder="Type a Size"
              value={formData?.name}
              onChange={onChangeHandler}
            />
            {errors?.name && (
              <div className="text-danger fs-3 mt-2">{errors?.name}</div>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="size-status" className="form-label">
              Status
            </Label>
            <select
              name="status"
              value={formData?.status}
              className="form-select"
              onChange={onChangeHandler}
            >
              <option value="">Please Select</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {errors?.status && (
              <div className="text-danger fs-3 mt-2">{errors?.status}</div>
            )}
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
                Add Size
              </button>
            )}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ProductSizeModal;
