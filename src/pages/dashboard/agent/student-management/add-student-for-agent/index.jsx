import AddStudentComponentForAgent from '@/components/agentDashboard/AddStudentComponent';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    profile_image: Yup.mixed().required('Profile image is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
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

      // const response = await addStudent(finalData).unwrap();

      // if(response){
      //   toast.success(response?.message);
      //   setImagePreview(null);
      //   setImagePreview(null);

      // }
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
