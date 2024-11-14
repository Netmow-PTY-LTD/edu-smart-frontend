import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

import { createSlidesAction } from '@/slices/dashboard/adminDashboard/Actions/sliderAction';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../Loader';

const AddSliderModal = ({ isOpen, toggle, sliderData, sliderError }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    sub_title: '',
    paragraph: '',
    button_one_text: '',
    button_one_url: '',
    button_two_text: '',
    button_two_url: '',
    status: true,
    image: '',
    hero_image: '',
  });
  //  error state
  const [errors, setErrors] = useState({});
  // const [imagePreview, setImagePreview] = useState(null);
  // const [heroImagePreview, setHeroImagePreview] = useState(null);

  const {
    data: addSlidesData,
    isLoading: addSlidesIsLoading,
    error: addSlidesError,
  } = useSelector((state) => state.AdminDashboard.slides);

  useEffect(() => {
    if (addSlidesData?.message && addSlidesError == null) {
      toast.success(addSlidesData?.message);
      resetForm();
    }
    if (addSlidesError) {
      toast.error(addSlidesError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSlidesData?.title, addSlidesError]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImagePreview(reader.result);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, image: '' });
    }
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setHeroImagePreview(reader.result);
        setFormData({ ...formData, hero_image: file });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, hero_image: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsData = new FormData();

    for (const key in formData) {
      newsData.append(key, formData[key]);
    }

    // for form validation
    const newErrors = {};

    if (!formData?.title) {
      newErrors.title = 'Title is required';
    }

    if (Object.keys(newErrors).length === 0) {
      await dispatch(createSlidesAction(newsData)).then((res) => {
        if (res.error) {
          toast.error('Something Went Wrong! Please Try Again.');
        } else {
          toast.success('Added Slider Successfully.');
          resetForm();
        }
      });
    } else {
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      sub_title: '',
      paragraph: '',
      button_one_text: '',
      button_one_url: '',
      button_two_text: '',
      button_two_url: '',
      status: true,
      image: '',
      hero_image: '',
      imagePreview: '',
      heroImagePreview: '',
    });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader className="fs-2 fw-bolder" toggle={() => resetForm()}>
        Add Slider
      </ModalHeader>
      <ModalBody>
        <ToastContainer />
        <Form>
          <Row className="fs-4">
            <Col lg={12}>
              <FormGroup className="mb-4">
                <Label htmlFor="offer" className="form-label">
                  Title
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="offer"
                  name="title"
                  placeholder="Enter a title"
                  value={formData.title.value}
                  onChange={handleInputChange}
                  // invalid={!formData.title.validity}
                />
                {errors.title && (
                  <div className="text-danger">{errors.title}</div>
                )}
              </FormGroup>
            </Col>
            <Col lg={12}>
              <FormGroup className="mb-4">
                <Label htmlFor="offer" className="form-label">
                  Sub Title
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="sub_title"
                  name="sub_title"
                  placeholder="Enter a subtitle"
                  onChange={handleInputChange}
                />
                {errors.sub_title && (
                  <div className="text-danger">{errors.sub_title}</div>
                )}
              </FormGroup>
            </Col>
            <Col lg={12}>
              <FormGroup className="mb-4">
                <Label htmlFor="short_desc" className="form-label">
                  Short Description
                </Label>
                <textarea
                  rows={3}
                  className="form-control"
                  id="short_desc"
                  name="paragraph"
                  placeholder="Short Description"
                  onChange={handleInputChange}
                />
                {errors.paragraph && (
                  <div className="text-danger">{errors.paragraph}</div>
                )}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="gallery_image" className="form-label">
                  Slider Image
                </Label>
                <small className="fs-10 d-block mb-3 text-danger">
                  (Max. 500px X 500px, Max. 2MB, valid exts: png, jpg, jpeg)
                </small>
                <Input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {/* {errors.image && (
                  <div className="text-danger">{errors.image}</div>
                )} */}
              </FormGroup>
              {formData?.image && (
                <div className="my-3">
                  <Image
                    src={
                      typeof formData?.image === 'string'
                        ? formData?.image
                        : URL.createObjectURL(formData?.image)
                    }
                    alt="Preview"
                    className="img-fluid"
                    height={50}
                    width={60}
                  />
                </div>
              )}
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="gallery_image" className="form-label">
                  Background Image
                </Label>
                <small className="fs-10 d-block mb-3 text-danger">
                  (Max. 1920px X 1080px, Max. 2MB, valid exts: png, jpg, jpeg)
                </small>
                <Input
                  type="file"
                  className="form-control"
                  name="hero_image"
                  accept="image/*"
                  onChange={handleHeroImageChange}
                />
                {/* {errors.image && (
                  <div className="text-danger">{errors.image}</div>
                )} */}
              </FormGroup>
              {formData?.hero_image && (
                <div className="my-3">
                  <Image
                    src={
                      typeof formData?.hero_image === 'string'
                        ? formData?.hero_image
                        : URL.createObjectURL(formData?.hero_image)
                    }
                    alt="Preview"
                    className="img-fluid"
                    height={50}
                    width={60}
                  />
                </div>
              )}
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="button_one_text" className="form-label">
                  Button One Text
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="button_one_text"
                  name="button_one_text"
                  placeholder="text"
                  onChange={handleInputChange}
                />
                {errors.button_one_text && (
                  <div className="text-danger">{errors.button_one_text}</div>
                )}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="button_one_url" className="form-label">
                  Button_one_url
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  name="button_one_url"
                  placeholder="url"
                  onChange={handleInputChange}
                />
                {errors.button_one_url && (
                  <div className="text-danger">{errors.button_one_url}</div>
                )}
              </FormGroup>
            </Col>

            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="button_two_text" className="form-label">
                  Button Two Text
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  name="button_two_text"
                  placeholder="text"
                  onChange={handleInputChange}
                />
                {errors.button_two_text && (
                  <div className="text-danger">{errors.button_two_text}</div>
                )}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="button_two_url" className="form-label">
                  Button Two Url
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  name="button_two_url"
                  placeholder="url"
                  onChange={handleInputChange}
                />
                {errors.button_two_url && (
                  <div className="text-danger">{errors.button_two_url}</div>
                )}
              </FormGroup>
            </Col>

            <Col lg={12}>
              <FormGroup className="mb-4">
                <Label htmlFor="slider_status" className="form-label">
                  Slider Status
                </Label>
                <select
                  id="slider_status"
                  className="form-control"
                  name="status"
                  onChange={handleInputChange}
                >
                  <option>Please Select</option>
                  <option value={true}>Enable</option>
                  <option value={false}>Disable</option>
                </select>
                {errors.status && (
                  <div className="text-danger">{errors.status}</div>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Col lg={12}>
            <div className="hstack gap-2 justify-content-center mt-3">
              {addSlidesIsLoading ? (
                <Loader />
              ) : (
                <button
                  disabled={addSlidesIsLoading}
                  type="button"
                  className="button p-3 fs-4 text-light"
                  onClick={handleSubmit}
                >
                  Add Slider
                </button>
              )}
            </div>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddSliderModal;
