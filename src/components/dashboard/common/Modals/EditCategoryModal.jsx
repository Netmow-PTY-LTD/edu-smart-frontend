import {
  editCategory,
  getAllCategories,
} from '@/slices/dashboard/adminDashboard/Actions/newsActions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

const EditCategoryModal = ({ isOpen, toggle, id, allCategories }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const singleCategory =
      allCategories?.length > 0 && allCategories.find((cat) => cat?._id === id);
    setName(singleCategory?.name);
  }, [allCategories, id]);

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
      dispatch(editCategory({ name: name, id: id })).then((res) => {
        if (res.error) {
          toast.error('Failed To Edit Category.Please try again later.');
        } else {
          toast.success('Category Edited successfully!', {
            onClose: () => {
              toggle();
              dispatch(getAllCategories());
            },
          });
        }
      });
    }
  };

  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader className="fs-3" toggle={toggle}>
        Edit Category
      </ModalHeader>
      <ModalBody>
        <ToastContainer />
        <Form onSubmit={(e) => onSubmitHandler(e)}>
          <div className="mb-4">
            <Label htmlFor="category-title" className="form-label">
              Category Name
            </Label>
            <Input
              type="text"
              className="form-control"
              id="category-title"
              placeholder="Edit category name"
              value={name}
              onChange={onChangeHandler}
              invalid={error !== ''}
            />
            <FormFeedback>{error}</FormFeedback>
          </div>

          <button type="submit" className="button fs-12 text-white p-3">
            Edit
          </button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditCategoryModal;
