import { useSendSubscriptionEmailMutation } from '@/slice/services/public/newsLetter/newsLetterSubscriptionPublic';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SubscriptionForm = () => {
  const [sendSubscriptionLetter, { data }] = useSendSubscriptionEmailMutation();
  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  //  `https://calendar.miyn.app/test4.php?to=shadik.netmow@gmail.com&message=Text&code=12124`
  const initialValues = { email: '' };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted with:', values.email);
    const SubscriptionLetterData = {
      ...values,
      content: 'Hello World',
    };

    setSubmitting(false);
    resetForm();
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
