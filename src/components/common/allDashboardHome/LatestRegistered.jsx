/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import CommonTableComponent from '../CommonTableComponent';

const LatestRegistered = ({ data, headers, tableHead }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(5);

  return (
    <Card>
      <CardHeader className="align-items-center d-flex fw-semibold">
        {tableHead}
      </CardHeader>

      <CardBody>
        <CommonTableComponent
          headers={headers}
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPageData={perPageData}
          emptyMessage="No Data found yet."
        />
      </CardBody>
    </Card>
  );
};

export default LatestRegistered;