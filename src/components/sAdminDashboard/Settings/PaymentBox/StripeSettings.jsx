import PasswordField from '@/components/common/formField/PasswordField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import {
  useGetAgentStripeSettingsQuery,
  useUpdateAgentStripeSettingsMutation,
} from '@/slice/services/agent/agentSettingsService';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
const StripeSettings = () => {
  const [initialValues, setInitialValues] = useState({
    publishable_key_live: '',
    secret_key_live: '',
    publishable_key_test: '',
    secret_key_test: '',
    mode: '',
  });

  const { data: agentStripeData, refetch: agentStripeRefatch } =
    useGetAgentStripeSettingsQuery();

  const [updateAgentStripeSettings] = useUpdateAgentStripeSettingsMutation();

  useEffect(() => {
    if (agentStripeData?.data?._id) {
      setInitialValues({
        publishable_key_live: agentStripeData?.data?.publishable_key_live || '',
        secret_key_live: agentStripeData?.data?.secret_key_live || '',
        publishable_key_test: agentStripeData?.data?.publishable_key_test || '',
        secret_key_test: agentStripeData?.data?.secret_key_test || '',
        mode:
          {
            label: agentStripeData?.data?.mode,
            value: agentStripeData?.data?.mode,
          } || '',
        statuspost:
          {
            label: agentStripeData?.data?.status,
            value: agentStripeData?.data?.status,
          } || '',
      });
    }
  }, [
    agentStripeData?.data?._id,
    agentStripeData?.data?.mode,
    agentStripeData?.data?.publishable_key_live,
    agentStripeData?.data?.publishable_key_test,
    agentStripeData?.data?.secret_key_live,
    agentStripeData?.data?.secret_key_test,
    agentStripeData?.data?.status,
  ]);

  const validationSchema = Yup.object({
    stripeKey: Yup.string()
      .required('Stripe Key is required')
      .min(10, 'Stripe Key should be at least 10 characters long'),
    stripeSecret: Yup.string()
      .required('Stripe Secret is required')
      .min(10, 'Stripe Secret should be at least 10 characters long'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      mode:
        typeof values?.mode === 'object' ? values?.mode?.value : values?.mode,
      status:
        typeof values?.statuspost === 'object'
          ? values?.statuspost?.value
          : values?.statuspost,
    };

    try {
      setSubmitting(true);
      const result = await updateAgentStripeSettings(data).unwrap();
      if (result?.success) {
        toast.success('Stripe Settings Updated Successfully');
        agentStripeRefatch();
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

  const modeOptions = [
    { value: 'test', label: 'Test Mode' },
    { value: 'live', label: 'Live Mode' },
  ];

  const modeOptionsStatus = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle tag="h5"> Stripe Settings </CardTitle>
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
                      label={'Stripe Live Key'}
                      placeholder={'Enter Stripe Key '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'secret_key_live'}
                      label={'Stripe Live Secret'}
                      placeholder={'Enter Stripe Secret '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'publishable_key_test'}
                      label={'Stripe Test Key'}
                      placeholder={'Enter Stripe Key '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'secret_key_test'}
                      label={'Stripe Test Secret'}
                      placeholder={'Enter Stripe Secret '}
                    />
                  </Col>
                  <Col lg={6}>
                    <SingleSelectField
                      name={'mode'}
                      label={'Mode'}
                      options={modeOptions}
                    />
                  </Col>

                  <Col lg={6}>
                    <SingleSelectField
                      name={'statuspost'}
                      label={'Status'}
                      options={modeOptionsStatus}
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

export default StripeSettings;
