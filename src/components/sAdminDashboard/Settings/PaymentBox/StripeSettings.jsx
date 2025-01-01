import PasswordField from '@/components/common/formField/PasswordField';
import ToggleSwitch from '@/components/common/ToggleSwitch';
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
const StripeSettings = () => {
  const [initialValues, setInitialValues] = useState({
    gst: '',
    currency: '',
  });

  const validationSchema = Yup.object({
    stripeKey: Yup.string()
      .required('Stripe Key is required')
      .min(10, 'Stripe Key should be at least 10 characters long'), 
    stripeSecret: Yup.string()
      .required('Stripe Secret is required')
      .min(10, 'Stripe Secret should be at least 10 characters long'), 
  });

  const handleSubmit = (value) => {};

  const handleToggleChange = (newState) => {
    console.log('Toggle State:', newState);
  };

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle tag="h5"> Stripe Settings </CardTitle>
          <ToggleSwitch initialChecked={false} onChange={handleToggleChange} />
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
                <Row>
                  <Col  lg={12} >
                    <PasswordField
                      name={'stripeKey'}
                      label={'Stripe Key'}
                      placeholder={'Enter Stripe Key '}
                    />
                  </Col>
                  <Col  lg={12} >
                    <PasswordField
                      name={'stripeSecret'}
                      label={'Stripe Secret'}
                      placeholder={'Enter Stripe Secret '}
                    />
                  </Col>

                  <Col sm={12} className="text-end">
                    <Button className="button">Save Change</Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default StripeSettings;
