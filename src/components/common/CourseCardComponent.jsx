import React from 'react';
import { Badge, Card, CardBody, CardHeader } from 'reactstrap';

const CourseCardComponent = ({ item }) => {
  return (
    <>
      <Card className="px-4 py-2">
        <CardHeader className="d-flex align-items-center justify-content-center text-capitalize fw-medium fs-2 text-primary">
          {item?.name || 'Course Name'}
        </CardHeader>
        <CardBody>
          <div>
            <p className="text-wrap">
              {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
            </p>
            <div className="d-flex align-items-center justify-content-between gap-2 my-3">
              <h3 className="text-primary">
                {item?.department?.name || 'Department Name'}
              </h3>
              <h3 className="text-primary">
                {item?.category?.name || 'Program Name'}
              </h3>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <Badge
              pill
              className="button py-2 px-4 fs-3"
              color="bg-third-color"
            >
              View Details
            </Badge>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CourseCardComponent;
