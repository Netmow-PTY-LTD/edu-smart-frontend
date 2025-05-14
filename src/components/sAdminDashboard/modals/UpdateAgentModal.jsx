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
import { useUpdateStaffMemberInSuperAdminMutation } from '@/slice/services/super admin/staffMemberService';

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
import SelectField from '@/components/common/formField/SelectField';

const UpdateAgentModal = ({
  openModal,
  closeModal,
  isLoading,
  getAllStaffMemberRefetch,
  agentDetails,
}) => {
  const options = useMemo(() => countryList().getData(), []);

  const [imagePreview, setImagePreview] = useState('');
  const [
    updateStaffMemberInSuperAdmin,
    {
      data: updateStaffMemberData,
      error: updateStaffMemberError,
      isLoading: updateStaffMemberIsLoading,
    },
  ] = useUpdateStaffMemberInSuperAdminMutation();
  const dataDetails = agentDetails?.data;

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  console.log('options', options);
  console.log('statusOptions', statusOptions);

  const initialValues = {
    first_name: dataDetails?.first_name || '',
    last_name: dataDetails?.last_name || '',
    email: dataDetails?.email || '',
    phone: dataDetails?.phone || '',
    password: '',
    confirm_password: '',
    address: dataDetails?.address_line_1 || '',
    select_role: { label: 'Agent', value: 'agent' },
    status:
      statusOptions.find((opt) => opt.value === dataDetails?.status) ||
      statusOptions[0], // default to Active
    city: dataDetails?.city || '',
    state: dataDetails?.state || '',
    zip: dataDetails?.zip || '',
    // Pre-select country using the correct value or label
    country: dataDetails?.country || '',
    image: null,
  };

  useEffect(() => {
    if (dataDetails?.profile_image?.url) {
      setImagePreview(dataDetails.profile_image.url); // Use the URL from the response
    }
  }, [dataDetails]);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Contact number is required'),
    address: Yup.string().required('Address is required'),
    select_role: Yup.object().required('Select role is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip code is required'),
    country: Yup.string().required('Country is required'),
    image: Yup.mixed().nullable(),

    password: Yup.string()
      .nullable()
      .transform((val) => (val === '' ? null : val))
      .min(6, 'Password must be at least 6 characters')
      .test(
        'confirm-password-required-if-password-filled',
        'Please confirm your password',
        function (value) {
          const { confirm_password } = this.parent;

          if (value && !confirm_password) {
            return this.createError({
              message: 'Please Re-Enter your password Now ->',
            });
          }

          return true;
        }
      ),

    confirm_password: Yup.string()
      .nullable()
      .transform((val) => (val === '' ? null : val))
      .test(
        'passwords-validation',
        'Invalid password configuration',
        function (value) {
          const { password } = this.parent;

          if (!password && !value) return true;

          if (!password && value) {
            return this.createError({ message: 'Password is required' });
          }

          if (password && !value) {
            return this.createError({
              message: 'Please confirm your password',
            });
          }

          if (password && password.length < 6) {
            return this.createError({
              message: 'Password must be at least 6 characters',
            });
          }

          if (password !== value) {
            return this.createError({ message: 'Passwords must match' });
          }

          return true;
        }
      ),
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

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const finalData = new FormData();

      const payload = {
        ...values,
        status: values.status?.value,
        select_role: values.select_role?.value,
        country: values.country?.label || values.country,
        user_id: String(dataDetails._id), // Ensure _id is passed as a string
      };

      // Omit password fields if not filled
      if (!payload.password) {
        delete payload.password;
        delete payload.confirm_password;
      }

      Object.entries(payload).forEach(([key, value]) => {
        if (key !== 'image') {
          finalData.append(key, value);
        }
      });

      // Append image if it exists
      if (values.image) {
        finalData.append('image', values.image);
      }

      finalData.append('_id', dataDetails._id); // required for update

      const result = await updateStaffMemberInSuperAdmin(finalData).unwrap();
      toast.success(result?.message || 'Agent updated successfully');
      getAllStaffMemberRefetch?.();
      setImagePreview(null);
      closeModal();
    } catch (error) {
      const errorMessage =
        error?.data?.error?._message ||
        error?.data?.message ||
        'Failed to update agent';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={openModal} toggle={closeModal} centered size="xl">
      <ModalHeader toggle={closeModal}>Update Agent Details</ModalHeader>
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
                            <EmailField
                              name="email"
                              label="Email"
                              readOnly={true}
                            />
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
                            <TextField
                              name="address"
                              label="Address"
                              isDisabled
                            />
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
                          <Col md={6}>
                            <SelectField
                              name="status"
                              label="Status"
                              options={statusOptions}
                            />
                          </Col>
                          <Col md={12}>
                            <div className="my-4">
                              <SubmitButtonCreateAgent>
                                Update Agent
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

export default UpdateAgentModal;
