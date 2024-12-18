import GalleryFormCard from '@/components/common/GalleryFormCard';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import { useGetSingleUniversityQuery } from '@/slice/services/super admin/universityService';
import { useUpdateUniversityGalleryMutation } from '@/slice/services/university-administration/api/universityAdministrationGalleryService';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Col } from 'reactstrap';
import * as Yup from 'yup';
const UniversityGalleryFormHandler = ({ university_id }) => {
  const [initialValues, setInitialValues] = useState({
    images: [],
    description: '',
  });

  const [addGallery] = useUpdateUniversityGalleryMutation();

  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (getSingleUniversityData?.data?.gallery) {
        const galleryData = getSingleUniversityData.data.gallery;

        // eslint-disable-next-line no-undef
        const imageFiles = await Promise.all(
          galleryData.images.map(async (item) =>
            convertImageUrlToFile(item.url)
          )
        );

        setInitialValues({
          images: imageFiles,
          description: galleryData.description || '',
        });
      }
    };

    fetchData();
  }, [getSingleUniversityData?.data?.gallery]);

  const validationSchema = Yup.object({
    images: Yup.array()
      .min(1, 'At least one image is required')
      .required('Image gallery is required'),
    description: Yup.string().required('Image gallery is required'),
  });

  const onSubmit = async (value, { setSubmitting }) => {
    setSubmitting(true);

    const finalData = {
      ...value,
      university_id: university_id,
    };

    const editedData = new FormData();
    Object.entries(finalData).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach((image) => {
          editedData.append(key, image);
        });
      } else {
        editedData.append(key, value);
      }
    });

    try {
      const result = await addGallery(editedData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUniversityRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Col lg={10}>
      <GalleryFormCard
        className="m-5 p-4 p-md-5"
        cardTitle=" Added  Gallery  Here ..."
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        buttonLabel={'Add Gallery'}
      />
    </Col>
  );
};

export default UniversityGalleryFormHandler;
