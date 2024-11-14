import React, { useEffect, useState } from 'react';
import {
  Button,
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

import {
  getSingleSlideAction,
  updateSlideAction,
} from '@/slices/dashboard/adminDashboard/Actions/sliderAction';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader';

const EditSliderModal = ({
  editSliderModalShow,
  setEditSliderModalShow,
  slideId,
  sliderError,
  sliderLoading,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    sub_title: '',
    paragraph: '',
    button_one_text: '',
    button_one_url: '',
    button_two_text: '',
    button_two_url: '',
    // status: true,
    image: '',
    hero_image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

  const {
    data: singleSlideData,
    isLoading: singleSlideLoading,
    error: singleSlideError,
  } = useSelector((state) => state.AdminDashboard.slidesSingle);

  useEffect(() => {
    if (singleSlideData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: singleSlideData?.title ? singleSlideData?.title : ' ',
        sub_title: singleSlideData?.sub_title
          ? singleSlideData?.sub_title
          : ' ',
        paragraph: singleSlideData?.paragraph
          ? singleSlideData?.paragraph
          : ' ',
        button_one_text: singleSlideData?.button_one_text
          ? singleSlideData?.button_one_text
          : ' ',
        button_one_url: singleSlideData?.button_one_url
          ? singleSlideData?.button_one_url
          : ' ',
        button_two_text: singleSlideData?.button_two_text
          ? singleSlideData?.button_two_text
          : ' ',
        button_two_url: singleSlideData?.button_two_url
          ? singleSlideData?.button_two_url
          : ' ',
        status: singleSlideData?.status,
        image:
          singleSlideData?.image?.Location ||
          singleSlideData?.image?.secure_url,
        hero_image:
          singleSlideData?.hero_image?.Location ||
          singleSlideData?.hero_image?.secure_url,
      }));
    }
    setImagePreview(
      singleSlideData?.image?.Location || singleSlideData?.image?.secure_url
    );
    setHeroImagePreview(
      singleSlideData?.hero_image?.Location ||
        singleSlideData?.hero_image?.secure_url
    );
  }, [singleSlideData]);

  useEffect(() => {
    dispatch(getSingleSlideAction(slideId));
  }, [dispatch, slideId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result);
        setFormData({ ...formData, hero_image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mainData = { ...formData, id: slideId };

    const newsData = new FormData();
    for (const key in mainData) {
      newsData.append(key, mainData[key]);
    }

    for (let pair of newsData.entries()) {
      //
    }

    await dispatch(updateSlideAction(newsData)).then((res) => {
      if (res.error) {
        toast.error('Something Went Wrong! Please Try Again.');
      } else {
        toast.success('Edit Slider Successfully.');
        setEditSliderModalShow(!editSliderModalShow);
      }
    });
  };

  return (
    <Modal isOpen={editSliderModalShow} size="lg" centered>
      <ModalHeader
        className="fs-4"
        toggle={() => setEditSliderModalShow(!editSliderModalShow)}
      >
        Update Slider
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Row>
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
                  placeholder="Taste the victory........"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="offer" className="form-label">
                  Sub Title
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="sub_title"
                  name="sub_title"
                  placeholder="Home of champs"
                  value={formData.sub_title}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label htmlFor="short_desc" className="form-label">
                  Short Description
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="short_desc"
                  name="paragraph"
                  placeholder="Short Description"
                  value={formData?.paragraph}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col lg={12}>
              <FormGroup className="mb-4">
                <Label htmlFor="gallery_image" className="form-label">
                  Slider Image{' '}
                  <small className="fs-10 mb-3 text-danger">
                    &nbsp;(Max. 500px X 500px, Max. 2MB, valid exts: png, jpg,
                    jpeg)
                  </small>
                </Label>

                <Input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormGroup>
              {imagePreview && (
                <div className="my-3">
                  <Image
                    src={
                      imagePreview &&
                      (singleSlideData?.image?.Location ||
                        singleSlideData?.image?.secure_url) &&
                      (imagePreview === singleSlideData?.image?.Location ||
                        imagePreview === singleSlideData?.image?.secure_url) &&
                      imagePreview.includes('http' || 'https://')
                        ? imagePreview
                        : imagePreview &&
                            (singleSlideData?.image?.Location ||
                              singleSlideData?.image?.secure_url) &&
                            (imagePreview ===
                              singleSlideData?.image?.Location ||
                              imagePreview ===
                                singleSlideData?.image?.secure_url) &&
                            !imagePreview.includes('http' || 'https://')
                          ? 'https://' + imagePreview
                          : imagePreview
                    }
                    alt="Preview"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </Col>
            <Col lg={12}>
              <FormGroup className="mb-4">
                <Label htmlFor="gallery_image" className="form-label">
                  Background Image &nbsp;
                  <small className="fs-10 mb-3 text-danger">
                    (Max. 1920px X 1080px, Max. 2MB, valid exts: png, jpg, jpeg)
                  </small>
                </Label>
                <Input
                  type="file"
                  className="form-control"
                  name="hero_image"
                  accept="image/*"
                  onChange={handleHeroImageChange}
                />
              </FormGroup>
              {heroImagePreview && (
                <div className="my-3">
                  <Image
                    src={
                      heroImagePreview &&
                      (singleSlideData?.hero_image?.Location ||
                        singleSlideData?.image?.secure_url) &&
                      (heroImagePreview ===
                        singleSlideData?.hero_image?.Location ||
                        heroImagePreview ===
                          singleSlideData?.hero_image?.secure_url) &&
                      heroImagePreview.includes('http' || 'https://')
                        ? heroImagePreview
                        : heroImagePreview &&
                            (singleSlideData?.hero_image?.Location ||
                              singleSlideData?.image?.secure_url) &&
                            (heroImagePreview ===
                              singleSlideData?.hero_image?.Location ||
                              heroImagePreview ===
                                singleSlideData?.hero_image?.secure_url) &&
                            !heroImagePreview.includes('http' || 'https://')
                          ? 'https://' + heroImagePreview
                          : heroImagePreview
                    }
                    alt="Preview"
                    className="img-fluid"
                    width={100}
                    height={100}
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
                  value={formData?.button_one_text}
                  onChange={handleInputChange}
                />
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
                  value={formData?.button_one_url}
                  onChange={handleInputChange}
                />
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
                  value={formData?.button_two_text}
                  onChange={handleInputChange}
                />
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
                  value={formData?.button_two_url}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            <Col lg={12}>
              <FormGroup className="mb-4">
                <Label htmlFor="slider_status" className="form-label">
                  Slider Status
                </Label>
                <Input
                  type="select"
                  className="form-control"
                  name="status"
                  value={formData?.status}
                  onChange={handleInputChange}
                >
                  <option value={true}>Enabled</option>
                  <option value={false}>Disabled</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <div className="hstack gap-2 justify-content-end">
            {sliderLoading ? (
              <Loader />
            ) : (
              <Button className="button p-3">Update</Button>
            )}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditSliderModal;
