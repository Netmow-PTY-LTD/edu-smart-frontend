import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useAllSubmittedDocumentForStudentQuery } from '@/slice/services/student/studentSubmitDocumentService';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllSubmittedDocumentsForStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');
  const perPageData = 10;

  const {
    data: allSubmittedDocumentForStudentData,
    error: allSubmittedDocumentForStudentError,
    isLoading: allSubmittedDocumentForStudentIsLoading,
    refetch: allSubmittedDocumentForStudentRefetch,
  } = useAllSubmittedDocumentForStudentQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allSubmittedDocumentForStudentData?.data?.length > 0 &&
    allSubmittedDocumentForStudentData?.data.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...studentSubmittedDocumentsHeaderWithoutAction,
      ...uploadAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadAction = [
    {
      title: 'Preview',
      key: 'preview',
      render: (item) => (
        <Link target="_blank" href={`${item?.file?.url}`}>
          {item?.file?.url?.endsWith('.pdf') ? (
            <div>Open File</div>
          ) : (
            <Image
              src={
                typeof item?.file[0]?.url === 'string'
                  ? item?.file[0]?.url
                  : URL.createObjectURL(new Blob([item?.file?.url]))
              }
              alt="file"
              width={80}
              height={50}
            />
          )}
        </Link>
      ),
    },
  ];

  console.log(isFilteredData);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {allSubmittedDocumentForStudentIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                Submitted Docs
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={AllUploadDocumentsForStudentsData}
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllSubmittedDocumentsForStudents;
