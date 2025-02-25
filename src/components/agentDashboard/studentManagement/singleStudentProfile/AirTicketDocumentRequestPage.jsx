import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
import * as Yup from 'yup';

import {
  useCreateUserAirTicketDocRequestForAgentMutation,
  useUpdateUserAirTicketDocStatusForAgentMutation,
} from '@/slice/services/agent/agentDocumentServices';
import { useGetSingleUserAirTicketDocumentRequestQuery } from '@/slice/services/common/commonDocumentService';
import FileViewer from '@/components/common/FileViewer';
import StatusUpdateForm from './modal/StatusUpdateForm';
import AirTicketDocumentRequestModalForm from './modal/AirTicketDocumentRequestModalForm';

const AirTicketDocumentRequestPage = ({ student_id }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    // notes: '',
  });

  const [rejectStatusInitialValues, setRejectStatusInitialValues] = useState({
    notes: '',
  });

  const perPageData = 10;

  const [createDocumentRequest] =
    useCreateUserAirTicketDocRequestForAgentMutation();

  const [updateDocumentRequest] =
    useUpdateUserAirTicketDocStatusForAgentMutation();

  const {
    data: getSingleUserAirTicketDocumentRequest,
    isLoading: getSingleUserAirTicketDocumentRequestIsLoading,
    refetch: getSingleUserAirTicketDocumentRequestRefetch,
  } = useGetSingleUserAirTicketDocumentRequestQuery(
    { student_id: student_id },
    { skip: !student_id }
  );

  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    // notes: Yup.string(),
  });

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const isFilteredData =
    getSingleUserAirTicketDocumentRequest?.data?.length > 0 &&
    getSingleUserAirTicketDocumentRequest?.data?.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      // Create an array of API calls for each document request
      const requests = values.map((item) => {
        return createDocumentRequest({
          title: item.title,
          description: item.description,
          student_id,
        }).unwrap();
      });

      // Execute all requests in parallel
      // eslint-disable-next-line no-undef
      const results = await Promise.all(requests);

      // Handle success for all API calls
      results.forEach((result) => {
        if (result) {
          toast.success(result?.message);
        }
      });

      // Refresh data and close modal after all requests are done
      getSingleUserAirTicketDocumentRequestRefetch();
      setAddModalIsOpen((prev) => !prev); // Use previous state for reliable toggling
    } catch (error) {
      // Log error and show error message
      console.error('Error in document request:', error);
      const errorMessage = error?.data?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  };

  const handleStatusChange = async (airticket_document_id, status) => {
    const updatedDataStatus = { airticket_document_id, status };
    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUserAirTicketDocumentRequestRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  const handleRejectStatus = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const updatedDataStatus = {
      ...values,
      airticket_document_id: docId,
      status: 'rejected',
    };

    try {
      const result = await updateDocumentRequest(updatedDataStatus).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUserAirTicketDocumentRequestRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  const togModal = (airticket_document_id) => {
    setDocId(airticket_document_id);
    setOpenModal(!openModal);
  };

  const docRequestTableHeaderDataWithAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {`${item?.description ? item?.description : '-'}`}
        </div>
      ),
    },

    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
        </div>
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div className="fs-14 fw-medium text-capitalize">
          {item?.notes ? (
            <span style={{ color: '#007BFF' }}>{item?.notes}</span>
          ) : (
            'No notes yet'
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : item?.status === 'submitted'
                      ? 'text-info'
                      : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (item) => (
        <UncontrolledDropdown direction="end">
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
            <DropdownItem>
              <div
                className="text-primary"
                onClick={() => {
                  if (item?.status === 'submitted') {
                    handleStatusChange(item?._id, 'accepted');
                  } else {
                    toast.error('Document must be submitted first');
                  }
                }}
              >
                <i class="ri-check-double-line me-2 text-success"></i>
                Accepted
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="text-primary" onClick={() => togModal(item?._id)}>
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Rejected
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  useEffect(() => {
    if (!getSingleUserAirTicketDocumentRequest?.data) return;

    const singleDocument = getSingleUserAirTicketDocumentRequest.data.find(
      (item) => item._id === docId
    );

    if (singleDocument) {
      setRejectStatusInitialValues({ notes: singleDocument?.notes || '' });
    }

    setAllUploadDocumentsForStudentsData(() => [
      ...docRequestTableHeaderDataWithAction,
    ]);
  }, [getSingleUserAirTicketDocumentRequest, docId]);

  return (
    <Row>
      {getSingleUserAirTicketDocumentRequestIsLoading ? (
        <LoaderSpiner />
      ) : (
        <div>
          <Card>
            <ToastContainer />
            <CardHeader className="d-flex justify-content-between align-items-center">
              <button
                className="button py-3 px-4"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Add Document Request
              </button>
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </CardHeader>
            <AirTicketDocumentRequestModalForm
              formHeader={'Add Document'}
              isOpen={addModalIsOpen}
              onClose={() => {
                setAddModalIsOpen(!addModalIsOpen);
              }}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              formSubmit={'Add Document'}
              setInitialValues={setInitialValues}
            />
            <CardBody>
              <CommonTableComponent
                headers={AllUploadDocumentsForStudentsData}
                data={isFilteredData || []}
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
      {getSingleUserAirTicketDocumentRequestIsLoading ? (
        <LoaderSpiner />
      ) : (
        <div>
          <Card>
            <ToastContainer />
            <CardHeader className="d-flex justify-content-between align-items-center">
              <button
                className="button py-3 px-4"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Add Document Request
              </button>
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </CardHeader>
            <AirTicketDocumentRequestModalForm
              formHeader={'Add Document'}
              isOpen={addModalIsOpen}
              onClose={() => {
                setAddModalIsOpen(!addModalIsOpen);
              }}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              formSubmit={'Add Document'}
              setInitialValues={setInitialValues}
            />
            <CardBody>
              <CommonTableComponent
                headers={AllUploadDocumentsForStudentsData}
                data={isFilteredData || []}
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
      {
        <StatusUpdateForm
          initialValues={rejectStatusInitialValues}
          OpenModal={openModal}
          toggle={togModal}
          handleAddSubmit={handleRejectStatus}
          submitBtn={'Send Notes'}
          validationSchema={Yup.object({
            notes: Yup.string().required('Notes is required'),
          })}
        />
      }
    </Row>
  );
};

export default AirTicketDocumentRequestPage;
