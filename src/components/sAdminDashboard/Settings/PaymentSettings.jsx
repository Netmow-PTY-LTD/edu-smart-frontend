import { Formik } from 'formik';
import { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Form, Row } from 'reactstrap';
import * as Yup from 'yup';
const PaymentSettings = () => {
  const [initialValues, setInitialValues] = useState({
    gst: '',
    currency: '',
  });

  const validationSchema = Yup.object({
    gst: Yup.number()
      .required('GST is required')
      .min(0, 'GST cannot be less than 0')
      .max(100, 'GST cannot be more than 100')
      .typeError('GST must be a number'),
    currency: Yup.number()
      .required('Currency is required')
      .typeError('Currency must be a number'),
  });

  const handleSubmit = (value) => {};
  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle tag="h5"> Payment Settings  </CardTitle>
        </CardHeader>
        <CardBody className="p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>Development in progress .........</div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default PaymentSettings;
