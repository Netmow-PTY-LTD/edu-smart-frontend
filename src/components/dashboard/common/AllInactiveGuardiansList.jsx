import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import Layout from '../layout';
import BreadCrumb from './BreadCrumb';
import ImportData from './ImportData';
import CloseSuccessModal from './Modals/CloseSuccessModal';
import DeleteModal from './Modals/DeleteModal';
import InvoiceModal from './Modals/InvoiceModal';
import Pagination from './Pagination';

const AllInactiveGuardiansList = ({
  data,
  TogInvoiceModal,
  tog_modal_delete,
  sendInvoiceMail,
  sendInvoiceMailIsLoading,
  goToInvoice,
  multiPlayerPaidByCashIsLoading,
  registrationFee,
  removePendingPlayersHandler,
  allPendingPlayers,
  invoiceId,
  invoiceModal,
  setInvoiceModal,
  guardianId,
  TogCloseSuccessModal,
  setCloseSuccessModal,
  closeSuccessModal,
  modal_delete,
  handleDelete,
  setAllPendingPlayers,
  togCSVModal,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [inactivePlayers, setInactivePlayers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  useEffect(() => {
    const filteredInactivePlayers = data.filter(
      (item) => item?.status === 'inactive'
    );
    setInactivePlayers(filteredInactivePlayers);
  }, [data]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setFilteredData(inactivePlayers);
    } else {
      const lowercasedValue = value.toLowerCase();
      const filteredResults = inactivePlayers.filter(
        (item) =>
          item?.first_name?.toLowerCase().includes(lowercasedValue) ||
          item?.last_name?.toLowerCase().includes(lowercasedValue) ||
          (
            item?.first_name?.toLowerCase() +
            ' ' +
            item?.last_name?.toLowerCase()
          ).includes(lowercasedValue) ||
          item?.email?.toLowerCase().includes(lowercasedValue) ||
          item?.status?.toLowerCase().includes(lowercasedValue)
      );
      setFilteredData(filteredResults);
    }
  };

  useEffect(() => {
    setFilteredData(inactivePlayers);
  }, [inactivePlayers]);

  return (
    <Layout>
      <div className="page-content">
        <BreadCrumb title={'All Guardians'} pagetitle={'Pages'} />
        <Container fluid className="px-4 mb-4">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center ">
              <div className="col-sm-auto">
                <div>
                  <Link
                    href={'/admin/add-guardian'}
                    type="button"
                    className="button p-3 m-3 text-light"
                  >
                    <i className="ri-add-line align-bottom me-1"></i> Add
                    Guardian
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

            <CardBody
              style={{ position: 'relative' }}
              className="table-card-body-container"
            >
              <div
                className={`table-responsive table-card mb-5 ${
                  data?.length > 0 && 'table-card-content-wrapper'
                }`}
              >
                <table className="table table-hover table-centered align-middle table-nowrap ">
                  <thead className="fs-2">
                    <tr>
                      <th scope="col" className="py-4">
                        Name
                      </th>
                      <th scope="col" className="py-4">
                        Email
                      </th>
                      <th scope="col" className="py-4">
                        Phone
                      </th>
                      <th scope="col" className="py-4">
                        Joining Date
                      </th>
                      <th scope="col" className="py-4">
                        Active Player
                      </th>
                      <th scope="col" className="py-4">
                        Inactive Player
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
                    {filteredData?.length > 0 &&
                      filteredData
                        ?.slice(
                          currentPage * perPageData,
                          filteredData?.length - currentPage * perPageData >
                            perPageData
                            ? currentPage * perPageData + perPageData
                            : filteredData?.length
                        )
                        .map((item, key) => (
                          <tr key={key}>
                            <td>
                              <div className="d-flex align-items-center py-0">
                                <Link
                                  href={`/admin/guardian-profile/${item._id}`}
                                >
                                  <div className="flex-shrink-0 me-4">
                                    <Image
                                      src={
                                        item?.profile_image?.uploadedImage
                                          ? item?.profile_image?.uploadedImage
                                          : `${userDummyImage}`
                                      }
                                      alt="User"
                                      className="avatar-lg p-3 rounded-circle"
                                      width={36}
                                      height={36}
                                    />
                                  </div>
                                </Link>
                                <div>
                                  <h5 className="fs-14 my-1 fw-medium text-uppercase">
                                    <Link
                                      href={`/admin/guardian-profile/${item._id}`}
                                      className="text-reset"
                                    >
                                      {item?.first_name + ' ' + item?.last_name}
                                    </Link>
                                  </h5>
                                </div>
                              </div>
                            </td>

                            <td>
                              <h5 className="fs-14 my-1 fw-normal">
                                {item?.email}
                              </h5>
                            </td>

                            <td>
                              <h5 className="fs-14 my-1 fw-normal">
                                {' '}
                                {item?.phone}
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-14 my-1 fw-normal">
                                {new Date(item.joining_date).toLocaleDateString(
                                  'en-US',
                                  {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  }
                                )}
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-14 my-1 fw-normal">
                                {item?.active_player ? item?.active_player : 0}
                              </h5>
                            </td>
                            <td>
                              <span className="fs-14 my-1 me-3 fw-medium">
                                {item?.inactive_player
                                  ? item?.inactive_player
                                  : 0}
                              </span>
                              {/* {item?.inactive_player &&
                              item?.inactive_player >= 0 ? (
                                <button
                                  onClick={() => TogInvoiceModal(item?._id)}
                                  className="third-btn fs-4 fw-medium"
                                >
                                  Pay Now
                                </button>
                              ) : (
                                ''
                              )} */}
                            </td>

                            <td>
                              <span
                                className={` text-uppercase fs-4 fw-semibold ${
                                  item?.status && item?.status === 'active'
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
                                    <span className="button p-2 px-3 text-light">
                                      <i className="ri-more-fill align-middle"></i>
                                    </span>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                    <DropdownItem>
                                      <Link
                                        href={`/admin/guardian-profile/${item._id}`}
                                      >
                                        <i className="ri-eye-line align-start me-2 text-muted"></i>
                                        View
                                      </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                      <Link
                                        href={`/admin/edit-guardian/${item?._id}`}
                                      >
                                        <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                        Edit
                                      </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                      <div
                                        type="button"
                                        onClick={() =>
                                          tog_modal_delete(item?._id)
                                        }
                                        className=" text-primary p-2"
                                      >
                                        <i className="ri-delete-bin-fill align-start me-2 text-muted"></i>
                                        Delete
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
              <InvoiceModal
                setAllPendingPlayers={setAllPendingPlayers}
                sendInvoiceMail={sendInvoiceMail}
                sendInvoiceMailIsLoading={sendInvoiceMailIsLoading}
                goToInvoice={goToInvoice}
                multiPlayerPaidByCashIsLoading={multiPlayerPaidByCashIsLoading}
                registrationFee={registrationFee}
                removePendingPlayersHandler={removePendingPlayersHandler}
                allPendingPlayers={allPendingPlayers}
                invoiceId={invoiceId}
                invoiceModal={invoiceModal}
                setInvoiceModal={setInvoiceModal}
                id={guardianId}
                leftBtn={'Paid By Cash'}
                rightBtn={'Send Invoice'}
                TogCloseSuccessModal={TogCloseSuccessModal}
              />
              <CloseSuccessModal
                setCloseSuccessModal={setCloseSuccessModal}
                closeSuccessModal={closeSuccessModal}
                title={'Successful..!'}
              />
              {/* for delete  */}
              <div>
                <DeleteModal
                  Open={modal_delete}
                  close={tog_modal_delete}
                  id={guardianId}
                  handleDelete={handleDelete}
                />
              </div>

              {data?.length <= 0 && (
                <div className="empty-table-dialog-container">
                  <span className="">
                    {"You don't have any Guardian yet. "}
                    Please{' '}
                    <Link
                      href={'/admin/add-guardian'}
                      className="qoute_color text-decoration-underline"
                    >
                      Add a Guardian
                    </Link>
                    .
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
        </Container>
      </div>
    </Layout>
  );
};

export default AllInactiveGuardiansList;
