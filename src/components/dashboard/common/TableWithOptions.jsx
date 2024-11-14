
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

const TableWithOptions = ({
  data,
  tableHeaders,
  togModal1,
  togModal2,
  Heading,
  addNewBtn,
  action,
}) => {
  return (
    <>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-start">
          <div className="pe-4 my-4">
            <div className="">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">{Heading}</h4>
            </div>
          </div>
          {addNewBtn === 'yes' ? (
            <div className=" ">
              <button
                onClick={''}
                type="button"
                className="button p-3 m-3 text-light"
              >
                <i className="ri-add-line align-bottom me-1"></i>
                Add New
              </button>
            </div>
          ) : (
            ''
          )}
        </CardHeader>

        <CardBody style={{ position: 'relative' }}>
          <div className="table-responsive table-card mb-5">
            <table className="table table-hover table-centered align-middle table-nowrap">
              <thead className="fs-2">
                <tr>
                  <th scope="col" className="py-4">
                    SL
                  </th>
                  {tableHeaders?.length > 0 &&
                    tableHeaders?.map((header, index) => (
                      <th key={index} scope="col" className="py-4">
                        {Object.keys(header)[0]}
                      </th>
                    ))}
                  {action === 'yes' ? (
                    <th scope="col" className="py-4">
                      Actions
                    </th>
                  ) : (
                    ''
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 &&
                  data.map((item, key) => (
                    <tr key={key}>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{key + 1}</h5>
                      </td>
                      <td>
                        <div className="d-flex align-items-center py-0">
                          <div className="flex-shrink-0 me-4">
                            <Link href="" className="text-reset">
                              <Image
                                src={
                                  item?.profile_image?.uploadedImage
                                    ? item?.profile_image?.uploadedImage
                                    : `${''}`
                                }
                                alt="user"
                                className="avatar-lg p-3 rounded-circle"
                                width={50}
                                height={50}
                              />
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          {/* <Link href="" className="text-reset"> */}
                          {/* {item?.first_name + item?.last_name} */}
                          {item?.organisation_name}
                          {/* </Link> */}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.package?.name}
                        </h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.subdomain}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item.sports_category}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{item?.email}</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{item?.phone}</h5>
                      </td>
                      {/* <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.verifiyed}
                        </h5>
                      </td> */}
                      {/* <td>
                        <h5 className="fs-14 my-1 fw-normal">{item?.evs}</h5>
                      </td> */}
                      {/* <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.gs_step}
                        </h5>
                      </td> */}

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.country}
                        </h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </h5>
                      </td>

                      {action === 'yes' ? (
                        <td>
                          <div className="flex-shrink-0">
                            <UncontrolledDropdown className="card-header-dropdown">
                              <DropdownToggle
                                tag="a"
                                className="text-reset dropdown-btn"
                                role="button"
                              >
                                <span className="button px-3 py-1 text-light">
                                  <i className="ri-more-fill align-middle"></i>
                                </span>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                <DropdownItem>
                                  <div
                                    onClick={togModal1}
                                    className=" text-primary p-2"
                                  >
                                    <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                    Edit
                                  </div>
                                </DropdownItem>

                                <DropdownItem>
                                  <div
                                    onClick={togModal2}
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
                      ) : (
                        <td>
                          <span className="fs-12 py-2 fw-normal badge bg-success-subtle text-success text-uppercase">
                            {item.status}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardBody>

        {data?.length <= 0 && (
          <div className="empty-table-dialog-container">
            <span>{"Don't found any Data."}</span>
          </div>
        )}
      </Card>
    </>
  );
};

export default TableWithOptions;
