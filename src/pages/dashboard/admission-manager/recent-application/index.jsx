import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import StudentApplicationEmgsStatusTimeline from '@/components/StudentDashboard/components/StudentApplicationEmgsStatusTimeline';
import {
  useGetRecentApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/common/applicationService';
import Link from 'next/link';
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

export default function RecentApplicationPageForAdmissionManagerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('1');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentTimeline, setCurrentTimeline] = React.useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const perPageData = 9;

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
    console.log(data);

    try {
      const response = await updateApplicationStatus(data);
      // console.log(response?.data?.success);
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
    if (typeof item === 'object' && item !== null) {
      return Object.values(item).some((value) =>
        searchInItem(value, searchTerm)
      );
    }

    return String(item).toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Filter data for search option
  const isfilteredData =
    recentApplicationData?.data?.length > 0 &&
    recentApplicationData?.data.filter((item) => {
      return searchInItem(item, searchTerm);
    });

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
                  accepted
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
                  rejected
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

          <DropdownItem>
            <div
              onClick={() =>
                router.push(
                  `/dashboard/super-admin/recent-application/${item?._id}`
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
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  const studentApplicationsHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },
    {
      title: 'University',
      key: 'university',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.university?.name ? item?.university?.name : '-'}
        </span>
      ),
    },
    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.course?.name ? item?.course?.name : '-'}
        </span>
      ),
    },
    {
      title: 'Student Name',
      key: 'student_name',
      render: (item) => (
        <Link
          href={`/dashboard/super-admin/students/${item?.student?._id}`}
          className="d-flex flex-column text-capitalize fw-medium"
        >
          {item?.student?._id
            ? item?.student?.first_name + ' ' + item?.student?.last_name
            : '-'}
        </Link>
      ),
    },
    {
      title: 'Agent Name',
      key: 'Agent_name',
      render: (item) => (
        <Link
          href={`/dashboard/super-admin/agents/${item?.applied_by?._id}`}
          className="d-flex flex-column text-capitalize fw-medium"
        >
          {item?.applied_by?.role === 'agent'
            ? `${item?.applied_by?.first_name ? item?.applied_by?.first_name : ''} ${item?.applied_by?.last_name ? item?.applied_by?.last_name : ''}`
            : ''}
        </Link>
      ),
    },
    {
      title: 'Applied By',
      key: 'applied_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize fw-medium text-p">
          {item?.applied_by?.role ? `${item?.applied_by?.role}` : ''}
        </span>
      ),
    },

    {
      title: 'Price',
      key: 'price',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.payment_price
            ? item.payment_price.toFixed(2) + ' ' + 'MYR'
            : '-'}
        </span>
      ),
    },
    {
      title: 'Payment Status',
      key: 'payment_status',
      render: (item) => (
        <>
          <span
            className={` rounded-4 px-5 py-1 fw-medium text-capitalize ${item?.payment_status === 'paid' ? 'bg-third-color text-primary' : item?.payment_status === 'pending' ? ' bg-danger-subtle text-danger text-center' : ''}`}
          >
            {item?.payment_status ?? '-'}
          </span>
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <>
          <span
            className={`fw-semibold px-4 py-1 rounded-4 text-capitalize ${item?.status === 'accepted' ? 'bg-third-color text-primary' : item?.status === 'rejected' ? 'bg-danger-subtle text-danger' : item?.status === 'pending' ? 'bg-warning-subtle text-warning' : ''}`}
          >
            {item?.status ?? '-'}
          </span>
        </>
      ),
    },
  ];

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
                <StudentApplicationEmgsStatusTimeline
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
