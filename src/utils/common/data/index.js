import Image from 'next/image';
import Link from 'next/link';

const userDummyImage = '/assets/images/users/user-dummy-img.jpg';
const teamDummyImage = '/assets/images/users/multi-user.jpg';
const edulogo = '/favicon.png';
const brandlogo = '/edusmart-Final-Logo-Final-Logo.png';
const profileBg = '/profile_bg.jpg';

const universityHeadersWithoutAction = [
  {
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
  { title: 'Code', key: 'code' },
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

const supperAdminWidgetsData = [
  {
    id: 1,
    label: 'Registered UNIVERSITIES',
    counter: '4',
    bgcolor: 'info',
    icon: 'ri-school-fill',
    link: 'View all',
    pathName: '/super-admin/university-management/all-university',
  },

  {
    id: 2,
    label: 'registered agents',
    counter: '25',
    bgcolor: 'info',
    icon: 'ri-group-2-fill',
    link: 'View all',
    pathName: '/super-admin/agents',
  },
  {
    id: 3,
    label: 'registered students',
    counter: '55',
    bgcolor: 'warning',
    icon: 'ri-group-fill',
    link: 'View  all',
    pathName: '/super-admin',
  },
  {
    id: 4,
    label: 'total income',
    counter: '55',
    bgcolor: 'warning',
    icon: 'ri-wallet-3-fill',
    link: 'All Charges',
    pathName: '/super-admin',
  },
];

export {
  agentsHeadersWithoutAction,
  brandlogo,
  edulogo,
  profileBg,
  studentsHeadersWithoutAction,
  supperAdminWidgetsData,
  teamDummyImage,
  universityHeadersWithoutAction,
  userDummyImage,
};
