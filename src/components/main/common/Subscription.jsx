import { useSendSubscriptionEmailMutation } from '@/slice/services/public/newsLetter/newsLetterSubscriptionPublic';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const SubscriptionForm = () => {
  const [sendSubscriptionLetter, { data }] = useSendSubscriptionEmailMutation();
  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const initialValues = { email: '' };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const subscriptionLetterData = {
      ...values,
      content: '/news-letter',
    };

    try {
      const result = await sendSubscriptionLetter(
        subscriptionLetterData
      ).unwrap();
      console.log(result);
      if (result) {
        toast.success(result?.message);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-wrapper">
            <Field
              name="email"
              placeholder="Enter your email"
              className="subscribe-input"
            />

            <button
              type="submit"
              className="btn-subscribe"
              disabled={isSubmitting}
            >
              Subscribe
            </button>
          </div>
          <ErrorMessage
            name="email"
            component="p"
            className="text-danger me-2"
          />
        </Form>
      )}
    </Formik>
  );
};

export default SubscriptionForm;
