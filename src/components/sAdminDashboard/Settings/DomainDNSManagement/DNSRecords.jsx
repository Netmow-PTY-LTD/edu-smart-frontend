import CommonTableComponent from '@/components/common/CommonTableComponent';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import DNSModal from '../modals/DNSModal';
import * as Yup from 'yup';
import { useState } from 'react';
const DNSRecords = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    hostName: '',
    value: '',
  });

  const validationSchema = Yup.object({
    hostName: Yup.string()
      .required('Host Name is required')
      .min(3, 'Host Name must be at least 3 characters'),
    value: Yup.string()
      .required('Value is required')
      .min(3, 'Value must be at least 3 characters'),
  });

  const handleDNSSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
  };

  const actionHeader = [
    {
      title: 'Host Name',
      key: 'hostName',
    },
    {
      title: 'Value',
      key: 'value',
    },
    {
      title: 'Actions',
      key: 'actions',
    },
  ];

  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle tag="h5">DNS Records </CardTitle>
          <Button
            onClick={() => {
              setModalIsOpen(!modalIsOpen);
            }}
            className="button"
          >
            Add New
          </Button>
        </CardHeader>
        <CardBody className="p-5">
          <CommonTableComponent headers={actionHeader} />
        </CardBody>
      </Card>

      <DNSModal
        formHeader={'Add DNS Record'}
        onClose={() => {
          setModalIsOpen(!modalIsOpen);
        }}
        isOpen={modalIsOpen}
        onSubmit={handleDNSSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={'Add DNS Record'}
        setInitialValues={setInitialValues}
      />
    </>
  );
};

export default DNSRecords;
