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
  const [perPageData, setPerPageData] = useState(15);
  const perPageDataDefault = 15;

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
      const airportPickupAmount =
        item?.payment_reason === 'application_airport_pickup_charge'
          ? item?.airport_pickup_charge
          : 0;
      return (
        total +
        emgsFeeAmount +
        tuitionFeeAmount +
        agentAmount +
        airportPickupAmount
      );
    }, 0);

    setTotalAmount(totalReceivedAmount.toFixed(2));
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
                <CardHeader className="d-flex justify-content-between flex-column flex-md-row gap-2 gap-md-0 mb-4">
                  <div className="text-primary fw-semibold fs-2">
                    Total Receive Earnings
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center gap-3"
                    style={{ width: '120px' }}
                  >
                    <label className="text-primary fw-semibold fs-2">
                      Show:
                    </label>
                    <select
                      className="form-select d-flex justify-content-between align-items-center gap-3"
                      value={perPageData}
                      onChange={(e) => setPerPageData(Number(e.target.value))}
                    >
                      <option
                        key={perPageDataDefault}
                        value={perPageDataDefault}
                      >
                        {perPageDataDefault}
                      </option>
                      {[...Array(Math.floor(filteredData.length / 50))].map(
                        (_, index) => {
                          const value = (index + 1) * 50; // Increment by 50
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        }
                      )}
                      {/* Add last option as the total length of filteredData */}
                      <option
                        key={filteredData.length}
                        value={filteredData.length}
                      >
                        {filteredData.length}
                      </option>
                    </select>
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
