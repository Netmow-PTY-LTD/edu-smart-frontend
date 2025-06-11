import ApplicationEmgsStatusTimeline from '@/components/agentDashboard/studentManagement/singleStudentProfile/ApplicationEmgsStatusTimeline';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AirportPickupChargeModal from '@/components/sAdminDashboard/modals/AirportPickupChargeModal';
import ApplicationDocumentsModal from '@/components/sAdminDashboard/modals/ApplicationDocumentsModal';
import ApplicationEmgsStatusTimelineModal from '@/components/sAdminDashboard/modals/ApplicationEmgsStatusTimelineModal';
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
  const [emgsId, setEmgsId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);


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
      setEmgsId(router?.query?.emgs_id);
    }
  }, [router?.query?.application_id, router?.query?.emgs_id]);

  const handleViewEmgsStatus = (id) => {
    setCurrentTimeline(id);
    setActiveTab('2');
  };

  const [addEmgsTimeline] = useAddEmgsTimelineMutation();
  const handleChangeApplicationStatus = async (data) => {
    try {
      if (data.status === 'pickupGenerated') {
        const formData = new FormData();
        formData.append(
          'title',
          'Airport Pickup Charge Generated — Action Required'
        );
        formData.append(
          'description',
          'Your Airport Pickup Charge has been successfully generated. Please review and complete the payment to confirm your airport pickup arrangement. You can access the invoice using the link below.'
        );
        formData.append(
          'invoiceUrl',
          `/application-invoices?app_id=${data?.id}&pickup=yes`
        );
        formData.append('image', data?.image); // Ensure this is a File or Blob object
        formData.append('id', data?.emgs_id); // emgs_status_id

        const timelineResponse = await addEmgsTimeline(formData);
        if (timelineResponse?.data?.success) {
          // toast.success('Airport Pickup Charge timeline added successfully!');
        } else {
          toast.error('Failed to add Airport Pickup Charge timeline.');
        }
        return;
      }

      const response = await updateApplicationStatus(data);

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || 'Application status updated successfully!'
        );
        recentApplicationRefetch();

        // ✅ If status is 'processing', send FormData to addEmgsTimeline

        if (data.status === 'pending') {
          const formData = new FormData();
          formData.append('title', 'File Assessment Submitted');
          formData.append(
            'description',
            'Your file assessment has been submitted and will be reviewed shortly. The status will be updated once the review process begins.'
          );
          // formData.append(
          //   'invoiceUrl',
          //   `/application-invoices?app_id=${data?.id}&emgs=yes`
          // );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }

        if (data.status === 'review_in') {
          const formData = new FormData();
          formData.append('title', 'File Assessment Submitted — Under Review');
          formData.append(
            'description',
            'Your submitted documents are currently under review by our team. Please check back soon for updates on your application status.'
          );
          // formData.append(
          //   'invoiceUrl',
          //   `/application-invoices?app_id=${data?.id}&emgs=yes`
          // );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }

        if (data.status === 'file_requested') {
          const formData = new FormData();
          formData.append('title', 'Additional Documents Required');
          formData.append(
            'description',
            'We need additional documents to proceed with your application. Please check your application details and upload the required files as soon as possible.'
          );
          // formData.append(
          //   'invoiceUrl',
          //   `/application-invoices?app_id=${data?.id}&emgs=yes`
          // );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }

        if (data.status === 'ready_for_emgs') {
          const formData = new FormData();
          formData.append('title', 'Ready for EMGS Submission & Payment');
          formData.append(
            'description',
            'Your file has passed internal assessment and is now ready to be submitted to EMGS. The EMGS invoice is now available and ready for payment.'
          );
          formData.append(
            'invoiceUrl',
            `/application-invoices?app_id=${data?.id}&emgs=yes`
          );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }
        if (data.status === 'file_under_emgs') {
          const formData = new FormData();
          formData.append('title', 'File Under EMGS Review');
          formData.append(
            'description',
            'Your documents have been submitted to EMGS and are currently being reviewed. We will notify you once EMGS has provided feedback.'
          );
          // formData.append(
          //   'invoiceUrl',
          //   `/application-invoices?app_id=${data?.id}&emgs=yes`
          // );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }

        if (data.status === 'ready_for_tuition') {
          const formData = new FormData();
          formData.append('title', 'Ready for Tuition Payment');
          formData.append(
            'description',
            'Your application has progressed successfully. You may now proceed with the tuition payment to continue your enrollment process.'
          );
          formData.append(
            'invoiceUrl',
            `/application-invoices?app_id=${data?.id}&tuition=yes`
          );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }

        if (data.status === 'tuition_under_processed') {
          const formData = new FormData();
          formData.append('title', 'Tuition Payment is Being Processed');
          formData.append(
            'description',
            'Your tuition payment is currently under verification. We will update your status once the payment has been confirmed.'
          );
          // formData.append(
          //   'invoiceUrl',
          //   `/application-invoices?app_id=${data?.id}&tuition=yes`
          // );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // This is your emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('EMGS timeline added successfully!');
          } else {
            toast.error('Failed to add EMGS timeline.');
          }
        }

        if (data.status === 'accepted') {
          const formData = new FormData();
          formData.append('title', 'Application Accepted');
          formData.append(
            'description',
            'Congratulations! Your application has been accepted. Please check your application dashboard, EMGS status, or email for further instructions and next steps.'
          );
          // formData.append(
          //   'invoiceUrl',
          //   `/application-invoices?app_id=${data?.id}&tuition=yes`
          // );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success('Tuition fee timeline added successfully!');
          } else {
            toast.error('Failed to add Tuition fee timeline.');
          }
        }

        if (data.status === 'rejected') {
          const formData = new FormData();
          formData.append(
            'title',
            'Application Cancelled — Final Status Update'
          );
          formData.append(
            'description',
            'We regret to inform you that your application has been cancelled. If you believe this was an error or you need further clarification, please contact our support team. Thank you for your interest and understanding.'
          );
          // formData.append(
          //   'invoiceUrl',
          //   `/application-invoices?app_id=${data?.id}&pickup=yes`
          // );
          formData.append('image', data?.image); // Ensure this is a File or Blob object
          formData.append('id', data?.emgs_id); // emgs_status_id

          const timelineResponse = await addEmgsTimeline(formData);
          if (timelineResponse?.data?.success) {
            // toast.success(
            //   'Application cancellation timeline added successfully!'
            // );
          } else {
            toast.error('Failed to add application cancellation timeline.');
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
            setEmgsId(item?.emgs_status);
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


  const statusOrder = [
  'pending',
  'review_in',
  'file_requested',
  'ready_for_emgs',
  'file_under_emgs',
  'ready_for_tuition',
  'tuition_under_processed',
  'accepted',
  'rejected',
];

const statusOptions = [
  { label: 'Submitted', value: 'pending', icon: 'ri-check-fill' },
  { label: 'Review In', value: 'review_in', icon: 'ri-search-eye-line' },
  { label: 'File Requested', value: 'file_requested', icon: 'ri-folder-received-line' },
  { label: 'Ready For EMGS', value: 'ready_for_emgs', icon: 'ri-send-plane-line' },
  { label: 'File Under EMGS', value: 'file_under_emgs', icon: 'ri-file-search-line' },
  { label: 'Ready For Tuition', value: 'ready_for_tuition', icon: 'ri-graduation-cap-line' },
  { label: 'Tuition Under Processed', value: 'tuition_under_processed', icon: 'ri-loop-right-line' },
  { label: 'Accepted', value: 'accepted', icon: 'ri-check-line' },
  { label: 'Rejected', value: 'rejected', icon: 'ri-close-line' },
];

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
                onClick={() => {
                  setApplicationId(item?._id);
                  setModalOpen(true);
                }}
                className="text-primary"
              >
              <i className="ri-eye-fill me-2"></i>
                View Documents
              </div>

          </DropdownItem>

          <DropdownItem>
              <div
                onClick={() => {
                  setEmgsId(item?.emgs_status);
                  setIsTimelineModalOpen(true);
                }}
                className="text-primary"
              >
              <i className="ri-eye-fill me-2"></i>
                View EMGS Status
              </div>
          </DropdownItem>

          <>

            {statusOptions.map((statusItem) => {
              const currentIndex = statusOrder.indexOf(item?.status);
              const statusIndex = statusOrder.indexOf(statusItem.value);

              const isCurrentStatus = item?.status === statusItem.value;

              const isDisabled =
                item?.status === 'rejected'
                  ? statusItem.value !== 'pending'
                  : statusIndex <= currentIndex;

              const getTextClass = () => {
                if (isCurrentStatus) return 'text-success fw-bold'; // Green & bold
                if (isDisabled) return 'text-muted';
                return 'text-primary';
              };

              const getCursorStyle = () => (isDisabled ? 'not-allowed' : 'pointer');

              return (
                <DropdownItem key={statusItem.value} disabled={isDisabled}>
                  <div
                    onClick={
                      isDisabled
                        ? null
                        : () =>
                            handleChangeApplicationStatus({
                              id: item?._id,
                              status: statusItem.value,
                              emgs_id: item?.emgs_status,
                            })
                    }
                    className={getTextClass()}
                    style={{ cursor: getCursorStyle() }}
                  >
                    <i className={`${statusItem.icon} me-2`}></i>
                    {statusItem.label}
                  </div>
                </DropdownItem>
              );
            })}

            <DropdownItem>
              <div
                onClick={() => {
                  setPickupChargeModal(true),
                    setApplicationId(item?._id),
                    setEmgsId(item?.emgs_status);
                  setCheckAirportPickupStatus(
                    item?.airport_pickup_charge_payment_status
                  );
                }}
                className="text-primary"
              >
                <i className="ri-flight-takeoff-line"></i>
                Airport Pick-up Charge
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
          handleChangeApplicationStatus({
            id: data?.application_id,
            status: 'pickupGenerated',
            emgs_id: data?.emgsId,
          });
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
                emgsId={emgsId}
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

      <ApplicationEmgsStatusTimelineModal
        isOpen={isTimelineModalOpen}
        onClose={() => setIsTimelineModalOpen(false)}
        currentTimeline={emgsId}
      />
      <ApplicationDocumentsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        applicationId={applicationId}
      />

    </Layout>
  );
}
