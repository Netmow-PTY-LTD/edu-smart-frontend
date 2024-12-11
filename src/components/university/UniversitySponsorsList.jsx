import React, { useState } from 'react';
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

export default function UniversitySponsorsList({ university_id }) {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(5);
  const [initialValues, setInitialValues] = useState({
    logo: null,
  });

  const [universitySponsor] = useUniversitySponsorMutation();
  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  const validationSchema = Yup.object({});

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
              <div className="text-primary">
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="text-primary">
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Delete
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatedData = { ...values, university_id: university_id };

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
        formSubmit={'Submit'}
        setInitialValues={setInitialValues}
      />
    </Col>
  );
}
