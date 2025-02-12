import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import StudentApplicationEmgsStatusTimeline from '@/components/StudentDashboard/components/StudentApplicationEmgsStatusTimeline';
import {
  useGetRecentApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/common/applicationService';
import { studentApplicationsHeaders } from '@/utils/common/data';
import { useRouter } from 'next/router';
import React from 'react';
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
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[
                            ...studentApplicationsHeaders,
                            EmgsStatusActionData,
                          ]}
                          data={recentApplicationData?.data || []}
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
