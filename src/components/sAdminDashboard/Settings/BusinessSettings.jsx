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
const BusinessSettings = () => {
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
          <CardTitle tag="h5"> Company Information </CardTitle>
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
                    <TextField name={'companyName'} label={'Company Name'}/>
                 
                  </Col>
                  <Col md={6}>
                  <TextField name={'shortInfo'} label={'Short Info'}/>
                  </Col>
                  <Col md={6}>
                  <TextField name={'address'} label={'Address'}/>
                  </Col>
                  <Col md={6}>
                  <TextField name={'address2'} label={'Address2'}/>
                  </Col>
                  <Col md={4}>
                  <TextField name={'state'} label={'State'}/>
                
                  </Col>
                 
                  <Col md={4}>
                  <TextField name={'city'} label={'City'}/>
                  </Col>
                  <Col md={4}>
                    <NumberField name={'zip'} label={'Zip'} />
                  </Col>
                 
                  <Col md={4}>
                  <TextField name={'website'} label={'Website(Optional)'}/>
                  </Col>
                 
                  <Col md={4}>
                    <NumberField name={'phone'} label={'Phone Number'} />
                  </Col>
                  <Col md={4}>
                  <TextField name={'email'} label={'Email'}/>
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

export default BusinessSettings;
