import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import { useGetSingleUserSubmittedDocumentQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import { downloadFiles } from '@/utils/downloadFiles';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

const SubmittedDocumentsViewer = ({ student_id, title = 'Submitted Docs' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const { studentSubmittedDocumentsHeaderWithoutAction = [] } =
    DataObjectComponent();

  const {
    data: singleStudentAllSubmittedDoc,
    isLoading: getSingleStudentDocLoading,
  } = useGetSingleUserSubmittedDocumentQuery({ student_id: student_id });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredData =
    singleStudentAllSubmittedDoc?.data?.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleDownloadAllDocument = () => {
    if (!singleStudentAllSubmittedDoc?.data?.length) {
      toast.error('No documents available to download');
      return;
    }

    const allFileUrls = singleStudentAllSubmittedDoc.data
      .flatMap((item) => item.files.map((file) => file.url))
      .filter(Boolean);

    downloadFiles(allFileUrls, 'Downloading all documents...');
  };

  if (getSingleStudentDocLoading) return <LoaderSpiner />;

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <Button
          className="button px-4 py-3 fw-bold"
          onClick={handleDownloadAllDocument}
        >
          Download All Documents
        </Button>
        <h1>{title}</h1>
        <SearchComponent
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      </CardHeader>
      <CardBody>
        <CommonTableComponent
          headers={studentSubmittedDocumentsHeaderWithoutAction}
          data={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPageData={perPageData}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          emptyMessage="No Data found yet."
        />
      </CardBody>
    </Card>
  );
};

export default SubmittedDocumentsViewer;
