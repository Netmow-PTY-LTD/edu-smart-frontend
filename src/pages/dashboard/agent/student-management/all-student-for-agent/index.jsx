import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import {
  useAllStudentForAgentQuery,
  useDeleteStudentForAgentMutation,
} from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import {
  studentsHeadersWithoutAction,
  userDummyImage,
} from '@/utils/common/data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

const AllStudentsForAgent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [studentHeadersData, setStudentHeadersData] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [studentIdForDelete, setStudentIdForDelete] = useState(false);

  const perPageData = 10;

  const {
    data: allStudentForAgentData,
    error: allStudentForAgentError,
    isLoading: allStudentForAgentIsLoading,
    refetch: allStudentForAgentRefetch,
  } = useAllStudentForAgentQuery();

  const [deleteStudentForAgent] = useDeleteStudentForAgentMutation();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allStudentForAgentData?.data?.length > 0 &&
    allStudentForAgentData?.data.filter(
      (item) =>
        item?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDeleteButtonClick = (itemId) => {
    console.log(itemId);
    setStudentIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteStudentForAgent(studentIdForDelete).unwrap();
      if (result) {
        toast.success(result?.message);
        await allStudentForAgentRefetch();
        handleDeleteButtonClick();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  const studentAndLogoData = {
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

  const studentHeaderAction = {
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
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
              Manage
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              href={`/dashboard/agent/student-management/edit-student-for-agent/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-pencil-fill align-start me-2 text-muted"></i>
              Edit
            </Link>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => handleDeleteButtonClick(item._id)}
              className="text-primary"
            >
              <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
              Delete
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  useEffect(() => {
    if (allStudentForAgentData?.data?.length > 0) {
      const updatedHeaders = [
        studentAndLogoData,
        ...studentsHeadersWithoutAction.slice(1),
        studentHeaderAction,
      ];
      setStudentHeadersData(updatedHeaders);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStudentForAgentData?.data?.length]);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ToastContainer />
          <Card>
            <CardHeader>
              <Link
                href={
                  '/dashboard/agent/student-management/add-student-for-agent'
                }
                className="button px-3 py-2"
              >
                Add New
              </Link>
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </CardHeader>
            <CardBody>
              <CommonTableComponent
                headers={studentHeadersData}
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
        {
          <DeleteModal
            Open={deleteModalIsOpen}
            close={() => setDeleteModalIsOpen(!deleteModalIsOpen)}
            id={studentIdForDelete}
            handleDelete={handleDelete}
            setStudentIdForDelete={setStudentIdForDelete}
          />
        }
      </div>
    </Layout>
  );
};

export default AllStudentsForAgent;
