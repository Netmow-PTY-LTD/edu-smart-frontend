import Layout from '@/components/layout';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap';

const StudentProfile = () => {
  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card className="my-2">
            <CardHeader>Profile Settings</CardHeader>
            <CardBody>
              <CardTitle tag="h5">Special Title Treatment</CardTitle>

              <Button className='button' >Save Change</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
