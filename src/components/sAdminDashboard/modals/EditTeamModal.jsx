import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const EditTeamModal = ({ show, handleClose, member, onMemberUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    contact: '',
    email: '',
    image: null, // new uploaded image File
    country: 'Bangladesh',
  });
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null); // for showing uploaded or existing image preview
  const [removedImage, setRemovedImage] = useState(false); // flag to remove existing image on server

  const token = Cookies.get('token');
  const fileInputRef = useRef(null);

  // Initialize form data when member or modal opens
  useEffect(() => {
    if (member && show) {
      setFormData({
        name: member.name || '',
        designation: member.designation || '',
        contact: member.contact || '',
        email: member.email || '',
        image: null,
        country: member.country || 'Bangladesh',
      });
      setErrors({});
      setRemovedImage(false);
      setPreviewImage(member.image || null);
    }
  }, [member, show]);

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\+?\d{10,15}$/;

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';

    if (!formData.contact) {
      newErrors.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = 'Invalid phone number (10–15 digits)';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreviewImage(URL.createObjectURL(file));
        setRemovedImage(false); // uploading new image cancels removal
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Trigger file input click from custom button
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Remove current image (mark as removed and clear preview and new upload)
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
    setRemovedImage(true);
  };

  // Handle submit
  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix validation errors.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('designation', formData.designation);
      data.append('contact', formData.contact);
      data.append('email', formData.email);
      data.append('country', formData.country);

      // Append image if new uploaded
      if (formData.image) {
        data.append('image', formData.image);
      }

      // Append remove flag if image was removed
      if (removedImage && !formData.image) {
        data.append('removeImage', 'true');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/v1/team/${member._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (response.ok) {
        toast.success('Team member updated!');
        handleClose();
        onMemberUpdated();
        setErrors({});
      } else {
        const errText = await response.text();
        toast.error(`Failed to update member: ${errText}`);
      }
    } catch (err) {
      toast.error('Server error');
      console.error('Submission error:', err);
    }
  };

  return (
    <Modal isOpen={show} toggle={handleClose} size="md">
      <ModalHeader toggle={handleClose}>Edit Team Member</ModalHeader>
      <ModalBody>
        {/* Image preview with hover actions */}
        <div
          style={{
            position: 'relative',
            width: 140,
            height: 140,
            margin: '0 auto 20px',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            const overlay = e.currentTarget.querySelector('.image-overlay');
            if (overlay) overlay.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            const overlay = e.currentTarget.querySelector('.image-overlay');
            if (overlay) overlay.style.opacity = 0;
          }}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onClick={triggerFileSelect}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#aaa',
                fontSize: 14,
                backgroundColor: '#f0f0f0',
              }}
              onClick={triggerFileSelect}
            >
              No Image
            </div>
          )}

          {/* Overlay buttons */}
          <div
            className="image-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
              borderRadius: 12,
            }}
          >
            <Button
              size="sm"
              color="light"
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => {
                e.stopPropagation();
                triggerFileSelect();
              }}
            >
              Upload New
            </Button>
            {(previewImage || member.image) && (
              <Button
                size="sm"
                color="danger"
                style={{ pointerEvents: 'auto' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
              >
                Remove
              </Button>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            name="image"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </div>

        {/* Rest of the form */}
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              invalid={!!errors.name}
              value={formData.name}
              onChange={handleChange}
            />
            <FormFeedback>{errors.name}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="designation">Designation</Label>
            <Input
              id="designation"
              name="designation"
              invalid={!!errors.designation}
              value={formData.designation}
              onChange={handleChange}
            />
            <FormFeedback>{errors.designation}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="contact">Contact</Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              value={formData.contact}
              invalid={!!errors.contact}
              onChange={handleChange}
            />
            <FormFeedback>{errors.contact}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              invalid={!!errors.email}
              onChange={handleChange}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="country">Country</Label>
            <Input
              type="select"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option>Bangladesh</option>
              <option>Malaysia</option>
              {/* Add other countries if needed */}
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTeamModal;
