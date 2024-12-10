import React from 'react';
import * as Yup from 'yup';
import Layout from '@/components/layout';
import FAQCardForm from '@/components/common/FAQCardForm';

const FAQForm = () => {
  const initialValues = {
    faqs: [{ question: '', answer: '' }],
  };
  const validationSchema = Yup.object().shape({
    faqs: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required('Question is required'),
        answer: Yup.string().required('Answer is required'),
      })
    ),
  });

  const onSubmit = (values) => {
    console.log('Submitted FAQs:', values.faqs);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
                <FAQCardForm onSubmit={onSubmit}  initialValues={initialValues} validationSchema={validationSchema}/>
        </div>
      </div>
    </Layout>
  );
};

export default FAQForm;
