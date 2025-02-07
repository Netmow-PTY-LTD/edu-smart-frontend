import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';

import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useUpdateDocStatusForAgentMutation } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
const DocumentPage = ({
  student_id,
  getSingleStudent,
  refetchSingleStudent,
  sigleStudentIsLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const [updateDocStatus] = useUpdateDocStatusForAgentMutation();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    getSingleStudent?.data?.documents?.length > 0 &&
    getSingleStudent?.data?.documents?.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // console.log(getSingleStudent?.data?.documents[0]?.file[0]?.url);

  const docRequestTableHeaderData = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {currentPage * perPageData + index + 1}
          </h5>
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
      title: 'Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium">
            {`${item?.user?.email ? item?.user?.email : '-'}`}
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
    {
      title: 'Preview',
      key: 'preview',
      render: (item) => {
        return (
          <div>
            {item?.file.length > 0 ? (
              <Link target="_blank" href={`${item?.file[0]?.url}`}>
                {item?.file[0]?.url?.endsWith('.pdf') ? (
                  <div>Open File</div>
                ) : (
                  <Image
                    src={
                      typeof item?.file[0]?.url === 'string'
                        ? item?.file[0]?.url
                        : URL.createObjectURL(new Blob([item?.file[0]?.url]))
                    }
                    alt="file"
                    width={50}
                    height={50}
                  />
                )}
              </Link>
            ) : (
              ''
            )}
          </div>
        );
      },
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (item) => {
        const status = item?.status;

        const validStatuses = ['accepted', 'rejected', 'pending', 'requested'];

        if (
          validStatuses.includes(status) &&
          status !== 'accepted' &&
          status !== 'rejected'
        ) {
          return (
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
              <DropdownMenu className="ms-3">
                {status === 'pending' && (
                  <>
                    <DropdownItem
                      onClick={() => handleUpdateDocument(item, 'accepted')}
                    >
                      <i className="ri-question-fill align-start me-2 text-muted fw-bold"></i>
                      Accept
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleUpdateDocument(item, 'rejected')}
                    >
                      <i className="ri-question-fill align-start me-2 text-muted fw-bold"></i>
                      Reject
                    </DropdownItem>
                  </>
                )}

                {status === 'requested' && (
                  <>
                    <DropdownItem
                      onClick={() => handleUpdateDocument(item, 'accepted')}
                    >
                      <i className="ri-question-fill align-start me-2 text-muted fw-bold"></i>
                      Accept
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleUpdateDocument(item, 'rejected')}
                    >
                      <i className="ri-question-fill align-start me-2 text-muted fw-bold"></i>
                      Reject
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        }

        return null;
      },
    },
  ];

  const handleUpdateDocument = async (item, action) => {
    const updatedData = {
      user: student_id,
      id: item?._id,
      status: action,
    };

    try {
      const result = await updateDocStatus(updatedData).unwrap();
      if (result) {
        toast.success(result?.message);
        refetchSingleStudent();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <Row>
      {sigleStudentIsLoading ? (
        <LoaderSpiner />
      ) : (
        <div>
          <Card>
            <ToastContainer />
            <CardHeader className="d-flex justify-content-between align-items-center">
              Submitted Docs
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </CardHeader>
            <CardBody>
              <CommonTableComponent
                headers={docRequestTableHeaderData}
                data={isFilteredData ? isFilteredData : []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPageData={perPageData}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                emptyMessage="No Data found yet."
              />
            </CardBody>
          </Card>
        </div>
      )}
    </Row>
  );
};

export default DocumentPage;
