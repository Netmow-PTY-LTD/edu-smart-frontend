import NumberField from '@/components/common/formField/NumberField';
import TextField from '@/components/common/formField/TextField';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Row,
} from 'reactstrap';
import * as Yup from 'yup';
const CurrencySettings = () => {
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
          <CardTitle tag="h5"> Currency and Fees </CardTitle>
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
                {/* <Row>
                  <Col md={6}>
                    <NumberField name={'gst'} label={'GST(%)'} />
                  </Col>
                  <Col md={6}>
                    <NumberField name={'currency'} label={'Currency'} />
                  </Col>
                  <Col sm={12} className="text-end">
                    <Button className="button">Save Change</Button>
                  </Col>
                </Row> */}
                <div>Development in progress .........</div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default CurrencySettings;
