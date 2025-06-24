import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import RequiredDocemtsModal from '@/components/sAdminDashboard/modals/requireDocuments';
import {
  useAddRequiredDocumentInSuperAdminMutation,
  useDeleteRequiredDocumentInSuperAdminMutation,
  useGetRequiredDocumentInSuperAdminQuery,
  useUpdateRequiredDocumentInSuperAdminMutation,
} from '@/slice/services/super admin/requiredService';
import DataObjectComponent from '@/utils/common/data';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import * as Yup from 'yup';

const AllDocumentsInSuperAdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [requiredDocumentId, setRequiredDocumentId] = useState('');
  const [deleteRequiredDocumentId, setDeleteRequiredDocumentId] = useState('');
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
  });

  const { documentHeaders = [] } = DataObjectComponent();

  const [addRequiredDocumentInSuperAdmin] =
    useAddRequiredDocumentInSuperAdminMutation();
  const [
    updateRequiredDocumentInSuperAdmin,
    { isLoading: updateRequiredDocumentInSuperAdminIsLoading },
  ] = useUpdateRequiredDocumentInSuperAdminMutation();
  const [
    deleteRequiredDocumentInSuperAdmin,
    { isLoading: deleteRequiredDocumentInSuperIsLoading },
  ] = useDeleteRequiredDocumentInSuperAdminMutation();

  const {
    data: getRequiredDocumentData,
    isLoading: getRequiredDocumentIsLoading,
    refetch: getRequiredDocumentRefetch,
  } = useGetRequiredDocumentInSuperAdminQuery();

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    title: Yup.string().required('Title is required'),
  });

  useEffect(() => {
    if (getRequiredDocumentData?.data?.length > 0 && requiredDocumentId) {
      const fetchData = async () => {
        const singleCouponData = getRequiredDocumentData?.data?.find(
          (item) => item?._id === requiredDocumentId
        );

        try {
          setInitialValues({
            title: singleCouponData?.title || '',
            description: singleCouponData?.description || '',
          });
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
      fetchData();
    }
  }, [getRequiredDocumentData?.data, requiredDocumentId]);

  // add RequiredDocument handler
  const handleAddSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const response = await addRequiredDocumentInSuperAdmin(values).unwrap();

      if (response) {
        toast.success(response?.message);
        getRequiredDocumentRefetch();
        resetForm();
        setOpenModal(!openModal);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // update  RequiredDocument handler
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const editData = {
      title: values?.title,
      description: values?.description,
      RequiredDocument_id: requiredDocumentId,
    };

    try {
      const response =
        await updateRequiredDocumentInSuperAdmin(editData).unwrap();
      if (response) {
        toast.success(response?.message);
        getRequiredDocumentRefetch();
        resetForm();
        setRequiredDocumentId('');
        setEditOpenModal(!editOpenModal);
        setInitialValues({});
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const togOpenModal = () => {
    setOpenModal(!openModal);
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    getRequiredDocumentData?.data?.length > 0 &&
    getRequiredDocumentData?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const togEditOpenModal = (id) => {
    setRequiredDocumentId(id);
    setEditOpenModal(!editOpenModal);
  };

  const togDeleteModal = (itemId) => {
    setDeleteRequiredDocumentId(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteRequiredDocumentInSuperAdmin(id).unwrap();
      if (result) {
        toast.success(result?.message);
        getRequiredDocumentRefetch();
        setDeleteRequiredDocumentId('');
        setDeleteModalIsOpen(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  const allDocumentHeaderAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <div
        onClick={() => togEditOpenModal(item._id)}
        className="text-primary cursor-pointer"
      >
        <i className="ri-pencil-fill align-start me-2 text-muted"></i>
        Edit
      </div>
    ),
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="text-secondary-alt fw-semibold d-flex align-items-center">
                  Document Required List
                </h1>
              </div>
              <div onClick={togOpenModal}>
                <button className="button px-4 py-2">
                  Add New <i className="ri-add-line fw-bolder"></i>
                </button>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h2>Document Required List</h2>
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>
                <CardBody>
                  <div>
                    {/* {getDocumentIsLoading ? (
                      <LoaderSpiner />
                    ) : ( */}
                    <>
                      <CardBody>
                        <CommonTableComponent
                          headers={[
                            ...documentHeaders,
                            allDocumentHeaderAction,
                          ]}
                          data={isFilteredData ? isFilteredData : []}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          searchTerm={searchTerm}
                          handleSearchChange={handleSearchChange}
                          emptyMessage="No Data found yet."
                        />
                      </CardBody>
                    </>
                    {/* )} */}
                  </div>
                </CardBody>
              </Card>
            </div>

            {
              // Add Document
              <RequiredDocemtsModal
                open={openModal}
                close={togOpenModal}
                modalHeader={'Add New Document'}
                submitButton={'Add Document'}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleAddSubmit}
              />
            }

            {
              // edit Coupon
              <RequiredDocemtsModal
                open={editOpenModal}
                close={() => (
                  setRequiredDocumentId(''),
                  setEditOpenModal(!editOpenModal),
                  setInitialValues({})
                )}
                modalHeader={'Update Document'}
                submitButton={'Update'}
                initialValues={initialValues}
                handleSubmit={handleUpdateSubmit}
                isLoading={updateRequiredDocumentInSuperAdminIsLoading}
                validationSchema={validationSchema}
              />
            }
            {
              <DeleteModal
                Open={deleteModalIsOpen}
                close={() => (
                  setDeleteRequiredDocumentId(''), setDeleteModalIsOpen(false)
                )}
                id={deleteRequiredDocumentId}
                handleDelete={handleDelete}
                isloading={deleteRequiredDocumentInSuperIsLoading}
              />
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllDocumentsInSuperAdminDashboard;
