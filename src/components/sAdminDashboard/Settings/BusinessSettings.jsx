import ColorPickerField from '@/components/common/formField/ColorPickerField';
import NumberField from '@/components/common/formField/NumberField';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import {
  useGetAgentBusinessSettingsQuery,
  useUpdateAgentBusinessSettingsMutation,
} from '@/slice/services/agent/agentSettingsService';
import { Form, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const BusinessSettings = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    address_line_1: '',
    address_line_2: '',
    email: '',
    city: '',
    state: '',
    zip: '',
    website: '',
    phone: '',
    logo: '',
    footer_logo: '',
    favicon: '',
    primary_color: '',
    secondary_color: '',
    menu_text_color: '',
    footer_text: '',
  });
  const options = useMemo(() => countryList().getData(), []);

  const {
    data: agentBusinessSettingData,
    refetch: agentBusinessSettingRefetch,
  } = useGetAgentBusinessSettingsQuery();

  const [updateAgentBusinessSettings] =
    useUpdateAgentBusinessSettingsMutation();

  useEffect(() => {
    const setData = async () => {
      const logo = agentBusinessSettingData?.data?.logo
        ? await convertImageUrlToFile(agentBusinessSettingData?.data?.logo?.url)
        : null;
      const footer_logo = agentBusinessSettingData?.data?.footer_logo
        ? await convertImageUrlToFile(
            agentBusinessSettingData?.data?.footer_logo?.url
          )
        : null;
      const favicon = agentBusinessSettingData?.date?.favicon
        ? await convertImageUrlToFile(
            agentBusinessSettingData?.data?.favicon?.url
          )
        : null;
      setInitialValues({
        name: agentBusinessSettingData?.data?.name || '',
        description: agentBusinessSettingData?.data?.description || '',
        address_line_1: agentBusinessSettingData?.data?.address_line_1 || '',
        address_line_2: agentBusinessSettingData?.data?.address_line_2 || '',
        email: agentBusinessSettingData?.data?.email || '',
        city: agentBusinessSettingData?.data?.city || '',
        state: agentBusinessSettingData?.data?.state || '',
        zip: agentBusinessSettingData?.data?.zip || '',
        country:
          // agentBusinessSettingData?.data?.country
          // ||
          {
            label: agentBusinessSettingData?.data?.country,
            value: agentBusinessSettingData?.data?.country,
          },
        // ''
        website: agentBusinessSettingData?.data?.website || '',
        phone: agentBusinessSettingData?.data?.phone || '',
        logo: logo,
        footer_logo: footer_logo,
        favicon: favicon,
        primary_color: agentBusinessSettingData?.data?.primary_color || '',
        secondary_color: agentBusinessSettingData?.data?.secondary_color || '',
        menu_text_color: agentBusinessSettingData?.data?.menu_text_color || '',
        footer_text: agentBusinessSettingData?.data?.footer_text || '',
      });
    };
    if (agentBusinessSettingData?.data?._id) {
      setData();
    }
  }, [
    agentBusinessSettingData?.data?._id,
    agentBusinessSettingData?.data?.address_line_1,
    agentBusinessSettingData?.data?.address_line_2,
    agentBusinessSettingData?.data?.city,
    agentBusinessSettingData?.data?.description,
    agentBusinessSettingData?.data?.email,
    agentBusinessSettingData?.data?.favicon,
    agentBusinessSettingData?.data?.footer_logo,
    agentBusinessSettingData?.data?.footer_text,
    agentBusinessSettingData?.data?.logo,
    agentBusinessSettingData?.data?.menu_text_color,
    agentBusinessSettingData?.data?.name,
    agentBusinessSettingData?.data?.phone,
    agentBusinessSettingData?.data?.primary_color,
    agentBusinessSettingData?.data?.secondary_color,
    agentBusinessSettingData?.data?.state,
    agentBusinessSettingData?.data?.website,
    agentBusinessSettingData?.data?.zip,
    agentBusinessSettingData?.data?.country,
    agentBusinessSettingData?.date?.favicon,
  ]);

  // console.log(initialValues);

  const validationSchema = Yup.object({});

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const updateData = { ...values };
      delete updateData.email;
      const finalData = new FormData();
      Object.entries(updateData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await updateAgentBusinessSettings(finalData).unwrap();
      if (result?.success) {
        agentBusinessSettingRefetch();
        toast.success('Business settings updated successfully');
      } else {
        toast.error('Error during form submission');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('Error during form submission');
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
                    <TextField name={'name'} label={'Company Name'} />
                  </Col>
                  <Col md={6}>
                    <TextField name={'description'} label={'Short Info'} />
                  </Col>
                  <Col md={4}>
                    <TextField name={'address_line_1'} label={'Address'} />
                  </Col>
                  <Col md={4}>
                    <TextField name={'address_line_2'} label={'Address2'} />
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
