import Layout from '@/components/layout';
import PackageModal from '@/components/sAdminDashboard/modals/PackageModal';
import { userDummyImage } from '@/utils/common/data';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';

const PackagePageInSuperAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);

  const togOpenModal = () => {
    setOpenModal(!openModal);
  };

  const togEditOpenModal = () => {
    setEditOpenModal(!editOpenModal);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="text-secondary-alt fw-semibold d-flex align-items-center">
                  Our Popular Package
                </h1>
                Please Select Below Your Own Package
              </div>
              <div onClick={togOpenModal}>
                <button className="button px-4 py-2">
                  Add Package <i class="ri-add-line fw-bolder"></i>
                </button>
              </div>
            </div>
            <div>
              <Card>
                <CardBody className="bg-secondary-subtle">
                  <div className="sqdk-pricing-table my-5 gap-5">
                    <div
                      className="sqdk-single-pricing-table wow animate__animated animate__fadeIn"
                      data-wow-delay="0.1s"
                      key={'index'}
                    >
                      <div className="pricing-table-heading d-flex align-items-center justify-content-between">
                        <h4>{'Introducer Associate'}</h4>
                        <div className="icon">
                          <Image
                            src={userDummyImage}
                            alt="alt-image"
                            width={50}
                            height={50}
                          />
                        </div>
                      </div>
                      <div className="price">
                        <p>
                          <span>MYR</span>
                          <small className="ms-3 text-primary">0</small>
                          <small>/Month</small>
                        </p>
                      </div>

                      <div className="pricing-lists">
                        <ul>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Commission 50%
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Minimum Files 5
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Auto Commission Deduct
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-close-circle-fill text-danger fs-1"></i>
                            <span className="text-primary fw-semibold">
                              Yearly Bonus
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-close-circle-fill text-danger fs-1"></i>
                            <span className="text-primary fw-semibold">
                              Family Trip
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div
                        onClick={togEditOpenModal}
                        className="d-flex align-items-center justify-content-center button hstack py-2"
                      >
                        <span className="text-center">Edit Package</span>
                      </div>
                    </div>
                    <div
                      className="sqdk-single-pricing-table wow animate__animated animate__fadeIn"
                      data-wow-delay="0.1s"
                      key={'index'}
                    >
                      <div className="pricing-table-heading ">
                        <h4>{'Introducer Associate'}</h4>
                        <div className="icon">
                          <Image
                            src={userDummyImage}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                      </div>
                      <div className="price">
                        <p>
                          <span>MYR</span>
                          <small className="ms-3 text-primary">0</small>
                          <small>/Month</small>
                        </p>
                      </div>
                      <div className="pricing-lists">
                        <ul>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Commission 60%
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Minimum Files 5
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Auto Commission Deduct
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Yearly Bonus
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-close-circle-fill text-danger fs-1"></i>
                            <span className="text-primary fw-semibold">
                              Family Trip
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div
                        onClick={togEditOpenModal}
                        className="d-flex align-items-center justify-content-center button hstack py-2"
                      >
                        <span className="text-center">Edit Package</span>
                      </div>
                    </div>
                    <div
                      className="sqdk-single-pricing-table wow animate__animated animate__fadeIn"
                      data-wow-delay="0.1s"
                      key={'index'}
                    >
                      <div className="pricing-table-heading ">
                        <h4>{'Introducer Associate'}</h4>
                        <div className="icon">
                          <Image
                            src={userDummyImage}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                      </div>
                      <div className="price">
                        <p>
                          <span>MYR</span>
                          <small className="ms-3 text-primary">0</small>
                          <small>/Month</small>
                        </p>
                      </div>

                      <div className="pricing-lists">
                        <ul>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Commission 75%
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Minimum Files 5
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Auto Commission Deduct
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Yearly Bonus
                            </span>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <i class="ri-checkbox-circle-fill fs-1 third-color"></i>
                            <span className="text-primary fw-semibold">
                              Family Trip
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div
                        onClick={togEditOpenModal}
                        className="d-flex align-items-center justify-content-center button hstack py-2"
                      >
                        <span className="text-center">Edit Package</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {
            <PackageModal
              open={openModal}
              close={togOpenModal}
              modalHeader={'Add Package'}
              submitButton={'Add Package'}
            />
          }

          {
            // update package

            <PackageModal
              open={editOpenModal}
              close={togEditOpenModal}
              modalHeader={'Add Package'}
              submitButton={'Add Package'}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default PackagePageInSuperAdmin;
