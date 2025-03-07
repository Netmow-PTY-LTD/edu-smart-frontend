import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetApplicationPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import DataObjectComponent from '@/utils/common/data';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const TotalAgentPayoutInAgent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPaymentData, setAllPaymentData] = useState([]);
  const perPageData = 15;

  const { TotalAgentPendingPayoutReportHeadersDataForAgent } =
    DataObjectComponent();

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetApplicationPaymentReportQuery();

  useEffect(() => {
    const newData = getApplicationPaymentData?.data.filter(
      (item) =>
        item?.payment_reason === 'application_tuition_fee' &&
        item?.application?.course?.auto_deduct === false
    );
    setAllPaymentData(newData);
  }, [getApplicationPaymentData]);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = allPaymentData?.filter((item) => {
    const fullName =
      `${item?.payment_reason?.split('_').join(' ')}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  console.log(allPaymentData);

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
                  <div className="text-primary fw-semibold fs-2">
                    Total Paid Agent Payout
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={TotalAgentPendingPayoutReportHeadersDataForAgent}
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

export default TotalAgentPayoutInAgent;
