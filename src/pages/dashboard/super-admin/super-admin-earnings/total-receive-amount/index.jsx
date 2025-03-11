import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import DataObjectComponent from '@/utils/common/data';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const TotalReceiveAmountForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPaymentData, setAllPaymentData] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  const perPageData = 15;

  const { receivedAmountPaymentReportHeadersDataForSuperAdmin } =
    DataObjectComponent();

  const {
    data: getAllPaymentReportData,
    error: getAllPaymentReportDataError,
    isLoading: getAllPaymentReportDataLoading,
    refetch: getAllPaymentReportDataRefetch,
  } = useGetAllPaymentReportQuery();

  useEffect(() => {
    const combinedData = [
      ...(getAllPaymentReportData?.data?.applicationPaymentReports || []),
      ...(getAllPaymentReportData?.data?.packagePaymentReports || []),
    ];

    const newData = combinedData.filter(
      (item) =>
        item?.payment_reason !== 'application_incentive' &&
        item?.paid_amount !== 0
    );

    const totalReceivedAmount = newData.reduce((total, item) => {
      const emgsFeeAmount =
        item?.payment_reason === 'application_emgs'
          ? item?.application?.emgs_fee_amount
          : 0;
      const tuitionFeeAmount =
        item?.payment_reason === 'application_tuition_fee'
          ? item?.tuition_fee_paid_amount
          : 0;
      const agentAmount = item?.agent !== undefined ? item?.paid_amount : 0;
      return total + emgsFeeAmount + tuitionFeeAmount + agentAmount;
    }, 0);

    setTotalAmount(totalReceivedAmount);
    setAllPaymentData(newData);
  }, [
    getAllPaymentReportData?.data?.applicationPaymentReports,
    getAllPaymentReportData?.data?.packagePaymentReports,
  ]);

  console.log(allPaymentData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = allPaymentData?.filter((item) => {
    const fullName =
      `${item?.payment_reason?.split('_').join(' ')}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {getAllPaymentReportDataLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <div className="text-primary fw-semibold fs-2">
                    Total Receive Earnings
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={
                      receivedAmountPaymentReportHeadersDataForSuperAdmin
                    }
                    data={filteredData ? filteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                    totalAmount={totalAmount}
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

export default TotalReceiveAmountForSuperAdmin;
