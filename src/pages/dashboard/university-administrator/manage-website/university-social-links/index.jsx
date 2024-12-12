import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import Layout from '@/components/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import TextField from '@/components/common/formField/TextField';
import SocialLinksCardForm from '@/components/common/SocialLinksCardFormComponent';

const UniversitySocailLinks = () => {
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});

  const onSubmit = (e) => {
    console.log(e);
  };

  const fields = [
    { name: 'facebook', label: 'Facebook:' },
    { name: 'twitter', label: 'Twitter:' },
    { name: 'instagram', label: 'Instagram:' },
    { name: 'youtube', label: 'Youtube:' },
  ];


  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
       
       

       <SocialLinksCardForm
      title="Add Social Links Here"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitButtonText="Add Social Links"
      className="p-4 p-md-5"
    />

       
        </div>
      </div>
    </Layout>
  );
};

export default UniversitySocailLinks;
