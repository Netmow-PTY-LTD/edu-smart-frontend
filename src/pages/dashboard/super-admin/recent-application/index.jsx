import ApplicationEmgsStatusTimeline from '@/components/agentDashboard/studentManagement/singleStudentProfile/ApplicationEmgsStatusTimeline';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AirportPickupChargeModal from '@/components/sAdminDashboard/modals/AirportPickupChargeModal';
import {
  useAddEmgsTimelineMutation,
  useGetRecentApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/common/applicationService';
import {
  useGetAirportPickupChargeInSuperAdminQuery,
  useUpdateAirportPickupChargeInSuperAdminMutation,
} from '@/slice/services/super admin/superAdminStatsServices';
import DataObjectComponent from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const [pickupChargeModal, setPickupChargeModal] = useState(false);
  const [checkAirportPickupStatus, setCheckAirportPickupStatus] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const perPageData = 20;
  const customData = useCustomData();

  const { studentApplicationsHeaders } = DataObjectComponent();

  const {
    data: recentApplicationData,
    isLoading: recentApplicationLoading,
    refetch: recentApplicationRefetch,
  } = useGetRecentApplicationsQuery();

  const {
    data: getAirportPickupChargeInSuperAdminData,
    isLoading: getAirportPickupChargeInSuperAdminLoading,
    refetch: getAirportPickupChargeInSuperAdminRefetch,
  } = useGetAirportPickupChargeInSuperAdminQuery(applicationId, {
    skip: !applicationId,
    refetchOnMountOrArgChange: true,
  });

  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  const [
    updateAirportPickupChargeInSuperAdmin,
    {
      data: updateAirportPickupChargeInSuperAdminData,
      isLoading: updateAirportPickupChargeInSuperAdminLoading,
    },
  ] = useUpdateAirportPickupChargeInSuperAdminMutation();

  useEffect(() => {
    if (router?.query?.application_id) {
      setPickupChargeModal(true);
      setApplicationId(router?.query?.application_id);
    }
  }, [router?.query?.application_id]);

  const handleViewEmgsStatus = (id) => {
    setCurrentTimeline(id);
    setActiveTab('2');
  };

  // const handleChangeApplicationStatus = async (data) => {
  //   try {
  //     const response = await updateApplicationStatus(data);
  //     if (response?.data?.success) {
  //       toast.success(
  //         response?.data?.message || 'Application status updated successfully!'
  //       );
  //       recentApplicationRefetch();
  //     } else {
  //       toast.error(
  //         response?.error?.data?.message ||
  //           'Failed to update application status.'
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error updating application status:', error);
  //     toast.error('An error occurred while updating the status.');
  //   }
  // };

  const [addEmgsTimeline] = useAddEmgsTimelineMutation();
  const handleChangeApplicationStatus = async (data) => {
    try {
      const response = await updateApplicationStatus(data);

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || 'Application status updated successfully!'
        );
        recentApplicationRefetch();

        // ✅ If status is 'processing', send FormData to addEmgsTimeline
        if (data.status === 'processing') {
          const formData = new FormData();
          formData.append(
            'title',
            'File Assessment Reviewed — Proceed with EMGS Payment'
          );
          formData.append(
            'description',
            'Your file assessment has been successfully reviewed. You can now proceed to pay the EMGS fee using the invoice link below.'
          );
          formData.append(
            'invoiceUrl',
            `/application-invoices?app_id=${data?.id}&emgs=yes`
          );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }
        if (data.status === 'processed') {
          const formData = new FormData();
          formData.append(
            'title',
            'Application Processed — Proceed with Tuition Fee Payment'
          );
          formData.append(
            'description',
            'Your file assessment has been completed and reviewed successfully. Please proceed to pay the Tuition Fee using the invoice link below to continue your application process.'
          );
          formData.append(
            'invoiceUrl',
            `/application-invoices?app_id=${data?.id}&tuition=yes`
          );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            toast.success('Tuition fee timeline added successfully!');
          } else {
            toast.error('Failed to add Tuition fee timeline.');
          }
        }
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

  const PickupHeaderData = {
    title: 'Pickup',
    key: 'pickup_status',
    render: (item) => (
      <div
        onClick={() => {
          setPickupChargeModal(true),
            setApplicationId(item?._id),
            setCheckAirportPickupStatus(
              item?.airport_pickup_charge_payment_status
            );
        }}
        className="text-primary cursor-pointer"
      >
        Airport Pick-up Charge
      </div>
    ),
  };

  const EmgsStatusActionData = {
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
        <DropdownMenu className="me-3">
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

          <DropdownItem>
            <div
              onClick={() => {
                setPickupChargeModal(true),
                  setApplicationId(item?._id),
                  setCheckAirportPickupStatus(
                    item?.airport_pickup_charge_payment_status
                  );
              }}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              Airport Pick-up Charge
            </div>
          </DropdownItem>

          <>
            <DropdownItem>
              <div
                onClick={() =>
                  handleChangeApplicationStatus({
                    id: item?._id,
                    status: 'pending',
                    emgs_id: item?.emgs_status,
                  })
                }
                className="text-primary"
              >
                <i className="ri-check-fill me-2"></i>
                Pending
              </div>
            </DropdownItem>

            <DropdownItem>
              <div
                onClick={() =>
                  handleChangeApplicationStatus({
                    id: item?._id,
                    status: 'processing',
                    emgs_id: item?.emgs_status,
                  })
                }
                className="text-primary"
              >
                <i className="ri-check-fill me-2"></i>
                Processing
              </div>
            </DropdownItem>
            <DropdownItem>
              <div
                onClick={() =>
                  handleChangeApplicationStatus({
                    id: item?._id,
                    status: 'processed',
                    emgs_id: item?.emgs_status,
                  })
                }
                className="text-primary"
              >
                <i className="ri-check-fill me-2"></i>
                Processed
              </div>
            </DropdownItem>

            <DropdownItem>
              <div
                onClick={() =>
                  handleChangeApplicationStatus({
                    id: item?._id,
                    status: 'accepted',
                    emgs_id: item?.emgs_status,
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
                    emgs_id: item?.emgs_status,
                  })
                }
                className="text-primary"
              >
                <i className="ri-close-fill me-2"></i>
                Rejected
              </div>
            </DropdownItem>
          </>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  const handleChangeAirportPichupCharge = (e) => {
    e.preventDefault();

    const formElements = e.target.elements;
    const data = {};

    for (let element of formElements) {
      if (element.name) {
        data[element.name] = element.value;
      }
    }

    try {
      updateAirportPickupChargeInSuperAdmin(data).then((res) => {
        if (res?.error) {
          toast.error(
            res?.error?.error?.data?.mesage || 'Something went wrong'
          );
        } else {
          toast.success(res?.data?.message);
          recentApplicationRefetch();
          setApplicationId('');
          setPickupChargeModal(false);
          setCheckAirportPickupStatus('');
        }
      });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  console.log(recentApplicationData);

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
                            ...(studentApplicationsHeaders || []),
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

              {/* for add */}
              <AirportPickupChargeModal
                modalTitle={'Airport Pickup Charge'}
                submitTitle={'Submit'}
                handleChangeAirportPichupCharge={
                  handleChangeAirportPichupCharge
                }
                openModal={pickupChargeModal}
                closeModal={() => {
                  setPickupChargeModal(false),
                    setApplicationId(''),
                    setCheckAirportPickupStatus('');
                  router.push({
                    pathname: router.pathname,
                    query: {},
                  });
                }}
                applicationId={applicationId}
                editPickupChargeData={getAirportPickupChargeInSuperAdminData}
                isLoading={updateAirportPickupChargeInSuperAdminLoading}
                checkAirportPickupStatus={checkAirportPickupStatus}
              />
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
