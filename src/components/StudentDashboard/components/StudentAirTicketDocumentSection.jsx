import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import * as Yup from 'yup';

// Components
import SingleDocUploadForm from '@/components/StudentDashboard/components/SingleDocUploadForm';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import CommonTableComponent from '@/components/common/CommonTableComponent';

// Helpers
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';

// Services
import { useGetSingleUserAirTicketDocumentRequestQuery } from '@/slice/services/common/commonDocumentService';
import {
  useGetAllSubmittedAirTicketDocumentsForStudentQuery,
  useUpdateSingleAirTicketDocumentForStudentMutation,
} from '@/slice/services/student/studentSubmitDocumentService';
import { currentUser } from '@/utils/currentUserHandler';

// HEADERS
import DataObjectComponent from '@/utils/common/data';

const StudentAirTicketDocumentSection = () => {
  const [searchTerms, setSearchTerms] = useState({
    requested: '',
    submitted: '',
  });
  const [currentPages, setCurrentPages] = useState({
    requested: 0,
    submitted: 0,
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    docId: '',
    initialValues: { title: '', document: '', description: '' },
  });

  const user = currentUser();

  const {
    data: getRequestedDocs,
    isLoading: requestedLoading,
    refetch: refetchRequestedDocs,
    error: requestedError,
  } = useGetSingleUserAirTicketDocumentRequestQuery({ student_id: user?.id });

  const {
    data: getSubmittedDocs,
    isLoading: submittedLoading,
    refetch: refetchSubmittedDocs,
    error: submittedError,
  } = useGetAllSubmittedAirTicketDocumentsForStudentQuery();

  const [submitSingleDocument] =
    useUpdateSingleAirTicketDocumentForStudentMutation();

  const {
    AIR_TICKET_REQUEST_TABLE_HEADERS_FOR_STUDENT = [],
    AIR_TICKET_SUBMITTED_TABLE_HEADERS_FOR_STUDENT = [],
  } = DataObjectComponent();

  const toggleModal = (docId = '') => {
    setModalState((prev) => ({
      isOpen: !prev.isOpen,
      docId,
      initialValues: docId
        ? prev.initialValues
        : { title: '', document: '', description: '' },
    }));
  };

  useEffect(() => {
    const prepareModalData = async () => {
      if (!modalState.docId) return;

      const requestData = getRequestedDocs?.data?.find(
        (item) => item._id === modalState.docId
      );
      if (requestData) {
        const files = await Promise.all(
          requestData.files.map((file) => convertImageUrlToFile(file.url))
        );
        setModalState((prev) => ({
          ...prev,
          initialValues: {
            title: requestData.title || '',
            document: files || '',
            description: requestData.description || '',
          },
        }));
      }
    };

    prepareModalData();
  }, [modalState.docId, getRequestedDocs]);

  const handleSearchChange = (section) => (e) => {
    setSearchTerms((prev) => ({ ...prev, [section]: e.target.value }));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const submited_date = new Date().toISOString();
    try {
      const formData = new FormData();
      Object.entries({
        ...values,
        id: modalState.docId,
        status: 'submitted',
        submited_date,
      }).forEach(([key, value]) => {
        if (key === 'document' && Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });

      const result = await submitSingleDocument(formData).unwrap();

      if (result.success) {
        toast.success(result.message);
        refetchRequestedDocs();
        refetchSubmittedDocs();
      }
      toggleModal();
    } catch (error) {
      toast.error(error?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const createDataFilter = (searchTerm) => (item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase());

  const TABLE_HEADERS_ACTIONS = {
    actions: {
      title: 'Actions',
      key: 'actions',
      render: (item) => (
        <button
          className="button px-3 py-1"
          onClick={() => toggleModal(item._id)}
        >
          Upload
        </button>
      ),
    },
  };

  const tableConfigs = {
    submitted: {
      data: getSubmittedDocs?.data || [],
      filteredData: getSubmittedDocs?.data?.filter(
        createDataFilter(searchTerms.submitted)
      ),
      headers: AIR_TICKET_SUBMITTED_TABLE_HEADERS_FOR_STUDENT,
      searchTerm: searchTerms.submitted,
    },
    requested: {
      data: getRequestedDocs?.data || [],
      filteredData: getRequestedDocs?.data.filter(
        createDataFilter(searchTerms.requested)
      ),
      headers: [
        ...AIR_TICKET_REQUEST_TABLE_HEADERS_FOR_STUDENT,
        TABLE_HEADERS_ACTIONS.actions,
      ],
      searchTerm: searchTerms.requested,
    },
  };

  return (
    <>
      <ToastContainer />
      <DocumentSection
        title="Document Requested"
        config={tableConfigs.requested}
        loading={requestedLoading}
        error={requestedError}
        currentPage={currentPages.requested}
        onPageChange={(page) =>
          setCurrentPages((prev) => ({ ...prev, requested: page }))
        }
        onSearch={handleSearchChange('requested')}
      />
      <DocumentSection
        title="Document Submitted"
        config={tableConfigs.submitted}
        loading={submittedLoading}
        error={submittedError}
        currentPage={currentPages.submitted}
        onPageChange={(page) =>
          setCurrentPages((prev) => ({ ...prev, submitted: page }))
        }
        onSearch={handleSearchChange('submitted')}
      />
      <SingleDocUploadForm
        initialValues={modalState.initialValues}
        OpenModal={modalState.isOpen}
        toggle={toggleModal}
        handleAddSubmit={handleSubmit}
        validationSchema={validationSchema}
        submitBtn="Upload"
      />
    </>
  );
};

const DocumentSection = ({
  title,
  config,
  loading,
  error,
  currentPage,
  onPageChange,
  onSearch,
}) => (
  <Card className="mb-5">
    <CardHeader>
      <h3 className="fs-1 fw-bold text-primary text-center py-3">{title}</h3>
      <SearchComponent
        searchTerm={config.searchTerm}
        handleSearchChange={onSearch}
      />
    </CardHeader>
    <CardBody>
      {loading ? (
        <LoaderSpiner />
      ) : error ? (
        <div>Error loading data...</div>
      ) : (
        <CommonTableComponent
          headers={config.headers}
          data={config.filteredData || []}
          currentPage={currentPage}
          setCurrentPage={onPageChange}
          perPageData={10}
          searchTerm={config.searchTerm}
          handleSearchChange={onSearch}
          emptyMessage="No data found"
        />
      )}
    </CardBody>
  </Card>
);

const validationSchema = Yup.object({
  document: Yup.array()
    .of(
      Yup.mixed()
        .test(
          'fileFormat',
          'Only PDF, JPG, PNG allowed',
          (value) =>
            value &&
            ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
        )
        .test(
          'fileSize',
          'Max size 5MB',
          (value) => value && value.size <= 5 * 1024 * 1024
        )
    )
    .required()
    .min(1)
    .max(5),
});

export default StudentAirTicketDocumentSection;
