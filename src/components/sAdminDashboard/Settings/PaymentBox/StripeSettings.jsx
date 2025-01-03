import PasswordField from '@/components/common/formField/PasswordField';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import {
  useGetAgentStripeSettingsQuery,
  useUpdateAgentStripeSettingsMutation,
} from '@/slice/services/agent/agentSettingsService';
import Select from 'react-select';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import * as Yup from 'yup';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { toast } from 'react-toastify';
const StripeSettings = () => {
  const [mood, setMood] = useState({
    label: '',
    value: '',
  });
  const [initialValues, setInitialValues] = useState({
    publishable_key_live: '',
    secret_key_live: '',
    publishable_key_test: '',
    secret_key_test: '',
    mood: '',
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
        mood: agentStripeData?.data?.mood || '',
      });

      setMood({
        label:
          agentStripeData?.data?.mood === 'test' ? 'Test Mood' : 'Live Mood',
        value: agentStripeData?.data?.mood || 'live',
      });
    }
  }, [
    agentStripeData?.data?._id,
    agentStripeData?.data?.mood,
    agentStripeData?.data?.publishable_key_live,
    agentStripeData?.data?.publishable_key_test,
    agentStripeData?.data?.secret_key_live,
    agentStripeData?.data?.secret_key_test,
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
    const data = { ...values, mood: mood.value };
    console.log('Form Value:', data);
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

  const handleToggleChange = (newState) => {
    console.log('Toggle State:', newState);
  };

  const handleChange = (value) => {
    setMood(value);
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
                    <Select
                      id={'mood'}
                      name={'Mood'}
                      value={mood}
                      onChange={handleChange}
                      options={[
                        { value: 'test', label: 'Test Mood' },
                        { value: 'live', label: 'Live Mood' },
                      ]}
                      classNamePrefix="select"
                      isClearable={false}
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
