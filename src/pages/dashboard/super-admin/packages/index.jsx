import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import Layout from '@/components/layout';
import PackageModal from '@/components/sAdminDashboard/modals/PackageModal';
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
                <CardBody className="bg-secondary-subtle hot-offer-full-height">
                  <div className="sqdk-pricing-table my-5 gap-5">
                    <SinglePackageComponent />
                    <SinglePackageComponent />
                    <SinglePackageComponent />
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
