import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useGetAllPaymentReportQuery,
  useUpdateAgentPendingPayoutStatusMutation,
} from '@/slice/services/common/paymentReportServices';
import DataObjectComponent from '@/utils/common/data';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

const TotalAgentPendingPayoutInSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPaymentData, setAllPaymentData] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  const perPageData = 15;

  const { TotalAgentPendingPayoutReportHeadersDataForSuperAdmin } =
    DataObjectComponent();

  const {
    data: getAllPaymentReportData,
    error: getAllPaymentReportDataError,
    isLoading: getAllPaymentReportDataLoading,
    refetch: getAllPaymentReportDataRefetch,
  } = useGetAllPaymentReportQuery();

  const [updateAgentPendingPayoutStatus] =
    useUpdateAgentPendingPayoutStatusMutation();

  useEffect(() => {
    const newData = getAllPaymentReportData?.data?.applicationPaymentReports
      ?.filter(
        (item) =>
          item?.payment_reason === 'application_tuition_fee' &&
          item?.student?.agent?._id &&
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

    setAllPaymentData(newData || []);
  }, [
    getAllPaymentReportData?.data?.applicationPaymentReports,
    getAllPaymentReportData?.data?.packagePaymentReports,
  ]);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const filteredData = allPaymentData?.filter((item) => {
    const fullName =
      `${item?.payment_reason?.split('_').join(' ')}`.toLowerCase();
    return fullName?.includes(searchTerm.toLowerCase());
  });

  const agentPendingPayoutStatusAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <UncontrolledDropdown direction="end">
        <DropdownToggle
          tag="a"
          className="text-reset dropdown-btn"
          role="button"
        >
          <span className="button px-3">
            <i className="ri-more-fill align-middle"></i>
          </span>
        </DropdownToggle>
        <DropdownMenu className="me-3 ">
          <DropdownItem>
            <div
              onClick={() => {
                updateAgentPendingPayoutStatus({
                  report_id: item?._id,
                  status: 'paid',
                }).then((res) => {
                  if (res?.error) {
                    toast.error(
                      res.error?.message ||
                        'Somthing Went Wrong.Please Try Again'
                    );
                  } else {
                    getAllPaymentReportDataRefetch();
                    toast.success(res?.data?.message || 'Successfully Done');
                  }
                });
              }}
              className="text-primary"
            >
              <i className="ri-currency-fill me-2"></i>
              PAID
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                updateAgentPendingPayoutStatus({
                  report_id: item?._id,
                  status: 'pending',
                }).then((res) => {
                  if (res?.error) {
                    toast.error(
                      res.error?.message ||
                        'Somthing Went Wrong.Please Try Again'
                    );
                  } else {
                    getAllPaymentReportDataRefetch();
                    toast.success(res?.data?.message || 'Successfully Done');
                  }
                });
              }}
              className="text-primary"
            >
              <i className="ri-currency-fill me-2"></i>
              PENDING
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                updateAgentPendingPayoutStatus({
                  report_id: item?._id,
                  status: 'refund',
                }).then((res) => {
                  if (res?.error) {
                    toast.error(
                      res.error?.message ||
                        'Somthing Went Wrong.Please Try Again'
                    );
                  } else {
                    getAllPaymentReportDataRefetch();
                    toast.success(res?.data?.message || 'Successfully Done');
                  }
                });
              }}
              className="text-primary"
            >
              <i className="ri-currency-fill me-2"></i>
              REFUND
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                updateAgentPendingPayoutStatus({
                  report_id: item?._id,
                  status: 'hand_cash',
                }).then((res) => {
                  if (res?.error) {
                    toast.error(
                      res.error?.message ||
                        'Somthing Went Wrong.Please Try Again'
                    );
                  } else {
                    getAllPaymentReportDataRefetch();
                    toast.success(res?.data?.message || 'Successfully Done');
                  }
                });
              }}
              className="text-primary"
            >
              <i className="ri-currency-fill me-2"></i>
              PAID BY CASH
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  console.log(allPaymentData);

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
                    Total Agent Pending Payout
                  </div>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={[
                      ...TotalAgentPendingPayoutReportHeadersDataForSuperAdmin,
                      agentPendingPayoutStatusAction,
                    ]}
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
        </div>
      </div>
    </Layout>
  );
};

export default TotalAgentPendingPayoutInSuperAdmin;
