import LoaderSpiner from '@/components/constants/Loader/Loader';
import {
  getSponsorsForTeamsAndEvents,
  updateSponsor,
} from '@/slices/dashboard/adminDashboard/Actions/sponsorsActions';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import Pagination from './Pagination';

const SponsorsCard = ({ data, loading, eventsIdForRemoveSponsor }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  const handleRemoveSponsor = (id) => {
    if (id) {
      let sponsorsData = {
        id: id,
        sponsoring_id: null,
      };

      const treamedData = new FormData();
      Object.entries(sponsorsData).forEach(([key, value]) => {
        treamedData.append(key, value);
      });

      dispatch(updateSponsor(treamedData)).then((res) => {
        if (res.error) {
          toast.error('Something Went Wrong.Please Try Again');
        } else {
          toast.success('Remove Sponsor Successfully');
          dispatch(getSponsorsForTeamsAndEvents(eventsIdForRemoveSponsor));
        }
      });
    }
  };

  return (
    <Col className="">
      {loading ? (
        <LoaderSpiner />
      ) : (
        <Card>
          <ToastContainer />
          <CardHeader className="align-items-center py-4 d-flex">
            <div className="col-sm pe-3">
              <div className="d-flex justify-content-sm-start">
                <h4 className="card-title mb-0 flex-grow-1 ps-2">Sponsors</h4>
              </div>
            </div>
          </CardHeader>
          <CardBody style={{ position: 'relative' }}>
            <div className="table-responsive table-card mb-5">
              <table className="table table-hover table-centered align-middle table-nowrap ">
                <tbody>
                  {data?.length > 0 &&
                    data
                      ?.slice(
                        currentPage * perPageData,
                        data?.length - currentPage * perPageData > perPageData
                          ? currentPage * perPageData + perPageData
                          : data?.length
                      )
                      .map((item, key) => (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center py-4">
                              <div>
                                <Image
                                  src={
                                    item?.logo?.uploadedImage
                                      ? item?.logo?.uploadedImage
                                      : `${userDummyImage}`
                                  }
                                  height={500}
                                  width={500}
                                  alt="User"
                                  className="avatar-sm rounded-circle"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-medium text-uppercase">
                              {item?.name}
                            </h5>
                            <span className="text-reset fs-4">
                              Sponsoring full event
                            </span>
                          </td>
                          {userInfoData?.role === 'admin' ? (
                            <td>
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRemoveSponsor(item?._id)}
                                className="d-flex align-items-center justify-content-center close-btn"
                              >
                                <i className="ri-close-line align-items-center"></i>
                              </div>
                            </td>
                          ) : (
                            ''
                          )}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {data?.length <= 0 && (
              <div className="empty-table-dialog-container">
                <span className="">
                  {"Don't found any sponsors."}
                  .....
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
      )}
    </Col>
  );
};

export default SponsorsCard;
