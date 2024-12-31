import CommonTableComponent from '@/components/common/CommonTableComponent';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

const DNSRecords = () => {
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
          <Button className="button">Add New</Button>
        </CardHeader>
        <CardBody className="p-5">
          <CommonTableComponent headers={actionHeader} />
        </CardBody>
      </Card>
    </>
  );
};

export default DNSRecords;
