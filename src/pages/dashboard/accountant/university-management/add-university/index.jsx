import Layout from '@/components/layout';
import UniversityForm from '@/components/sAdminDashboard/modals/UniversityForm';
import {
  useAddUniversityMutation,
  useGetUniversityQuery,
} from '@/slice/services/super admin/universityService';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

const AddUniversityFromSuperAdmin = () => {
  const router = useRouter();
  const [ssmFilePreview, setSsmFilePreview] = useState(null);
  const [govtFilePreview, setGovtFilePreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: '',
    logo: null,
    address_line_1: '',
    address_line_2: '',
    phone: '',
    email: '',
    website: '',
    country: '',
    city: '',
    state: '',
    zip: '',
    description: '',
    registration_no: '',
    moe_registration_certificate_no: '',
  });

  const [
    addUniversity,
    {
      data: addUniversityData,
      error: addUniversityError,
      isLoading: addUniversityIsLoading,
      isSuccess: addUniversityIsSuccess,
    },
  ] = useAddUniversityMutation();

  const {
    data: getUniversityData,
    error: getUniversityError,
    isLoading: getUniversityIsLoading,
    refetch: getUniversityRefetch,
  } = useGetUniversityQuery();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    logo: Yup.mixed().required('Logo is required'),
    address_line_1: Yup.string().required('Address line 1 is required'),
    phone: Yup.string().required('Contact number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    website: Yup.string().required('Website is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.number().required('Zip is required'),
    registration_no: Yup.string().required('Registration number is required'),
    moe_registration_certificate_no: Yup.string().required(
      'MOE registration certificate number is required'
    ),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    // console.log('formData', values);

    try {
      const finalData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await addUniversity(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getUniversityRefetch();
        setImagePreview(null);
        router.push(
          '/dashboard/super-admin/university-management/all-university'
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
        <ToastContainer />
        <div className="container-fluid">
          <UniversityForm
            headTitle={'Add New University'}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleSubmit={handleSubmit}
            formSubmit={'Add University'}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setSsmFilePreview={setSsmFilePreview}
            setGovtFilePreview={setGovtFilePreview}
            ssmFilePreview={ssmFilePreview}
            govtFilePreview={govtFilePreview}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddUniversityFromSuperAdmin;
