import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import DataObjectComponent from '@/utils/common/data';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const TotalAgentPayoutInSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermNew, setSearchTermNew] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPaymentData, setAllPaymentData] = useState([]);
  const [allPaymentDataNew, setAllPaymentDataNew] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  const [totalAmountNew, setTotalAmountNew] = useState('');

  const perPageData = 15;

  const {
    TotalagentPayoutReportHeadersDataForSuperAdmin,
    TotalAgentPendingPayoutReportHeadersDataForSuperAdminNew,
  } = DataObjectComponent();

  const {
    data: getAllPaymentReportData,
    error: getAllPaymentReportDataError,
    isLoading: getAllPaymentReportDataLoading,
    refetch: getAllPaymentReportDataRefetch,
  } = useGetAllPaymentReportQuery();

  useEffect(() => {
    const combinedData = [
      ...(getAllPaymentReportData?.data?.applicationPaymentReports || []),
    ];

    const newData = combinedData.filter(
      (item) =>
        item?.student?.agent?._id &&
        item?.payment_reason === 'application_tuition_fee' &&
        item?.application?.tuition_fee_auto_deduct === true
    );

    const newDataNew = getAllPaymentReportData?.data?.applicationPaymentReports
      ?.filter(
        (item) =>
          item?.payment_reason === 'application_tuition_fee' &&
          item?.student?.agent?._id &&
          (item?.agent_pending_payout_status === 'paid' ||
            item?.agent_pending_payout_status === 'hand_cash')
      )
      ?.map((item) => ({
        ...item,
        agent_commission:
          item?.application?.tuition_fee_auto_deduct === true
            ? 0
            : item?.agent_commission,
        agent_commission_paid: item?.agent_commission,
      }));

    console.log(newDataNew);

    const totalReceivedAmount = newData?.reduce((total, item) => {
      const amountPass = item?.agent_commission;
      return total + amountPass;
    }, 0);

    const totalReceivedAmountNew = newDataNew?.reduce((total, item) => {
      const amountPass =
        item?.agent_commision_by_hot_offer + item?.agent_commission;
      return total + amountPass;
    }, 0);

    setTotalAmount(totalReceivedAmount?.toFixed(2));
    setTotalAmountNew(totalReceivedAmountNew?.toFixed(2));

    setAllPaymentData(newData);
    setAllPaymentDataNew(newDataNew);
  }, [
    getAllPaymentReportData?.data?.applicationPaymentReports,
    getAllPaymentReportData?.data?.packagePaymentReports,
  ]);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  // search input change function
  const handleSearchChangeNew = (e) => setSearchTermNew(e.target.value);

  // Filter data for search option
  const filteredData = allPaymentData?.filter((item) => {
    const fullName =
      `${item?.payment_reason?.split('_').join(' ')}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  // Filter data for search option
  const filteredDataNew = allPaymentDataNew?.filter((item) => {
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
              <div className=" d-flex flex-column gap-5">
                <Card>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <div className="text-primary fw-semibold fs-2">
                      Total Auto Deduct Paid Payout
                    </div>
                    <SearchComponent
                      searchTerm={searchTerm}
                      handleSearchChange={handleSearchChange}
                    />
                  </CardHeader>

                  <CardBody>
                    <CommonTableComponent
                      headers={TotalagentPayoutReportHeadersDataForSuperAdmin}
                      data={filteredData ? filteredData : []}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      perPageData={perPageData}
                      searchTerm={searchTerm}
                      handleSearchChange={handleSearchChange}
                      emptyMessage="No Data found yet."
                      totalAgentPaidPayoutAmount={totalAmount}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <div className="text-primary fw-semibold fs-2">
                      Total Manual Paid Payout
                    </div>
                    <SearchComponent
                      searchTerm={searchTermNew}
                      handleSearchChange={handleSearchChangeNew}
                    />
                  </CardHeader>

                  <CardBody>
                    <CommonTableComponent
                      headers={
                        TotalAgentPendingPayoutReportHeadersDataForSuperAdminNew
                      }
                      data={filteredDataNew ? filteredDataNew : []}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      perPageData={perPageData}
                      searchTerm={searchTermNew}
                      handleSearchChange={handleSearchChange}
                      emptyMessage="No Data found yet."
                      totalAgentPaidPayoutAmountNew={totalAmountNew}
                    />
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TotalAgentPayoutInSuperAdmin;
