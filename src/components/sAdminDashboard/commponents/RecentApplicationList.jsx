'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';

import {
  useAddEmgsTimelineMutation,
  useGetRecentApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from '@/slice/services/common/applicationService';

import {
  useGetAirportPickupChargeInSuperAdminQuery,
  useUpdateAirportPickupChargeInSuperAdminMutation,
} from '@/slice/services/super admin/superAdminStatsServices';

import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import DataObjectComponent from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';

import AirportPickupChargeModal from '@/components/sAdminDashboard/modals/AirportPickupChargeModal';
import ApplicationEmgsStatusTimelineModal from '@/components/sAdminDashboard/modals/ApplicationEmgsStatusTimelineModal';
import ApplicationDocumentsModal from '@/components/sAdminDashboard/modals/ApplicationDocumentsModal';
import ApplicationEmgsStatusTimeline from '@/components/agentDashboard/studentManagement/singleStudentProfile/ApplicationEmgsStatusTimeline';

export default function RecentApplicationList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTimeline, setCurrentTimeline] = useState('');
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
  } = useGetAirportPickupChargeInSuperAdminQuery(applicationId, {
    skip: !applicationId,
    refetchOnMountOrArgChange: true,
  });

  const [
    updateAirportPickupChargeInSuperAdmin,
    { isLoading: updateAirportPickupChargeInSuperAdminLoading },
  ] = useUpdateAirportPickupChargeInSuperAdminMutation();

  useEffect(() => {
    if (router?.query?.application_id) {
      setPickupChargeModal(true);
      setApplicationId(router?.query?.application_id);
      setEmgsId(router?.query?.emgs_id);
    }
  }, [router?.query]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const searchInItem = (item, searchTerm) => {
    if (!searchTerm) return true;
    if (typeof item === 'object' && item !== null) {
      return Object.values(item).some((value) =>
        searchInItem(value, searchTerm)
      );
    }
    return String(item).toLowerCase().includes(searchTerm.toLowerCase());
  };

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
      <UncontrolledDropdown direction="end">
        <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
          <span className="button px-3">
            <i className="ri-more-fill align-middle"></i>
          </span>
        </DropdownToggle>
        <DropdownMenu className="me-3">
          <DropdownItem
            onClick={() => {
              setApplicationId(item?._id);
              setModalOpen(true);
            }}
            className="text-primary"
          >
            <i className="ri-eye-fill me-2"></i> View Documents
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setEmgsId(item?.emgs_status);
              setIsTimelineModalOpen(true);
            }}
            className="text-primary"
          >
            <i className="ri-eye-fill me-2"></i> View EMGS Status
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setPickupChargeModal(true);
              setApplicationId(item?._id);
              setEmgsId(item?.emgs_status);
              setCheckAirportPickupStatus(item?.airport_pickup_charge_payment_status);
            }}
            className="text-primary"
          >
            <i className="ri-flight-takeoff-line me-2"></i> Airport Pick-up Charge
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  const handleChangeAirportPichupCharge = (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const data = {};
    for (let element of formElements) {
      if (element.name) data[element.name] = element.value;
    }

    updateAirportPickupChargeInSuperAdmin(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.error?.data?.message || 'Something went wrong');
      } else {
        toast.success(res?.data?.message);
        recentApplicationRefetch();
        setApplicationId('');
        setPickupChargeModal(false);
        setCheckAirportPickupStatus('');
        // Add application status update if needed
      }
    });
  };

  return (
    <>
      {recentApplicationLoading ? (
        <LoaderSpiner />
      ) : activeTab === '1' ? (
        <div className="page-content">
          <div className="h-100">
            <ToastContainer />
            <div className="container-fluid">
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
                        headers={[...(studentApplicationsHeaders || []), EmgsStatusActionData]}
                        data={isfilteredData}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        perPageData={perPageData}
                        emptyMessage="No Data found yet."
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <AirportPickupChargeModal
                modalTitle="Airport Pickup Charge"
                submitTitle="Submit"
                handleChangeAirportPichupCharge={handleChangeAirportPichupCharge}
                openModal={pickupChargeModal}
                closeModal={() => {
                  setPickupChargeModal(false);
                  setApplicationId('');
                  setCheckAirportPickupStatus('');
                  router.push({ pathname: router.pathname, query: {} });
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
              <ApplicationEmgsStatusTimeline
                setActiveTab={setActiveTab}
                currentTimeline={currentTimeline}
              />
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
    </>
  );
}
