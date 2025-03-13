import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetApplicationPaymentReportQuery } from '@/slice/services/common/paymentReportServices';
import DataObjectComponent from '@/utils/common/data';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';

const AgentTotalPendingAmountForSuperAdmin = ({ agent_id }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPaymentData, setAllPaymentData] = useState([]);
  const perPageData = 15;
  const [totalAmount, setTotalAmount] = useState('');

  const { TotalAgentPendingPayoutReportHeadersDataForAgent } =
    DataObjectComponent();

  const {
    data: getApplicationPaymentData,
    error: getApplicationPaymentDataError,
    isLoading: getApplicationPaymentDataLoading,
    refetch: getApplicationPaymentDataRefetch,
  } = useGetApplicationPaymentReportQuery();

  useEffect(() => {
    const newData = getApplicationPaymentData?.data
      .filter(
        (item) =>
          item?.payment_reason === 'application_tuition_fee' &&
          item?.student?.agent?._id === agent_id &&
          item?.agent_pending_payout_status === 'pending'
      )
      ?.map((item) => ({
        ...item,
        agent_commission:
          item?.application?.tuition_fee_auto_deduct === true
            ? 0
            : item?.agent_commission,
        agent_commission_paid: item?.agent_commission,
      }));

    const totalReceivedAmount = newData?.reduce((total, item) => {
      const amountPass =
        item?.agent_commision_by_hot_offer + item?.agent_commission;
      return total + amountPass;
    }, 0);

    setTotalAmount(totalReceivedAmount?.toFixed(2));
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

  return (
    <Row>
      <div className="h-100">
        <ToastContainer />
        {getApplicationPaymentDataLoading ? (
          <LoaderSpiner />
        ) : (
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <div className="text-primary fw-semibold fs-2">
                Total Pending Agent Payout
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
                totalAgentPendingPayoutAmount={totalAmount}
              />
            </CardBody>
          </Card>
        )}
      </div>
    </Row>
  );
};

export default AgentTotalPendingAmountForSuperAdmin;
