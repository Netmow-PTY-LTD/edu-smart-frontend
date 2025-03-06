import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import Layout from '@/components/layout';
import UniversityForm from '@/components/sAdminDashboard/modals/UniversityForm';
import {
  useGetUniversityQuery,
  useUpdateUniversityMutation,
} from '@/slice/services/super admin/universityService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const EditUniversity = () => {
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

  const universityId = router.query.id;

  const [updateUniversity] = useUpdateUniversityMutation();

  const {
    data: getUniversityData,
    error: getUniversityError,
    isLoading: getUniversityIsLoading,
    refetch: getUniversityRefetch,
  } = useGetUniversityQuery();

  useEffect(() => {
    if (getUniversityData?.data && universityId) {
      const getSingleUniversityData =
        getUniversityData?.data?.length > 0 &&
        getUniversityData?.data.find((item) => item?._id === universityId);

      const fetchData = async () => {
        try {
          const file = await convertImageUrlToFile(
            getSingleUniversityData?.logo?.url
          );

          setInitialValues({
            name: getSingleUniversityData?.name || '',
            description: getSingleUniversityData?.description || '',
            address_line_1: getSingleUniversityData?.address_line_1 || '',
            address_line_2: getSingleUniversityData?.address_line_2 || '',
            phone: getSingleUniversityData?.phone || '',
            email: getSingleUniversityData?.email || '',
            website: getSingleUniversityData?.website || '',
            country: getSingleUniversityData?.country || '',
            city: getSingleUniversityData?.city || '',
            state: getSingleUniversityData?.state || '',
            zip: getSingleUniversityData?.zip || '',
            registration_no: getSingleUniversityData?.registration_no || '',
            moe_registration_certificate_no:
              getSingleUniversityData?.moe_registration_certificate_no || '',
            logo: file,
          });
          setImagePreview(URL.createObjectURL(file));
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getUniversityData?.data, universityId]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const finalData = {
      ...values,
      id: universityId,
    };

    try {
      const editedData = new FormData();
      Object.entries(finalData).forEach(([key, value]) => {
        editedData.append(key, value);
      });
      const result = await updateUniversity(editedData).unwrap();
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
            headTitle={'Update University'}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            formSubmit={'Update University'}
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

export default EditUniversity;
