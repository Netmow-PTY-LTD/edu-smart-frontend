import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetApplicationPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const ApplicationPaymentForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationPaymentData, setApplicationPaymentData] = useState('');
  const perPageData = 10;

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetApplicationPaymentReportQuery();

  console.log(getApplicationPaymentData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = getApplicationPaymentData?.data?.filter((item) => {
    const fullName =
      `${item?.student?.first_name || ''} ${item?.student?.last_name || ''}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  const applicationHeadersWithoutAction = [
    {
      title: 'Student Name',
      key: 'student',
      render: (item) => (
        <div>
          {item?.student?.first_name + ' ' + item?.student?.last_name ?? 'N/A'}
        </div>
      ),
    },
    {
      title: 'Application ID',
      key: 'application',
      render: (item) => <div>{item?._id ?? 'N/A'}</div>,
    },
    {
      title: 'Applied By',
      key: 'applied_by',
      render: (item) => (
        <div>
          {item?.applied_by?.first_name + ' ' + item?.applied_by?.last_name ??
            'N/A'}
        </div>
      ),
    },
    {
      title: 'Paid Amount',
      key: 'paid_amount',
    },
    {
      title: 'University Price',
      key: 'university_price',
    },
    {
      title: 'Agent Package',
      key: 'package',
      render: (item) => <div>{item.agent_package?.package?.name ?? 'N/A'}</div>,
    },
    {
      title: 'Package Commission %',
      key: 'agent_package',
      render: (item) => (
        <div>{item.agent_package?.package?.commission ?? 'N/A'}</div>
      ),
    },
    {
      title: 'Hot Offer Commission %',
      key: 'hot_offer',
      render: (item) => <div>{item.hot_offer?.offer_percentage ?? 'N/A'}</div>,
    },
    {
      title: 'Package Commission Amount',
      key: 'agent_commission',
    },
    {
      title: 'Hot Offer Commission Amount',
      key: 'agent_commision_by_hot_offer',
    },
    {
      title: 'Super Admin Profit',
      key: 'super_admin_profit',
    },
    {
      title: 'Payment Date',
      key: 'payment_date',
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
    },
  ];

  useEffect(() => {
    setApplicationPaymentData([...applicationHeadersWithoutAction]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {getApplicationPaymentDataLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={applicationPaymentData}
                    data={filteredData ? filteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                  />
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationPaymentForSuperAdmin;
