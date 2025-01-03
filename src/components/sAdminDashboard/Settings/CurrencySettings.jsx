import NumberField from '@/components/common/formField/NumberField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import {
  useGetAgentCurrencySettingsQuery,
  useUpdateAgentCurrencySettingsMutation,
} from '@/slice/services/agent/agentSettingsService';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
const CurrencySettings = ({ userType }) => {
  const [initialValues, setInitialValues] = useState({
    gst: 0,
    currency: '',
  });

  const {
    data: currencyData,
    isLoading: currencyIsLoading,
    refetch: currencyRefatch,
  } = useGetAgentCurrencySettingsQuery();

  const [updateAgentCurrencySettings] =
    useUpdateAgentCurrencySettingsMutation();

  useEffect(() => {
    if (currencyData?.data?._id) {
      setInitialValues({
        gst: currencyData?.data?.gst || 0,
        currency: currencyData?.data?.currency || '',
      });
    }
  }, [
    currencyData?.data?._id,
    currencyData?.data?.currency,
    currencyData?.data?.gst,
  ]);

  const validationSchema = Yup.object({
    gst: Yup.number()
      .required('GST is required')
      .min(0, 'GST cannot be less than 0')
      .max(100, 'GST cannot be more than 100')
      .typeError('GST must be a number'),
    currency: Yup.string()
      .required('Currency is required')
      .typeError('Currency must be a number'),
  });

  const handleSubmit = async (value, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const result = await updateAgentCurrencySettings(value).unwrap();

      if (result?.success) {
        toast.success('Currency and Fees updated successfully');
        currencyRefatch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
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
                <Row>
                  <Col md={6}>
                    <NumberField name={'gst'} label={'GST(%)'} />
                  </Col>
                  <Col md={6}>
                    <TextField
                      name={'currency'}
                      label={'Currency'}
                      disabled={true}
                    />
                  </Col>
                  <Col sm={12} className="text-end">
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      formSubmit={'Save Change'}
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

export default CurrencySettings;
