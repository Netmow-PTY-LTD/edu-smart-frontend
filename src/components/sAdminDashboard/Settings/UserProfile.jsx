import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import * as Yup from 'yup';
import Profile from '@/components/common/Profile';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from '@/slice/services/common/userInfoService';
import React, { useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { toast, ToastContainer } from 'react-toastify';
const UserProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [profileIsLoading, setProfileIsLoading] = useState(null);
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    profile_image: null,
  });

  const {
    data: userInfodata,
    isLoading: userInfoIsLoading,
    refetch: getUserInfoRefetch,
  } = useGetUserInfoQuery();

  const [updateUserInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    const fetchStudentData = async () => {
      setProfileIsLoading(true);
      if (userInfodata?.data) {
        const student = userInfodata?.data ? userInfodata?.data : null;

        const profile_image = await convertImageUrlToFile(
          student?.profile_image?.url
        );

        setInitialValues({
          first_name: student?.first_name || '',
          last_name: student?.last_name || '',
          email: student?.email || '',
          phone: student?.phone || '',
          address_line_1: student?.address_line_1 || '',
          address_line_2: student?.address_line_2 || '',
          city: student?.city || '',
          state: student?.state || '',
          zip: student?.zip || '',
          country: student?.country || '',
          profile_image: profile_image,
        });
        const imageUrl = profile_image
          ? URL.createObjectURL(profile_image)
          : '';
        setImagePreview(imageUrl);
      }
      setProfileIsLoading(false);
    };
    fetchStudentData();
  }, [userInfodata?.data]);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    country: Yup.string().required('Country is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone must be a number')
      .min(7, 'Phone must be at least 7 digits')
      .max(15, 'Phone must be at most 15 digits')
      .required('Phone number is required'),
    address_line_1: Yup.string().required('Address Line 1 is required'),
    address_line_2: Yup.string(), // optional
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string()
      .matches(/^[0-9]+$/, 'Zip Code must be numeric')
      .min(4, 'Zip Code must be at least 4 digits')
      .required('Zip Code is required'),
    profile_image: Yup.mixed()
      .required('Profile image is required'),
  });


  const handleImageChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(fieldName, file);

      const imageUrl = URL?.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updateData = { ...values };
    delete updateData.email;

    try {
      const finalData = new FormData();
      Object.entries(updateData).forEach(([key, value]) => {
        finalData.append(key, value);
      });

      const result = await updateUserInfo(finalData).unwrap();
      if (result?.success) {
        toast.success(result.message);
        getUserInfoRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className="mt-5">
      <ToastContainer />
      {userInfoIsLoading || profileIsLoading ? (
        <LoaderSpiner />
      ) : (
        <Profile
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          setImagePreview={setImagePreview}
          options={options}
        />
      )}
    </div>
  );
};

export default UserProfile;
