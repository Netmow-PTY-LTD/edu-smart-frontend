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
const PaypalSettings = () => {
  const [initialValues, setInitialValues] = useState({
    gst: '',
    currency: '',
  });

  const validationSchema = Yup.object({
    accountNumber: Yup.string()
      .required('Account Number is required')
      .min(10, 'Account Number should be at least 10 characters long') // Adjust length as needed
      .max(20, 'Account Number should not be more than 20 characters long'), // Adjust max length if necessary

    privateKey: Yup.string()
      .required('Private Key is required')
      .min(32, 'Private Key should be at least 32 characters long') // Adjust minimum length as needed
      .max(64, 'Private Key should not exceed 64 characters long'), // Adjust max length as needed
  });

  const handleSubmit = (value) => {};

  const handleToggleChange = (newState) => {};

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle tag="h5"> Paypal Settings </CardTitle>
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
                  <Col lg={12}>
                    <PasswordField
                      name={'accountNumber'}
                      label={'Account Number'}
                      placeholder={'Enter Account Number '}
                    />
                  </Col>
                  <Col lg={12}>
                    <PasswordField
                      name={'privateKey'}
                      label={'Private Key'}
                      placeholder={'Enter Private Key '}
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

export default PaypalSettings;
