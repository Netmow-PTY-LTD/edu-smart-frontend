import FileViewer from '@/components/common/FileViewer';
import DescriptionRenderer from '@/utils/DescriptionRenderer';
import Link from 'next/link';

export const REQUEST_TABLE_HEADERS = [
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
    render: (item) => (
      <DescriptionRenderer
        maxLength={40}
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
              item?.requested_by?.last_name ? item?.requested_by?.last_name : ''
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
              item?.submitted_by?.last_name ? item?.submitted_by?.last_name : ''
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

export const SUBMITTED_TABLE_HEADERS = [
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
    render: (item) => (
      <DescriptionRenderer
        maxLength={40}
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
              item?.requested_by?.last_name ? item?.requested_by?.last_name : ''
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
              item?.submitted_by?.last_name ? item?.submitted_by?.last_name : ''
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
