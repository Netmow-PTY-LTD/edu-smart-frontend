import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Form, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Loader from '../Loader';

const ShopCategoryModal = ({
  open,
  close,
  formData,
  setFormData,
  onChangeHandler,
  handleSubmit,
  loading,
  errors,
  categoryId,
  categoryData,
}) => {
  useEffect(() => {
    const matchedData =
      categoryData?.length > 0 &&
      categoryData.filter((category) => category?._id === categoryId);

    setFormData(matchedData[0]);
  }, [categoryData, categoryId, setFormData]);

  return (
    <Modal isOpen={open} centered>
      <ModalHeader className="fs-2" toggle={() => close()}>
        Add Category
      </ModalHeader>
      <ModalBody>
        <ToastContainer />
        <Form>
          <div className="mb-4">
            <Label htmlFor="category-title" className="form-label">
              Category Name
            </Label>
            <Input
              type="text"
              className="form-control"
              id="category-title"
              name="category_name"
              placeholder="Type category name"
              value={formData?.name}
              onChange={onChangeHandler}
            />
            {errors?.name && (
              <div className="text-danger fs-3 mt-2">{errors?.name}</div>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="category-status" className="form-label">
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
                Add Category
              </button>
            )}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ShopCategoryModal;
