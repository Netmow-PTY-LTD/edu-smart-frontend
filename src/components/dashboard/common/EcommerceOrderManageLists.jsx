import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
} from 'reactstrap';
import Layout from '../layout';
import Loader from './Loader';
import DeleteModal from './Modals/DeleteModal';
import Pagination from './Pagination';

const EcommerceOrderManageLists = ({
  deleteModal,
  togDeleteModal,
  productId,
  handleDelete,
  getEcommerceOrderData,
  handleChangeStatus,
  changeStatusLoading,
  userInfoData,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid className="px-4 mb-2">
          <Row>
            <Col>
              <div className="h-100">
                <Col xl={12} className="pt-2">
                  <Card>
                    <CardHeader className="d-flex align-items-center">
                      <div className="col-sm pe-3">
                        <div className="d-flex justify-content-sm-start">
                          <h4 className="card-title mb-0 flex-grow-1 ">
                            Order Lists
                          </h4>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody style={{ position: 'relative' }}>
                      <Table responsive borderd hover size="md">
                        <thead className="fs-2 bg-body">
                          <tr>
                            <th>SN</th>
                            <th>Invoice No</th>
                            <th>User Name</th>
                            <th>P Name</th>
                            <th>QNT</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getEcommerceOrderData?.length > 0 &&
                            getEcommerceOrderData
                              ?.slice(
                                currentPage * perPageData,
                                getEcommerceOrderData?.length -
                                  currentPage * perPageData >
                                  perPageData
                                  ? currentPage * perPageData + perPageData
                                  : getEcommerceOrderData?.length
                              )
                              ?.map((item, key) => (
                                <tr className=" align-middle" key={key}>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      {key + 1}
                                    </h5>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      {`INV-${item?.invoice?._id.slice(0, 6)}`}
                                    </h5>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal text-wrap">
                                      {item?.user?.first_name +
                                        ' ' +
                                        item?.user?.last_name}
                                    </h5>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal text-wrap text-capitalize">
                                      {item?.product?.title}
                                    </h5>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-semibold">
                                      {item?.quantity}
                                    </h5>
                                  </td>

                                  <td>
                                    <h5 className="fs-14 my-1 fw-semibold qoute_color">
                                      {(
                                        parseFloat(item?.invoice?.amount || 0) +
                                        ((item?.invoice?.amount || 0) *
                                          (item?.invoice?.gst || 0)) /
                                          100 +
                                        (item?.invoice?.sd_fee || 0)
                                      ).toFixed(2)}{' '}
                                      {item?.invoice?.currency}
                                    </h5>
                                  </td>
                                  {userInfoData?.role === 'admin' ? (
                                    <td>
                                      <div className="d-flex justify-content-start">
                                        <UncontrolledDropdown direction="end">
                                          <DropdownToggle
                                            tag="a"
                                            className="text-reset text-semibold"
                                            role="button"
                                          >
                                            <span
                                              className={`d-flex align-items-center justify-content-center text-uppercase fw-semibold px-3 fs-4 rounded ${item?.status === 'processing' ? `bg-secondary-subtle qoute_color` : item?.status === 'confirmed' ? 'bg-warning-subtle text-warning' : item?.status === 'delivered' ? 'bg-success-subtle text-success' : item?.status === 'cancelled' ? 'bg-danger-subtle text-danger' : ''}`}
                                            >
                                              {item?.status}
                                              <i className="ri-arrow-down-s-line ms-2 fs-1 fw-bold"></i>
                                            </span>
                                          </DropdownToggle>
                                          <DropdownMenu className="ms-2">
                                            <DropdownItem>
                                              {changeStatusLoading ? (
                                                <Loader />
                                              ) : (
                                                <div
                                                  onClick={() =>
                                                    handleChangeStatus(
                                                      'processing',
                                                      item?._id
                                                    )
                                                  }
                                                  className="qoute_color p-2"
                                                >
                                                  <i className="ri-loader-2-line align-start me-2 qoute_color"></i>
                                                  Processing
                                                </div>
                                              )}
                                            </DropdownItem>

                                            <DropdownItem>
                                              {changeStatusLoading ? (
                                                <Loader />
                                              ) : (
                                                <div
                                                  onClick={() =>
                                                    handleChangeStatus(
                                                      'confirmed',
                                                      item?._id
                                                    )
                                                  }
                                                  className=" text-warning p-2"
                                                >
                                                  <i className="ri-check-double-fill align-start me-2 text-warning"></i>
                                                  Confirm
                                                </div>
                                              )}
                                            </DropdownItem>
                                            <DropdownItem>
                                              {changeStatusLoading ? (
                                                <Loader />
                                              ) : (
                                                <div
                                                  onClick={() =>
                                                    handleChangeStatus(
                                                      'delivered',
                                                      item?._id
                                                    )
                                                  }
                                                  className=" text-success p-2"
                                                >
                                                  <i className="ri-truck-line align-start me-2 text-success"></i>
                                                  Deliver
                                                </div>
                                              )}
                                            </DropdownItem>
                                            <DropdownItem>
                                              {changeStatusLoading ? (
                                                <Loader />
                                              ) : (
                                                <div
                                                  onClick={() =>
                                                    handleChangeStatus(
                                                      'cancelled',
                                                      item?._id
                                                    )
                                                  }
                                                  className=" text-danger p-2"
                                                >
                                                  <i className="ri-close-line align-start me-2 text-danger"></i>
                                                  Cancel
                                                </div>
                                              )}
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>
                                      </div>
                                    </td>
                                  ) : (
                                    <td>
                                      <h5
                                        className={`  text-uppercase fw-semibold fs-4 ${item?.status === 'processing' ? ` qoute_color` : item?.status === 'confirmed' ? ' text-warning' : item?.status === 'delivered' ? ' text-success' : item?.status === 'cancelled' ? ' text-danger' : ''}`}
                                      >
                                        {item?.status}
                                      </h5>
                                    </td>
                                  )}

                                  {/* Action */}
                                  <td className="text-center">
                                    <small
                                      onClick={() => {
                                        router.push({
                                          pathname:
                                            userInfoData?.role === 'admin'
                                              ? '/admin/ecommerce/ecommerce-invoice'
                                              : userInfoData?.role ===
                                                  'guardian'
                                                ? '/guardian/ecommerce-invoice'
                                                : userInfoData?.role ===
                                                    'player'
                                                  ? '/player/ecommerce-invoice'
                                                  : userInfoData?.role ===
                                                      'manager'
                                                    ? '/manager/ecommerce-invoice'
                                                    : userInfoData?.role ===
                                                        'trainer'
                                                      ? '/trainer/ecommerce-invoice'
                                                      : '',
                                          query: {
                                            id: item?._id,
                                          },
                                        });
                                      }}
                                      type="button"
                                      className="button fs-14 my-1 fw-normal text-white px-2 py-1"
                                    >
                                      View
                                    </small>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </Table>

                      {/* Delete Modal */}
                      <div>
                        {
                          <DeleteModal
                            Open={deleteModal}
                            close={togDeleteModal}
                            id={productId}
                            handleDelete={handleDelete}
                          />
                        }
                      </div>

                      {getEcommerceOrderData?.length <= 0 && (
                        <div className="empty-table-dialog-container">
                          <span>{"Don't found any Data. "}</span>
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
                        data={getEcommerceOrderData}
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
        </Container>
      </div>
    </Layout>
  );
};

export default EcommerceOrderManageLists;
