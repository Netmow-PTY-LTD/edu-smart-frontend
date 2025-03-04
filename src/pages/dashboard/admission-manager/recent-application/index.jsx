import ApplicationEmgsStatusTimeline from '@/components/agentDashboard/studentManagement/singleStudentProfile/ApplicationEmgsStatusTimeline';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useGetRecentApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/common/applicationService';
import DataObjectComponent from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

export default function RecentApplicationForSuperAdmin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('1');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentTimeline, setCurrentTimeline] = React.useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [emgsInvoiceModal, setEmgsInvoiceModal] = useState(false);
  const [tuitionInvoiceModal, setTuitionInvoiceModal] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const perPageData = 20;

  const customData = useCustomData();

  const { studentApplicationsHeaders } = DataObjectComponent();

  const {
    data: recentApplicationData,
    isLoading: recentApplicationLoading,
    refetch: recentApplicationRefetch,
  } = useGetRecentApplicationsQuery();

  const [
    updateApplicationStatus,
    {
      data: useUpdateApplicationStatusMutationData,
      isLoading: useUpdateApplicationStatusMutationLoading,
    },
  ] = useUpdateApplicationStatusMutation();

  const handleViewEmgsStatus = (id) => {
    setCurrentTimeline(id);
    setActiveTab('2');
  };

  const handleChangeApplicationStatus = async (data) => {
    try {
      const response = await updateApplicationStatus(data);
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || 'Application status updated successfully!'
        );
        recentApplicationRefetch();
      } else {
        toast.error(
          response?.error?.data?.message ||
            'Failed to update application status.'
        );
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('An error occurred while updating the status.');
    }
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const searchInItem = (item, searchTerm) => {
    if (!searchTerm) return true; // If no search term, return all items

    console.log(item);
    console.log(searchTerm);

    if (typeof item === 'object' && item !== null) {
      return Object.values(item).some((value) =>
        searchInItem(value, searchTerm)
      );
    }

    return String(item).toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Ensure full search even if searchTerm is empty
  const isfilteredData =
    recentApplicationData?.data?.length > 0
      ? recentApplicationData.data.filter((item) =>
          searchInItem(item, searchTerm)
        )
      : [];

  const EmgsStatusActionData = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      // console.log(item),
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
        <DropdownMenu className="ms-2">
          <DropdownItem>
            <div
              onClick={() =>
                router.push(
                  `/dashboard/${customData?.paneltext}/recent-application/${item?._id}`
                )
              }
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View Documents
            </div>
          </DropdownItem>

          <DropdownItem>
            <div
              onClick={() => handleViewEmgsStatus(item?.emgs_status)}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View EMGS Status
            </div>
          </DropdownItem>

          {/* <DropdownItem>
            <div
              onClick={() => handleViewEmgsStatus(item?.emgs_status)}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View EMGS Invoice
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => handleViewEmgsStatus(item?.emgs_status)}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View Tuition Invoice
            </div>
          </DropdownItem> */}

          {item?.status === 'pending' ? (
            <>
              <DropdownItem>
                <div
                  onClick={() =>
                    handleChangeApplicationStatus({
                      id: item?._id,
                      status: 'accepted',
                    })
                  }
                  className="text-primary"
                >
                  <i className="ri-check-fill me-2"></i>
                  Accepted
                </div>
              </DropdownItem>
              <DropdownItem>
                <div
                  onClick={() =>
                    handleChangeApplicationStatus({
                      id: item?._id,
                      status: 'rejected',
                    })
                  }
                  className="text-primary"
                >
                  <i className="ri-close-fill me-2"></i>
                  Rejected
                </div>
              </DropdownItem>
            </>
          ) : item?.status === 'accepted' ? (
            // <DropdownItem>
            //   <div
            //     // onClick={() => {
            //     //   setApplicationId(item?._id), setOpenPaymentModal(true);
            //     // }}
            //     className="text-primary"
            //   >
            //     <i className="ri-bank-card-fill me-2"></i>
            //     Active
            //   </div>
            // </DropdownItem>
            ''
          ) : (
            ''
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  return (
    <Layout>
      {recentApplicationLoading ? (
        <LoaderSpiner />
      ) : activeTab === '1' ? (
        <div className="page-content">
          <div className="h-100">
            <ToastContainer />
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Student's University Applications
                        <SearchComponent
                          searchTerm={searchTerm}
                          handleSearchChange={handleSearchChange}
                        />
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[
                            ...studentApplicationsHeaders,
                            EmgsStatusActionData,
                          ]}
                          data={isfilteredData || []}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          emptyMessage="No Data found yet."
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="page-content">
          <div className="h-100">
            <div className="container-fluid">
              <div>
                <ApplicationEmgsStatusTimeline
                  setActiveTab={setActiveTab}
                  currentTimeline={currentTimeline}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
