import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const LatestCharges = ({ data }) => {
  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                Latest Charges
              </h4>
            </div>
          </div>
        </CardHeader>

        <CardBody style={{ position: 'relative' }}>
          <div className="table-responsive table-card mb-5">
            <table className="table table-hover table-centered align-middle table-nowrap ">
              <thead className="fs-2">
                <tr>
                  <th scope="col" className="py-4">
                    SN
                  </th>
                  <th scope="col" className="py-4">
                    Clients
                  </th>
                  <th scope="col" className="py-4">
                    Invoices
                  </th>
                  <th scope="col" className="py-4">
                    Status
                  </th>
                  <th scope="col" className="py-4">
                    Amount
                  </th>
                  <th scope="col" className="py-4">
                    Currency
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 &&
                  data?.map((item, key) => (
                    <tr key={key}>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          {key + 1}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          {item?.created_by?.first_name +
                            ' ' +
                            item?.created_by?.last_name}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.invoice_number}
                        </h5>
                      </td>
                      <td>
                        <h5
                          className={`fs-4 my-1 fw-medium text-uppercase badge ${item?.status === 'paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                        >
                          {item?.status}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.charges?.length > 0
                            ? item.charges
                                .reduce((acc, cha) => acc + (cha?.fee ?? 0), 0)
                                .toFixed(2)
                            : 0}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          {item?.created_by?.currency}
                        </h5>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {data?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span>{"Don't found any Data."}</span>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default LatestCharges;
