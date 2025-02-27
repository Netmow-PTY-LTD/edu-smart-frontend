import FileViewer from '@/components/common/FileViewer';
import Link from 'next/link';

export const AIRTICKET_REQUEST_HEADER_FOR_SUPERADMIN = [
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
          <h5 className="fs-14 fw-medium text-capitalize">{newTitle || '-'}</h5>
        </div>
      );
    },
  },
  {
    title: 'Description',
    key: 'description',
    render: (item) => (
      <span className="d-flex flex-column text-capitalize">
        {item?.description ? item?.description : '-'}
      </span>
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
              item?.requested_by?.last_name ? item?.requested_by?.last_name : ''
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

export const AIRTICKET_SUBMITTED_HEADER_FOR_SUPERADMIN = [
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
          <h5 className="fs-14 fw-medium text-capitalize">{newTitle || '-'}</h5>
        </div>
      );
    },
  },
  {
    title: 'Descriptions',
    key: 'description',
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
              item?.requested_by?.last_name ? item?.requested_by?.last_name : ''
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
