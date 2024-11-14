import Link from 'next/link';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import SuccessModel from './Modals/SuccessModel';
import Pagination from './Pagination';

const SeasonalGameInvoicesList = ({
  seasonalGameData,
  userInfoData,
  guardianProfile,
  playerProfile,
  goToInvoice,
  id,
  setAdd_success_modal,
  add_success_modal,
  Tog_add_success_modal,
  paidByCashIsLoading,
  userId,
  gameDetails,
  redirectToInvoice,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  return (
    <>
      <Col xl={12}>
        <Card>
          <ToastContainer />
          <CardHeader className="align-items-center d-flex">
            <div className="col-sm pe-3 ">
              <div className="d-flex justify-content-sm-start">
                <h4 className="card-title my-2 flex-grow-1 ps-2">
                  Seasonal Game Invoices
                </h4>
              </div>
            </div>
          </CardHeader>
          <CardBody
            style={{ position: 'relative' }}
            className="table-card-body-container"
          >
            <div className="table-responsive table-card mb-5">
              <table className="table table-hover table-centered align-middle table-nowrap ">
                <thead className="fs-2">
                  <tr>
                    <th scope="col" className="py-4">
                      User Name
                    </th>
                    <th scope="col" className="py-4">
                      Game Name
                    </th>
                    {gameDetails ? (
                      <>
                        <th scope="col" className="py-4">
                          Guardian
                        </th>
                        <th scope="col" className="py-4">
                          Player
                        </th>
                      </>
                    ) : (
                      ''
                    )}
                    <th scope="col" className="py-4">
                      Amount
                    </th>
                    {/* <th scope="col" className="py-4">
                      Method
                    </th> */}
                    <th scope="col" className="py-4">
                      Status
                    </th>
                    <th scope="col" className="py-4">
                      Billing Date
                    </th>
                    <th scope="col" className="py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {seasonalGameData?.length > 0 &&
                    seasonalGameData
                      ?.slice(
                        currentPage * perPageData,
                        seasonalGameData?.length - currentPage * perPageData >
                          perPageData
                          ? currentPage * perPageData + perPageData
                          : seasonalGameData?.length
                      )
                      .map((item, key) => (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center py-4">
                              <div>
                                <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                  {item?.user?.first_name +
                                    ' ' +
                                    item?.user?.last_name}
                                </h5>
                                {/* <p>{item?.user?.role}</p> */}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center py-4">
                              <div>
                                <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                  {item?.event_name}
                                </h5>
                              </div>
                            </div>
                          </td>
                          {gameDetails ? (
                            <td>
                              <h5 className="fs-14 my-1 fw-medium text-uppercase ">
                                {item?.user?.role === 'guardian'
                                  ? item?.user?.first_name +
                                    ' ' +
                                    item?.user?.last_name
                                  : item?.user?.guardian
                                    ? item?.user?.guardian?.first_name +
                                      ' ' +
                                      item?.user?.guardian?.last_name
                                    : 'N/A'}
                              </h5>
                            </td>
                          ) : (
                            ''
                          )}

                          {gameDetails ? (
                            <td>
                              <h5 className="fs-14 my-1 fw-medium text-uppercase ">
                                {item?.user?.role === 'player' &&
                                item?.user?.first_name
                                  ? item?.user?.first_name +
                                    ' ' +
                                    item?.user?.last_name
                                  : 'N/A'}
                              </h5>
                            </td>
                          ) : (
                            ''
                          )}

                          <td>
                            <h5 className="fs-14 my-1 fw-semibold text-success">
                              {(
                                (parseFloat(item?.amount) +
                                  parseFloat(item.sd_fee || 0)) *
                                (1 + parseFloat(item.gst || 0) / 100)
                              ).toFixed(2)}{' '}
                              {item?.currency}
                            </h5>
                          </td>

                          {/* <td>
                            <h5 className="fs-14 my-1 fw-medium text-uppercase">
                              {userInfoData?.role === 'admin'
                                ? 'Cash'
                                : 'Stripe'}
                            </h5>
                          </td> */}
                          <td>
                            <h5
                              className={`fs-14 my-1 fw-medium text-uppercase badge ${item?.bill_status === 'paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                            >
                              {item?.bill_status}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {' '}
                              {new Date(item?.billing_date).toDateString()}
                            </h5>
                          </td>

                          {userInfoData?.role === 'admin' &&
                          guardianProfile === 'yes' &&
                          item?.bill_status === 'unpaid' ? (
                            <td>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault(),
                                    Tog_add_success_modal({
                                      eId: item?.event_id,
                                      pId: item?.user?._id,
                                    });
                                }}
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                Pay Now
                              </button>
                            </td>
                          ) : userInfoData?.role === 'admin' &&
                            playerProfile === 'yes' &&
                            item?.bill_status === 'unpaid' ? (
                            <td>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault(),
                                    Tog_add_success_modal(item?.event_id);
                                }}
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                Pay Now
                              </button>
                            </td>
                          ) : userInfoData?.role === 'guardian' &&
                            item?.bill_status === 'unpaid' ? (
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  redirectToInvoice({
                                    eId: item?.event_id,
                                    pId: item?.user?._id,
                                  })
                                }
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                Pay Now
                              </button>
                            </td>
                          ) : userInfoData?.role === 'player' &&
                            item?.bill_status === 'unpaid' ? (
                            <td>
                              <button
                                type="button"
                                onClick={() => goToInvoice(item?.event_id)}
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                Pay Now
                              </button>
                            </td>
                          ) : userInfoData?.role === 'admin' ||
                            userInfoData?.role === 'guardian' ||
                            userInfoData?.role === 'player' ? (
                            <td>
                              <Link
                                href={
                                  userInfoData?.role === 'admin' &&
                                  guardianProfile === 'yes' &&
                                  item?.bill_status === 'paid'
                                    ? `/admin/seasonal-game-paid-by-cash-invoice/${item?._id},${item?.user?._id}`
                                    : userInfoData?.role === 'admin' &&
                                        playerProfile === 'yes' &&
                                        item?.bill_status === 'paid'
                                      ? `/admin/seasonal-game-paid-by-cash-invoice/${item?._id},${userId}`
                                      : userInfoData?.role === 'guardian' &&
                                          playerProfile === 'yes' &&
                                          item?.bill_status === 'paid'
                                        ? `/guardian/seasonal-game-fee-for-single-player/${item?.event_id},${item?.user?._id}`
                                        : userInfoData?.role === 'player' &&
                                            item?.bill_status === 'paid'
                                          ? `/player/seasonal-game-fee-for-single-player/${item?.event_id},${id}`
                                          : userInfoData?.role === 'admin' &&
                                              item?.user?.guardian
                                            ? `/admin/seasonal-game-paid-by-cash-invoice/${item?._id},${item?.user?.guardian?._id}`
                                            : userInfoData?.role === 'admin' &&
                                                item?.user
                                              ? `/admin/seasonal-game-paid-by-cash-invoice/${item?._id},${item?.user?._id}`
                                              : ''
                                }
                                type="button"
                                className="button fs-14 my-1 fw-normal text-white px-2 py-1 "
                              >
                                View
                              </Link>
                            </td>
                          ) : (
                            ''
                          )}
                        </tr>
                      ))}

                  <SuccessModel
                    title={'Pay Seasonal Game Fee For Player'}
                    secondTitle={'For Payment Please Click Pay Now Button'}
                    rightBtn={'Close'}
                    leftBtn={'Pay Now'}
                    backBtn={'no'}
                    goToInvoice={goToInvoice}
                    id={id}
                    setAdd_success_modal={setAdd_success_modal}
                    add_success_modal={add_success_modal}
                    paidByCashIsLoading={paidByCashIsLoading}
                  />
                </tbody>
              </table>
            </div>

            {seasonalGameData?.length <= 0 && (
              <div className="empty-table-dialog-container">
                <span className="">{"Don't found any Schedule yet..... "}</span>
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
              data={seasonalGameData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
            />
          </CardFooter>
        </Card>
      </Col>
    </>
  );
};

export default SeasonalGameInvoicesList;
