import React, { useEffect, useState } from 'react';
import Layout from '../layout';
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
  UncontrolledDropdown,
} from 'reactstrap';
import SuccessModel from './Modals/SuccessModel';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const AllActivePlayers = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(9);
  const [activePlayers, setActivePlayers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const router = useRouter();

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  const { data: stripeKeyData } = useSelector(
    (state) => state.CommonApi.allPaymentSettings
  );

  useEffect(() => {
    setActivePlayers(data.filter((item) => item?.status === 'active'));
  }, [data]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setFilteredData(activePlayers);
    } else {
      const lowercasedValue = value.toLowerCase();
      const filteredResults = activePlayers.filter(
        (item) =>
          item?.first_name.toLowerCase().includes(lowercasedValue) ||
          item?.last_name.toLowerCase().includes(lowercasedValue) ||
          (
            item?.first_name.toLowerCase() +
            ' ' +
            item?.last_name.toLowerCase()
          ).includes(lowercasedValue) ||
          (item?.guardian &&
            (
              item?.guardian.first_name.toLowerCase() +
              ' ' +
              item?.guardian.last_name.toLowerCase()
            ).includes(lowercasedValue)) ||
          item?.date_of_birth.toLowerCase().includes(lowercasedValue) ||
          item?.gender.toLowerCase().includes(lowercasedValue) ||
          item?.payment_status.toLowerCase().includes(lowercasedValue)
      );
      setFilteredData(filteredResults);
    }
  };

  useEffect(() => {
    setFilteredData(activePlayers);
  }, [activePlayers]);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="align-items-center d-flex justify-content-between">
                  <div className="col-sm-auto">
                    <div className="fs-20 fw-bold text-black">
                      Active Players
                    </div>
                  </div>
                  <div className="col-sm-2 pe-3">
                    <div className="d-flex justify-content-sm-end w-100">
                      <div className="search-box w-100">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className={`table-responsive table-card mb-5`}>
                    <table className="table table-hover table-centered align-middle table-nowrap ">
                      <thead className="fs-2 bg-light">
                        <tr>
                          {/* <th scope="col" className="py-4">
                                    <div className="form-check">
                                      <Input
                                        className="form-check-input qoute_color"
                                        type="checkbox"
                                        name="chk_child"
                                        value="option1"
                                      />
                                    </div>
                                  </th> */}

                          <th scope="col">Name</th>
                          <th scope="col">Guardian</th>
                          <th scope="col">Date of Birth</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData?.length > 0 &&
                          filteredData
                            ?.slice(
                              currentPage * perPageData,
                              filteredData?.length - currentPage * perPageData >
                                perPageData
                                ? currentPage * perPageData + perPageData
                                : filteredData?.length
                            )
                            .map((item, i) => {
                              return (
                                <tr key={i} className="align-middle">
                                  {/* <th scope="col">
                                          <div className="form-check">
                                            <Input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="chk_child"
                                              value="option1"
                                            />
                                          </div>
                                        </th> */}
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-1">
                                        <Link
                                          href={
                                            userInfoData?.role === 'admin'
                                              ? `/admin/player-profile/${item?._id}`
                                              : userInfoData?.role ===
                                                  'guardian'
                                                ? `/guardian/player-profile-for-guardian/${item?._id}`
                                                : ''
                                          }
                                          className="text-reset"
                                        >
                                          <Image
                                            src={
                                              item?.profile_image?.uploadedImage
                                                ? item?.profile_image
                                                    ?.uploadedImage
                                                : `${userDummyImage}`
                                            }
                                            alt="User"
                                            height={60}
                                            width={60}
                                            className="avatar-md p-1 me-3 align-middle rounded-circle"
                                          />
                                        </Link>
                                      </div>
                                      <div>
                                        <h5 className="fs-14 fw-medium text-uppercase">
                                          <Link
                                            href={
                                              userInfoData?.role === 'admin'
                                                ? `/admin/player-profile/${item?._id}`
                                                : userInfoData?.role ===
                                                    'guardian'
                                                  ? `/guardian/player-profile-for-guardian/${item?._id}`
                                                  : ''
                                            }
                                            className="text-reset"
                                          >
                                            {item?.first_name +
                                              ' ' +
                                              item?.last_name}
                                          </Link>
                                        </h5>
                                        {/* <span className="text-muted fs-3">
                                              Football
                                            </span> */}
                                      </div>
                                    </div>
                                  </td>

                                  <td>
                                    <h5 className="fs-14 fw-normal text-uppercase">
                                      {item?.guardian
                                        ? item?.guardian?.first_name +
                                          ' ' +
                                          item?.guardian?.last_name
                                        : ''}
                                    </h5>
                                  </td>

                                  <td>
                                    <h5 className="fs-14  fw-normal">
                                      {' '}
                                      {item?.date_of_birth}
                                    </h5>
                                  </td>

                                  <td>
                                    <h5 className="fs-14 fw-normal">
                                      {' '}
                                      {item?.gender}
                                    </h5>
                                  </td>

                                  <td>
                                    <span
                                      className={` text-uppercase me-2 ${
                                        item?.payment_status &&
                                        item?.payment_status === 'paid'
                                          ? 'text-success badge bg-success-subtle'
                                          : 'text-danger badge bg-danger-subtle'
                                      } `}
                                    >
                                      {item?.payment_status
                                        ? item?.payment_status
                                        : 'unpaid'}
                                    </span>

                                    {userInfoData?.role === 'guardian' &&
                                    item?.payment_status === 'unpaid' ? (
                                      <div
                                        style={{
                                          cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                          if (
                                            stripeKeyData?.stripeSettings
                                              ?.stripe_key
                                          ) {
                                            router.push(
                                              `/guardian/checkout-for-guardian/${item?._id}`
                                            );
                                          } else {
                                            toast.error(
                                              'Can Not Find Stripe Key'
                                            );
                                          }
                                        }}
                                        className="badge bg-success-subtle text-primary"
                                      >
                                        Pay Now
                                      </div>
                                    ) : item?.payment_status === 'unpaid' ? (
                                      <button
                                        // onClick={() => {
                                        //   console.log('Pay Now');
                                        //   console.log(item?._id);
                                        //   Tog_add_success_modal(item?._id);
                                        // }}
                                        className="badge bg-success-subtle text-primary"
                                      >
                                        Pay Now
                                      </button>
                                    ) : null}
                                  </td>

                                  <td>
                                    <span
                                      className={` text-uppercase fs-4 fw-semibold ${
                                        item?.status &&
                                        item?.status === 'active'
                                          ? 'text-success '
                                          : 'text-danger '
                                      } `}
                                    >
                                      {item?.status && item?.status === 'active'
                                        ? 'active'
                                        : 'inactive'}
                                    </span>
                                  </td>

                                  <td>
                                    <div className="flex-shrink-0">
                                      <UncontrolledDropdown className="card-header-dropdown">
                                        <DropdownToggle
                                          tag="a"
                                          className="text-reset dropdown-btn"
                                          role="button"
                                        >
                                          <span className="button px-3 text-light">
                                            <i className="ri-more-fill align-middle"></i>
                                          </span>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                          <DropdownItem>
                                            <Link
                                              href={
                                                userInfoData?.role === 'admin'
                                                  ? `/admin/player-profile/${item?._id}`
                                                  : userInfoData?.role ===
                                                      'guardian'
                                                    ? `/guardian/player-profile-for-guardian/${item?._id}`
                                                    : ''
                                              }
                                            >
                                              <i className="ri-eye-line align-start me-2 text-muted "></i>
                                              View
                                            </Link>
                                          </DropdownItem>
                                          <DropdownItem>
                                            <Link href="#">
                                              <i className="ri-eye-line align-start me-2 text-muted "></i>
                                              Make Active
                                            </Link>
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                    <SuccessModel
                      title={'Successfully Added A Player'}
                      rightBtn="Close"
                      backBtn="no"
                      leftBtn="Paid By Cash"
                      // add_success_modal={add_success_modal}
                      // setAdd_success_modal={setAdd_success_modal}
                      // goToInvoice={redirectToInvoice}
                      // id={playerId}
                      // paidByCashIsLoading={paidByCashIsLoading}
                    />
                  </div>
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
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default AllActivePlayers;
