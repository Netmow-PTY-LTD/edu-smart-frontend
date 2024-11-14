import LoaderSpiner from '@/components/constants/Loader/Loader';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
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
import Layout from '../layout';
import BreadCrumb from './BreadCrumb';
import ImportData from './ImportData';
import DeleteModal from './Modals/DeleteModal';
import EditPlayerModal from './Modals/EditPlayerModal';
import SuccessModel from './Modals/SuccessModel';
import Pagination from './Pagination';

const AllPlayerList = ({
  handleEditPlayer,
  data,
  Tog_add_success_modal,
  togEditModal,
  tog_modal_delete,
  add_success_modal,
  redirectToInvoice,
  playerId,
  paidByCashIsLoading,
  modal_delete,
  handleDelete,
  isLoading,
  setAdd_success_modal,
  setEditModal,
  editModal,
  singlePlayerData,
  setCountry,
  setProfileImage,
  setFirst_name,
  setLast_name,
  setGender,
  setDate_of_birth,
  setHeight,
  setWeight,
  setCity,
  setState,
  setZip,
  setAddress_line_1,
  setAddress_line_2,
  setEmail,
  setPhone,
  setDescription,
  password,
  setPassword,
  setPasswordShow,
  first_name,
  last_name,
  gender,
  date_of_birth,
  height,
  weight,
  country,
  city,
  state,
  zip,
  address_line_1,
  address_line_2,
  email,
  passwordShow,
  phone,
  profileImage,
  description,
  updatePlayerIsLoading,
  setJerseyNumber,
  jerseyNumber,
  setConfirm_password,
  setConfirm_password_show,
  confirm_password_show,
  togCSVModal,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  const { data: stripeKeyData } = useSelector(
    (state) => state.CommonApi.allPaymentSettings
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setFilteredData(data);
    } else {
      const lowercasedValue = value.toLowerCase();
      const filteredResults = data.filter(
        (item) =>
          item?.first_name.toLowerCase().includes(lowercasedValue) ||
          item?.last_name.toLowerCase().includes(lowercasedValue) ||
          (
            item?.first_name.toLowerCase() +
            ' ' +
            item?.last_name.toLowerCase()
          ).includes(lowercasedValue) ||
          (item.guardian &&
            (
              item.guardian.first_name.toLowerCase() +
              ' ' +
              item.guardian.last_name.toLowerCase()
            ).includes(lowercasedValue)) ||
          item.date_of_birth.toLowerCase().includes(lowercasedValue) ||
          item.gender.toLowerCase().includes(lowercasedValue) ||
          item.payment_status.toLowerCase().includes(lowercasedValue)
      );
      setFilteredData(filteredResults);
    }
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  console.log(filteredData);

  return (
    <Layout>
      <div className="page-content">
        <BreadCrumb title={'All Players'} pagetitle={'Pages'} />

        {isLoading ? (
          <LoaderSpiner />
        ) : (
          <Container fluid className="px-4 mb-4">
            <ToastContainer />
            <Row>
              <Col>
                <div className="h-100">
                  <Row>
                    <Col xl={12} className="pt-4">
                      <Card>
                        <CardHeader className="align-items-center d-flex justify-content-between">
                          <div className="col-sm-auto">
                            <div>
                              <Link
                                href={
                                  userInfoData?.role === 'admin'
                                    ? `/admin/add-player`
                                    : userInfoData?.role === 'guardian'
                                      ? `/guardian/add-player-for-guardian`
                                      : ''
                                }
                                type="button"
                                className="button p-2 m-2 text-light"
                              >
                                <i className="ri-add-line align-bottom me-1"></i>
                                Add Player
                              </Link>
                            </div>
                          </div>
                          <div className="col-sm-6 pe-3">
                            <div className="d-flex justify-content-sm-end align-items-center w-100">
                              {userInfoData?.role === 'admin' ? (
                                <ImportData
                                  toggleModal={togCSVModal}
                                  exportCSVData={data}
                                />
                              ) : (
                                ''
                              )}
                              <div className="search-box">
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

                        <CardBody className="table-card-body-container">
                          <div
                            className={`table-responsive table-card mb-5 ${
                              data?.length > 0 && 'table-card-content-wrapper'
                            }`}
                          >
                            <table className="table table-hover table-centered align-middle table-nowrap ">
                              <thead className="fs-2 bg-light">
                                <tr>
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
                                      filteredData?.length -
                                        currentPage * perPageData >
                                        perPageData
                                        ? currentPage * perPageData +
                                            perPageData
                                        : filteredData?.length
                                    )
                                    .map((item, key) => (
                                      <tr key={key} className="align-middle">
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
                                                    item?.profile_image
                                                      ?.uploadedImage
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
                                                    userInfoData?.role ===
                                                    'admin'
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
                                          ) : item?.payment_status ===
                                            'unpaid' ? (
                                            <button
                                              onClick={() =>
                                                Tog_add_success_modal(item?._id)
                                              }
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
                                            {item?.status &&
                                            item?.status === 'active'
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
                                                      userInfoData?.role ===
                                                      'admin'
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
                                                  <div
                                                    type="button"
                                                    onClick={() =>
                                                      togEditModal(item?._id)
                                                    }
                                                    className="text-primary"
                                                  >
                                                    <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                                    Edit
                                                  </div>
                                                </DropdownItem>
                                                <DropdownItem>
                                                  <div
                                                    type="button"
                                                    onClick={() =>
                                                      tog_modal_delete(
                                                        item?._id
                                                      )
                                                    }
                                                    className="text-primary"
                                                  >
                                                    <i className="ri-close-circle-fill align-start me-2 text-muted"></i>
                                                    Inactive
                                                  </div>
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </UncontrolledDropdown>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                          </div>
                          <SuccessModel
                            title={'Successfully Added A Player'}
                            rightBtn="Close"
                            backBtn="no"
                            leftBtn="Paid By Cash"
                            add_success_modal={add_success_modal}
                            setAdd_success_modal={setAdd_success_modal}
                            goToInvoice={redirectToInvoice}
                            id={playerId}
                            paidByCashIsLoading={paidByCashIsLoading}
                          />
                          {/* edit modal */}
                          {
                            <EditPlayerModal
                              playerId={playerId}
                              setEditModal={setEditModal}
                              editModal={editModal}
                              singlePlayerData={singlePlayerData}
                              handleEditPlayer={handleEditPlayer}
                              setCountry={setCountry}
                              setProfileImage={setProfileImage}
                              setFirst_name={setFirst_name}
                              setLast_name={setLast_name}
                              setGender={setGender}
                              setDate_of_birth={setDate_of_birth}
                              setHeight={setHeight}
                              setWeight={setWeight}
                              setCity={setCity}
                              setState={setState}
                              setZip={setZip}
                              setAddress_line_1={setAddress_line_1}
                              setAddress_line_2={setAddress_line_2}
                              setEmail={setEmail}
                              setPhone={setPhone}
                              setDescription={setDescription}
                              password={password}
                              setPassword={setPassword}
                              setPasswordShow={setPasswordShow}
                              first_name={first_name}
                              last_name={last_name}
                              gender={gender}
                              date_of_birth={date_of_birth}
                              height={height}
                              weight={weight}
                              country={country}
                              city={city}
                              state={state}
                              zip={zip}
                              address_line_1={address_line_1}
                              address_line_2={address_line_2}
                              email={email}
                              passwordShow={passwordShow}
                              phone={phone}
                              profileImage={profileImage}
                              description={description}
                              updatePlayerIsLoading={updatePlayerIsLoading}
                              setJerseyNumber={setJerseyNumber}
                              jerseyNumber={jerseyNumber}
                              setConfirm_password={setConfirm_password}
                              setConfirm_password_show={
                                setConfirm_password_show
                              }
                              confirm_password_show={confirm_password_show}
                            />
                          }

                          {/* delete  */}
                          {
                            <DeleteModal
                              Open={modal_delete}
                              close={tog_modal_delete}
                              inactive={'Inactive'}
                              id={playerId}
                              handleDelete={handleDelete}
                            />
                          }

                          {data?.length <= 0 && (
                            <div className="empty-table-dialog-container">
                              <span className="">
                                {"You don't have any Player yet. "}
                                Please{' '}
                                <Link
                                  className="qoute_color text-decoration-underline fw-semibold"
                                  href={'/admin/add-player'}
                                >
                                  Add a Player
                                </Link>
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
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </Layout>
  );
};

export default AllPlayerList;
