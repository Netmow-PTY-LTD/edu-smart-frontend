import SubmitButton from '@/components/common/formField/SubmitButton';
import Layout from '@/components/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import MultipleImageField from '@/components/common/formField/MultipleImagesField';
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
       />
        </div>
      </div>
    </Layout>
  );
};

export default UniversitySlider;
