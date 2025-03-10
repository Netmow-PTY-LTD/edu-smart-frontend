import React, { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import * as Yup from 'yup';

// Components
import Layout from '@/components/layout';
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

const StudentAirtTicketDocumentUploadRequestForAgent = () => {
  // State Management
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

  // API Queries
  const user = currentUser();
  const {
    data: getSingleStudentAirTicketDocRequest,
    isLoading: getSingleStudentAirTicketDocRequestIsLoading,
    refetch: getSingleStudentAirTicketDocRequestRefetch,
    error: requestedError,
  } = useGetSingleUserAirTicketDocumentRequestQuery({ student_id: user?.id });

  const {
    data: getSingleStudentAirTicketDocSubmittedData,
    isLoading: getSingleStudentAirTicketDocSubmittedIsLoading,
    refetch: getSingleStudentAirTicketDocSubmittedRefetch,
    error: submittedError,
  } = useGetAllSubmittedAirTicketDocumentsForStudentQuery();

  const [submitSingleDocumentForStudent] =
    useUpdateSingleAirTicketDocumentForStudentMutation();

  // Handlers
  const handleSearchChange = (section) => (e) => {
    setSearchTerms((prev) => ({ ...prev, [section]: e.target.value }));
  };

  const toggleModal = (docId = '') => {
    setModalState((prev) => ({
      isOpen: !prev.isOpen,
      docId,
      initialValues: docId
        ? prev.initialValues
        : { title: '', document: '', description: '' },
    }));
  };

  // HEADERS

  const {
    AIR_TICKET_REQUEST_TABLE_HEADERS_FOR_STUDENT = [],
    AIR_TICKET_SUBMITTED_TABLE_HEADERS_FOR_STUDENT = [],
  } = DataObjectComponent();

  // Modal Data Preparation
  useEffect(() => {
    const prepareModalData = async () => {
      if (!modalState.docId) return;

      const requestData = getSingleStudentAirTicketDocRequest?.data?.find(
        (item) => item._id === modalState.docId
      );

      if (requestData) {
        // eslint-disable-next-line no-undef
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
  }, [modalState.docId, getSingleStudentAirTicketDocRequest]);

  // Form Submission
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

      const result = await submitSingleDocumentForStudent(formData).unwrap();

      if (result.success) {
        toast.success(result?.message);
        getSingleStudentAirTicketDocRequestRefetch();
        getSingleStudentAirTicketDocSubmittedRefetch();
      }
      toggleModal();
    } catch (error) {
      toast.error(error?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter Functions
  const createDataFilter = (searchTerm) => (item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase());

  // ------------- Table Configuration  -----------

  const TABLE_HEADERS_ACTIONS = {
    actions: {
      title: 'Actions',
      key: 'actions',
      render: (item) => (
        <button
          className="button px-3 py-1"
          onClick={() => toggleModal(item?._id)}
        >
          Upload
        </button>
      ),
    },
  };

  const tableConfigs = {
    submitted: {
      data: getSingleStudentAirTicketDocSubmittedData?.data || [],
      filteredData: getSingleStudentAirTicketDocSubmittedData?.data?.filter(
        createDataFilter(searchTerms.submitted)
      ),
      headers: AIR_TICKET_SUBMITTED_TABLE_HEADERS_FOR_STUDENT,
      searchTerm: searchTerms.submitted,
    },

    requested: {
      data: getSingleStudentAirTicketDocRequest?.data || [],
      filteredData: getSingleStudentAirTicketDocRequest?.data.filter(
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
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ToastContainer />

          {/*  Requests Section */}
          <DocumentSection
            title="Document Requested  "
            config={tableConfigs.requested}
            loading={getSingleStudentAirTicketDocRequestIsLoading}
            error={requestedError}
            currentPage={currentPages.requested}
            onPageChange={(page) =>
              setCurrentPages((prev) => ({ ...prev, requested: page }))
            }
            onSearch={handleSearchChange('requested')}
          />

          {/* Submitted Documents Section */}
          <DocumentSection
            title="Document Submitted"
            config={tableConfigs.submitted}
            loading={getSingleStudentAirTicketDocSubmittedIsLoading}
            error={submittedError}
            currentPage={currentPages.submitted}
            onPageChange={(page) =>
              setCurrentPages((prev) => ({ ...prev, submitted: page }))
            }
            onSearch={handleSearchChange('submitted')}
          />

          {/* Document Upload Modal */}
          <SingleDocUploadForm
            initialValues={modalState.initialValues}
            OpenModal={modalState.isOpen}
            toggle={toggleModal}
            handleAddSubmit={handleSubmit}
            validationSchema={validationSchema}
            submitBtn="Upload"
          />
        </div>
      </div>
    </Layout>
  );
};

// Reusable Document Section Component
const DocumentSection = ({
  title,
  config,
  loading,
  error,
  currentPage,
  onPageChange,
  onSearch,
}) => (
  <Card>
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

// Validation Schema
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

export default StudentAirtTicketDocumentUploadRequestForAgent;
