import PasswordField from '@/components/common/formField/PasswordField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Row,
} from 'reactstrap';
import * as Yup from 'yup';
const SSLCommerzSettings = () => {
  const [initialValues, setInitialValues] = useState({
    publishable_key_live: '',
    secret_key_live: '',
    publishable_key_test: '',
    secret_key_test: '',
    mode: '',
  });

  // const { data: sslCommerzData, refetch: sslCommerzRefatch } =
  //   useGetSSLCommerzSettingsQuery();

  // const [updateAgentStripeSettings] = useUpdateSSLCommerzSettingsMutation();

  // useEffect(() => {
  //   if (sslCommerzData?.data?._id) {
  //     setInitialValues({
  //       publishable_key_live: sslCommerzData?.data?.publishable_key_live || '',
  //       secret_key_live: sslCommerzData?.data?.secret_key_live || '',
  //       publishable_key_test: sslCommerzData?.data?.publishable_key_test || '',
  //       secret_key_test: sslCommerzData?.data?.secret_key_test || '',
  //       mode: sslCommerzData?.data?.mode || '',
  //     });

  //
  //   }
  // }, [
  //   sslCommerzData?.data?._id,
  //   sslCommerzData?.data?.mode,
  //   sslCommerzData?.data?.publishable_key_live,
  //   sslCommerzData?.data?.publishable_key_test,
  //   sslCommerzData?.data?.secret_key_live,
  //   sslCommerzData?.data?.secret_key_test,
  // ]);

  const validationSchema = Yup.object({
    stripeKey: Yup.string()
      .required(' Key is required')
      .min(10, ' Key should be at least 10 characters long'),
    stripeSecret: Yup.string()
      .required(' Secret is required')
      .min(10, ' Secret should be at least 10 characters long'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = { ...values };
    console.log('Form Value:', data);
    try {
      setSubmitting(true);
      //  const result = await useUpdateSSLCommerzSettingsMutation(data).unwrap();
      //  if (result?.success) {
      //    toast.success('Stripe Settings Updated Successfully');
      //    agentStripeRefatch();
      //  } else {
      //    toast.error('Error during form submission');
      //  }
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('Error during form submission');
    } finally {
      setSubmitting(false);
    }
  };

  const modeOptions = [
    { value: 'test', label: 'Test Mode' },
    { value: 'live', label: 'Live Mode' },
  ];

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle tag="h5"> SSL Commerz Settings </CardTitle>
        </CardHeader>
        <CardBody className="p-5">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col lg={6}>
                    <PasswordField
                      name={'publishable_key_live'}
                      label={'SSL Live Key'}
                      placeholder={'Enter SSL Key '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'secret_key_live'}
                      label={'SSL Live Secret'}
                      placeholder={'Enter SSL Secret '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'publishable_key_test'}
                      label={'SSL Test Key'}
                      placeholder={'Enter SSL Key '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'secret_key_test'}
                      label={'SSL Test Secret'}
                      placeholder={'Enter SSL Secret '}
                    />
                  </Col>
                  <Col lg={6}>
                    <SingleSelectField
                      name={'mode'}
                      label={'Mode'}
                      setInitialValues={''}
                      options={modeOptions}
                    />
                  </Col>

                  <Col sm={12} className="text-end">
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      formSubmit={'Save Chnages'}
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

export default SSLCommerzSettings;
