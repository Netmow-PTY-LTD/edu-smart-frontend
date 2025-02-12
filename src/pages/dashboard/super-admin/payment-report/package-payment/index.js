import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetPackagePaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const PackagePaymentForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationPaymentData, setApplicationPaymentData] = useState('');
  const perPageData = 10;

  const {
    data: packagePaymentData,
    error: packagePaymentDataError,
    isLoading: packagePaymentDataLoading,
    refetch: packagePaymentDataRefetch,
  } = useGetPackagePaymentReportQuery();

  console.log(packagePaymentData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = packagePaymentData?.data?.filter((item) => {
    const fullName =
      `${item?.agent?.first_name || ''} ${item?.agent?.last_name || ''}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  const packagePaymentHeadersWithoutAction = [
    {
      title: 'Agent Name',
      key: 'agent',
      render: (item) => (
        <div>
          {item?.agent?.first_name + ' ' + item?.agent?.last_name ?? 'N/A'}
        </div>
      ),
    },
    {
      title: 'Package Name',
      key: 'agent_package',
      render: (item) => (
        <div>{item?.agent_package?.package?.name ?? 'N/A'}</div>
      ),
    },
    {
      title: 'Paid Amount',
      key: 'paid_amount',
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
    },
    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => <div>{item?.payment_date ?? 'N/A'}</div>,
    },
  ];

  useEffect(() => {
    setApplicationPaymentData([...packagePaymentHeadersWithoutAction]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {packagePaymentDataLoading ? (
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

export default PackagePaymentForSuperAdmin;
