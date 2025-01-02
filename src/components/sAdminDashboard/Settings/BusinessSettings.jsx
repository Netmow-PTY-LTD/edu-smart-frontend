import ColorPickerField from '@/components/common/formField/ColorPickerField';
import NumberField from '@/components/common/formField/NumberField';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { Form, Formik } from 'formik';
import { useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const BusinessSettings = () => {
  const [initialValues, setInitialValues] = useState({});
  const options = useMemo(() => countryList().getData(), []);

  const validationSchema = Yup.object({});

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      console.log(values);
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle> Company Information </CardTitle>
        </CardHeader>
        <CardBody className="p-5">
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Row>
                  <Col md={6}>
                    <TextField name={'companyName'} label={'Company Name'} />
                  </Col>
                  <Col md={6}>
                    <TextField name={'shortInfo'} label={'Short Info'} />
                  </Col>
                  <Col md={4}>
                    <TextField name={'address'} label={'Address'} />
                  </Col>
                  <Col md={4}>
                    <TextField name={'address2'} label={'Address2'} />
                  </Col>
                  <Col md={4}>
                    <TextField name={'email'} label={'Email'} />
                  </Col>
                  <Col md={3}>
                    <TextField name={'city'} label={'City'} />
                  </Col>
                  <Col md={3}>
                    <TextField name={'state'} label={'State'} />
                  </Col>
                  <Col md={2}>
                    <NumberField name={'zip'} label={'Zip'} />
                  </Col>
                  <Col md={4}>
                    <SingleSelectField
                      name={'country'}
                      label={'Country'}
                      options={options}
                      setInitialValues={setInitialValues}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField name={'website'} label={'Website(Optional)'} />
                  </Col>
                  <Col md={6}>
                    <NumberField name={'phone'} label={'Phone Number'} />
                  </Col>
                  <Col md={4}>
                    <SingleImageField
                      field={{ name: 'logo' }}
                      form={{ setFieldValue, values }}
                      label="Upload Logo"
                    />
                  </Col>
                  <Col md={4}>
                    <SingleImageField
                      field={{ name: 'footer_logo' }}
                      form={{ setFieldValue, values }}
                      label="Upload Footer Logo"
                    />
                  </Col>
                  <Col md={4}>
                    <SingleImageField
                      field={{ name: 'favicon' }}
                      form={{ setFieldValue, values }}
                      label="Upload Favicon"
                    />
                  </Col>
                  <Col md={4}>
                    <ColorPickerField
                      label="Primary Color"
                      name="primary_color"
                    />
                  </Col>
                  <Col md={4}>
                    <ColorPickerField
                      label="Secondary Color"
                      name="secondary_color"
                    />
                  </Col>
                  <Col md={4}>
                    <ColorPickerField
                      label="Menu Text Color"
                      name="menu_text_color"
                    />
                  </Col>
                  <Col md={12}>
                    <TextArea label="Footer Text" name="footer_text" />
                  </Col>
                  <Col sm={12} className="text-end mt-5 fs-1">
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      formSubmit="Save Changes"
                    />
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

export default BusinessSettings;
