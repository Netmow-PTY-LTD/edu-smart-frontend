import FileViewer from '@/components/common/FileViewer';
import ProgressBar from '@/components/common/ProgressBar';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import DescriptionRenderer from '@/utils/DescriptionRenderer';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { DropdownItem, DropdownMenu, DropdownToggle, Progress, UncontrolledDropdown } from 'reactstrap';
import DOMPurify from 'dompurify';

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


  const universityLogoAndNameHeaderDataForAgentDashboard = {
    title: 'Logo - Name',
    key: 'logo',
    render: (item) => (
      <div className="d-flex align-items-center me-5">
        <div className="flex-shrink-0 me-1">
          <Link
            href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/university-management/single-university-profile-for-agent/${item?._id}`}
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
              href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/university-management/single-university-profile-for-agent/${item?._id}`}
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
  render: (item) => {
    const parts = [
      item?.address_line_1,
      item?.address_line_2,
      item?.city,
      item?.state,
      item?.zip,
      item?.country,
    ];

    // Filter out falsy or empty values and join with commas
    const formattedAddress = parts.filter(Boolean).join(', ');

    return (
      <span className="d-flex flex-column text-capitalize">
        {formattedAddress || '-'}
      </span>
    );
  },
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
      title: 'Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },

    {
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole?.slice(0.4)}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>- </span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Acc. By',
      key: 'accepted_by',

      render: (item) => {
        const firstName = item?.accepted_by?.first_name;
        const lastName = item?.accepted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.accepted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.accepted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> - </span>;
        }
      },
    },

    {
      title: 'Acc. Date',
      key: 'accepted_date',
      render: (item) => {
        const date = item?.accepted_date ? moment(item.accepted_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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

    const studentSubmittedDocumentsHeaderWithoutActionWithSn = (currentPage, perPageData) => [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{currentPage * perPageData + index + 1}</h5>
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
      title: 'Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },

    {
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole?.slice(0.4)}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>- </span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Acc. By',
      key: 'accepted_by',

      render: (item) => {
        const firstName = item?.accepted_by?.first_name;
        const lastName = item?.accepted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.accepted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.accepted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> - </span>;
        }
      },
    },

    {
      title: 'Acc. Date',
      key: 'accepted_date',
      render: (item) => {
        const date = item?.accepted_date ? moment(item.accepted_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
      title: 'Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },
    {
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> -</span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
            href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/student-management/single-student-for-agent/${item?._id}`}
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
              href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/student-management/single-student-for-agent/${item?._id}`}
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
    title: 'Owner Namer',
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
      title: 'Partner',
      key: 'agent',
      render: (item) => (
        <h5 className="fs-14 fw-medium text-capitalize text-wrap">
          <Link
            href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/agents/${item?.agent?._id}`}
            className="text-reset"
          >
            {`${item?.agent?.first_name ? item?.agent?.first_name : ''} ${item?.agent?.last_name ? item?.agent?.last_name : ''}`}
          </Link>
        </h5>
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
      title: 'App ID',
      key: 'university',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.application?.appId
            ? item?.application?.appId
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
  title: 'Student',
  key: 'student',
  render: (item) => {
    const role = userInfoData?.data?.role;
    const studentId = item?.student?._id;

    // Build URL based on role
    let href = '#'; // fallback

    if (role === 'agent') {
      href = `/dashboard/agent/student-management/single-student-for-agent/${studentId}`;
    } else if (role === 'student') {
      href = `/dashboard/student/student-profile`;
    } else {
      href = `/dashboard/${role.split('_').join('-')}/students/${studentId}`;
    }

    return (
      <Link
        href={href}
        className="text-primary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="View Profile"
        rel="noopener noreferrer"
      >
        <span className="d-flex flex-column text-capitalize">
          {item?.student?.first_name || '-'} {item?.student?.last_name || '-'}
        </span>
      </Link>
    );
  },
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
      title: 'App ID',
      key: 'application_id',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.appId ? item?.appId : item?._id ? item?._id : '-'}
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
      title: 'Date',
      key: 'Date',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
      {item?.createdAt ? moment(item.createdAt).format("MM-DD-YYYY") : "-"}
      </span>
      ),
    },
        {
  title: 'Emgs',
  key: 'emgs_payment_status',
  render: (item) => {
    const currentIndex = statusOrder.indexOf(item?.status);
    const emgsStartIndex = statusOrder.indexOf('ready_for_emgs');
    const showEmgsSection = currentIndex >= emgsStartIndex;

   if (!showEmgsSection) {
      return <span className="text-muted">-</span>;
    }

    return (
      <>
        <span
          className={`fw-medium fs-3 text-capitalize badge ${
            item?.emgs_payment_status === 'paid'
              ? 'bg-success-subtle text-success'
              : item?.emgs_payment_status === 'pending'
              ? 'bg-warning-subtle text-warning'
              : ''
          }`}
        >
          {item?.emgs_payment_status ?? '-'}
        </span>
        <Link
          target="_blank"
          href={`/dashboard/${userInfoData?.data?.role.split('_').join('-')}/application-invoices?app_id=${item?._id}&emgs=yes`}
          className="ms-2 fw-medium fs-3 text-capitalize badge bg-primary-subtle text-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="View Invoice"
        >
          <i className="ri-receipt-fill"></i>
        </Link>
      </>
    );
  },
},

{
  title: 'Tuition',
  key: 'tuition_fee_payment_status',
  render: (item) => {
    const currentIndex = statusOrder.indexOf(item?.status);
    const tuitionStartIndex = statusOrder.indexOf('ready_for_tuition');
    const showTuitionSection = currentIndex >= tuitionStartIndex;



       if (!showTuitionSection) {
      return <span className="text-muted">-</span>;
    }

    return (
      <>
        <span
          className={`fw-medium fs-3 text-capitalize badge ${
            item?.tuition_fee_payment_status === 'paid'
              ? 'bg-success-subtle text-success'
              : item?.tuition_fee_payment_status === 'pending'
              ? 'bg-warning-subtle text-warning'
              : ''
          }`}
        >
          {item?.tuition_fee_payment_status ?? '-'}
        </span>

        {item?.emgs_payment_status === 'paid' && (
          <Link
            target="_blank"
            href={`/dashboard/${userInfoData?.data?.role
              .split('_')
              .join('-')}/application-invoices?app_id=${item?._id}&tuition=yes`}
            className="ms-2 fw-medium fs-3 text-capitalize badge bg-primary-subtle text-primary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="View Invoice"
          >
            <i className="ri-receipt-fill"></i>
          </Link>
        )}
      </>
    );
  },
},
{
  title: 'Pickup',
  key: 'pickup_status',
  render: (item) => {
    const currentIndex = statusOrder.indexOf(item?.status);
    const pickupStartIndex = statusOrder.indexOf('accepted');
    const showPickupSection = currentIndex >= pickupStartIndex;

    if (!showPickupSection) {
      return (
        <span className="text-capitalize text-primary fw-medium">
          {'Not Activated Yet'}
        </span>
      );
    }

    const { airport_pickup_charge, airport_pickup_invoice_status, airport_pickup_charge_payment_status } = item;

    if (airport_pickup_charge > 0 && airport_pickup_invoice_status === 'active') {
      return (
        <>
          <span
            className={`fw-medium fs-3 text-capitalize badge ${
              airport_pickup_charge_payment_status === 'paid'
                ? 'bg-success-subtle text-success'
                : airport_pickup_charge_payment_status === 'pending'
                ? 'bg-warning-subtle text-warning'
                : ''
            }`}
          >
            {airport_pickup_charge_payment_status ?? '-'}
          </span>

          <Link
            target="_blank"
            href={`/dashboard/${userInfoData?.data?.role
              .split('_')
              .join('-')}/application-invoices?app_id=${item?._id}&pickup=yes`}
            className="ms-2 fw-medium fs-3 text-capitalize badge bg-primary-subtle text-primary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="View Invoice"
          >
            <i className="ri-receipt-fill"></i>
          </Link>
        </>
      );
    }

    return (
      <span className="text-capitalize text-primary fw-medium">
        {'Not Activated Yet'}
      </span>
    );
  },
},

{
  title: 'Status',
  key: 'status',
  render: (item) => {
    const statusColors = {
      pending: 'bg-warning-subtle text-warning',
      review_in: 'bg-info-subtle text-info',
      file_requested: 'bg-primary-subtle text-primary',
      ready_for_emgs: 'bg-secondary-subtle text-secondary',
      file_under_emgs: 'bg-light-subtle text-dark',
      ready_for_tuition: 'bg-info-subtle text-info',
      tuition_under_processed: 'bg-primary-subtle text-primary',
      processing: 'bg-warning-subtle text-warning',
      processed: 'bg-success-subtle text-success',
      accepted: 'bg-success-subtle text-success',
      rejected: 'bg-danger-subtle text-danger',
    };

    const statusLabels = {
      pending: 'Submitted',
      review_in: 'Reviewing',
      file_requested: 'File Requested',
      ready_for_emgs: 'Ready for EMGS',
      file_under_emgs: 'File Under EMGS',
      ready_for_tuition: 'Ready for Tuition',
      tuition_under_processed: 'Tuition Being Processed',
      processing: 'Processing',
      processed: 'Processed',
      accepted: 'Accepted',
      rejected: 'Rejected',
    };

    const rawStatus = item?.status;
    const badgeClass = statusColors[rawStatus] || '';
    const displayLabel = statusLabels[rawStatus] || 'Unknown';

    return (
      <span className={`fw-medium fs-3 badge ${badgeClass}`}>
        {displayLabel}
      </span>
    );
  },
},
  ];


const studentApplicationsHeadersActions = [
  {
    title: 'Action',
    key: 'actions',
    render: (item) => {
      const currentIndex = statusOrder.indexOf(item?.status);
      const userRole = userInfoData?.data?.role;
      return (
        <UncontrolledDropdown direction="end">
          <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
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

          {userRole !== 'agent' && userRole !== 'student' && (
            <>
              {statusOptions.map((statusItem) => {
                const statusIndex = statusOrder.indexOf(statusItem.value);
                const isCurrentStatus = item?.status === statusItem.value;

                const isDisabled =
                  item?.status === 'rejected'
                    ? statusItem.value !== 'pending'
                    : statusIndex <= currentIndex;

                const getTextClass = () => {
                  if (isCurrentStatus) return 'text-success fw-bold';
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

              {/* Airport Pickup Charge */}
              <DropdownItem>
                <div
                  onClick={() => {
                    setPickupChargeModal(true);
                    setApplicationId(item?._id);
                    setEmgsId(item?.emgs_status);
                    setCheckAirportPickupStatus(item?.airport_pickup_charge_payment_status);
                  }}
                  className="text-primary"
                >
                  <i className="ri-flight-takeoff-line me-2"></i>
                  Airport Pick-up Charge
                </div>
              </DropdownItem>
            </>
          )}


          </DropdownMenu>
        </UncontrolledDropdown>
      );
    },
  },
];


  const agentsHeaders = [
    {
      title: 'Company Name',
      key: 'company',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.agent_package_new ? (
            <span>{item?.business?.name}</span>
          ) : (
            '-'
          )}
        </span>
      ),
    },
    {
      title: 'Package',
      key: 'package',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.agent_package_new ? (
            <span>{item?.agent_package_new?.package_name}</span>
          ) : (
            '-'
          )}
        </span>
      ),
    },
    {
      title: 'Date',
      key: 'createdAt',
      render: (item) => (
        <span className="fw-medium text-muted">
          {item?.createdAt ? moment(item.createdAt).format("DD-MM-YYYY HH:mm") : "-"}
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
{
  title: 'Status',
  key: 'status',
  render: (item) => (
    <span className="text-capitalize">
      {item?.status ? (
        <span
          className={`border rounded-4 px-4 py-2  fw-medium text-capitalize ${
            item.status === 'active'
              ? 'bg-third-color text-primary' // Style for active status
              : 'bg-fourth-color text-white'  // Style for inactive status
          }`}
        >
          {item.status}
        </span>
      ) : (
        '-'
      )}
    </span>
  ),
}
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
    email: 'info@edusmart.study',
    phone: '601136704887',
    address_line_1: 'Parklane OUG Block B1 Block B2, ',
    address_line_2: 'Jalan 1/152, Taman Perindustrian OUG, ',
    city: 'Kuala Lumpur',
    state: 'Wilayah Persekutuan Kuala Lumpur',
    zip: '58200',
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
          {`${DOMPurify.sanitize(item.description).replace(/<[^>]+>/g, '').slice(0, 100)}...`}
          </p>
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
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-receive-amount`,
    },
    {
      id: 5,
      label: 'Total University Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-currency-line',
      link: 'View All Payouts',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-university-payout`,
    },
    {
      id: 6,
      label: 'Total Partner Paid Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-money-pound-box-line',
      link: 'View All Payouts',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-agent-paid-payout`,
    },
    {
      id: 7,
      label: 'Total Partner Pending Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-money-pound-box-line',
      link: 'View All Payouts',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-agent-pending-payout`,
    },

    {
      id: 8,
      label: 'Total Profit',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-2-line',
      link: 'View Profit Details',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/super-admin-profit`,
    },
  ];

  const accountantWidgetsData = [
    {
      id: 4,
      label: 'Total Receive Amount',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-3-fill',
      link: 'All Charges',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-receive-amount`,
    },
    {
      id: 5,
      label: 'Total University Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-currency-line',
      link: 'All Charges',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-university-payout`,
    },
    {
      id: 6,
      label: 'Total Partner Paid Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-money-pound-box-line',
      link: 'All Charges',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-agent-paid-payout`,
    },
    {
      id: 7,
      label: 'Total Partner Pending Payout',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-money-pound-box-line',
      link: 'All Charges',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/total-agent-pending-payout`,
    },

    {
      id: 8,
      label: 'Total Profit',
      counter: '55',
      bgcolor: 'warning',
      icon: 'ri-wallet-2-line',
      link: 'All Charges',
      decimals: '2',
      pathName: `/dashboard/${userInfoData?.data?.role.split('_').join('-')}/super-admin-earnings/super-admin-profit`,
    },
  ];

  const admissionManagerWidgetsData = [
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
      render: (item) => <div className="text-uppercase">{item?._id}</div>,
    },
    {
      title: 'Partner Name',
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
      render: (item) => (
        <div>
          {item?.agent_package?.package?.name ?? '-'}
          <small className="ms-2 badge bg-secondary-subtle text-secondary text-uppercase">
            {item?.subscription_type ? `${item?.subscription_type}` : '-'}
          </small>
        </div>
      ),
    },

    {
      title: 'Package Amount',
      key: 'package_amount',
      render: (item) => (
        <div>
          {item?.total_package_amount
            ? item?.total_package_amount?.toFixed(2)
            : '0.00'}{' '}
          {'MYR'}
        </div>
      ),
    },

    {
      title: 'Discount',
      key: 'discount',
      render: (item) => (
        <div>
          {item?.discount ? item?.discount?.toFixed(2) : '0.00'} {'MYR'}
        </div>
      ),
    },

    {
      title: 'Paid',
      key: 'paid_amount',
      render: (item) => (
        <div>
          {item?.paid_amount ? item?.paid_amount?.toFixed(2) : '0.00'} {'MYR'}
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
      title: 'Partner Name',
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
      render: (item) => (
        <div>
          {item?.agent_package?.package?.name ?? '-'}
          <small className="ms-2 badge bg-secondary-subtle text-secondary text-uppercase">
            {item?.subscription_type ? `${item?.subscription_type}` : '-'}
          </small>
        </div>
      ),
    },
    {
      title: 'Paid',
      key: 'paid_amount',
      render: (item) => (
        <div>
          {item?.paid_amount ? item?.paid_amount?.toFixed(2) : '0.00'} {'MYR'}
        </div>
      ),
    },

    {
      title: 'Payment Method',
      key: 'payment_method',
      render: (item) => (
        <div className="text-capitalize">{item?.payment_method ?? '-'}</div>
      ),
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
          {item?.application?.appId ? item?.application?.appId : item?.application?._id
            ? item?.application?._id
            : item?.agent_package
              ? item?.agent_package?.package?.name
              : '-'}
        </div>
      ),
    },
    {
      title: 'Received Amount',
      key: 'received_amount',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.payment_reason === 'application_emgs'
            ? item?.application?.emgs_fee_amount
            : item?.payment_reason === 'application_tuition_fee'
              ? item?.tuition_fee_paid_amount
              : item?.payment_reason === 'application_airport_pickup_charge'
                ? item?.airport_pickup_charge
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
        <div>
          {item?.payment_date
            ? moment(item?.payment_date).format('DD-MM-YYYY')
            : '-'}
        </div>
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
            ? item?.application?.tuition_fee_amount -
              item?.application?.incentive_amount
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
          {item?.application?.appId ? item?.application?.appId : item?.application?._id ? item?.application?._id : '-'}
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
      title: 'Partner Name',
      key: 'agent_name',
      render: (item) => (
        <div className="d-flex align-items-start flex-column justify-content-start gap-2 text-capitalize fs-2 fw-medium">
          {item?.student?.agent?._id
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
      title: 'Auto Deduct',
      key: 'payment_method',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?.tuition_fee_auto_deduct ? 'True' : 'False'}
        </div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?.appId ? item?.application?.appId : item?.application?._id ? item?.application?._id : '-'}
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
      title: 'Partner Name',
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
      title: 'Auto Deduct',
      key: 'auto_deduct',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.tuition_fee_auto_deduct ? 'True' : 'False'}
        </div>
      ),
    },

    {
      title: 'Commission',
      key: 'commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commission
            ? `${item.agent_commission} MYR`
            : `${item?.agent_commission_paid} MYR ` && (
                <span className="badge bg-success-subtle text-success">
                  {item?.agent_commission_paid} PAID
                </span>
              )}
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
          {item?.agent_commision_by_hot_offer + item?.agent_commission} {' MYR'}
        </div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?.appId ? item?.application?.appId : item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
    {
      title: 'Payment Status',
      key: 'payment_status',
      render: (item) => (
        <div
          className={` badge fw-semibold text-center me-4 ${item?.agent_pending_payout_status === 'pending' ? 'bg-warning-subtle text-warning' : item?.agent_pending_payout_status === 'refund' ? 'bg-primary-subtle text-primary' : item?.agent_pending_payout_status === 'hand_cash' ? 'bg-secondary-subtle text-body' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.agent_pending_payout_status.split('_').join(' ') ?? ''}
          </span>
        </div>
      ),
    },
  ];
  const TotalAgentPendingPayoutReportHeadersDataForSuperAdminNew = [
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
      title: 'Partner Name',
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
      title: 'Auto Deduct',
      key: 'auto_deduct',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.tuition_fee_auto_deduct ? 'True' : 'False'}
        </div>
      ),
    },

    {
      title: 'Commission',
      key: 'commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commission + ' ' + 'MYR'}
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
          {item?.agent_commision_by_hot_offer + item?.agent_commission} {' MYR'}
        </div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?.appId ? item?.application?.appId : item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
    {
      title: 'Payment Status',
      key: 'payment_status',
      render: (item) => (
        <div
          className={` badge fw-semibold text-center me-4 ${item?.agent_pending_payout_status === 'pending' ? 'bg-warning-subtle text-warning' : item?.agent_pending_payout_status === 'refund' ? 'bg-primary-subtle text-primary' : item?.agent_pending_payout_status === 'hand_cash' ? 'bg-secondary-subtle text-body' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.agent_pending_payout_status.split('_').join(' ') ?? ''}
          </span>
        </div>
      ),
    },
  ];

  const TotalAgentPaidPayoutReportHeadersDataForAgent = [
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
      title: 'Auto Deduct',
      key: 'payment_method',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?.tuition_fee_auto_deduct ? 'True' : 'False'}
        </div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?.appId ? item?.application?.appId : item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
  ];
  const TotalAgentPendingPayoutReportHeadersDataForAgent = [
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
      title: 'Auto Deduct',
      key: 'auto_deduct',
      render: (item) => (
        <div className="fs-2 fw-medium">
          {item?.application?.course.auto_deduct ? 'True' : 'False'}
        </div>
      ),
    },

    {
      title: 'Commission',
      key: 'commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commission
            ? `${item.agent_commission} MYR`
            : `${item?.agent_commission_paid} MYR ` && (
                <span className="badge bg-success-subtle text-success">
                  {item?.agent_commission_paid} PAID
                </span>
              )}
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
          {item?.agent_commision_by_hot_offer + item?.agent_commission} {' MYR'}
        </div>
      ),
    },
    {
      title: 'Applicatioon ID',
      key: 'payment_reason',
      render: (item) => (
        <div className="text-uppercase fs-2 fw-medium">
          {item?.application?.appId ? item?.application?.appId : item?.application?._id ? item?.application?._id : '-'}
        </div>
      ),
    },
    {
      title: 'Payment Status',
      key: 'payment_status',
      render: (item) => (
        <div
          className={` badge fw-semibold text-center me-4 ${item?.agent_pending_payout_status === 'pending' ? 'bg-warning-subtle text-warning' : ' bg-success-subtle text-success'}   `}
        >
          <span className="text-uppercase">
            {item?.agent_pending_payout_status ?? ''}
          </span>
        </div>
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
      title: 'Partner Commission',
      key: 'agent_commission',
      render: (item) => (
        <div className="fs-2 fw-medium text-primary">
          {item?.agent_commission ? item?.agent_commission + ' ' + 'MYR' : '-'}
        </div>
      ),
    },
    {
      title: 'Partner Hot Commission',
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
          {item?.super_admin_profit
            ? item?.super_admin_profit
            : item?.paid_amount}{' '}
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
      title: 'Student',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=3`}
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
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole?.slice(0.4)}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>- </span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
  const docSubmittedTableHeaderDataWithoutAction = [
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
      title: 'Student',
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
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole?.slice(0.4)}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>- </span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Acc. By',
      key: 'accepted_by',

      render: (item) => {
        const firstName = item?.accepted_by?.first_name;
        const lastName = item?.accepted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.accepted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.accepted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> - </span>;
        }
      },
    },

    {
      title: 'Acc. Date',
      key: 'accepted_date',
      render: (item) => {
        const date = item?.accepted_date ? moment(item.accepted_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
  const docRequestTableHeaderDataWithoutActionForSuperAdmin = [
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
      title: 'Student',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/super-admin/students/${item?.user?._id}?tab=3`}
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
          maxWords={4}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.requested_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
  const docRequestSubmittedTableHeaderDataWithoutActionForSuperAdmin = [
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
      title: 'Student',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/super-admin/students/${item?.user?._id}?tab=3`}
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
          maxWords={4}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.requested_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',

      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
  const docSubmittedTableHeaderDataWithoutActionForSuperAdmin = [
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
      title: 'Student',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/super-admin/students/${item?.user?._id}?tab=2`}
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
          maxWords={3}
          description={item?.description || '-'}
        />
      ),
    },

    {
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',
      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole}
            </small>
          </div>
        );
      },
    },

    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Sub. By',
      key: 'submitted_by',
      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item?.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> - </span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',
      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Acc. By',
      key: 'accepted_by',

      render: (item) => {
        const firstName = item?.accepted_by?.first_name;
        const lastName = item?.accepted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.accepted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.accepted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> - </span>;
        }
      },
    },

    {
      title: 'Acc. Date',
      key: 'accepted_date',
      render: (item) => {
        const date = item?.accepted_date ? moment(item.accepted_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
      title: 'ID',
      key: '_id',
      render: (item) => (
        <div className="text-uppercase">{item?._id ?? '-'}</div>
      ),
    },
    {
      title: 'Application ID',
      key: 'application',
      render: (item) => (
        <div className="text-uppercase">{item?.application?.appId ? item?.application?.appId : item?.application?._id ?? '-'}</div>
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
  const applicationHeadersForStudent = [
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
        <div className="text-uppercase">{item?.application?.appId ? item?.application?.appId : item?.application?._id ?? '-'}</div>
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
      title: 'App ID',
      key: 'application_id',
      render: (item) => (
        <span className="d-flex flex-column text-uppercase fs-2 fw-medium">
          {item?.application?.appId ? item?.application?.appId : item?.application?._id ?? '-'}
        </span>
      ),
    },
    {
      title: 'Details',
      key: 'payment_reason',
      render: (item) => (
        <>
          <div className="text-capitalize fs-2 fw-medium">
            Type:{' '}
            {item?.payment_reason
              ? item?.payment_reason?.split('_').join(' ')
              : ''}
          </div>
          <div className="text-capitalize fs-2 fw-medium">
            Name:{' '}
            {item?.student?.first_name + ' ' + item?.student?.last_name ?? ''}
          </div>
          <div className="text-capitalize fs-2 fw-medium">
            Course:{' '}
            {item?.application?.course ? item?.application?.course?.name : ''}
          </div>
        </>
      ),
    },
    {
      title: 'Date',
      key: 'payment_date',
      render: (item) => (
        <div className="text-capitalize">
          {moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}
        </div>
      ),
    },
    {
      title: 'Applied By',
      key: 'applied_by',
      render: (item) => (
        <div className="text-capitalize">
          {item?.applied_by?.first_name + ' ' + item?.applied_by?.last_name ??
            ''}
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
            : ''}
        </div>
      ),
    },
    {
      title: 'Emgs Fee ',
      key: 'emgs_paid_amount',
      render: (item) => (
        <div>
          {item?.payment_reason === 'application_emgs'
            ? item?.application?.emgs_fee_amount + ' ' + 'MYR'
            : ''}
        </div>
      ),
    },

    {
      title: 'Tuition Fee ',
      key: 'tuition_paid_amount',
      render: (item) => (
        <div>
          {item?.tuition_fee_paid_amount
            ? item?.tuition_fee_paid_amount + ' ' + 'MYR'
            : ''}
        </div>
      ),
    },
    {
      title: 'Pickup Fee ',
      key: 'airport_pickup',
      render: (item) => (
        <div>
          {item?.payment_reason === 'application_airport_pickup_charge'
            ? item?.airport_pickup_charge + ' ' + 'MYR'
            : ''}
        </div>
      ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
    },
  ];
  const applicationPaymentHeadersAgent = [
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
      title: 'Airport Pickup Amount',
      key: 'airport_pickup_amount',
      render: (item) => (
        <div>
          {item?.payment_reason === 'application_airport_pickup_charge'
            ? item?.airport_pickup_charge + ' ' + 'MYR'
            : '-'}
        </div>
      ),
    },
    {
      title: 'Commission',
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
      title: 'Payment Data',
      key: 'payment_date',
      render: (item) => (
        <div>{moment(item?.payment_date).format('DD-MM-YYYY') ?? '-'}</div>
      ),
    },
    {
      title: 'Payment Method',
      key: 'payment_method',
    },
  ];
  const applicationPaymentHeadersStudent = [
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
          {item?.payment_reason === 'application_airport_pickup_charge'
            ? '-'
            : item?.application?.course?.tuition_fee
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
            ? item?.emgs_fee_paid_amount + ' ' + 'MYR'
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
            ? item?.application?.course?.tuition_fee -
              item?.application?.emgs_fee_amount +
              ' ' +
              'MYR'
            : '-'}
        </div>
      ),
    },
    {
      title: 'Airport Pickup Amount',
      key: 'airport_pickup_amount',
      render: (item) => (
        <div>
          {item?.payment_reason === 'application_airport_pickup_charge'
            ? item?.airport_pickup_charge + ' ' + 'MYR'
            : '-'}
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
      title: 'Student',
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
      title: 'Files',
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
      title: 'Req. By',
      key: 'agent',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
      title: 'Student',
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
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.requested_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',

      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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

  const AIRTICKET_ACCEPTED_HEADER_FOR_SUPERADMIN = [
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
      title: 'Student',
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
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> -</span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Acc. By',
      key: 'accepted_by',

      render: (item) => {
        const firstName = item?.accepted_by?.first_name;
        const lastName = item?.accepted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.accepted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.accepted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> - </span>;
        }
      },
    },

    {
      title: 'Acc. Date',
      key: 'accepted_date',
      render: (item) => {
        const date = item?.accepted_date ? moment(item.accepted_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
      title: 'Student',
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
          {`${item?.notes ? item?.notes : '-'}`}
        </div>
      ),
    },
    {
      title: 'Files',
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
      title: 'Req. By',
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
      title: 'Sub. By',
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
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
      title: 'Student',
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
      title: 'Files',
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
      title: 'Req. By',
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
      title: 'Sub. By',
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
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Acc. Date',
      key: 'accepted_date',
      render: (item) => {
        const date = item?.accepted_date ? moment(item.accepted_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
      title: 'Files',
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
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> -</span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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
      title: 'Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },

    {
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },
    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> -</span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Acc. By',
      key: 'accepted_by',

      render: (item) => {
        const firstName = item?.accepted_by?.first_name;
        const lastName = item?.accepted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.accepted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.accepted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span> - </span>;
        }
      },
    },

    {
      title: 'Acc. Date',
      key: 'accepted_date',
      render: (item) => {
        const date = item?.accepted_date ? moment(item.accepted_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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

  const AGENT_YEARLYBONOUS_HEADERS_FOR_SUPER_ADMIN = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },
    // {
    //   title: 'Package Name',
    //   key: 'package_name',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.name || 'N/A'}
    //     </span>
    //   ),
    // },
    {
      title: 'Partner Name',
      key: 'agent_name',
      render: (item) => {
        const firstName = item?.agent?.first_name || '';
        const lastName = item?.agent?.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim() || '-';

        return (
          <Link href={`/dashboard/super-admin/agents/${item?.agent?._id}`}>
            <span className="d-flex flex-column text-capitalize">
              {fullName}
            </span>
          </Link>
        );
      },
    },
    {
      title: 'Email',
      key: 'email',
      render: (item) => (
        <span className="d-flex flex-column">{item?.agent?.email || '-'}</span>
      ),
    },
    // {
    //   title: 'Amount ',
    //   key: 'amount',
    //   render: (item) => (
    //     <span className="d-flex flex-column">{item?.amount || '0'}</span>
    //   ),
    // },
    {
      title: 'Target Start Date',
      key: 'start_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.start_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },
    {
      title: 'Target End Date',
      key: 'end_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.end_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },

    {
      title: 'Target Status',
      key: 'target_status',
      render: (item) => (
        <ProgressBar
          target={item?.target ?? 0}
          targetAchieved={item?.target_achieved ?? 0}
        />
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.status === 'active'
              ? 'bg-success-subtle text-success'
              : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.status || '-'}
        </span>
      ),
    },
    {
      title: 'Payout Status',
      key: 'payout_status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.payout_status === 'paid'
              ? 'bg-third-color text-primary'
              : item?.payout_status === 'pending'
                ? 'bg-warning-subtle text-warning'
                : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.payout_status || '-'}
        </span>
      ),
    },
  ];

  const AGENT_FAMILYTRIP_HEADERS_FOR_SUPER_ADMIN = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    // {
    //   title: 'Package Name',
    //   key: 'package_name',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.name || '-'}
    //     </span>
    //   ),
    // },
    {
      title: 'Partner Name',
      key: 'agent_name',
      render: (item) => {
        const firstName = item?.agent?.first_name || '';
        const lastName = item?.agent?.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim() || '-';

        return (
          <Link href={`/dashboard/super-admin/agents/${item?.agent?._id}`}>
            <span className="d-flex flex-column text-capitalize">
              {fullName}
            </span>
          </Link>
        );
      },
    },
    {
      title: 'Email',
      key: 'email',
      render: (item) => (
        <span className="d-flex flex-column">{item?.agent?.email || '-'}</span>
      ),
    },
    // {
    //   title: 'Package Price ',
    //   key: 'package_price',
    //   render: (item) => (
    //     <span className="d-flex flex-column">
    //       {item?.package?.price || '-'}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Package Duration',
    //   key: 'package_duration',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.duration || '-'}
    //     </span>
    //   ),
    // },
    {
      title: 'Start Date',
      key: 'start_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.start_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },
    {
      title: 'End Date',
      key: 'end_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.end_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },

    {
      title: 'Target Status',
      key: 'target_status',
      render: (item) => (
        <ProgressBar
          target={item?.target ?? 0}
          targetAchieved={item?.target_achieved ?? 0}
        />
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.status === 'active'
              ? 'bg-success-subtle text-success'
              : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.status || '-'}
        </span>
      ),
    },
    {
      title: 'Payout Status',
      key: 'payout_status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.payout_status === 'paid'
              ? 'bg-third-color text-primary'
              : item?.payout_status === 'pending'
                ? 'bg-warning-subtle text-warning'
                : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.payout_status || '-'}
        </span>
      ),
    },
  ];

  const AGENT_FAMILYTRIP_HEADERS = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    // {
    //   title: 'Package Name',
    //   key: 'package_name',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.name || '-'}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Package Price ($)',
    //   key: 'package_price',
    //   render: (item) => (
    //     <span className="d-flex flex-column">
    //       ${item?.package?.price || '-'}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Package Duration',
    //   key: 'package_duration',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.duration || '-'}
    //     </span>
    //   ),
    // },
    {
      title: 'Target Start Date',
      key: 'start_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.start_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },
    {
      title: 'Target End Date',
      key: 'end_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.end_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },

    {
      title: 'Target Status',
      key: 'target_status',
      render: (item) => (
        <ProgressBar
          target={item?.target ?? 0}
          targetAchieved={item?.target_achieved ?? 0}
        />
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.status === 'active'
              ? 'bg-success-subtle text-success'
              : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.status || '-'}
        </span>
      ),
    },
    {
      title: 'Payout Status',
      key: 'payout_status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.payout_status === 'paid'
              ? 'bg-third-color text-primary'
              : item?.payout_status === 'pending'
                ? 'bg-warning-subtle text-warning'
                : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.payout_status || '-'}
        </span>
      ),
    },
  ];
  const AGENTYEARLYBONOUSHEADERS = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },
    // {
    //   title: 'Package Name',
    //   key: 'package_name',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.name || 'N/A'}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Amount ($)',
    //   key: 'amount',
    //   render: (item) => (
    //     <span className="d-flex flex-column">${item?.amount || '0'}</span>
    //   ),
    // },
    {
      title: 'Target Start Date',
      key: 'start_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.start_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },
    {
      title: 'Target End Date',
      key: 'end_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.end_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },
    {
      title: 'Target Status',
      key: 'target_status',
      render: (item) => (
        <ProgressBar
          target={item?.target ?? 0}
          targetAchieved={item?.target_achieved ?? 0}
        />
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.status === 'active'
              ? 'bg-success-subtle text-success'
              : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.status || '-'}
        </span>
      ),
    },
    {
      title: 'Payout Status',
      key: 'payout_status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.payout_status === 'paid'
              ? 'bg-third-color text-primary'
              : item?.payout_status === 'pending'
                ? 'bg-warning-subtle text-warning'
                : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.payout_status || '-'}
        </span>
      ),
    },
  ];

  const docRequestTableHeaderData = [
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
          {item?.notes ? (
            <span style={{ color: '#007BFF' }}>{item?.notes}</span>
          ) : (
            'No notes yet'
          )}
        </div>
      ),
    },
    {
      title: 'Req. By',
      key: 'requested_by',

      render: (item) => {
        const firstName = item?.requested_by?.first_name;
        const lastName = item?.requested_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.requested_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return (
          <div className="d-flex align-items-start ">
            <span className="text-capitalize">{fullName ? fullName : '-'}</span>
            <small className="ms-1 badge bg-secondary-subtle text-secondary">
              {formattedRole?.slice(0.4)}
            </small>
          </div>
        );
      },
    },
    {
      title: 'Req. Date',
      key: 'requested_date',
      render: (item) => {
        const date = item?.requested_date ? moment(item.requested_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
      },
    },

    {
      title: 'Sub. By',
      key: 'submitted_by',

      render: (item) => {
        const firstName = item?.submitted_by?.first_name;
        const lastName = item?.submitted_by?.last_name;
        const fullName = `${firstName} ${lastName}`;
        const role = item?.submitted_by?.role || '-';
        const formattedRole = role
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (item.submitted_by) {
          return (
            <div className="d-flex align-items-start ">
              <span className="text-capitalize">
                {fullName ? fullName : '-'}
              </span>
              <small className="ms-1 badge bg-secondary-subtle text-secondary">
                {formattedRole}
              </small>
            </div>
          );
        } else {
          return <span>- </span>;
        }
      },
    },
    {
      title: 'Sub. Date',
      key: 'submited_date',

      render: (item) => {
        const date = item?.submited_date ? moment(item.submited_date) : null;
        return <div>{date?.isValid() ? date.format('DD-MM-YYYY') : '-'}</div>;
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

  return {
    TotalAgentPendingPayoutReportHeadersDataForAgent,
    TotalAgentPaidPayoutReportHeadersDataForAgent,
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
    studentApplicationsHeadersActions,
    studentImageAndNameHeaderDataForStudentDashboard,
    studentImageAndNameHeaderDataForSuperAdmin,
    studentsHeaders,
    studentsImageAndNameHeaderDataInAgentDashboard,
    studentSubmittedDocumentsHeaderWithoutAction,
    studentSubmittedDocumentsHeaderWithoutActionWithSn,
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
    docRequestTableHeaderDataWithoutActionForSuperAdmin,
    docSubmittedTableHeaderDataWithoutActionForSuperAdmin,
    docSubmittedTableHeaderDataWithoutAction,
    AGENT_YEARLYBONOUS_HEADERS_FOR_SUPER_ADMIN,
    AGENT_FAMILYTRIP_HEADERS_FOR_SUPER_ADMIN,
    AGENT_FAMILYTRIP_HEADERS,
    AGENTYEARLYBONOUSHEADERS,
    applicationPaymentHeadersAgent,
    applicationPaymentHeadersStudent,
    applicationHeadersForStudent,
    TotalAgentPendingPayoutReportHeadersDataForSuperAdminNew,
    docRequestSubmittedTableHeaderDataWithoutActionForSuperAdmin,
    AIRTICKET_ACCEPTED_HEADER_FOR_SUPERADMIN,
  };
};

export default DataObjectComponent;
