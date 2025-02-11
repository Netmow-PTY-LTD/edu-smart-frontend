import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllDocumentsInSuperAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [couponId, setDocumentId] = useState('');
  const [editOpenModal, setEditOpenModal] = useState(false);
  const togOpenModal = () => {
    setOpenModal(!openModal);
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const togEditOpenModal = (id) => {
    setDocumentId(id);
    setEditOpenModal(!editOpenModal);
  };

  const allCouponHeaderAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <div
        onClick={() => togEditOpenModal(item._id)}
        className="text-primary cursor-pointer"
      >
        <i className="ri-pencil-fill align-start me-2 text-muted"></i>
        Edit
      </div>
    ),
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="text-secondary-alt fw-semibold d-flex align-items-center">
                  All Coupon
                </h1>
              </div>
              <div onClick={togOpenModal}>
                <button className="button px-4 py-2">
                  Add New Coupon <i className="ri-add-line fw-bolder"></i>
                </button>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h2>All Agents</h2>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>
                <CardBody>
                  <div className="sqdk-pricing-table">
                    {/* {getCouponIsLoading ? (
                      <LoaderSpiner />
                    ) : ( */}
                    <>
                      <CardBody>
                        {/* <CommonTableComponent
                          headers={[
                            ...couponHeaders,
                            alluniversityHeaderAction,
                          ]}
                          data={isFilteredData ? isFilteredData : []}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          searchTerm={searchTerm}
                          handleSearchChange={handleSearchChange}
                          emptyMessage="No Data found yet."
                        /> */}
                      </CardBody>
                    </>
                    {/* )} */}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllDocumentsInSuperAdmin;
