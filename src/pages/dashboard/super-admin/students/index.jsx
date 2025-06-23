import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllStudentQuery } from '@/slice/services/public/student/publicStudentService';
import DataObjectComponent from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';

import Link from 'next/link';

import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AllStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  const customData = useCustomData();

  const {
    studentImageAndNameHeaderDataForSuperAdmin = [],
    studentsHeaders = [],
  } = DataObjectComponent();

  const { data: allStudentsData, isLoading: allStudentsIsLoading } =
    useGetAllStudentQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allStudentsData?.data?.length > 0 &&
    allStudentsData?.data.filter(
      (item) =>
        item?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
              href={`/dashboard/${customData?.paneltext}/students/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-eye-fill align-start me-2 text-muted fw-bold"></i>
              View Profile
            </Link>
          </DropdownItem>

            <>
              <DropdownItem>
                <Link
                  href={`/dashboard/${customData?.paneltext}/students/edit-student-for-super-admin/${item?._id}`}
                  className="text-primary"
                >
                  <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                  Edit
                </Link>
              </DropdownItem>
              {/* <DropdownItem>
                <div
                  onClick={() => handleDeleteButtonClick(item._id)}
                  className="text-primary"
                >
                  <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                  Delete
                </div>
              </DropdownItem> */}
            </>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          {allStudentsIsLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="h-100">
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h2>All Students</h2>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <CommonTableComponent
                    headers={[
                      studentImageAndNameHeaderDataForSuperAdmin,
                      ...studentsHeaders,
                      studentHeaderAction,
                    ]}
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
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default AllStudentsPage;
