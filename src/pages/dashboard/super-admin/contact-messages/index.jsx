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

  useEffect(() => {
    const token = Cookies.get('token');
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/v1/super/contact-us`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
      });
  }, []);

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
                <table
                  cellPadding="5"
                  cellSpacing="0"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 &&
                      data?.map((item, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{item?.phone}</td>
                          <td>{item?.message}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
