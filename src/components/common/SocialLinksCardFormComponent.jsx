import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import * as Yup from 'yup';
import SocialLinksModalForm from '../sAdminDashboard/modals/SocialLinksModalForm';

const SocialLinksCardFormComponent = ({
  university_id,
  getSingleUniversityData,
}) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [socialLinkIdForEdit, setSocialLinkIdForEdit] = useState(null);
  const [socialLinkIdForDelete, setSocialLinkIdForDelete] = useState(null);

  const perPageData = 5;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    facebook: '',
    whatsapp: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });

  useEffect(() => {
    if (getSingleUniversityData && socialLinkIdForEdit) {
      const fetchData = async () => {
        try {
          setInitialValues({
            facebook: getSingleUniversityData?.facebook || '',
            whatsapp: getSingleUniversityData?.whatsapp || '',
            twitter: getSingleUniversityData?.twitter || '',
            linkedin: getSingleUniversityData?.linkedin || '',
            instagram: getSingleUniversityData?.instagram || '',
            youtube: getSingleUniversityData?.youtube || '',
          });
          setEditModalIsOpen(true);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getSingleUniversityData, socialLinkIdForEdit]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    facebook: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.cop'
      )
      .required('Name is required'),
    whatsapp: Yup.string()
      .matches(
        /^\+?(\d{1,4})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/,
        'Please enter a valid WhatsApp number, e.g., +1234567890 or +1-234-567-890'
      )
      .required('WhatsApp number is required'),
    twitter: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.cop'
      )
      .required('Name is required'),
    linkedin: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.cop'
      )
      .required('Name is required'),
    instagram: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.cop'
      )
      .required('Name is required'),
    youtube: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.cop'
      )
      .required('Name is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log('Form values:', values);

    try {
      const finalData = { ...values, university_id: university_id };

      // const result = await addSocialLink(finalData).unwrap();

      // if (result) {
      //   toast.success(result?.message || 'Social link added successfully!');
      //   setAddModalIsOpen(false);
      //   resetForm();
      // }
    } catch (error) {
      const errorMessage =
        error?.data?.message || 'An error occurred while submitting the form';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditButtonClick = (itemId) => {
    setSocialLinkIdForEdit(itemId);
  };

  const handleEditModalClose = () => {
    // getSingleSocialLinkRefetch();
    setSocialLinkIdForEdit(null);
    setInitialValues({
      name: '',
      description: '',
    });
    setEditModalIsOpen(false);
  };

  const handleUpdateSocialLink = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const finalData = {
      ...values,
      id: socialLinkIdForEdit,
    };

    // try {
    //   const result = await updateSocialLink(finalData).unwrap();
    //   if (result) {
    //     toast.success(result?.message);

    //     handleEditModalClose();
    //     setSocialLinkIdForEdit(null);
    //   }
    // } catch (error) {
    //   const errorMessage = error?.data?.message;
    //   toast.error(errorMessage);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const handleDeleteButtonClick = (itemId) => {
    setSocialLinkIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteSocialLink = async (id) => {
    console.log(id);
    // try {
    //   const result = await deleteSocialLink({
    //     university_id: university_id,
    //     socialLink_id: id,
    //   }).unwrap();
    //   if (result) {
    //     toast.success(result?.message);

    //     handleDeleteButtonClick();
    //   }
    // } catch (error) {
    //   const errorMessage = error?.data?.message;
    //   toast.error(errorMessage);
    // } finally {
    //   //
    // }
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Define table headers with custom render functions
  const headers = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize ">{index + 1}</span>
      ),
    },

    { title: 'Facebook', key: 'facebook' },
    { title: 'Whatsapp', key: 'whatsapp' },
    { title: 'Twitter', key: 'twitter' },
    { title: 'Linkedin', key: 'linkedin' },
    { title: 'Instagram', key: 'instagram' },
    { title: 'Youtube', key: 'youtube' },

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
                onClick={() => handleEditButtonClick(item?._id)}
                className="text-primary"
              >
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
            <DropdownItem>
              <div
                onClick={() => handleDeleteButtonClick(item._id)}
                className="text-primary"
              >
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Delete
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  const socialLinkFields = [
    { name: 'facebook', label: 'Facebook:' },
    { name: 'whatsapp', label: 'Whatsapp:' },
    { name: 'twitter', label: 'Twitter:' },
    { name: 'instagram', label: 'Instagram:' },
    { name: 'linkedin', label: 'Linkedin:' },
    { name: 'youtube', label: 'Youtube:' },
  ];

  return (
    <Col lg={10}>
      <ToastContainer />
      {/* {'getSocialLinkIsLoading' ? (
        <LoaderSpiner />
      ) : ( */}
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <button
            className="button px-3 py-2"
            onClick={() => setAddModalIsOpen(!addModalIsOpen)}
          >
            Add New
          </button>
          <SocialLinksModalForm
            formHeader={'Add New'}
            isOpen={addModalIsOpen}
            onClose={() => {
              setAddModalIsOpen(!addModalIsOpen);
            }}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            formSubmit={'Submit'}
            fields={socialLinkFields}
          />
        </CardHeader>

        <CardBody>
          <CommonTableComponent
            headers={headers}
            data={getSingleUniversityData ? [getSingleUniversityData] : []}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            emptyMessage="No Data found yet."
          />
        </CardBody>
      </Card>

      {/* )} */}

      {/* for update socialLink */}
      <SocialLinksModalForm
        formHeader="Update Data"
        isOpen={editModalIsOpen}
        onClose={handleEditModalClose}
        onSubmit={handleUpdateSocialLink}
        initialValues={initialValues}
        formSubmit="Update"
        fields={socialLinkFields}
      />

      {/* Delete SocialLink */}
      <DeleteModal
        Open={deleteModalIsOpen}
        close={handleDeleteButtonClick}
        id={socialLinkIdForDelete}
        handleDelete={handleDeleteSocialLink}
        // isloading={deleteSocialLinkIsLoading}
      />
    </Col>
  );
};

export default SocialLinksCardFormComponent;
