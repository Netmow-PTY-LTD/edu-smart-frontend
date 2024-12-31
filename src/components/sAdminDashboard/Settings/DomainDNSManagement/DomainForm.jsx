import TextField from '@/components/common/formField/TextField';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Row } from 'reactstrap';
import * as Yup from 'yup';
const DomainForm = () => {
  const [initialValues, setInitialValues] = useState({
    domainName: '',
   
  });

  const validationSchema = Yup.object({
    domainName: Yup.string()
      .required('Domain Name is required')  // Field is required
      .matches(
        /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,  // Regex for domain name validation
        'Domain Name must be a valid domain (e.g., example.com)'
      ),
  });

  const handleSubmit = (value) => {};
  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle tag="h5"> Domain </CardTitle>
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
               <Col md={6} > <TextField name={'domainName'} label={'Domain Name'}/></Col>
                <Col sm={12} className="text-end">
                    <Button className="button">Save Change</Button>
                  </Col>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default DomainForm;
