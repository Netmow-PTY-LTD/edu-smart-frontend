import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import { useAllStudentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import {
  studentsHeadersWithoutAction,
  userDummyImage,
} from '@/utils/common/data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllStudentsForAgent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [studentHeadersData, setStudentHeadersData] = useState([]);

  const perPageData = 10;

  const {
    data: allStudentForAgentData,
    error: allStudentForAgentError,
    isLoading: allStudentForAgentIsLoading,
    refetch: allStudentForAgentRefetch,
  } = useAllStudentForAgentQuery();

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

  useEffect(() => {
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
    if (allStudentForAgentData?.data?.length > 0) {
      const updatedHeaders = [
        studentAndLogoData,
        ...studentsHeadersWithoutAction.slice(1),
      ];
      setStudentHeadersData(updatedHeaders);
    }
  }, [allStudentForAgentData?.data?.length]);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card>
            <CardHeader>
              <h3>All Students</h3>
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
      </div>
    </Layout>
  );
};

export default AllStudentsForAgent;
