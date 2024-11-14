import {
  addCategory,
  getAllCategories,
} from '@/slices/dashboard/superAdminDashboard/superAdminActions/newsActions';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import Loader from '../Loader';

const AddCategoryModal = ({ isOpen, toggle, toast, setModalOpen }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(
    (state) => state.SuperAdminDashboard.addCategory
  );

  const validateInput = (value) => {
    if (value?.trim() === '') {
      setError('Category name cannot be empty');
      return false;
    }
    return true;
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setName(value);
    if (error && value?.trim() !== '') {
      setError('');
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (validateInput(name)) {
      dispatch(addCategory({ name: name?.trim() })).then((res) => {
        if (res.error) {
          toast.error('Somthing Went Wrong.Try Again.');
        } else {
          dispatch(getAllCategories());
          setModalOpen(false);
          setName('');
          toast.success('Successfully Added Category');
        }
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader className="fs-2" toggle={toggle}>
        Add Category
      </ModalHeader>
      <ModalBody>
        <ToastContainer />
        <Form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <Label htmlFor="category-title" className="form-label">
              Category Name
            </Label>
            <Input
              type="text"
              className="form-control"
              id="category-title"
              placeholder="Type category name"
              value={name}
              onChange={onChangeHandler}
              invalid={error !== ''}
            />
            <FormFeedback>{error}</FormFeedback>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <button
              disabled={isLoading}
              className="hstack d-flex align-items-center justify-content-center mx-auto button p-2 text-white fs-4"
            >
              Add Category
            </button>
          )}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddCategoryModal;
