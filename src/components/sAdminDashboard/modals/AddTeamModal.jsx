import React, { useState } from 'react';
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

const AddTeamModal = ({ show, handleClose, onMemberAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    contact: '',
    email: '',
    image: null,
    country: 'Bangladesh',
  });

  const [errors, setErrors] = useState({});
  const token = Cookies.get('token');
  

const validate = () => {
  const newErrors = {};
  const phoneRegex = /^\+?\d{10,15}$/; // supports +880, 880, or just digits (10 to 15 digits)

  if (!formData.name) newErrors.name = 'Name is required';
  if (!formData.designation) newErrors.designation = 'Designation is required';

  // ✅ Optional contact, but validate if present
  if (formData.contact) {
    if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = 'Invalid phone number (10–15 digits)';
    }
  }

  // ✅ Optional email, but validate if present
  if (formData.email) {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
  }

  if (!formData.image) newErrors.image = 'Image is required';
  return newErrors;
};


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async () => {
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    toast.error('Please fix validation errors.');
    return;
  }

  try {

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/v1/team`, // ✅ Remove extra slash
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Proper casing
        },
        body: data,
      }
    );

    if (response.ok) {
      toast.success('Team member added!');
      handleClose();
      onMemberAdded();
      setFormData({
        name: '',
        designation: '',
        contact: '',
        email: '',
        image: null,
        country: 'Bangladesh',
      });
      setErrors({});
    } else {
      const errText = await response.text();
      toast.error(`Failed to add member: ${errText}`);
    }
  } catch (err) {
    toast.error('Server error');
    console.error('Submission error:', err);
  }
};

  return (
    <Modal isOpen={show} toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Add Team Member</ModalHeader>
      <ModalBody>
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
            <Label for="image">Profile Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              invalid={!!errors.image}
              onChange={handleChange}
            />
            <FormFeedback>{errors.image}</FormFeedback>
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
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTeamModal;
