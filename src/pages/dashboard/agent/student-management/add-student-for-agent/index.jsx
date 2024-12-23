import AddStudentComponentForAgent from '@/components/agentDashboard/AddStudentComponent';
import Layout from '@/components/layout';
import { useAddStudentForAgentMutation } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

const AddStudentForAgent = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    profile_image: null,
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [addStudent] = useAddStudentForAgentMutation();

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    profile_image: Yup.mixed().required('Profile image is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], `Passwords doesn't matched`),
    address_line_1: Yup.string().required('Address line 1 is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
    country: Yup.string().required('Country is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log(values);

    try {
      const finalData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const response = await addStudent(finalData).unwrap();
      if (response) {
        toast.success(response?.message);
        setImagePreview(null);
        setImagePreview(null);
        router.push(
          '/dashboard/agent/student-management/all-student-for-agent'
        );
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ToastContainer />
          <div className="container-fluid">
            <AddStudentComponentForAgent
              headTitle={'Add New Student'}
              initialValues={initialValues}
              validationSchema={validationSchema}
              handleSubmit={handleSubmit}
              formSubmit={'Add Student'}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddStudentForAgent;
