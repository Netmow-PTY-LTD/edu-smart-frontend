import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';

const OrderSummary = ({
  name,
  subTotal,
  gst,
  charges,
  forSuperAdmin,
  total,
  currency,
  gstPercent,
}) => {
  return (
    <>
    
      <Col xl={12}>
        <Card>
          <CardHeader>
            <div className="d-flex">
              <div className="flex-grow-1">
                <h5 className="card-title mb-0">Order Summary</h5>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="table-responsive table-card mb-5">
              <table className="table table-borderless align-middle mb-0">
                <tbody>
                  <tr>
                    <td className="fw-semibold" colSpan="2">
                      Name:
                    </td>
                    <td className="fw-semibold text-end text-uppercase">
                      {name}
                    </td>
                  </tr>

                  {/* {data?.identity_type &&
                  data?.identity_type === 'player registration' ? (
                    ''
                  ) : (
                    <tr>
                      <td colSpan="2">Game Fee:</td>
                      <td className="text-end">$ 33.00</td>
                    </tr>
                  )}

                  {data?.identity_type &&
                  data?.identity_type === 'player registration' ? (
                    ''
                  ) : (
                    <tr>
                      <td colSpan="2">Processing Fee:</td>
                      <td className="text-end">$ 1.00</td>
                    </tr>
                  )} */}

                  <tr>
                    <td className="fw-semibold" colSpan="2">
                      Sub Total :
                    </td>
                    <td className="fw-semibold text-end">
                      {subTotal} {currency}
                    </td>
                  </tr>
                  {forSuperAdmin ? (
                    ''
                  ) : (
                    <tr>
                      <td colSpan="2">SD Fee : </td>
                      <td className="text-end">
                        {charges} {currency}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td colSpan="2">GST({gstPercent}%): </td>
                    <td className="text-end">
                      {gst} {currency}
                    </td>
                  </tr>

                  <tr className="table-active">
                    <th colSpan="2">Total ({currency}) :</th>
                    <td className="text-end">
                      <span className="fw-semibold">
                        {total} {currency}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default OrderSummary;
