
import Layout from '@/components/layout';
import React, { useState } from 'react';
import * as Yup from 'yup';
import GalleryFormCard from './GalleryFormCard';

const UniversityGallery = () => {
  const [initialValues, setInitialValues] = useState({
    images: [], 
  });

 const validationSchema = Yup.object({
  images: Yup.array()
    .min(1, 'At least one image is required')
    .required('Image gallery is required'),
});


  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">

       <GalleryFormCard 
       buttonLabel='Add Gallery' 
       cardTitle='Added Gallery Image Here'
       onSubmit={onSubmit}
       initialValues={initialValues}
       validationSchema={validationSchema}
       inputLabel='Image Gallery *'
       />
       
        </div>
      </div>
    </Layout>
  );
};

export default UniversityGallery;
