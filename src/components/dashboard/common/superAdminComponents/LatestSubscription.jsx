import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const LatestSubscription = ({ data }) => {
  console.log(data);

  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                Latest Subscriptions
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
                    Name
                  </th>
                  <th scope="col" className="py-4">
                    Package
                  </th>
                  <th scope="col" className="py-4">
                    Amount
                  </th>
                  <th scope="col" className="py-4">
                    Currency
                  </th>

                  <th scope="col" className="py-4">
                    Date
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
                        <div className="d-flex align-items-center py-0">
                          <div className="flex-shrink-0 me-4">
                            <h5 className="fs-14 my-1 fw-medium text-uppercase">
                              {item?.first_name + ' ' + item?.last_name}
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase text-primary">
                          {item?.package?.name}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal text-wrap">
                          {(() => {
                            const matchedFee =
                              item?.package?.subscription_fees?.find((pack) =>
                                pack?.country === item?.country
                                  ? pack?.country === item?.country
                                  : pack?.country === 'United States'
                              );
                            return matchedFee?.price
                              ? `${matchedFee.price}`
                              : 'N/A';
                          })()}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.currency}
                        </h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {new Date(item?.createdAt).toDateString()}
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

export default LatestSubscription;
