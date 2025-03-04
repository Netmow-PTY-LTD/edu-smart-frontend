import FileViewer from '@/components/common/FileViewer';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import DescriptionRenderer from '@/utils/DescriptionRenderer';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from 'reactstrap';

export const userDummyImage = '/assets/images/users/user-dummy-img.jpg';
export const teamDummyImage = '/assets/images/users/multi-user.jpg';
export const edulogo = '/favicon.png';
export const brandlogo = '/edusmart-Final-Logo-Final-Logo.png';
export const footerLogo = '/Edusmart-White-Logo.png';
export const profileBg = '/profile_bg.jpg';
export const hot_offer_image = '/Hot Offer.png';
export const footerShape = '/footer-shape.png';

const DataObjectComponent = () => {
  const { data: userInfoData, isLoading, isError } = useGetUserInfoQuery();

  if (isLoading) return <div></div>;
  if (isError || !userInfoData?.data?.role) return <div></div>;

  const universityLogoAndNameHeaderDataForAgentDashboard = {
    title: 'Logo - Name',
    key: 'logo',
    render: (item) => (
      <div className="d-flex align-items-center me-5">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/${userInfoData?.data?.role}/university-management/single-university-profile-for-agent/${item?._id}`}
            className="text-reset"
          >
            <Image
              src={item?.logo?.url ? item?.logo?.url : `${userDummyImage}`}
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link
              href={`/dashboard/${userInfoData?.data?.role}/university-management/single-university-profile-for-agent/${item?._id}`}
              className="text-reset"
            >
              {`${item.name} `}
            </Link>
          </h5>
        </div>
      </div>
    ),
  };

  const universityLogoAndNameHeaderDataForSuperAdminDashboard = {
    title: 'Logo - Name',
    key: 'logo',
    render: (item) => (
      <div className="d-flex align-items-center me-5">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/university-management/single-university-profile/${item?._id}`}
            className="text-reset"
          >
            <Image
              src={item?.logo?.url ? item?.logo?.url : `${userDummyImage}`}
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link
              href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/university-management/single-university-profile/${item?._id}`}
              className="text-reset"
            >
              {`${item.name} `}
            </Link>
          </h5>
        </div>
      </div>
    ),
  };

  const studentImageAndNameHeaderDataForStudentDashboard = {
    title: 'Logo - Name',
    key: 'logo',
    render: (item) => (
      <div className="d-flex align-items-center me-5">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/${userInfoData?.data?.role}/university-management/single-university-profile/${item?._id}`}
            className="text-reset"
          >
            <Image
              src={item?.logo?.url ? item?.logo?.url : `${userDummyImage}`}
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link
              href={`/dashboard/${userInfoData?.data?.role}/university-management/single-university-profile/${item?._id}`}
              className="text-reset"
            >
              {`${item.name} `}
            </Link>
          </h5>
        </div>
      </div>
    ),
  };

  // all univeresity header
  const universityHeadersData = [
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <p className="text-wrap me-5">
          {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
        </p>
      ),
    },

    {
      title: 'Address',
      key: 'address',
      render: (item) => (
        <div className="d-flex gap-2">
          <div className="text-capitalize">
            <span className="me-2">
              {item?.address_line_1 ? item?.address_line_1 + ',' : '' || '-'}
            </span>
            <span className="me-2">
              {item?.address_line_2 ? item?.address_line_2 + ',' : '' || '-'}
            </span>
          </div>
          <div className="text-capitalize">
            <span className="me-2">
              {item?.city ? item?.city + ',' : '' || '-'}
            </span>
            <span className="me-2">
              {item?.state ? item?.state + ',' : '' || '-'}
            </span>
          </div>
          <div className="text-capitalize">
            <span className="me-2">
              {item?.zip ? item?.zip + ',' : '' || '-'}
            </span>
            <span className="me-2">{item?.country || '-'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <>
          <span
            className={`border rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.status === 'active' ? 'bg-third-color text-primary' : 'bg-fourth-color text-white'}`}
          >
            {item?.status ?? '-'}
          </span>
        </>
      ),
    },
  ];

  //student submitted doc header

  const studentAirTiecketHeadersWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },

    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.notes ? item?.notes : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const studentSubmittedDocumentsHeaderWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },

    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.notes ? item?.notes : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },
    {
      title: 'Requested From',
      key: 'requested_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    // {
    //   title: 'Requester Email',
    //   key: 'email',
    //   render: (item) => (
    //     <div>
    //       <h5 className="fs-14 fw-medium ">
    //         {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
    //       </h5>
    //     </div>
    //   ),
    // },
    // {
    //   title: 'Requester Role',
    //   key: 'role',
    //   render: (item) => (
    //     <div>
    //       <h5 className="fs-14 fw-medium  text-capitalize">
    //         {`${item?.requested_by?.role ? item?.requested_by?.role : '-'}`}
    //       </h5>
    //     </div>
    //   ),
    // },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  // student Doc upload request header
  const studentRequestDocumentsHeaderWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },

    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {item?.notes ? (
            <span style={{ color: '#007BFF' }}>{item?.notes}</span>
          ) : (
            'No notes yet'
          )}
        </div>
      ),
    },

    {
      title: 'Requested By',
      key: 'requested_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    // {
    //   title: 'Requester Email',
    //   key: 'email',
    //   render: (item) => (
    //     <div>
    //       <h5 className="fs-14 fw-medium ">
    //         {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
    //       </h5>
    //     </div>
    //   ),
    // },
    // {
    //   title: 'Requester Role',
    //   key: 'role',
    //   render: (item) => (
    //     <div>
    //       <h5 className="fs-14 fw-medium  text-capitalize">
    //         {`${item?.requested_by?.role ? item?.requested_by?.role : '-'}`}
    //       </h5>
    //     </div>
    //   ),
    // },
    {
      title: 'Uploaded Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const studentImageAndNameHeaderDataForSuperAdmin = {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center ">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/students/${item?._id}`}
            className="text-reset"
          >
            <Image
              src={
                item?.profile_image?.url
                  ? item?.profile_image?.url
                  : `${userDummyImage}`
              }
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link
              href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/students/${item?._id}`}
              className="text-reset"
            >
              {item?.first_name && item?.last_name
                ? `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`
                : '-'}
            </Link>
          </h5>
        </div>
      </div>
    ),
  };

  const studentsImageAndNameHeaderDataInAgentDashboard = {
    title: 'Logo - Name',
    key: 'logo',
    render: (item) => (
      <div className="d-flex align-items-center me-5">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/${userInfoData?.data?.role}/student-management/single-student-for-agent/${item?._id}`}
            className="text-reset"
          >
            <Image
              src={
                item?.profile_image?.url
                  ? item?.profile_image?.url
                  : `${userDummyImage}`
              }
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            <Link
              href={`/dashboard/${userInfoData?.data?.role}/student-management/single-student-for-agent/${item?._id}`}
              className="text-reset"
            >
              {item?.first_name && item?.last_name
                ? `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`
                : '-'}
            </Link>
          </h5>
        </div>
      </div>
    ),
  };

  const agentNameAndImageHeaderDataForSuperAdmin = {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/agents/${item?._id}`}
            className="text-reset"
          >
            <Image
              src={
                item?.profile_image?.url
                  ? item?.profile_image?.url
                  : `${userDummyImage}`
              }
              alt="User"
              height={60}
              width={60}
              className="avatar-md p-1 me-3 align-middle rounded-circle"
            />
          </Link>
        </div>
        <div>
          <h5 className="fs-14 fw-medium text-capitalize text-wrap">
            <Link
              href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/agents/${item?._id}`}
              className="text-reset"
            >
              {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
            </Link>
          </h5>
        </div>
      </div>
    ),
  };

  const studentsHeaders = [
    {
      title: 'Agent',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.agent?.first_name && item?.agent?.last_name
            ? `${item?.agent?.first_name ? item?.agent?.first_name : ''} ${item?.agent?.last_name ? item?.agent?.last_name : ''}`
            : '-'}
        </span>
      ),
    },
    { title: 'Email', key: 'email' },
    { title: 'Phone', key: 'phone' },
    {
      title: 'Country',
      key: 'country',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.country ? <span>{item.country}</span> : '-'}
        </span>
      ),
    },
  ];

  const agentEarnigsHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },
    {
      title: 'Package',
      key: 'agent_package',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.agent_package?.package?.name
            ? item?.agent_package?.package?.name
            : '-'}
        </span>
      ),
    },
    {
      title: 'Amount',
      key: 'amount',
    },
    {
      title: 'Start Date',
      key: 'start_date',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {moment(item?.start_date).format('DD-MM-YYYY')}
        </span>
      ),
    },
    {
      title: 'End Date',
      key: 'end_date',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {moment(item?.end_date).format('DD-MM-YYYY')}
        </span>
      ),
    },
    {
      title: 'Target Status',
      key: 'target_status',
      render: (item) => (
        <Progress
          className="my-2 "
          style={{
            height: '13px',
            borderRadius: '20px',
            backgroundColor: 'rgba(75, 77, 70, 0.18)',
          }}
          color="success"
          value={
            (item?.agent_package?.target?.target_achieved /
              item?.agent_package?.target?.target) *
              100 >
            0
              ? (item?.agent_package?.target?.target_achieved /
                  item?.agent_package?.target?.target) *
                100
              : 15
          }
        >
          <span className="fs-12 fw-semibold">
            {item?.agent_package?.target?.target_achieved || 0}
            {' / '}
            {item?.agent_package?.target?.target || 0}
          </span>
        </Progress>
      ),
    },
    {
      title: 'Payout Status',
      key: 'payment_status',
      render: (item) => (
        <>
          <span
            className={` rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.payment_status === 'paid' ? 'bg-third-color text-primary' : item?.payment_status === 'unpaid' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'}`}
          >
            {item?.payment_status ?? '-'}
          </span>
        </>
      ),
    },
  ];

  const EmgsStatusListHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },
    {
      title: 'User',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name
            ? `${item?.user?.first_name ? item?.user?.first_name : ''} ${item?.user?.last_name ? item?.user?.last_name : ''}`
            : '-'}
        </span>
      ),
    },
    {
      title: 'University',
      key: 'university',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.application?.university?.name
            ? item?.application?.university?.name
            : '-'}
        </span>
      ),
    },
    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.application?.course?.name
            ? item?.application?.course?.name
            : '-'}
        </span>
      ),
    },
  ];

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
      title: 'Student',
      key: 'student_name',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.student?._id
            ? item?.student?.first_name + ' ' + item?.student?.last_name
            : '-'}
        </span>
      ),
    },
    {
      title: 'Application Id',
      key: 'application_id',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?._id ? item?._id : '-'}
        </span>
      ),
    },
    {
      title: 'Applied By',
      key: 'applied_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.applied_by?.first_name && item?.applied_by?.last_name
            ? `${item?.applied_by?.first_name ? item?.applied_by?.first_name : ''} ${item?.applied_by?.last_name ? item?.applied_by?.last_name : ''}`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Emgs',
      key: 'emgs_payment_status',
      render: (item) => (
        <>
          <span
            className={`fw-medium fs-3 text-capitalize badge ${item?.emgs_payment_status === 'paid' ? 'bg-success-subtle text-success' : item?.emgs_payment_status === 'pending' ? ' bg-warning-subtle text-warning' : ''}`}
          >
            {item?.emgs_payment_status ?? '-'}
          </span>
        </>
      ),
    },
    {
      title: 'Tuition',
      key: 'tuition_fee_payment_status',
      render: (item) => (
        <>
          <span
            className={` fw-medium fs-3 text-capitalize badge ${item?.tuition_fee_payment_status === 'paid' ? 'bg-success-subtle text-success' : item?.tuition_fee_payment_status === 'pending' ? ' bg-warning-subtle text-warning' : ''}`}
          >
            {item?.tuition_fee_payment_status ?? '-'}
          </span>
        </>
      ),
    },

    {
      title: 'Pickup',
      key: 'pickup_status',
      render: (item) => (
        <>
          {item?.airport_pickup_charge > 0 ? (
            <span
              className={` fw-medium fs-3 text-capitalize badge ${item?.airport_pickup_charge_payment_status === 'paid' ? 'bg-success-subtle text-success' : item?.airport_pickup_charge_payment_status === 'pending' ? ' bg-warning-subtle text-warning' : ''}`}
            >
              {item?.airport_pickup_charge_payment_status ?? '-'}
            </span>
          ) : (
            <span className="text-capitalize text-primary fw-medium">
              {'Not Activated Yet'}
            </span>
          )}
        </>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <>
          <span
            className={`fw-medium fs-3 text-capitalize badge  ${item?.status === 'accepted' ? 'bg-success-subtle text-success' : item?.status === 'rejected' ? 'bg-danger-subtle text-danger' : item?.status === 'pending' ? 'bg-warning-subtle text-warning' : ''}`}
          >
            {item?.status ?? '-'}
          </span>
        </>
      ),
    },
  ];

  const agentsHeaders = [
    { title: 'Email', key: 'email' },
    { title: 'Phone', key: 'phone' },
    {
      title: 'Country',
      key: 'country',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.country ? <span>{item.country}</span> : '-'}
        </span>
      ),
    },
  ];

  const couponHeaders = [
    {
      title: 'Coupon Code',
      key: 'code',
      render: (item) => (
        <div className="d-flex align-items-center">
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item.code ?? '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Start Date',
      key: 'start_date',
      render: (item) => (
        <div className="d-flex align-items-center">
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item.start_date ? item.start_date.split('T')[0] : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'End Date',
      key: 'End_date',
      render: (item) => (
        <div className="d-flex align-items-center">
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item.expiry_date ? item.expiry_date.split('T')[0] : '-'}`}
          </h5>
        </div>
      ),
    },

    // {
    //   title: 'Coupon Duration',
    //   key: 'coupon_duration',
    //   render: (item) => {
    //     const createdDate = item.start_date.split('T')[0];
    //     const expiryDate = item.expiry_date.split('T')[0];
    //     console.log(createdDate);
    //     console.log(expiryDate);
    //     const createdAt = new Date(createdDate);
    //     const expiryAt = new Date(expiryDate);

    //     let years = expiryAt.getFullYear() - createdAt.getFullYear();
    //     let months = expiryAt.getMonth() - createdAt.getMonth();
    //     let days = expiryAt.getDate() - createdAt.getDate();

    //     if (days < 0) {
    //       months--;
    //       days += new Date(
    //         expiryAt.getFullYear(),
    //         expiryAt.getMonth(),
    //         0
    //       ).getDate();
    //     }
    //     if (months < 0) {
    //       years--;
    //       months += 12;
    //     }

    //     const duration = `${years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''} ${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''} ${days > 0 ? `${days} day${days > 1 ? 's' : ''}` : ''}`;

    //     return (
    //       <span className="d-flex flex-column text-capitalize">
    //         {` ${duration.trim() || '-'}`}
    //       </span>
    //     );
    //   },
    // },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <>
          <span
            className={`border rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.status === 'active' ? 'bg-third-color text-primary' : 'bg-fourth-color text-white'}`}
          >
            {item?.status ?? '-'}
          </span>
        </>
      ),
    },
  ];

  const documentHeaders = [
    {
      title: 'Title',
      key: 'title',
      render: (item) => (
        <div className="d-flex align-items-center">
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item.title ?? '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },
  ];

  const superAdminData = {
    first_name: 'Edu',
    last_name: 'Smart',
    email: 'super@server.edusmart',
    phone: '1724603976',
    address_line_1: 'bima bhaban',
    address_line_2: 'fulbari',
    city: 'cybarjaya',
    state: 'Wilayah Persekutuan',
    zip: '5800',
    country: 'Malaysia',
  };

  // university department header
  const allDepartmentsWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize ">{index + 1}</span>
      ),
    },

    { title: 'Department Name', key: 'name' },
    {
      title: 'Course Category',
      key: 'categories',
      render: (item, index) =>
        item?.categories?.length > 0
          ? item?.categories?.map((category) => (
              <span
                key={index}
                className="d-flex flex-column text-capitalize me-5"
              >
                {category?.name}
              </span>
            ))
          : '-',
    },
    {
      title: 'Courses',
      key: 'courses',
      render: (item, index) =>
        item?.courses?.length > 0
          ? item?.courses.map((course) => (
              <span
                key={index}
                className="d-flex flex-column text-capitalize me-5"
              >
                {course?.name}
              </span>
            ))
          : '-',
    },

    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <p className="text-wrap me-5">
          {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
        </p>
      ),
    },
  ];

  // all course header
  const allCourseCategoryWithoutAction = [
    {
      title: 'SN',
      key: 'key',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Course Category ', key: 'name' },
    {
      title: 'Department ',
      key: 'department',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.department?.name}
        </span>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <p className="text-wrap me-5">
          {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
        </p>
      ),
    },
  ];

  const allCoursesWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    {
      title: 'Course Picture',
      key: 'img',
      render: (item, index) => (
        <div className="d-flex flex-column text-capitalize">
          {item.image && (
            <Image
              src={item.image.url}
              alt={`Course ${index + 1}`}
              width={40}
              height={40}
              className="mt-2 rounded"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      ),
    },

    { title: 'Course Name', key: 'name' },
    {
      title: 'Available Seats',
      key: 'available_seats',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.available_seats}
        </span>
      ),
    },
    {
      title: 'EMGS Fee',
      key: 'emgs_fee',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.emgs_fee || item?.price}
        </span>
      ),
    },
    {
      title: 'Balance Payable',
      key: 'after_emgs_fee',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.after_emgs_fee || item?.price}
        </span>
      ),
    },
    {
      title: 'Total Fee',
      key: 'tuition_fee',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.tuition_fee || item?.university_price}
        </span>
      ),
    },
    {
      title: 'Auto Deduct',
      key: 'auto_deduct',
      render: (item) => (
        <p className="text-wrap me-5">{item?.auto_deduct ? 'Yes' : 'No'}</p>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <p className="text-wrap me-5">
          {/* {`${item.description.split(' ').slice(0, 20).join(' ')}...`} */}
          {`${item.description.slice(0, 100)}...`}
        </p>
      ),
    },
  ];

  const supperAdminWidgetsData = [
    {
      id: 1,
      label: 'Registered UNIVERSITIES',
      counter: '4',
      bgcolor: 'info',
      icon: 'ri-school-fill',
      link: 'View all',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/university-management/all-university`,
    },

    {
      id: 2,
      label: 'registered agents',
      counter: '25',
      bgcolor: 'info',
      icon: 'ri-group-2-fill',
      link: 'View all',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/agents`,
    },
    {
      id: 3,
      label: 'registered students',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-group-fill',
      link: 'View  all',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/students`,
    },
    {
      id: 4,
      label: 'Total Receive Amount',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-3-fill',
      link: 'View All Transactions',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-receive-amount`,
    },
    {
      id: 5,
      label: 'Total University Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-currency-line',
      link: 'View All Payouts',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-university-payout`,
    },
    {
      id: 6,
      label: 'Total Agent Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-money-pound-box-line',
      link: 'View All Payouts',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-agent-payout`,
    },

    {
      id: 7,
      label: 'Total Profit',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-2-line',
      link: 'View Profit Details',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/super-admin-profit`,
    },

    // {
    //   id: 8,
    //   label: 'total income',
    //   counter: '55',
    //   bgcolor: 'warning',
    //   icon: 'ri-wallet-3-fill',
    //   link: 'All Charges',
    //   pathName: '/dashboard/super-admin',
    // },
  ];

  const accountantWidgetsData = [
    // {
    //   id: 1,
    //   label: 'registered agents',
    //   counter: '25',
    //   bgcolor: 'info',
    //   icon: 'ri-group-2-fill',
    //   link: 'View all',
    //   pathName: `/dashboard/${userInfoData?.data?.role}/agents`,
    // },

    {
      id: 2,
      label: 'Total Receive Amount',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-3-fill',
      link: 'All Charges',
      pathName: `/dashboard/${userInfoData?.data?.role}/super-admin-earnings/total-receive-amount`,
    },
    {
      id: 3,
      label: 'Total University Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-currency-line',
      link: 'All Charges',
      pathName: `/dashboard/${userInfoData?.data?.role}/super-admin-earnings/total-university-payout`,
    },
    {
      id: 4,
      label: 'Total Agent Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-money-pound-box-line',
      link: 'All Charges',
      pathName: `/dashboard/${userInfoData?.data?.role}/super-admin-earnings/total-agent-payout`,
    },

    {
      id: 5,
      label: 'Total Profit',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-2-line',
      link: 'All Charges',
      pathName: `/dashboard/${userInfoData?.data?.role}/super-admin-earnings/super-admin-profit`,
    },
  ];

  const admissionManagerWidgetsData = [
    // {
    //   id: 1,
    //   label: 'Registered UNIVERSITIES',
    //   counter: '4',
    //   bgcolor: 'info',
    //   icon: 'ri-school-fill',
    //   link: 'View all',
    //   pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/university-management/all-university`,
    // },

    {
      id: 2,
      label: 'registered agents',
      counter: '25',
      bgcolor: 'info',
      icon: 'ri-group-2-fill',
      link: 'View all',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/agents`,
    },
    {
      id: 3,
      label: 'registered students',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-group-fill',
      link: 'View  all',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/students`,
    },
  ];

  const agentProfileWidgetData = [
    {
      id: 1,
      label: 'Registered UNIVERSITIES',
      counter: '4',
      bgcolor: 'info',
      icon: 'ri-school-fill',
      link: 'View all',
      pathName: `/dashboard/${userInfoData?.data?.role}/university-management/all-university`,
    },

    {
      id: 2,
      label: 'registered agents',
      counter: '25',
      bgcolor: 'info',
      icon: 'ri-group-2-fill',
      link: 'View all',
      pathName: `/dashboard/${userInfoData?.data?.role}/agents`,
    },
  ];

  const courseHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Course Name', key: 'name' },
    {
      title: 'Department ',
      key: 'department',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.department?.name}
        </span>
      ),
    },
    {
      title: 'Course Category',
      key: 'category',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.category?.name}
        </span>
      ),
    },
  ];

  const categoryHeaders = [
    {
      title: 'SN',
      key: 'key',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Course Category ', key: 'name' },
    {
      title: 'Department ',
      key: 'department',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.department?.name}
        </span>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <p className="text-wrap me-5">
          {/* {`${item.description.split(' ').slice(0, 20).join(' ')}...`} */}
          {`${item.description.slice(0, 100)}...`}
        </p>
      ),
    },
  ];

  const departmentHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Department Name', key: 'name' },
    {
      title: 'Course Category',
      key: 'categories',
      render: (item, index) =>
        item?.categories?.length > 0
          ? item?.categories?.map((category) => (
              <span key={index} className="d-flex flex-column text-capitalize">
                {category?.name}
              </span>
            ))
          : '-',
    },
    {
      title: 'Courses',
      key: 'courses',
      render: (item, index) =>
        item?.courses?.length > 0
          ? item?.courses.map((course) => (
              <span key={index} className="d-flex flex-column text-capitalize">
                {course?.name}
              </span>
            ))
          : '-',
    },

    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <p className="text-wrap me-5">
          {/* {`${item.description.split(' ').slice(0, 20).join(' ')}...`} */}
          {`${item.description.slice(0, 100)}...`}
        </p>
      ),
    },
  ];

  const allowedFileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/octet-stream',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
    'application/rtf',
    'text/plain',
    'text/csv',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/svg+xml',
    'image/x-icon',
    'application/jpg',
  ];

  const packagePaymentInvoieHeadersWithoutAction = [
    {
      title: 'Invoice No',
      key: 'createdAt',
      render: (item) => (
        <div>
          {item?.createdAt
            ? `INV-${new Date(item.createdAt).getFullYear().toString().slice(-2)}${(new Date(item.createdAt).getMonth() + 1).toString().padStart(2, '0')}${new Date(item.createdAt).getDate().toString().padStart(2, '0')}-${new Date(item.createdAt).getHours().toString().padStart(2, '0')}${new Date(item.createdAt).getMinutes().toString().padStart(2, '0')}${new Date(item.createdAt).getSeconds().toString().padStart(2, '0')}`
            : ''}
        </div>
      ),
    },
    {
      title: 'Agent Name',
      key: 'agent',
      render: (item) => (
        <div className="text-capitalize">
          {item?.agent?.first_name || item?.agent?.last_name
            ? `${item.agent.first_name} ${item.agent.last_name}`
            : '-'}
        </div>
      ),
    },

    {
      title: 'Package Name',
      key: 'agent_package',
      render: (item) => <div>{item?.agent_package?.package?.name ?? '-'}</div>,
    },

    {
      title: 'Package Amount',
      key: 'package_amount',
      render: (item) => (
        <div>
          {(item?.agent_package?.package?.price || 0).toFixed(2) ?? '-'} {'MYR'}
        </div>
      ),
    },
    {
      title: 'Discount',
      key: 'discount',
      render: (item) => {
        const price = item?.agent_package?.package?.price || 0;
        const paidAmount = item?.paid_amount || 0;
        const discount = price - paidAmount;
        const formattedDiscount = discount.toFixed(2);
        return (
          <div>
            {`${formattedDiscount}`} {'MYR'}
          </div>
        );
      },
    },

    {
      title: 'Paid',
      key: 'paid_amount',
      render: (item) => (
        <div>
          {(item?.paid_amount || 0).toFixed(2) ?? '-'} {'MYR'}
        </div>
      ),
    },

    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}</div>
      ),
    },
    {
      title: 'Payment Status',
      key: 'payment_status',
      render: (item) => (
        <p
          className={` badge fw-semibold text-center me-4 ${item?.status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">{item?.status ?? ''}</span>
        </p>
      ),
    },

    {
      title: 'Payment Method',
      key: 'payment_method',
      render: (item) => (
        <div className="text-capitalize">
          {item?.payment_method ? item?.payment_method : '-'}
        </div>
      ),
    },
  ];

  const packagePaymentReportHeadersWithoutAction = [
    {
      title: 'Agent Name',
      key: 'agent',
      render: (item) => (
        <div>
          {item?.agent?.first_name
            ? item?.agent?.first_name + ' ' + item?.agent?.last_name
            : '-'}
        </div>
      ),
    },
    {
      title: 'Package Name',
      key: 'agent_package',
      render: (item) => <div>{item?.agent_package?.package?.name ?? '-'}</div>,
    },
    {
      title: 'Paid',
      key: 'paid_amount',
      render: (item) => (
        <div>
          {item?.paid_amount ?? '-'} {'MYR'}
        </div>
      ),
    },

    {
      title: 'Payment Method',
      key: 'payment_method',
    },
    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}</div>
      ),
    },
  ];

  const receivedAmountPaymentReportHeadersDataForSuperAdmin = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-2 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Payment Type',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-capitalize fs-2 fw-medium">
          {item?.payment_reason
            ? item?.payment_reason?.split('_').join(' ')
            : item?.agent
              ? 'Package Payment'
              : '-'}
        </div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
    // {
    //   title: 'Applied By',
    //   key: 'applied_by',
    //   render: (item) => (
    //     <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
    //       {item?.applied_by
    //         ? item?.applied_by?.first_name + ' ' + item?.applied_by?.last_name
    //         : item?.agent
    //           ? item?.agent?.first_name + ' ' + item?.agent?.last_name
    //           : '-'}
    //       <small className="badge bg-secondary-subtle text-primary ms-3">
    //         {item?.applied_by?.role
    //           ? item?.applied_by?.role.split('_').join(' ')
    //           : item?.agent
    //             ? item?.agent?.role
    //             : ''}
    //       </small>
    //     </div>
    //   ),
    // },
    // {
    //   title: 'Paid For',
    //   key: 'paid_for',
    //   render: (item) => (
    //     <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
    //       {item?.application
    //         ? item?.student?.first_name + ' ' + item?.student?.last_name
    //         : item?.applied_by
    //           ? item?.applied_by?.first_name + ' ' + item?.applied_by?.last_name
    //           : '-'}
    //       <small className="badge bg-secondary-subtle text-primary ms-3">
    //         {item?.student?.role
    //           ? item?.student?.role.split('_').join(' ')
    //           : ''}
    //       </small>
    //     </div>
    //   ),
    // },

    // {
    //   title: 'Course',
    //   key: 'course',
    //   render: (item) => (
    //     <div className="fs-2 fw-medium">
    //       {item?.application?.course ? item?.application?.course?.name : '-'}
    //     </div>
    //   ),
    // },
    {
      title: 'Received Amount',
      key: 'received_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.payment_reason === 'application_emgs'
            ? item?.application?.emgs_fee_amount
            : item?.payment_reason === 'application_tuition_fee'
              ? item?.tuition_fee_paid_amount - item?.agent_commission
              : item?.agent !== undefined
                ? item?.paid_amount
                : '0'}{' '}
          {'MYR'}
        </div>
      ),
    },
    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}</div>
      ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
      render: (item) => (
        <div className="fs-2 fw-medium text-uppercase">
          {item?.payment_method ?? '-'}
        </div>
      ),
    },
  ];

  const universityPaymentPayoutReportHeadersDataForSuperAdmin = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-2 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Payment Type',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-capitalize fs-2 fw-medium">
          {item?.payment_reason
            ? item?.payment_reason?.split('_').join(' ')
            : item?.agent
              ? 'Package Payment'
              : '-'}
        </div>
      ),
    },
    {
      title: 'University Name',
      key: 'university_name',
      render: (item) => (
        <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
          {item?.application?.course?.university?.name
            ? item?.application?.course?.university?.name
            : '-'}
        </div>
      ),
    },
    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.course ? item?.application?.course?.name : '-'}
        </div>
      ),
    },
    {
      title: 'Payout Amount',
      key: 'payout_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.payment_reason
            ? item?.tuition_fee_paid_amount - item?.incentive_amount
            : '0'}{' '}
          {'MYR'}
        </div>
      ),
    },

    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}</div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
  ];

  const TotalagentPayoutReportHeadersDataForSuperAdmin = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-2 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Payment Type',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-capitalize fs-2 fw-medium">
          {item?.payment_reason
            ? item?.payment_reason?.split('_').join(' ')
            : item?.agent
              ? 'Package Payment'
              : '-'}
        </div>
      ),
    },
    {
      title: 'Agent Name',
      key: 'agent_name',
      render: (item) => (
        <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
          {item?.applied_by?.role === 'agent'
            ? item?.applied_by?.first_name + ' ' + item?.applied_by?.last_name
            : '-'}
        </div>
      ),
    },
    {
      title: 'Student Name',
      key: 'student_name',
      render: (item) => (
        <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
          {item?.student?.first_name
            ? item?.student?.first_name + ' ' + item?.student?.last_name
            : '-'}
        </div>
      ),
    },

    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.course ? item?.application?.course?.name : '-'}
        </div>
      ),
    },

    {
      title: 'Payout Amount',
      key: 'payout_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commission ? item?.agent_commission : '0'} {'MYR'}
        </div>
      ),
    },
    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}</div>
      ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
      render: (item) => (
        <div className="fs-2 fw-medium text-uppercase">{'Auto Deduct'}</div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
  ];
  const TotalAgentPendingPayoutReportHeadersDataForSuperAdmin = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-2 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Payment Type',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-capitalize fs-2 fw-medium">
          {item?.payment_reason
            ? item?.payment_reason?.split('_').join(' ')
            : item?.agent
              ? 'Package Payment'
              : '-'}
        </div>
      ),
    },
    {
      title: 'Agent Name',
      key: 'agent_name',
      render: (item) => (
        <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
          {item?.student
            ? item?.student?.agent?.first_name +
              ' ' +
              item?.student?.agent?.last_name
            : '-'}
        </div>
      ),
    },
    {
      title: 'Student Name',
      key: 'student_name',
      render: (item) => (
        <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
          {item?.student?.first_name
            ? item?.student?.first_name + ' ' + item?.student?.last_name
            : '-'}
        </div>
      ),
    },

    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.course ? item?.application?.course?.name : '-'}
        </div>
      ),
    },

    {
      title: 'Commission',
      key: 'commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commission ? item?.agent_commission : '0'} {'MYR'}
        </div>
      ),
    },
    {
      title: 'Hot Commission',
      key: 'hot_commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commision_by_hot_offer
            ? item?.agent_commision_by_hot_offer
            : '0'}{' '}
          {'MYR'}
        </div>
      ),
    },
    {
      title: 'Total Commission',
      key: 'payout_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_payout_amount ? item?.agent_payout_amount : '0'} {'MYR'}
        </div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
    {
      title: 'Payment Status',
      key: 'payment_status',
      render: (item) => (
        <div className="badge bg-warning-subtle text-warning">{'Pending'}</div>
      ),
    },
  ];

  const TotalProfitForSuperAdminHeadersData = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-2 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Payment Type',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-capitalize fs-2 fw-medium">
          {item?.payment_reason
            ? item?.payment_reason?.split('_').join(' ')
            : item?.agent
              ? 'Package Payment'
              : '-'}
        </div>
      ),
    },

    {
      title: 'University',
      key: 'university',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.course?.university?.name
            ? item?.application?.course?.university?.name
            : '-'}
        </div>
      ),
    },
    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.course ? item?.application?.course?.name : '-'}
        </div>
      ),
    },

    {
      title: 'Incentive Amount',
      key: 'incentive_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.incentive_amount ? item?.incentive_amount + ' ' + 'MYR' : '-'}
        </div>
      ),
    },

    {
      title: 'Agent Commission',
      key: 'agent_commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commission ? item?.agent_commission + ' ' + 'MYR' : '-'}
        </div>
      ),
    },
    {
      title: 'Agent Hot Commission',
      key: 'agent_hot_commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commision_by_hot_offer
            ? item?.agent_commision_by_hot_offer + ' ' + 'MYR'
            : '-'}
        </div>
      ),
    },

    {
      title: 'Package',
      key: 'package',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.payment_reason != 'application_tuition_fee'
            ? item?.agent_package?.package_name
            : '-'}
        </div>
      ),
    },

    {
      title: 'Package Amount',
      key: 'package_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {!item?.payment_reason
            ? item?.agent_package?.package_price + ' ' + 'MYR'
            : '-'}
        </div>
      ),
    },

    {
      title: 'Profit Amount',
      key: 'profit_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.super_admin_profit ? item?.super_admin_profit : '0'} {'MYR'}
        </div>
      ),
    },
    {
      title: 'Payment Date',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}</div>
      ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
      render: (item) => (
        <div className="fs-2 fw-medium text-uppercase">
          {item?.payment_method ?? '-'}
        </div>
      ),
    },
  ];

  const docRequestTableHeaderDataWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },

    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=2`}
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },
    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Descriptions',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    // {
    //   title: 'Requester Role',
    //   key: 'role',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.requested_by?.role ? item?.requested_by?.role : '-'}
    //     </span>
    //   ),
    // },

    // {
    //   title: 'Requester Email',
    //   key: 'email',
    //   render: (item) => (
    //     <div>
    //       <h5 className="fs-14 fw-medium ">
    //         {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
    //       </h5>
    //     </div>
    //   ),
    // },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const applicationHeadersWithoutAction = [
    {
      title: 'Name',
      key: 'student',
      render: (item) => (
        <div className="text-capitalize">
          {item?.student?.first_name || item?.student?.last_name
            ? `${item?.student?.first_name} ${item?.student?.last_name}`
            : '-'}
        </div>
      ),
    },
    {
      title: 'Course',
      key: 'course_name',
      render: (item) => (
        <div className="text-capitalize">
          {item?.application?.course?.name ?? '-'}
        </div>
      ),
    },

    {
      title: 'Application ID',
      key: 'application',
      render: (item) => (
        <div className="text-uppercase">{item?.application?._id ?? '-'}</div>
      ),
    },
    {
      title: 'Emgs Payment',
      key: 'emgs_payment_status',
      render: (item) => (
        <p
          className={` badge fw-semibold text-center me-4 ${item?.application?.emgs_payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.application?.emgs_payment_status ?? ''}
          </span>
        </p>
      ),
    },
    {
      title: 'Tuition Payment',
      key: 'tuition_fee_payment_status',
      render: (item) => (
        <p
          className={` badge fw-semibold text-center me-4 ${item?.application?.tuition_fee_payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.application?.tuition_fee_payment_status ?? ''}
          </span>
        </p>
      ),
    },
    {
      title: 'Airport Pickup',
      key: 'airport_pickup',
      render: (item) =>
        item?.application?.airport_pickup_invoice_status === 'active' ? (
          <p
            className={` badge fw-semibold text-center me-4 ${item?.application?.airport_pickup_charge_payment_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
          >
            <span className="text-uppercase">
              {item?.application?.airport_pickup_charge_payment_status ?? ''}
            </span>
          </p>
        ) : (
          <span className="text-capitalize text-primary fw-medium">
            {'Not Activated Yet'}
          </span>
        ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
      render: (item) => (
        <div className="text-uppercase">{item?.payment_method ?? '-'}</div>
      ),
    },
  ];

  const applicationPaymentHeadersWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-2 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Payment Type',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-capitalize fs-2 fw-medium">
          {item?.payment_reason
            ? item?.payment_reason?.split('_').join(' ')
            : '-'}
        </div>
      ),
    },
    {
      title: 'Student Name',
      key: 'student',
      render: (item) => (
        <div className="text-capitalize">
          {item?.student?.first_name + ' ' + item?.student?.last_name ?? '-'}
        </div>
      ),
    },
    {
      title: 'Course',
      key: 'course',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.course ? item?.application?.course?.name : '-'}
        </div>
      ),
    },
    {
      title: 'Applied By',
      key: 'applied_by',
      render: (item) => (
        <div className="text-capitalize">
          {item?.applied_by?.first_name + ' ' + item?.applied_by?.last_name ??
            '-'}
        </div>
      ),
    },
    {
      title: 'Course Fee',
      key: 'course_fee',
      render: (item) => (
        <div>
          {item?.application?.course?.tuition_fee
            ? item?.application?.course?.tuition_fee + ' ' + 'MYR'
            : '-'}
        </div>
      ),
    },
    {
      title: 'Emgs Fee Paid Amount',
      key: 'emgs_paid_amount',
      render: (item) => (
        <div>
          {item?.payment_reason === 'application_emgs'
            ? item?.application?.emgs_fee_amount + ' ' + 'MYR'
            : '-'}
        </div>
      ),
    },

    {
      title: 'Tuition Fee Paid Amount',
      key: 'tuition_paid_amount',
      render: (item) => (
        <div>
          {item?.tuition_fee_paid_amount
            ? item?.tuition_fee_paid_amount + ' ' + 'MYR'
            : '-'}
        </div>
      ),
    },
    {
      title: 'Course Incentive Amount',
      key: 'course_incentive_amount',
      render: (item) => (
        <div>
          {item?.incentive_amount ? item?.incentive_amount + ' ' + 'MYR' : '-'}
        </div>
      ),
    },
    {
      title: 'Agent Commission',
      key: 'agent_commission',
      render: (item) => (
        <div>
          {item?.payment_reason === 'application_tuition_fee'
            ? item?.agent_commission + ' ' + 'MYR'
            : '-'}
        </div>
      ),
    },

    {
      title: 'Super Admin Profit',
      key: 'super_admin_profit',
      render: (item) => (
        <div>
          {item?.payment_reason === 'application_tuition_fee'
            ? item?.incentive_amount - item?.agent_commission + ' ' + 'MYR'
            : item?.incentive_amount
              ? item?.incentive_amount
              : '-'}
        </div>
      ),
    },
    // {
    //   title: 'Payment Status',
    //   key: 'status',
    //   render: (item) => (
    //     <div className="badge bg-success-subtle text-success text-capitalize">
    //       {item?.status ?? '-'}
    //     </div>
    //   ),
    // },
    {
      title: 'Payment Method',
      key: 'payment_method',
    },
  ];

  const AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        console.log(userInfoData?.data?.role),
        (
          <span className="d-flex flex-column text-capitalize">
            {item?.user?.first_name && item?.user?.last_name ? (
              <Link
                href={
                  userInfoData?.data?.role === 'agent'
                    ? `/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=6`
                    : userInfoData?.data?.role === 'super_admin'
                      ? `/dashboard/super-admin/students/${item?.user?._id}?tab=6`
                      : userInfoData?.data?.role === 'admission_manager'
                        ? `/dashboard/admission-manager/students/${item?.user?._id}?tab=6`
                        : ''
                }
                className="text-primary text-decoration-none"
              >
                {`${item?.user?.first_name} ${item?.user?.last_name}`}
              </Link>
            ) : (
              '-'
            )}
          </span>
        )
      ),
    },

    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },
    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {`${item?.notes ? item?.notes : '-'}`}
        </div>
      ),
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Submitted By',
      key: 'submitted_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.submitted_by?.first_name && item?.submitted_by?.last_name
            ? `${
                item?.submitted_by?.first_name
                  ? item?.submitted_by?.first_name
                  : ''
              } ${
                item?.submitted_by?.last_name
                  ? item?.submitted_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Requester Role',
      key: 'role',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.role ? item?.requested_by?.role : '-'}
        </span>
      ),
    },

    {
      title: 'Requester Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium">
            {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
          </h5>
        </div>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const AIRTICKET_SUBMITTED_HEADER_FOR_SUPERADMIN = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },

    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={
                userInfoData?.data?.role === 'agent'
                  ? `/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=6`
                  : userInfoData?.data?.role === 'super_admin'
                    ? `/dashboard/super-admin/students/${item?.user?._id}?tab=6`
                    : userInfoData?.data?.role === 'admission_manager'
                      ? `/dashboard/admission-manager/students/${item?.user?._id}?tab=6`
                      : ''
              }
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },
    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Descriptions',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Requester Role',
      key: 'role',
      render: (item) => {
        const role = item?.requested_by?.role || '-';
        // Format role by replacing hyphens or underscores
        const formattedRole = role
          .split(/[-_]/) // Split by both hyphen and underscore
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(' ');

        return (
          <span className="d-flex flex-column text-capitalize">
            {formattedRole}
          </span>
        );
      },
    },

    {
      title: 'Requester Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium ">
            {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const AIRTICKET_REQUEST_HEADER_FOR_AGENT = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=6`}
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },

    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Descriptions',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {`${item?.notes ? item?.notes : '-'}`}
        </div>
      ),
    },
    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },

    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Submitted By',
      key: 'submitted_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.submitted_by?.first_name && item?.submitted_by?.last_name
            ? `${
                item?.submitted_by?.first_name
                  ? item?.submitted_by?.first_name
                  : ''
              } ${
                item?.submitted_by?.last_name
                  ? item?.submitted_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const AIRTICKET_SUBMITTED_HEADER_FOR_AGENT = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },

    {
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=6`}
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },
    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Descriptions',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Submitted By',
      key: 'submitted_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.submitted_by?.first_name && item?.submitted_by?.last_name
            ? `${
                item?.submitted_by?.first_name
                  ? item?.submitted_by?.first_name
                  : ''
              } ${
                item?.submitted_by?.last_name
                  ? item?.submitted_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const AIR_TICKET_REQUEST_TABLE_HEADERS_FOR_STUDENT = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },

    {
      title: 'Doc Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Descriptions',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Submitted By',
      key: 'submitted_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.submitted_by?.first_name && item?.submitted_by?.last_name
            ? `${
                item?.submitted_by?.first_name
                  ? item?.submitted_by?.first_name
                  : ''
              } ${
                item?.submitted_by?.last_name
                  ? item?.submitted_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Requester Role',
      key: 'role',
      render: (item) => {
        const role = item?.requested_by?.role || '-';
        // Format role by replacing hyphens or underscores
        const formattedRole = role
          .split(/[-_]/) // Split by both hyphen and underscore
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(' ');

        return (
          <span className="d-flex flex-column text-capitalize">
            {formattedRole}
          </span>
        );
      },
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  const AIR_TICKET_SUBMITTED_TABLE_HEADERS_FOR_STUDENT = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },

    {
      title: 'Descriptions',
      key: 'description',
      render: (item) => (
        <DescriptionRenderer
          maxWords={5}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {item?.notes ? (
            <span style={{ color: '#007BFF' }}>{item?.notes}</span>
          ) : (
            'No notes yet'
          )}
        </div>
      ),
    },

    {
      title: 'Requested By',
      key: 'agent',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Submitted By',
      key: 'submitted_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.submitted_by?.first_name && item?.submitted_by?.last_name
            ? `${
                item?.submitted_by?.first_name
                  ? item?.submitted_by?.first_name
                  : ''
              } ${
                item?.submitted_by?.last_name
                  ? item?.submitted_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },

    {
      title: 'Uploaded Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  return {
    TotalAgentPendingPayoutReportHeadersDataForSuperAdmin,
    TotalagentPayoutReportHeadersDataForSuperAdmin,
    accountantWidgetsData,
    admissionManagerWidgetsData,
    agentEarnigsHeaders,
    agentNameAndImageHeaderDataForSuperAdmin,
    receivedAmountPaymentReportHeadersDataForSuperAdmin,
    agentProfileWidgetData,
    agentsHeaders,
    allCourseCategoryWithoutAction,
    allCoursesWithoutAction,
    allDepartmentsWithoutAction,
    allowedFileTypes,
    brandlogo,
    categoryHeaders,
    couponHeaders,
    courseHeaders,
    departmentHeaders,
    documentHeaders,
    edulogo,
    EmgsStatusListHeaders,
    footerLogo,
    footerShape,
    hot_offer_image,
    packagePaymentInvoieHeadersWithoutAction,
    packagePaymentReportHeadersWithoutAction,
    profileBg,
    studentApplicationsHeaders,
    studentImageAndNameHeaderDataForStudentDashboard,
    studentImageAndNameHeaderDataForSuperAdmin,
    studentsHeaders,
    studentsImageAndNameHeaderDataInAgentDashboard,
    studentSubmittedDocumentsHeaderWithoutAction,
    superAdminData,
    supperAdminWidgetsData,
    teamDummyImage,
    universityHeadersData,
    universityLogoAndNameHeaderDataForAgentDashboard,
    universityLogoAndNameHeaderDataForSuperAdminDashboard,
    userDummyImage,
    docRequestTableHeaderDataWithoutAction,
    applicationHeadersWithoutAction,
    applicationPaymentHeadersWithoutAction,
    studentRequestDocumentsHeaderWithoutAction,
    universityPaymentPayoutReportHeadersDataForSuperAdmin,
    TotalProfitForSuperAdminHeadersData,
    studentAirTiecketHeadersWithoutAction,
    AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN,
    AIRTICKET_SUBMITTED_HEADER_FOR_SUPERADMIN,
    AIRTICKET_SUBMITTED_HEADER_FOR_AGENT,
    AIRTICKET_REQUEST_HEADER_FOR_AGENT,
    AIR_TICKET_REQUEST_TABLE_HEADERS_FOR_STUDENT,
    AIR_TICKET_SUBMITTED_TABLE_HEADERS_FOR_STUDENT,
  };
};

export default DataObjectComponent;
