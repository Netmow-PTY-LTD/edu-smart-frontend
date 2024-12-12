import React, { useEffect, useState } from 'react';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import CommonTableComponent from '../common/CommonTableComponent';
import Image from 'next/image';
import * as Yup from 'yup';
import UniversitySponsorModalForm from './Modal/UniversitySponsorsModalForm';
import {
  useGetSingleUniversityQuery,
  useUniversitySponsorMutation,
} from '@/slice/services/super admin/universityService';
import { toast } from 'react-toastify';
import EditUniversitySponsorModalForm from './Modal/EditUniversitySponsorsModalForm';
import { convertImageUrlToFile } from '../common/helperFunctions/ConvertImgUrlToFile';

export default function UniversitySponsorsList({ university_id }) {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(5);
  const [previewImage, setPreviewImage] = useState('');
  const [sponsorId, setSponosorId] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    link: '',
    start_date: '',
    end_date: '',
    logo: '',
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

  const handleImageChange = (e, setFieldValue) => {
    console.log('clicked');
    const file = e.target.files[0];
    if (file) {
      setFieldValue('logo', file);

      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const [universitySponsor] = useUniversitySponsorMutation();
  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  const handleEditButtonClick = (id) => {
    setSponosorId(id);
    setEditModalIsOpen(true);
  };

  console.log(sponsorId);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);

    const updatedData = { ...values, university_id: university_id };
    console.log(updatedData);
    const finalData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value instanceof File) {
        finalData.append(key, value); // Append the logo file directly
      } else {
        finalData.append(key, value);
      }
    });

    for (let [key, value] of finalData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const finalData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await universitySponsor(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        setAddModalIsOpen(!addModalIsOpen);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  //console.log(getSingleUniversityData?.data?.sponsors[0].name);

  useEffect(() => {
    if (
      getSingleUniversityData?.data?.sponsors &&
      getSingleUniversityData?.data?.sponsors?.length > 0
    ) {
      const sponsor = getSingleUniversityData?.data?.sponsors?.find(
        (sponsor) => sponsor._id === sponsorId
      );
      console.log(sponsor);
      const fetchData = async () => {
        try {
          const file = await convertImageUrlToFile(
            sponsor?.logo ? sponsor?.logo?.url : ''
          );

          setInitialValues({
            name: sponsor?.name || '',
            link: sponsor?.link || '',
            start_date: sponsor?.start_date || '',
            end_date: sponsor?.end_date || '',
            logo: file,
          });

          setPreviewImage(URL.createObjectURL(file));
          setEditModalIsOpen(true);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getSingleUniversityData?.data?.sponsors, sponsorId]);

  const handleUpdateSponsor = async (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);

    const updatedData = { ...values, university_id: university_id };
    console.log(updatedData);
    const finalData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value instanceof File) {
        finalData.append(key, value); // Append the logo file directly
      } else {
        finalData.append(key, value);
      }
    });

    for (let [key, value] of finalData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const finalData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await universitySponsor(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        setEditModalIsOpen(!editModalIsOpen);
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
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Sponsor Name', key: 'name' },
    {
      title: 'Website',
      key: 'link',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{item?.link}</span>
      ),
    },
    {
      title: 'Sponsor Logo',
      key: 'logo',
      render: (item) => (
        <Image src={item?.logo?.url || ''} width={80} height={80} />
      ),
    },

    {
      title: 'Startdate',
      key: 'start_date',
      render: (item) => <span>{item?.start_date}</span>,
    },

    {
      title: 'End date',
      key: 'end_date',
      render: (item) => <span>{item?.end_date}</span>,
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

  return (
    <Col lg={10}>
      <div className="align-items-center d-flex fw-semibold card-header">
        <h4 className="fw-semibold fs-20 text-black mb-0">Sponsors List</h4>
        <button
          className="button px-4 py-3"
          onClick={() => setAddModalIsOpen(!addModalIsOpen)}
        >
          Add New Sponsor
        </button>
      </div>
      <CommonTableComponent
        headers={sponsorsHeaders}
        data={getSingleUniversityData?.data?.sponsors}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPageData={perPageData}
        emptyMessage="No Data found yet."
      />
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

      {/* For updating sponsor */}

      <UniversitySponsorModalForm
        formHeader={'Edit Sponsor'}
        onClose={() => {
          setEditModalIsOpen(!editModalIsOpen);
        }}
        isOpen={editModalIsOpen}
        onSubmit={handleUpdateSponsor}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={'Update Sponsor'}
        setInitialValues={setInitialValues}
        handleImageChange={handleImageChange}
        previewImage={previewImage}
      />
    </Col>
  );
}
