import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useDeleteContactMessageMutation,
  useGetAllContactMessagesQuery,
} from '@/slice/services/super admin/contactUsService';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

export default function ContactMessages() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: allContactMessages,
    isLoading: isAllContactMessagesLoading,
    error: allContactMessagesError,
    refetch: allContactMessagesRefetch,
  } = useGetAllContactMessagesQuery();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredData =
    allContactMessages?.data?.length > 0 &&
    allContactMessages?.data.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const [
    deleteContactMessage,
    {
      data: deleteContactMessageData,
      error: deleteContactMessageError,
      isLoading: deleteContactMessageIsLoading,
    },
  ] = useDeleteContactMessageMutation();

  const handleDeleteContactMessage = async (id) => {
    try {
      const result = await deleteContactMessage(id).unwrap();
      if (result) {
        toast.success(result?.message);
        allContactMessagesRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  const contactMessageHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {currentPage * perPageData + (index + 1)}
        </span>
      ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (item) => (
        <h5 className="fs-14 fw-medium text-capitalize">
          {item?.name ? item?.name : ''}
        </h5>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      render: (item) => (
        <h5 className="fs-14 fw-medium">{item?.email ? item?.email : ''}</h5>
      ),
    },
    {
      title: 'Phone',
      key: 'phone',
      render: (item) => (
        <>
          <span className={`fs-14 fw-medium`}>
            {item?.phone ? item?.phone : ''}
          </span>
        </>
      ),
    },

    {
      title: 'Message',
      key: 'message',
      render: (item) => (
        <>
          <span className={`fs-14 fw-medium`}>
            {item?.message ? item?.message : ''}
          </span>
        </>
      ),
    },

    {
      title: 'Action',
      key: 'actions',
      render: (item) => (
        <div
          className="text-danger fw-medium cursor-pointer"
          onClick={() => handleDeleteContactMessage(item?._id)}
        >
          <i className="ri-close-circle-fill align-start me-2 "></i>
          Delete
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="page-content">
        <div className="container">
          <ToastContainer />
          {isAllContactMessagesLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h2>Contact Messages</h2>
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>
              <CardBody>
                <div className="contact-message-table">
                  <CommonTableComponent
                    headers={contactMessageHeaders}
                    data={filteredData ? filteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                  />
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
