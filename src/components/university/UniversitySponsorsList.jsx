import {
  useGetSingleUniversityQuery,
  useUniversitySponsorMutation,
} from '@/slice/services/super admin/universityService';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import * as Yup from 'yup';
import CommonTableComponent from '../common/CommonTableComponent';
import { convertImageUrlToFile } from '../common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '../common/SearchComponent';
import LoaderSpiner from '../constants/Loader/LoaderSpiner';
import UniversitySponsorModalForm from './Modal/UniversitySponsorsModalForm';

export default function UniversitySponsorsList({ university_id }) {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(5);
  const [previewImage, setPreviewImage] = useState('');
  const [sponsorId, setSponsorId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    link: '',
    start_date: '',
    end_date: '',
    logo: '',
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const [universitySponsor] = useUniversitySponsorMutation();
  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, 'maximum use 30 letters')
      .required('Name is required'),
    link: Yup.string().required('Link is required'),
    start_date: Yup.date().required('Start Date is required'),
    end_date: Yup.date().required('Start Date is required'),
    logo: Yup.mixed().required('The logo is required'),
  });

  useEffect(() => {
    if (getSingleUniversityData?.data?.sponsors && sponsorId) {
      setIsUpdateLoading(true);
      const sponsor =
        getSingleUniversityData?.data?.sponsors?.length > 0 &&
        getSingleUniversityData?.data?.sponsors?.find(
          (sponsor) => sponsor._id === sponsorId
        );

      if (sponsor) {
        const fetchedData = async () => {
          try {
            const file = sponsor?.logo?.url
              ? await convertImageUrlToFile(sponsor?.logo?.url)
              : '';

            setInitialValues({
              name: sponsor?.name || '',
              link: sponsor?.link || '',
              start_date: sponsor?.start_date || '',
              end_date: sponsor?.end_date || '',
              logo: file,
            });

            setPreviewImage(file !== '' ? URL.createObjectURL(file) : '');
            setEditModalIsOpen(true);
          } catch (error) {
            console.error('Error loading data:', error);
          }
        };
        fetchedData();
      }
      setIsUpdateLoading(false);
    }
  }, [getSingleUniversityData?.data?.sponsors, sponsorId]);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('logo', file);

      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleEditButtonClick = (id) => {
    setSponsorId(id);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatedData = { ...values, university_id: university_id };
    const finalData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value instanceof File) {
        finalData.append(key, value);
      } else {
        finalData.append(key, value);
      }
    });

    try {
      const finalData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await universitySponsor(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        setPreviewImage('');
        getSingleUniversityRefetch();
        setAddModalIsOpen(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSponsor = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const updatedData = {
      ...values,
      university_id: university_id,
      id: sponsorId,
    };
    const finalData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value instanceof File) {
        finalData.append(key, value); // Append the logo file directly
      } else {
        finalData.append(key, value);
      }
    });

    try {
      const finalData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await universitySponsor(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        handleEditModalClose();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const sponsorsHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {currentPage * perPageData + index + 1}
        </span>
      ),
    },

    { title: 'Sponsor Name', key: 'name' },
    {
      title: 'Website',
      key: 'link',
      render: (item, index) => (
        <span className="d-flex flex-column">{item?.link}</span>
      ),
    },
    {
      title: 'Sponsor Logo',
      key: 'logo',
      render: (item) => {
        if (item?.logo?.url) {
          return (
            <Image
              src={item?.logo?.url}
              width={80}
              height={80}
              alt="Sponsor Logo"
            />
          );
        }
        return null;
      },
    },

    {
      title: 'Start Date',
      key: 'start_date',
      render: (item) => (
        <span>
          {' '}
          {new Date(item?.start_date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </span>
      ),
    },

    {
      title: 'End Date',
      key: 'end_date',
      render: (item) => (
        <span>
          {new Date(item?.end_date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
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
                onClick={() => handleEditButtonClick(item?._id)}
              >
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
            {/* <DropdownItem>
              <div className="text-primary">
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Delete
              </div>
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  const handleEditModalClose = () => {
    getSingleUniversityRefetch();
    setSponsorId(null);
    setInitialValues({
      name: '',
      link: '',
      start_date: '',
      end_date: '',
      logo: '',
    });
    setPreviewImage('');
    setEditModalIsOpen(false);
  };

  // Filter data for search option
  const filteredData =
    getSingleUniversityData?.data?.sponsors?.length > 0 &&
    getSingleUniversityData?.data?.sponsors.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Col lg={10}>
      {getSingleUniversityIsLoading || isUpdateLoading ? (
        <LoaderSpiner />
      ) : (
        <>
          <div className="align-items-center d-flex fw-semibold card-header">
            <div className="d-flex align-items-center gap-4">
              <button
                className="button px-4 py-3"
                onClick={() => setAddModalIsOpen(!addModalIsOpen)}
              >
                Add New Sponsor
              </button>
            </div>
            <UniversitySponsorModalForm
              formHeader={'Add Sponsor'}
              onClose={() => {
                setAddModalIsOpen(!addModalIsOpen);
              }}
              isOpen={addModalIsOpen}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              formSubmit={'Add Sponsor'}
              setInitialValues={setInitialValues}
              handleImageChange={handleImageChange}
              previewImage={previewImage}
            />
            <SearchComponent
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <CommonTableComponent
            headers={sponsorsHeaders}
            data={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
            emptyMessage="No Data found yet."
          />
        </>
      )}

      {/* For updating sponsor */}

      <UniversitySponsorModalForm
        formHeader={'Edit Sponsor'}
        onClose={handleEditModalClose}
        isOpen={editModalIsOpen}
        onSubmit={handleUpdateSponsor}
        initialValues={initialValues}
        formSubmit={'Update Sponsor'}
        handleImageChange={handleImageChange}
        previewImage={previewImage}
      />
    </Col>
  );
}
