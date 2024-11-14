import {
  getGalleryItemsAction,
  getSingleGalleryItemAction,
  updateGalleryItemAction,
} from '@/slices/dashboard/adminDashboard/Actions/galleryAction';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const EditGalleryModal = ({ isOpen, toggle, galleryId }) => {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update the image preview with the file data URL
      };
      reader.readAsDataURL(file);
      // setImagePreview(file); // Read the file as a data URL
      setGalleryImage(file); // Read the file as a data URL
    }
  };

  const {
    data: galleryItem,
    isLoading: galleryItemIsLoading,
    error: galleryItemError,
  } = useSelector((state) => state.AdminDashboard.galleryItem);

  useEffect(() => {
    if (galleryId) {
      dispatch(getSingleGalleryItemAction(galleryId));
    }
  }, [dispatch, galleryId]);

  useEffect(() => {
    if (galleryItem?._id) {
      setTitle(galleryItem.title);
      setShortDesc(galleryItem.short_description);
      setStatus(galleryItem.status);
      setImagePreview(galleryItem.image?.secure_url);
    }
  }, [galleryItem]);

  const handleUpdateGallery = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDesc);
    formData.append('status', status);
    formData.append('image', galleryImage);
    formData.append('id', galleryId);

    await dispatch(updateGalleryItemAction(formData)).then(() => {
      dispatch(getGalleryItemsAction());
      toggle();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (isValid) {
      setTitle('');
      setShortDesc('');
      setGalleryImage(null);
      setImagePreview(null);
      setStatusError('');
    }
    handleUpdateGallery();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Edit Gallery</ModalHeader>
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
                  onChange={(e) => setTitle(e.target.value)}
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
                  name="short_description"
                  placeholder="Short Description"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
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
                  name="image"
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
                  onChange={() => setStatus(!status)}
                  invalid={!!statusError}
                >
                  <option value={true}>Enable</option>
                  <option value={false}>Disable</option>
                </Input>
                {statusError && <FormFeedback>{statusError}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <Button className="button p-3">Update</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditGalleryModal;
