import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import React from 'react';
import { Card, CardBody } from 'reactstrap';

const AppliedCourseForm = ({ setStep, step, loading }) => {
  const data = [
    {
      title: 'Passport',
      description: 'Please upload a clear image or scan of your passport.',
      is_required: 'true',
    },
    {
      title: 'Driver’s License',
      description: 'Upload a copy of your valid driver’s license.',
      is_required: 'false',
    },
    {
      title: 'Proof of Address',
      description:
        'A recent utility bill or bank statement showing your address.',
      is_required: 'true',
    },
    {
      title: 'Resume/CV',
      description: 'Attach your most recent resume or CV for job applications.',
      is_required: 'false',
    },
    {
      title: 'Birth Certificate',
      description:
        'Upload a copy of your birth certificate for identity verification.',
      is_required: 'true',
    },
  ];

  return (
    <Card>
      <div className="card-header">
        <h5 className="fs-20 text-secondary-alt fw-semibold mb-0">
          Required Documents
        </h5>
        <h5
          onClick={() => setStep(step - 1)}
          className="button px-4 py-2 fs-20 text-secondary-alt fw-semibold mb-0 cursor-pointer"
        >
          <i className="ri-arrow-left-double-line"></i>
          Previous
        </h5>
      </div>
      {loading ? (
        <LoaderSpiner />
      ) : (
        <CardBody>
          <div className="form-content">hello</div>
        </CardBody>
      )}
    </Card>
  );
};

export default AppliedCourseForm;
