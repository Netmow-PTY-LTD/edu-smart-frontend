import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetApplicationPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import DataObjectComponent from '@/utils/common/data';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const ApplicationPaymentForAgent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [applicationPaymentData, setApplicationPaymentData] = useState('');
  const perPageData = 10;

  const { applicationPaymentHeadersAgent = [] } = DataObjectComponent();

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetApplicationPaymentReportQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredData = getApplicationPaymentData?.data?.filter((item) => {
    if (item?.payment_reason !== 'application_incentive') {
      const fullName =
        `${item?.student?.first_name || ''} ${item?.student?.last_name || ''}`.toLowerCase();

      return fullName.includes(searchTerm.toLowerCase());
    }
    return false;
  });

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
                    Application Payment Report
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={applicationPaymentHeadersAgent}
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

export default ApplicationPaymentForAgent;
