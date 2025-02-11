import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

export default function ContactMessages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  useEffect(() => {
    const token = Cookies.get('token');
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/v1/super/contact-us`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
      });
  }, []);

  const contactMessageHeaders = [
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
        <div className="text-primary cursor-pointer">
          <i className="ri-trash align-start me-2 text-muted"></i>
          Delete
        </div>
      ),
    },
  ];

  console.log(data);

  return (
    <Layout>
      <div className="page-content">
        <div className="container">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <h2>Contact Messages</h2>
              <SearchComponent />
            </CardHeader>
            <CardBody>
              <div className="sqdk-pricing-table">
                <CommonTableComponent
                  headers={contactMessageHeaders}
                  data={data ? data : []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPageData={perPageData}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
