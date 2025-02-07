import FAQCardForm from '@/components/common/FAQCardForm';
import Layout from '@/components/layout';
import React from 'react';
import * as Yup from 'yup';

const FAQForm = () => {
  const initialValues = {
    faqs: [{ title: '', description: '' }],
  };
  const validationSchema = Yup.object().shape({
    faqs: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Question is required'),
        description: Yup.string().required('Answer is required'),
      })
    ),
  });

  const onSubmit = (values) => {
    // console.log('Submitted FAQs:', values.faqs);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <FAQCardForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          />
        </div>
      </div>
    </Layout>
  );
};

export default FAQForm;
