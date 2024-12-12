import FAQCardForm from '@/components/common/FAQCardForm';
import { useUpdateUniversityFaqMutation } from '@/slice/services/university-administration/api/universityAdministrationFaqService';
import React from 'react';
import { toast } from 'react-toastify';
import { Col } from 'reactstrap';
import * as Yup from 'yup';

const FaqFormHandler = ({className, apiData}) => {
    const [updateFaq]=useUpdateUniversityFaqMutation()

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
    
      


      const onSubmit = async(value,{ setSubmitting }) => {
        console.log('Submitted FAQs:', value.faqs);
        setSubmitting(true);
        try {
          const result = null;
        //   const result = await updateFaq({data:value ,university_id:apiData}).unwrap();
          console.log(result)
          if (result) {
            toast.success(result?.message);
          }
        } catch (error) {
          const errorMessage = error?.data?.message;
          toast.error(errorMessage);
        } finally {
          setSubmitting(false);
        }
  
      
    };
    




    return (
        <Col>
             <FAQCardForm className={className} onSubmit={onSubmit}  initialValues={initialValues} validationSchema={validationSchema}/>
        </Col>
    );
};

export default FaqFormHandler;