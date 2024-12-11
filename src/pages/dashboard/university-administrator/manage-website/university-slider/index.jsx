
import Layout from '@/components/layout';
import React, { useState } from 'react';
import * as Yup from 'yup';
import GalleryFormCard from '../../../../../components/common/GalleryFormCard';

const UniversitySlider = () => {
  const [initialValues, setInitialValues] = useState({
    images: [], 
  });

 const validationSchema = Yup.object({
  images: Yup.array()
    .min(1, 'At least one image is required')
    .required('slider Image is required'),
});


  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
       
       <GalleryFormCard 
       buttonLabel='Add Slider Image' 
       cardTitle='Added Slider  Image Here'
       onSubmit={onSubmit}
       initialValues={initialValues}
       validationSchema={validationSchema}
       inputLabel='Slider Image *'
       className='p-4 p-md-5'
       />
        </div>
      </div>
    </Layout>
  );
};

export default UniversitySlider;
