import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetSingleUserSubmittedDocumentQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import { downloadFiles } from '@/utils/downloadFiles';
import { downloadFilesAsPDF } from '@/utils/dwonloadFilesAsPdf';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Row } from 'reactstrap';
import AutoAcceptedDocumentUploadModal from './modal/AutoAcceptedDocumentUploadModal';
const DocumentPage = ({ student_id }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const { studentSubmittedDocumentsHeaderWithoutAction } =
    DataObjectComponent();

  const {
    data: singleStudentAllSubmittedDoc,
    isLoading: getSingleStudentDocLoading,
    isFetching: getSingleStudenDocRefetch,
    refetch: refetchSingleStudentDocs, // ✅ Get the actual refetch function
  } = useGetSingleUserSubmittedDocumentQuery({
    student_id,
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  // // Filter data for search option
  // const isFilteredData =
  //   singleStudentAllSubmittedDoc?.data?.length > 0 &&
  //   singleStudentAllSubmittedDoc?.data?.filter(
  //     (item) =>
  //       item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const isFilteredData =
    singleStudentAllSubmittedDoc?.data?.length > 0 &&
    singleStudentAllSubmittedDoc?.data
      .filter(
        (item) =>
          item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt)
      );

  const handleDownloadAllDocument = () => {
    if (!singleStudentAllSubmittedDoc?.data) {
      toast.error('No documents available to download');
      return;
    }

    const allFileUrls = singleStudentAllSubmittedDoc.data
      .flatMap((item) => item.files.map((file) => file.url))
      .filter(Boolean); // Remove undefined/null values

    console.log('allFileUrls', allFileUrls);

    // single files dwonloader
    // downloadFiles(allFileUrls, 'Downloading all documents...');

    // 'Downloading all documents as a single PDF...
    downloadFilesAsPDF(
      allFileUrls,
      'Downloading all documents as a single PDF...'
    );
  };

  return (
    <Row>
      {getSingleStudentDocLoading ? (
        <LoaderSpiner />
      ) : (
        <div>
          <Card>
            <ToastContainer />
            <CardHeader className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-4">
                <Button
                  className="button px-4 py-3 fw-bold"
                  onClick={handleDownloadAllDocument}
                >
                  Download All Doc
                </Button>

                <Button
                  type="button"
                  className="button px-4 py-3 fw-bold"
                  onClick={() => setAddModalIsOpen(true)}
                >
                  Upload Documents
                </Button>
              </div>

              <h1>Submitted Docs</h1>
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
              <AutoAcceptedDocumentUploadModal
                formHeader="Upload Document"
                isOpen={addModalIsOpen}
                onClose={() => {
                  setAddModalIsOpen(false);
                  refetchSingleStudentDocs(); // ✅ Refetch when modal closes
                }}
                formSubmit="Upload Document"
                student_id={student_id}
                initialValues={{
                  documents: [
                    {
                      title: '',
                      files: [],
                    },
                  ],
                }}
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
      )}
    </Row>
  );
};

export default DocumentPage;
