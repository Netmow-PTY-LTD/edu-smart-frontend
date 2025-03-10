import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import DataObjectComponent from '@/utils/common/data';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const UniversityPaymentPayoutForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPaymentData, setAllPaymentData] = useState([]);
  const perPageData = 15;

  const { universityPaymentPayoutReportHeadersDataForSuperAdmin } =
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
      (item) => item?.payment_reason === 'application_tuition_fee'
    );
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
      `${item?.payment_reason?.split('_').join(' ')} ${item?.application?.course?.name}`.toLowerCase();
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
                    Total Payout Amount
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={
                      universityPaymentPayoutReportHeadersDataForSuperAdmin
                    }
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

export default UniversityPaymentPayoutForSuperAdmin;
