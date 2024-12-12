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
    images: [{
        lastModified: 1733468580757,
        lastModifiedDate: new Date(1733468580757), 
        name: "https://res.cloudinary.com/ddm9zna39/image/upload/v1733739509/edu-smart/wjlg2aumyeyx6ix7s5sl.png",
        size: 4953213, 
        type: "image/jpeg",
        webkitRelativePath: ""
      }],
    // images:[],
    description: 'test',
  });

  const [initialImage, setInitialImage] = useState([])

  const [addGallery] = useUpdateUniversityGalleryMutation();

  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  useEffect(() => {
    if (getSingleUniversityData?.data?.gallery) {
      const galleryData = getSingleUniversityData.data.gallery;

      const fetchData = async () => {
        // eslint-disable-next-line no-undef
        const imageFile = await Promise.resolve(galleryData?.images.map(
            async (item) => {
               // eslint-disable-next-line no-undef
               const image = await Promise.resolve(convertImageUrlToFile(item.url)).then((data)=>  setInitialImage((currentData)=> [...currentData, data]))
               console.log("after resolve ", image)
               return image 
             }
           ))
      
        console.log( 'from form hadnler==>', imageFile);
        return imageFile;
    };
    const imageFile = fetchData();
    setInitialValues({
      images: imageFile || [],
      description: galleryData.description || '',
    });
    }
  }, [getSingleUniversityData?.data?.gallery]);

  
  useEffect(()=> {
      if(initialImage?.length > 0){
          setInitialValues((currenData)=> {
              return {images: initialImage,
                description: currenData?.description}
            })
        }
    }, [initialImage])
    
    console.log("initial ", initialValues)
 

  const validationSchema = Yup.object({
    images: Yup.array()
      .min(1, 'At least one image is required')
      .required('Image gallery is required'),
    description: Yup.string().required('Image gallery is required'),
  });

  const onSubmit = async (value, { setSubmitting }) => {
   
    setSubmitting(true);

    const formData = new FormData();
    formData.append('description', value.description);
    formData.append('images', value.images);

    try {
      //   const result = await addGallery({data:formData, univeristy_id:university_id}).unwrap();
      //   console.log(result);
      //   if (result) {
      //     toast.success(result?.message);
      //   }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (getSingleUniversityIsLoading || initialValues === null) {
    return <p>Loading...</p>;
  }

  return (
    <Col>
      <GalleryFormCard
        className="m-5 p-4 p-md-5"
        cardTitle=" Added  Gallery  Here ..."
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        buttonLabel={'Add Gellary'}
      />
    </Col>
  );
};

export default UniversityGalleryFormHandler;
