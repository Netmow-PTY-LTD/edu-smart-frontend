import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import DeleteModal from './Modals/DeleteModal';
import Pagination from './Pagination';

const SeasonalGamesOrderList = ({
  data,
  currentPage,
  perPageData,
  setCurrentPage,
  deleteModal,
  togDeleteModal,
}) => {
  return (
    <>
      <Row>
        <Col>
          <div className="h-100">
            <Col xl={12} className="pt-4">
              <Card>
                <CardHeader className="align-items-center d-flex">
                  <div className="col-sm pe-3">
                    <div className="d-flex justify-content-sm-start my-3">
                      <h4 className="card-title mb-0 flex-grow-1 ps-2">
                        All Seasonal Game Order List
                      </h4>
                    </div>
                  </div>
                </CardHeader>
                <CardBody
                  style={{ position: 'relative', height: '440px' }}
                  className="table-card-body-container"
                >
                  <div className="table-responsive table-card mb-5">
                    <table className="table table-hover table-centered align-middle table-nowrap ">
                      <thead className="fs-2">
                        <tr>
                          <th scope="col" className="py-4">
                            Order ID
                          </th>
                          <th scope="col" className="py-4">
                            Game Name
                          </th>
                          <th scope="col" className="py-4">
                            Date
                          </th>
                          <th scope="col" className="py-4">
                            Location
                          </th>
                          <th scope="col" className="py-4">
                            Fees
                          </th>
                          <th scope="col" className="py-4">
                            Status
                          </th>
                          <th scope="col" className="py-4">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {data?.length > 0 &&
                          data
                            ?.slice(
                              currentPage * perPageData,
                              data?.length - currentPage * perPageData >
                                perPageData
                                ? currentPage * perPageData + perPageData
                                : data?.length
                            )
                            .map((item, key) => ( */}
                        <tr key={'key'}>
                          <td>
                            <Link href={''} className="fs-3 close-btn">
                              <span>OD#123456</span>
                            </Link>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">Name</h5>
                          </td>

                          <td>
                            <h5 className="fs-14 my-1 fw-normal text-uppercase">
                              vanue
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal text-uppercase">
                              location
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal qoute_color">
                              $506.00
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal badge bg-success-subtle text-success text-uppercase">
                              paid
                            </h5>
                          </td>

                          <td>
                            <button className="third-btn fw-normal fs-2">
                              Pay
                            </button>
                          </td>
                          {/* <td>
                            <button className="fs-3 close-btn ">Delete</button>
                          </td> */}
                          {/* <td>
                            <button className="fs-3 badge bg-success-subtle fw-normal text-success">
                              Invoice
                            </button>
                          </td> */}
                        </tr>
                        {/* ))} */}
                      </tbody>
                    </table>
                  </div>

                  {/* Delete Modal */}
                  {<DeleteModal Open={deleteModal} close={togDeleteModal} />}

                  {/* If table data is empty */}
                  {''?.length <= 0 && (
                    <div className="empty-table-dialog-container">
                      <span className="">
                        {"Don't found any Seasonal Game Order List."}
                      </span>
                    </div>
                  )}
                </CardBody>
                <CardFooter>
                  <Pagination
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 20,
                    }}
                    data={data}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                  />
                </CardFooter>
              </Card>
            </Col>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SeasonalGamesOrderList;
