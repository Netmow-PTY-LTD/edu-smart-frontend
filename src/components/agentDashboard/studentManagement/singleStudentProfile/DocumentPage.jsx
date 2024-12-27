import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';

import React, { useEffect, useState } from 'react';
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
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import {
  useSingleStudentForAgentQuery,
  useUpdateDocStatusForAgentMutation,
} from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { toast, ToastContainer } from 'react-toastify';
const DocumentPage = ({ student_id }) => {
  const [documentTableHeader, setDocumentTableHeader] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const [updateDocStatus] = useUpdateDocStatusForAgentMutation();

  const {
    data: getSingleStudent,
    isLoading: getSingleStudenIsLoadingForStudent,
    refetch: getSingleStudenRefetch,
  } = useSingleStudentForAgentQuery(student_id, {
    skip: !student_id,
  });

  //console.log(getSingleStudent);

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
                {/* {status === 'accepted' && (
                  <DropdownItem>
                    <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
                    Accepted
                  </DropdownItem>
                )} */}
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

  useEffect(() => {
    setDocumentTableHeader([
      ...studentSubmittedDocumentsHeaderWithoutAction,
      ...actionHeader,
    ]);
  }, []);

  const [updateDocRequest] = useUpdateDocStatusForAgentMutation();

  const handleUpdateDocument = async (item, action) => {
    const updatedData = {
      user: student_id,
      id: item?._id,
      status: action,
    };

    try {
      const result = await updateDocRequest(updatedData).unwrap();
      if (result) {
        toast.success(result?.message);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <Row>
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
              headers={documentTableHeader}
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
    </Row>
  );
};

export default DocumentPage;
