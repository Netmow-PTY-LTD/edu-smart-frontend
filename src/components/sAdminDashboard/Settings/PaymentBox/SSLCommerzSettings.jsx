import PasswordField from '@/components/common/formField/PasswordField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import {
  useGetSSLcommerzForSuperAdminQuery,
  useUpdateSSLcommerzForSuperAdminMutation,
} from '@/slice/services/super admin/paymentServices';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
const SSLCommerzSettings = () => {
  const [initialValues, setInitialValues] = useState({
    store_id_live: '',
    store_password_live: '',
    store_id_test: '',
    store_password_test: '',
    mode: '',
  });

  const {
    data: getSSLcommerzForSuperAdminData,
    refetch: updateSSLcommerzForSuperAdminRefatch,
  } = useGetSSLcommerzForSuperAdminQuery();

  const [updateSSLcommerzForSuperAdmin] =
    useUpdateSSLcommerzForSuperAdminMutation();

  useEffect(() => {
    if (getSSLcommerzForSuperAdminData?.data?._id) {
      setInitialValues({
        store_id_live:
          getSSLcommerzForSuperAdminData?.data?.store_id_live || '',
        store_password_live:
          getSSLcommerzForSuperAdminData?.data?.store_password_live || '',
        store_id_test:
          getSSLcommerzForSuperAdminData?.data?.store_id_test || '',
        store_password_test:
          getSSLcommerzForSuperAdminData?.data?.store_password_test || '',
        mode:
          {
            label: getSSLcommerzForSuperAdminData?.data?.mode,
            value: getSSLcommerzForSuperAdminData?.data?.mode,
          } || '',
      });
    }
  }, [
    getSSLcommerzForSuperAdminData?.data?._id,
    getSSLcommerzForSuperAdminData?.data?.mode,
    getSSLcommerzForSuperAdminData?.data?.store_id_live,
    getSSLcommerzForSuperAdminData?.data?.store_id_test,
    getSSLcommerzForSuperAdminData?.data?.store_password_live,
    getSSLcommerzForSuperAdminData?.data?.store_password_test,
  ]);

  const validationSchema = Yup.object({
    stripeKey: Yup.string()
      .required(' Key is required')
      .min(10, ' Key should be at least 10 characters long'),
    stripeSecret: Yup.string()
      .required(' Secret is required')
      .min(10, ' Secret should be at least 10 characters long'),
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
      const result = await updateSSLcommerzForSuperAdmin(data).unwrap();
      if (result?.success) {
        toast.success('SSL Settings Updated Successfully');
        updateSSLcommerzForSuperAdminRefatch();
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
                      name={'store_id_live'}
                      label={'Store Id Live'}
                      placeholder={'Enter SSL Key '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'store_password_live'}
                      label={'Store Password Live'}
                      placeholder={'Enter SSL Secret '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'store_id_test'}
                      label={'Store Id Test'}
                      placeholder={'Enter SSL Key '}
                    />
                  </Col>
                  <Col lg={6}>
                    <PasswordField
                      name={'store_password_test'}
                      label={'Store Password Live'}
                      placeholder={'Enter SSL Secret '}
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

export default SSLCommerzSettings;
