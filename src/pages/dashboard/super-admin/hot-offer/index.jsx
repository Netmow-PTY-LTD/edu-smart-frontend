import SingleHotOfferCardComponent from '@/components/common/SingleHotOfferCardComponent';
import Layout from '@/components/layout';
import HotOfferModal from '@/components/sAdminDashboard/modals/HotOfferModal';
import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';

const HotOfferForSuperAdmin = () => {
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
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
                    <SingleHotOfferCardComponent />
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
