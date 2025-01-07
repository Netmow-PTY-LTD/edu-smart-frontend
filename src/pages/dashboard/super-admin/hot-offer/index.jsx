import Layout from '@/components/layout';
import HotOfferModal from '@/components/sAdminDashboard/modals/HotOfferModal';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import cardimg from '../../../../../public/assets/card-bg.png';

const HotOfferForSuperAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);

  const togOpenModal = () => {
    setOpenModal(!openModal);
  };

  const togEditOpenModal = () => {
    setEditOpenModal(!editOpenModal);
  };

  const bgImage = '/assets/card-bg.png';

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="text-secondary-alt fw-semibold d-flex align-items-center">
                  Our Hot Offer
                </h1>
                Please Select Below Your Own Offer
              </div>
              <div onClick={togOpenModal}>
                <button className="button px-4 py-2">
                  Add Hot Offer <i class="ri-add-line fw-bolder"></i>
                </button>
                {
                  // Add hot offer
                  <HotOfferModal
                    open={openModal}
                    close={togOpenModal}
                    modalHeader={'Add Hot Offer'}
                    submitButton={'Add Offer'}
                  />
                }
              </div>
            </div>
            <div>
              <Card>
                <CardBody className="bg-secondary-subtle hot-offer-full-height">
                  <div className="sqdk-pricing-table my-5 gap-5">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h2>Hot Offer</h2>
                        <button
                          onClick={togEditOpenModal}
                          style={{
                            background: 'transparent',
                            transform: 'rotate(90deg)',
                          }}
                        >
                          <i class="ri-more-2-fill fw-bolder fs-1"></i>
                        </button>
                      </div>
                      <div
                        style={{
                          backgroundColor: '#FFC1AE',
                          minHeight: '250px',
                          minWidth: '400px',
                          position: 'relative',
                        }}
                        className="d-flex px-5 rounded-5 pt-4"
                      >
                        <div className="d-flex flex-column z-1">
                          <div>
                            <h1 className="text-primary text-nowrap fw-bold">
                              60 Days Of Premium
                            </h1>
                            <p className="text-primary fw-semibold">
                              Get It Before
                            </p>
                          </div>
                          <button
                            style={{
                              position: 'absolute',
                              bottom: '0',
                            }}
                            className="button px-4 py-2 my-5"
                          >
                            Learn More
                          </button>
                        </div>

                        <Image
                          src={cardimg || bgImage}
                          alt="alt"
                          style={{
                            position: 'absolute',
                            bottom: '-34px',
                            right: '-16px',
                            width: '300px',
                            height: '278px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            {
              // edit hot offer
              <HotOfferModal
                open={editOpenModal}
                close={togEditOpenModal}
                modalHeader={'Update Hot Offer'}
                submitButton={'Update Offer'}
              />
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotOfferForSuperAdmin;
