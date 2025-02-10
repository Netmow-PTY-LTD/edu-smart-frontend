import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SubscriptionForm = () => {
  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const initialValues = { email: '' };
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted with:', values);
    // const subscribelink = `/subscribe/${values.email}/randomCode=1245255/status=pending`;
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
