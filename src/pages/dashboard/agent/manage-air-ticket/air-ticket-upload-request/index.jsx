import { toast } from 'react-toastify';
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
import { useGetAllUserAirTicketDocSubmitedFilestForAgentQuery } from '@/slice/services/agent/agentDocumentServices';
import {
  useGetAllStudentsAirticketDocumentRequestQuery,
  useUpdateSingleAirTicketDocumentForAgentMutation,
} from '@/slice/services/common/commonDocumentService';

import { useEffect, useMemo, useState } from 'react';
import DataObjectComponent from '@/utils/common/data';

const StudentAirtTicketDocumentUploadRequestForAgent = () => {
  // State Management
  const [searchTerms, setSearchTerms] = useState({
    superAdmin: '',
    agent: '',
    submitted: '',
  });

  const [currentPages, setCurrentPages] = useState({
    superAdmin: 0,
    agent: 0,
    submitted: 0,
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    docId: '',
    initialValues: { title: '', document: '', description: '' },
  });

  // API Queries
  const {
    data: allDocumentRequests,
    isLoading: requestsLoading,
    error: requestsError,
    refetch: refetchRequests,
  } = useGetAllStudentsAirticketDocumentRequestQuery();

  const {
    data: submittedDocuments,
    isLoading: submittedLoading,
    error: submittedError,
    refetch: refetchSubmitted,
  } = useGetAllUserAirTicketDocSubmitedFilestForAgentQuery();

  const [submitDocument] = useUpdateSingleAirTicketDocumentForAgentMutation();

  // Memoized Data Processing
  const { superAdminRequests, agentRequests } = useMemo(
    () => ({
      superAdminRequests:
        allDocumentRequests?.data?.filter(
          (item) => item.requested_by.role === 'super_admin'
        ) || [],
      agentRequests:
        allDocumentRequests?.data?.filter(
          (item) => item.requested_by.role === 'agent'
        ) || [],
    }),
    [allDocumentRequests]
  );

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
    AIRTICKET_SUBMITTED_HEADER_FOR_AGENT = [],
    AIRTICKET_REQUEST_HEADER_FOR_AGENT = [],
  } = DataObjectComponent();

  // Modal Data Preparation
  useEffect(() => {
    const prepareModalData = async () => {
      if (!modalState.docId) return;

      const requestData = allDocumentRequests?.data?.find(
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
  }, [modalState.docId, allDocumentRequests]);

  // Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.entries({
        ...values,
        id: modalState.docId,
        status: 'submitted',
      }).forEach(([key, value]) => {
        if (key === 'document' && Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });

      const result = await submitDocument(formData).unwrap();
      if (result.succees) {
        toast.success(result?.message);
        refetchRequests();
        refetchSubmitted();
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

  const AGENT_TABLE_HEADERS_ACTIONS = {
    actions: {
      title: 'Actions',
      key: 'actions',
      render: (item) =>
        item.requested_by?.role === 'agent' ? (
          <span>-</span>
        ) : (
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
      data: submittedDocuments?.data || [],
      filteredData: submittedDocuments?.data?.filter(
        createDataFilter(searchTerms.submitted)
      ),
      headers: AIRTICKET_SUBMITTED_HEADER_FOR_AGENT,
      searchTerm: searchTerms.submitted,
    },
    agentRequests: {
      data: agentRequests,
      filteredData: agentRequests.filter(createDataFilter(searchTerms.agent)),
      headers: AIRTICKET_REQUEST_HEADER_FOR_AGENT,
      searchTerm: searchTerms.agent,
    },
    superAdminRequests: {
      data: superAdminRequests,
      filteredData: superAdminRequests.filter(
        createDataFilter(searchTerms.superAdmin)
      ),
      headers: [
        ...AIRTICKET_REQUEST_HEADER_FOR_AGENT,
        AGENT_TABLE_HEADERS_ACTIONS.actions,
      ],
      searchTerm: searchTerms.superAdmin,
    },
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {/* Submitted Documents Section */}
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

          {/* Agent Requests Section */}
          <DocumentSection
            title="Requests from You"
            config={tableConfigs.agentRequests}
            loading={requestsLoading}
            error={requestsError}
            currentPage={currentPages.agent}
            onPageChange={(page) =>
              setCurrentPages((prev) => ({ ...prev, agent: page }))
            }
            onSearch={handleSearchChange('agent')}
          />

          {/* Super Admin Requests Section */}
          <DocumentSection
            title="Document Requested from Super Admin"
            config={tableConfigs.superAdminRequests}
            loading={requestsLoading}
            error={requestsError}
            currentPage={currentPages.superAdmin}
            onPageChange={(page) =>
              setCurrentPages((prev) => ({ ...prev, superAdmin: page }))
            }
            onSearch={handleSearchChange('superAdmin')}
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
