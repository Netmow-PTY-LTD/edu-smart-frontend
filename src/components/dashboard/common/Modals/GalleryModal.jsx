import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { createGalleryItemAction } from '@/slices/dashboard/adminDashboard/Actions/galleryAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GalleryModal = ({ isOpen, toggle, id }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [galleryImage, setGalleryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(true);

  // const [titleError, setTitleError] = useState('');
  // const [shortDescError, setShortDescError] = useState('');
  const [galleryImageError, setGalleryImageError] = useState('');
  const [statusError, setStatusError] = useState('');

  const resetGalleryModalForm = () => {
    setTitle('');
    setShortDesc('');
    setGalleryImage(null);
    setImagePreview(null);
    setStatus(true);
    // setTitleError('');
    // setShortDescError('');
    setGalleryImageError('');
    setStatusError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update the image preview with the file data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
    setGalleryImage(file);
    setGalleryImageError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // if (!title) {
    //   setTitleError('Please provide an intro.');
    //   isValid = false;
    // } else {
    //   setTitleError('');
    // }

    // if (!shortDesc) {
    //   setShortDescError('Please provide a short description.');
    //   isValid = false;
    // } else {
    //   setShortDescError('');
    // }

    if (galleryImage === null || galleryImage === '') {
      setGalleryImageError('Please select an image.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (isValid) {
      setTitle('');
      setShortDesc('');
      setGalleryImage(null);
      setImagePreview(null);
      setStatusError('');
      toggle();
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDesc);
    formData.append('image', galleryImage);
    formData.append('status', status);

    dispatch(createGalleryItemAction(formData))
      .then((res) => {
        if (res?.error) {
          toast.error(res?.payload);
        } else {
          toast.success('Gallery Added Successfully');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while adding the gallery item.');
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      onClosed={resetGalleryModalForm}
      centered
    >
      <ModalHeader toggle={toggle}>Add Gallery</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg="6">
              <FormGroup className="mb-4">
                <Label htmlFor="intro" className="form-label">
                  Title
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Title here..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    // setTitleError('');
                  }}
                  // invalid={!!titleError}
                />
                {/* {titleError && <FormFeedback>{titleError}</FormFeedback>} */}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup className="mb-4">
                <Label htmlFor="short_desc" className="form-label">
                  Short Description
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="short_desc"
                  name="short_desc"
                  placeholder="Short Description"
                  value={shortDesc}
                  onChange={(e) => {
                    setShortDesc(e.target.value);
                    // setShortDescError('');
                  }}
                  // invalid={!!shortDescError}
                />
                {/* {shortDescError && (
                  <FormFeedback>{shortDescError}</FormFeedback>
                )} */}
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup className="mb-4">
                <Label htmlFor="gallery_image" className="form-label">
                  Image{' '}
                  <small className="fs-10 mb-3 text-danger">
                    &nbsp;(Max. 634px X 350px, Max. 2MB, valid exts: png, jpg,
                    jpeg)
                  </small>
                </Label>
                <Input
                  type="file"
                  className="form-control"
                  id="gallery_image"
                  name="gallery_image"
                  accept="image/*"
                  onChange={handleImageChange}
                  invalid={!!galleryImageError}
                />
                {galleryImageError && (
                  <FormFeedback>{galleryImageError}</FormFeedback>
                )}
              </FormGroup>
              {imagePreview && (
                <div className="mt-3">
                  <h5>Image Preview</h5>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </Col>
            <Col lg="12">
              <FormGroup className="mb-4">
                <Label htmlFor="gallery_status" className="form-label">
                  Status
                </Label>
                <Input
                  type="select"
                  className="form-control"
                  id="gallery_status"
                  name="gallery_status"
                  value={status}
                  onChange={(e) => {
                    setStatus(!status);
                    setStatusError('');
                  }}
                  invalid={!!statusError}
                >
                  <option value={true}>Enable</option>
                  <option value={false}>Disable</option>
                </Input>
                {statusError && <FormFeedback>{statusError}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" className="button p-3">
            Add
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default GalleryModal;
