import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllUploadDocumentsForStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');
  const perPageData = 10;

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    'allSubmittedDocumentForStudentData'?.data?.length > 0 &&
    'allSubmittedDocumentForStudentData'?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  //   const actionHeader = [
  //     {
  //       title: 'Actions',
  //       key: 'actions',
  //       render: (item) => {
  //         const status = item?.status;

  //         console.log(status);
  //         const validStatuses = ['accepted', 'rejected', 'pending', 'requested'];

  //         if (validStatuses.includes(status)) {
  //           return (
  //             <UncontrolledDropdown className="card-header-dropdown">
  //               <DropdownToggle
  //                 tag="a"
  //                 className="text-reset dropdown-btn"
  //                 role="button"
  //               >
  //                 <span className="button px-3">
  //                   <i className="ri-more-fill align-middle"></i>
  //                 </span>
  //               </DropdownToggle>
  //               <DropdownMenu className="dropdown-menu dropdown-menu-end">
  //                 {status === 'accepted' && (
  //                   <DropdownItem>
  //                     <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
  //                     Manage Accepted
  //                   </DropdownItem>
  //                 )}
  //                 {status === 'rejected' && (
  //                   <DropdownItem>
  //                     <i className="ri-refresh-fill align-start me-2 text-muted fw-bold"></i>
  //                     Reconsider
  //                   </DropdownItem>
  //                 )}
  //                 {status === 'pending' && (
  //                   <DropdownItem>
  //                     <i className="ri-check-fill align-start me-2 text-muted fw-bold"></i>
  //                     Approve
  //                   </DropdownItem>
  //                 )}
  //                 {status === 'requested' && (
  //                   <DropdownItem>
  //                     <i className="ri-question-fill align-start me-2 text-muted fw-bold"></i>
  //                     Review Request
  //                   </DropdownItem>
  //                 )}
  //               </DropdownMenu>
  //             </UncontrolledDropdown>
  //           );
  //         }

  //         // If the status is not one of the valid ones, return null or no dropdown
  //         return null;
  //       },
  //     },
  //   ];

  const uploadAction = [
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.title ? item?.title : '-'}`}
          </h5>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...studentSubmittedDocumentsHeaderWithoutAction,
      ...uploadAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              Uploaded Docs
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </CardHeader>
            <CardBody>
              <CommonTableComponent
                headers={AllUploadDocumentsForStudentsData}
                data={isfilteredData ? isfilteredData : []}
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

export default AllUploadDocumentsForStudents;
