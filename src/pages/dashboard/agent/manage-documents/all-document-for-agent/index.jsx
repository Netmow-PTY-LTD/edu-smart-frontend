import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import { useAllSubmittedDocumentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
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

const AllDocumentForAgentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const perPageData = 10;

  const {
    data: allSubmittedDocumentForAgentData,
    error: allSubmittedDocumentForAgentError,
    isLoading: allSubmittedDocumentForAgentIsLoading,
    refetch: allSubmittedDocumentForAgentRefetch,
  } = useAllSubmittedDocumentForAgentQuery();

  console.log(allSubmittedDocumentForAgentData);

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allSubmittedDocumentForAgentData?.data?.length > 0 &&
    allSubmittedDocumentForAgentData?.data.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const actionHeader = [
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => {
        const status = item?.status;

        console.log(status);
        const validStatuses = ['accepted', 'rejected', 'pending', 'requested'];

        if (validStatuses.includes(status)) {
          return (
            <UncontrolledDropdown className="card-header-dropdown">
              <DropdownToggle
                tag="a"
                className="text-reset dropdown-btn"
                role="button"
              >
                <span className="button px-3">
                  <i className="ri-more-fill align-middle"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu dropdown-menu-end">
                {status === 'accepted' && (
                  <DropdownItem>
                    <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
                    Accepted
                  </DropdownItem>
                )}
                {/* {status === 'rejected' && (
                  <DropdownItem>
                    <i className="ri-refresh-fill align-start me-2 text-muted fw-bold"></i>
                    Reconsider
                  </DropdownItem>
                )} */}

                {status === 'requested' && (
                  <DropdownItem>
                    <i className="ri-question-fill align-start me-2 text-muted fw-bold"></i>
                    Review Request
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        }

        return null;
      },
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <Card>
              <CardHeader>
                <h3 className="">All Submitted Documents </h3>
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={studentSubmittedDocumentsHeaderWithoutAction}
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
      </div>
    </Layout>
  );
};

export default AllDocumentForAgentDashboard;
