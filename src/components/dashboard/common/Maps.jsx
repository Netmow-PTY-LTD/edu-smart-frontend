import React, { use, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col } from 'reactstrap';

const Maps = ({ place }) => {
  const [srcString, setSrcString] = useState(null);

  useEffect(() => {
    if (place) {
      setSrcString(
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyBj7s-6omZZa5NHTTFYa9s3l78e41GkypM&q=${place?.replace(/[^\w\s]/gi, ' ')}`
      );
    }
  }, [place, srcString]);

  return (
    <>
      <Col xl={12}>
        <Card>
          <CardHeader className="align-items-center d-flex">
            <CardTitle className="fw-medium mb-0 flex-grow-1">
              Venue Location
            </CardTitle>
          </CardHeader>
          <CardBody>
            <iframe
              src={srcString ? srcString : ''}
              width="100%"
              height="500"
              className="border-0"
              allowFullScreen=""
              loading="fast"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Maps;
