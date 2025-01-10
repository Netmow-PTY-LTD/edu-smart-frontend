import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from 'reactstrap';

const userDummyImage = '/assets/images/users/user-dummy-img.jpg';
const teamDummyImage = '/assets/images/users/multi-user.jpg';
const edulogo = '/favicon.png';
const brandlogo = '/edusmart-Final-Logo-Final-Logo.png';
const profileBg = '/profile_bg.jpg';
const hot_offer_image = '/Hot Offer.png';

const agentNameAndLogoData = {
  title: 'Logo - Name',
  key: 'logo',
  render: (item) => (
    <div className="d-flex align-items-center me-5">
      <div className="flex-shrink-0 me-1">
        <Link
          href={`/dashboard/agent/university-management/single-university-profile-for-agent/${item?._id}`}
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
            href={`/dashboard/agent/university-management/single-university-profile-for-agent/${item?._id}`}
            className="text-reset"
          >
            {`${item.name} `}
          </Link>
        </h5>
      </div>
    </div>
  ),
};
const superAdminNameAndLogoData = {
  title: 'Logo - Name',
  key: 'logo',
  render: (item) => (
    <div className="d-flex align-items-center me-5">
      <div className="flex-shrink-0 me-1">
        <Link
          href={`/dashboard/super-admin/university-management/single-university-profile/${item?._id}`}
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
            href={`/dashboard/super-admin/university-management/single-university-profile/${item?._id}`}
            className="text-reset"
          >
            {`${item.name} `}
          </Link>
        </h5>
      </div>
    </div>
  ),
};

const studentAndLogoData = {
  title: 'Logo - Name',
  key: 'logo',
  render: (item) => (
    <div className="d-flex align-items-center me-5">
      <div className="flex-shrink-0 me-1">
        <Link
          href={`/dashboard/student/university-management/single-university-profile/${item?._id}`}
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
            href={`/dashboard/student/university-management/single-university-profile/${item?._id}`}
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
const universityHeadersWithoutAction = [
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

// all agent header
const agentsHeadersWithoutAction = [
  {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link href={``} className="text-reset">
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
            <Link href={``} className="text-reset">
              {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
            </Link>
          </h5>
        </div>
      </div>
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

//student submitted doc header
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
          <h5 className="fs-14 fw-medium text-capitalize">{newTitle || '-'}</h5>
        </div>
      );
    },
  },
  {
    title: 'Name',
    key: 'name',
    render: (item) => (
      <div>
        <h5 className="fs-14 fw-medium text-capitalize">
          {`${item?.user?.first_name ? item?.user?.first_name : ''} ${item?.user?.last_name ? item?.user?.last_name : ''}`}
        </h5>
      </div>
    ),
  },
  {
    title: 'Agent',
    key: 'agent',
    render: (item) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.requested_by?.first_name && item?.requested_by?.last_name
          ? `${item?.requested_by?.first_name ? item?.requested_by?.first_name : ''} ${item?.requested_by?.last_name ? item?.requested_by?.last_name : ''}`
          : '-'}
      </span>
    ),
  },

  {
    title: 'Agent Email',
    key: 'email',
    render: (item) => (
      <div>
        <h5 className="fs-14 fw-medium text-capitalize">
          {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
        </h5>
      </div>
    ),
  },
  {
    title: 'Description',
    key: 'description',
    render: (item) => (
      <div>
        <h5 className="fs-14 fw-medium text-capitalize">
          {`${item?.description ? item?.description : '-'}`}
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
                  : ''
        }`}
      >
        {item?.status ? <span>{item?.status}</span> : '-'}
      </span>
    ),
  },
];

// all student header
const studentsHeadersWithoutAction = [
  {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link href={``} className="text-reset">
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
            <Link href={``} className="text-reset">
              {item?.first_name && item?.last_name
                ? `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`
                : '-'}
            </Link>
          </h5>
        </div>
      </div>
    ),
  },

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

const studentsHeadersWithLogoLink = [
  {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/super-admin/students/${item?._id}`}
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
              href={`/dashboard/super-admin/students/${item?._id}`}
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
  },

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
          height: '10px',
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
            : 10
        }
      >
        <span className="fs-4">
          {item?.agent_package?.target?.target_achieved || 0}
          {'/'}
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
          className={`border rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.payment_status === 'paid' ? 'bg-third-color text-primary' : item?.payment_status === 'unpaid' ? 'bg-fourth-color text-white' : 'bg-info text-white'}`}
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
    title: 'Payment Status',
    key: 'payment_status',
    render: (item) => (
      <>
        <span
          className={`border rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.payment_status === 'paid' ? 'bg-third-color text-primary' : item?.payment_status === 'unpaid' ? 'bg-fourth-color text-white' : 'bg-info text-white'}`}
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
          className={`border rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.status === 'accepted' ? 'bg-third-color text-primary' : item?.status === 'rejected' ? 'bg-fourth-color text-white' : item?.status === 'pending' ? 'bg-info text-white' : 'bg-warning text-white'}`}
        >
          {item?.status ?? '-'}
        </span>
      </>
    ),
  },
];

const agentsHeaders = [
  {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/super-admin/agents/${item?._id}`}
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
              href={`/dashboard/super-admin/agents/${item?._id}`}
              className="text-reset"
            >
              {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
            </Link>
          </h5>
        </div>
      </div>
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

const studentAndLogoDataForAgentDashboard = {
  title: 'Logo - Name',
  key: 'logo',
  render: (item) => (
    <div className="d-flex align-items-center me-5">
      <div className="flex-shrink-0 me-1">
        <Link
          href={`/dashboard/agent/student-management/single-student-for-agent/${item?._id}`}
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
            href={`/dashboard/agent/student-management/single-student-for-agent/${item?._id}`}
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
const studentsHeadersWithLogoLinkInAgent = [
  {
    title: 'Name',
    key: 'profile_image',
    render: (item) => (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/agent/student-management/single-student-for-agent/${item?._id}`}
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
            <Link href={``} className="text-reset">
              {item?.first_name && item?.last_name
                ? `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`
                : '-'}
            </Link>
          </h5>
        </div>
      </div>
    ),
  },

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
    title: 'Price For Student',
    key: 'price_for_student',
    render: (item, index) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.price_for_student}
      </span>
    ),
  },
  {
    title: 'GST For Student',
    key: 'gst_for_student',
    render: (item, index) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.gst_for_student}
      </span>
    ),
  },
  {
    title: 'Price For Agent',
    key: 'price_for_agent',
    render: (item, index) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.price_for_agent}
      </span>
    ),
  },
  {
    title: 'GST For Agent',
    key: 'gst_for_agent',
    render: (item, index) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.gst_for_agent}
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

const supperAdminWidgetsData = [
  {
    id: 1,
    label: 'Registered UNIVERSITIES',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-school-fill',
    link: 'View all',
    pathName: '/dashboard/super-admin/university-management/all-university',
  },

  {
    id: 2,
    label: 'registered agents',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-group-2-fill',
    link: 'View all',
    pathName: '/dashboard/super-admin/agents',
  },
  {
    id: 3,
    label: 'registered students',
    counter: '55',
    bgcolor: 'warning',
    icon: 'ri-group-fill',
    link: 'View  all',
    pathName: '/dashboard/super-admin/students',
  },
  {
    id: 4,
    label: 'total income',
    counter: '55',
    bgcolor: 'warning',
    icon: 'ri-wallet-3-fill',
    link: 'All Charges',
    pathName: '/dashboard/super-admin',
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
    pathName: '/dashboard/super-admin/university-management/all-university',
  },

  {
    id: 2,
    label: 'registered agents',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-group-2-fill',
    link: 'View all',
    pathName: '/dashboard/super-admin/agents',
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
        {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
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
        {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
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
];

export {
  agentNameAndLogoData,
  agentProfileWidgetData,
  agentsHeaders,
  agentsHeadersWithoutAction,
  allCourseCategoryWithoutAction,
  allCoursesWithoutAction,
  allDepartmentsWithoutAction,
  allowedFileTypes,
  brandlogo,
  categoryHeaders,
  courseHeaders,
  departmentHeaders,
  edulogo,
  hot_offer_image,
  profileBg,
  studentAndLogoData,
  studentAndLogoDataForAgentDashboard,
  studentsHeadersWithLogoLink,
  studentsHeadersWithLogoLinkInAgent,
  studentsHeadersWithoutAction,
  studentSubmittedDocumentsHeaderWithoutAction,
  superAdminNameAndLogoData,
  supperAdminWidgetsData,
  teamDummyImage,
  universityHeadersWithoutAction,
  userDummyImage,
  agentEarnigsHeaders,
  studentApplicationsHeaders,
  EmgsStatusListHeaders,
};
