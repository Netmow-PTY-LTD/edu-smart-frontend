import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import UniversityModalForm from '@/components/sAdminDashboard/modals/UniversityModalForm';
import {
  useAddUniversityMutation,
  useGetUniversityQuery,
} from '@/slice/services/universityService';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import * as Yup from 'yup';

const AllUniversityForSuperAdmin = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const {
    data: getUniversityData,
    error: getUniversityError,
    isLoading: getUniversityIsLoading,
  } = useGetUniversityQuery();

  const [
    addUniversity,
    {
      data: addUniversityData,
      error: addUniversityError,
      isLoading: addUniversityIsLoading,
      isSuccess: addUniversityIsSuccess,
    },
  ] = useAddUniversityMutation();

  // Define initial form values
  const initialValues = {
    name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    code: '',
    description: '',
    logo: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, 'maximum use 30 letters')
      .required('Name is required'),
    address_line_1: Yup.string().required('address_line_1 is required'),
    address_line_2: Yup.string().required('address_line_2 is required'),
    city: Yup.string().required('city is required'),
    state: Yup.string().required('state is required'),
    country: Yup.string().required('country is required'),
    zip: Yup.string().required('zip is required'),
    code: Yup.string().required('code is required'),
    description: Yup.string().required('description is required'),
    logo: Yup.string().required('logo is required'),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    const finalData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      finalData.append(key, value);
    });
    addUniversity(finalData);
    setTimeout(() => {
      console.log('Form values:', values);
      setSubmitting(false);
      setModalIsOpen(!modalIsOpen);
    }, 400);
  };

  // Handle search input change
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data based on the search term
  const isfilteredData =
    getUniversityData?.data?.length > 0 &&
    getUniversityData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Define table headers with custom render functions
  const headers = [
    {
      title: 'Logo',
      key: 'logo',
      render: (item) => (
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0 me-1">
            <Link href={''} className="text-reset">
              <Image
                src={item?.logo?.url ? item?.logo?.url : `${userDummyImage}`}
                alt="User"
                height={60}
                width={60}
                className="avatar-md p-1 me-3 align-middle rounded-circle"
              />
            </Link>
          </div>
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              <Link href={''} className="text-reset">
                {`${item.name} `}
              </Link>
            </h5>
          </div>
        </div>
      ),
    },

    { title: 'Description', key: 'description' },
    { title: 'Code', key: 'code' },
    {
      title: 'Address',
      key: 'address',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.address_line_1 ? <span>{item.address_line_1}</span> : '-'}
          {item?.address_line_2 ? <span>{item.address_line_2}</span> : '-'}
          {item?.city ? <span>{item.city}</span> : '-'}
          {item?.state ? <span>{item.state}</span> : '-'}
          {item?.zip ? <span>{item.zip}</span> : '-'}
          {item?.country ? <span>{item.country}</span> : '-'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (item) => (
        <UncontrolledDropdown className="card-header-dropdown">
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
                // onClick={() => handleEdit(item._id)}
                className="text-primary"
              >
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
            <DropdownItem>
              <div
                // onClick={() => handleDelete(item._id)}
                className="text-primary"
              >
                <i className="ri-close-circle-fill align-start me-2 text-muted"></i>
                Inactive
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            {getUniversityIsLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <button
                    className="button px-3 py-2"
                    onClick={() => setModalIsOpen(!modalIsOpen)}
                  >
                    Add New
                  </button>
                  <UniversityModalForm
                    formHeader={'Add New'}
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(modalIsOpen)}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    formSubmit={'Submit'}
                  />
                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={headers}
                    data={isfilteredData ? isfilteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No players found. Please add a player."
                  />
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUniversityForSuperAdmin;
