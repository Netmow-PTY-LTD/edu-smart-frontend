import CountrySelectField from '@/components/common/formField/CountrySelectField';
import EmailField from '@/components/common/formField/EmailField';
import ImageField from '@/components/common/formField/ImageField';
import NumberField from '@/components/common/formField/NumberField';
import PasswordField from '@/components/common/formField/PasswordField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import TextField from '@/components/common/formField/TextField';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { Formik } from 'formik';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { brandlogo } from '@/utils/common/data';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// ✅ import your API call
import { useAddStaffMemberInSuperAdminMutation } from '@/slice/services/super admin/staffMemberService';

import {
  Card,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import SubmitButtonCreateAgent from '@/components/common/formField/SubmitButtonCreateAgent';

const CreateAgentModal = ({
  openModal,
  closeModal,
  isLoading,
  getAllStaffMemberRefetch,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const [imagePreview, setImagePreview] = useState('');
  const [countryIp, setCountryIp] = useState('');
  const [addStaffMemberInSuperAdmin] = useAddStaffMemberInSuperAdminMutation();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();
        if (data && data.success && data.country) {
          setCountryIp(data.country); // ✅ Save country name to state
        } else {
          console.warn(
            'Failed to get country from IP:',
            data.message || 'Unknown error'
          );
        }
      } catch (error) {
        console.error('IP geolocation fetch error:', error);
      }
    };

    fetchCountry();
  }, []);

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    address: '',
    select_role: { label: 'Agent', value: 'agent' },
    city: '',
    state: '',
    zip: '',
    country: countryIp || '',
    image: null,
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Contact number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    address: Yup.string().required('Address is required'),
    select_role: Yup.object().required('Select role is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip code is required'),
    country: Yup.string().required('Country is required'),
    image: Yup.mixed()
      .required('Profile image is required')
      .test('fileType', 'Only image files are allowed', (value) => {
        if (!value) return false;
        return value.type.startsWith('image/');
      }),
  });

  const roleOptions = [{ label: 'Agent', value: 'agent' }];

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('image', file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // ✅ Handle form submission with API call
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const finalData = new FormData();

      // Convert select_role and country fields correctly
      const payload = {
        ...values,
        select_role: values.select_role?.value,
        country: values.country?.label || values.country,
      };

      // Append all fields except image
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== 'image') {
          finalData.append(key, value);
        }
      });

      // ✅ Append image as profile_image if it exists
      if (values.image) {
        finalData.append('image', values.image);
      }

      // API call
      const result = await addStaffMemberInSuperAdmin(finalData).unwrap();
      toast.success(result?.message || 'Agent created successfully');
      getAllStaffMemberRefetch?.();
      setImagePreview(null);
      closeModal();
    } catch (error) {
      const errorMessage =
        error?.data?.error?._message ||
        error?.data?.message ||
        'Failed to create agent';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={openModal} toggle={closeModal} centered size="xl">
      <ModalHeader toggle={closeModal}>Add New Agent</ModalHeader>
      <ModalBody>
        {isLoading ? (
          <LoaderSpiner />
        ) : (
          <Card className="p-4 p-md-5 add-university-card">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <Row>
                    <Col lg={3}>
                      <h4>Profile Photo</h4>
                      <div className="mb-5 profile-img text-center">
                        <div className="mb-3 profile-user">
                          <Image
                            src={imagePreview || brandlogo}
                            alt="Profile Photo"
                            width={200}
                            height={200}
                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                          />
                        </div>
                        <ImageField
                          name="image"
                          label="Upload Photo"
                          handleImageChange={(e) =>
                            handleImageChange(e, setFieldValue)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-danger w-100 mt-4 fw-semibold fs-14"
                          onClick={() => {
                            setImagePreview(null);
                            setFieldValue('image', null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </Col>

                    <Col lg={9}>
                      <div className="ps-0 ps-lg-5">
                        <Row>
                          <Col md={6}>
                            <TextField name="first_name" label="First Name" />
                          </Col>
                          <Col md={6}>
                            <TextField name="last_name" label="Last Name" />
                          </Col>
                          <Col md={6}>
                            <EmailField name="email" label="Email" />
                          </Col>
                          <Col md={6}>
                            <NumberField name="phone" label="Contact Number" />
                          </Col>
                          <Col md={6}>
                            <PasswordField name="password" label="Password" />
                          </Col>
                          <Col md={6}>
                            <PasswordField
                              name="confirm_password"
                              label="Confirm Password"
                            />
                          </Col>
                          <Col md={6}>
                            <TextField name="address" label="Address" />
                          </Col>
                          <Col md={6}>
                            <SingleSelectField
                              name="select_role"
                              label="Role"
                              options={roleOptions}
                              isDisabled
                            />
                          </Col>
                          <Col md={4}>
                            <TextField name="city" label="City" />
                          </Col>
                          <Col md={4}>
                            <TextField name="state" label="State" />
                          </Col>
                          <Col md={4}>
                            <NumberField name="zip" label="Zip Code" />
                          </Col>
                          <Col md={6}>
                            <CountrySelectField
                              name="country"
                              label="Country"
                              options={options}
                            />
                          </Col>
                          <Col md={12}>
                            <div className="my-4">
                              <SubmitButtonCreateAgent>
                                Create Partner
                              </SubmitButtonCreateAgent>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card>
        )}
      </ModalBody>
    </Modal>
  );
};

export default CreateAgentModal;
