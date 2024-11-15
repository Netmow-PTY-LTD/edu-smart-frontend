import { recentOrders } from '@/utils/common/data';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';

const RecentOrders = () => {
  return (
    <React.Fragment>
      <Col xl={8}>
        <Card>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
            <div className="flex-shrink-0">
              <button type="button" className="btn btn-soft-secondary btn-sm">
                <i className="ri-file-list-3-line align-middle"></i> Generate
                Report
              </button>
            </div>
          </CardHeader>

          <CardBody>
            <div className="table-responsive table-card mb-5">
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Product</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Vendor</th>
                    <th scope="col">Status</th>
                    <th scope="col">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentOrders || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <Link
                          href="/apps-ecommerce-order-details"
                          className="fw-medium text-reset"
                        >
                          {item.orderId}
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <Image
                              priority={true}
                              src={item.img ? item?.img : `${userDummyImage}`}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">{item.name}</div>
                        </div>
                      </td>
                      <td>{item.product}</td>
                      <td>
                        <span className="text-primary">${item.amount}.00</span>
                      </td>
                      <td>{item.vendor}</td>
                      <td>
                        <span
                          className={
                            'badge bg-' +
                            item.statusClass +
                            '-subtle text-' +
                            item.statusClass
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <h5 className="fs-14 fw-medium mb-0">
                          {item.rating}
                          <span className="text-muted fs-11 ms-1">
                            ({item.votes} votes)
                          </span>
                        </h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RecentOrders;
