import React, { useEffect, useState } from 'react';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import {
  useGetSingleUniversityQuery,
} from '@/slice/services/super admin/universityService';
import CommonTableComponent from '@/components/common/CommonTableComponent';

import UniversityFaqModalForm from './modals/FaqModalForm';
import { useUpdateUniversityFaqMutation } from '@/slice/services/university-administration/api/universityAdministrationFaqService';

export default function UniversityFaqList({ university_id }) {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(5);
  const [faqId, setFaqId] = useState('');
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
  });
  const validationSchema = Yup.object({
    title: Yup.string().required('title is required'),
    description: Yup.string().required('description is required'),
  });

  const [universityFaq] = useUpdateUniversityFaqMutation();
  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  const handleEditButtonClick = (id) => {
    const faq = getSingleUniversityData?.data?.faqs?.find(
      (faq) => faq._id === id
    );
    if (faq) {
      setInitialValues({
        title: faq.title || '',
        description: faq.description || '',
      });
    }
    setFaqId(id);
    setEditModalIsOpen(true);
  };


  const handleFaqSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
       const faqData = { data:values, university_id: university_id };
      
    try {
      const result = await universityFaq(faqData).unwrap();
     
      if (result) {
        toast.success(result?.message);
        setAddModalIsOpen(!addModalIsOpen);
        getSingleUniversityRefetch()
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateFaq = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updateFaqData = { data:{id: faqId, ...values} , university_id: university_id };
    
    try {
      const result = await universityFaq(updateFaqData).unwrap();
      if (result) {
        toast.success(result?.message);
        setEditModalIsOpen(!editModalIsOpen);
        getSingleUniversityRefetch()
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  

 
  const faqsHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Quesstion', key: 'title' },
    { title: 'Answers', key: 'description' },

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
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  return (
    <Col lg={10}>
      <div className="align-items-center d-flex fw-semibold card-header">
        <h4 className="fw-semibold fs-20 text-black mb-0">Faqs List</h4>
        <button
          className="button px-4 py-3"
          onClick={() => 
          {
            setInitialValues({
              title: '',
              description: '',
            });
            setAddModalIsOpen(!addModalIsOpen)
          }
            
          }
        >
          Add New Faq
        </button>
      </div>
      <CommonTableComponent
        headers={faqsHeaders}
        data={getSingleUniversityData?.data?.faqs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPageData={perPageData}
        emptyMessage="No Data found yet."
      />

      {/* creating faq */}
      <UniversityFaqModalForm
        formHeader={'Add Faq'}
        onClose={() => {
          setAddModalIsOpen(!addModalIsOpen);
        }}
        isOpen={addModalIsOpen}
        onSubmit={handleFaqSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={'Add Faq'}
        setInitialValues={setInitialValues}
      />

      {/* For updating Faq */}

      <UniversityFaqModalForm
        formHeader={'Edit Faq'}
        onClose={() => {
          setEditModalIsOpen(!editModalIsOpen);
        }}
        isOpen={editModalIsOpen}
        onSubmit={handleUpdateFaq}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={'Update Faq'}
        setInitialValues={setInitialValues}
      />

     
    </Col>
  );
}
