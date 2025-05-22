'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import CommonTableComponent from '@/components/common/CommonTableComponent';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import SingleDocUploadForm from '@/components/StudentDashboard/components/SingleDocUploadForm';

import { useGetSingleUserDocRequestQuery } from '@/slice/services/common/commonDocumentService';
import { useUpdateSingleDocumentForStudentMutation } from '@/slice/services/student/studentSubmitDocumentService';

import DataObjectComponent from '@/utils/common/data';
import { currentUser } from '@/utils/currentUserHandler';

const AllUploadDocumentsComponent = () => {
  const user = currentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState('');
  const perPageData = 10;

  const [initialValues, setInitialValues] = useState({
    title: '',
    document: '',
    description: '',
  });

  const { studentRequestDocumentsHeaderWithoutAction = [] } =
    DataObjectComponent();

  const {
    data: getSingleStudentDocRequest,
    isLoading: getSingleStudentDocRequestIsLoading,
    refetch: getSingleStudentDocRequestRefetch,
  } = useGetSingleUserDocRequestQuery({ student_id: user?.id });

  const [submitSingleDocumentForStudent] =
    useUpdateSingleDocumentForStudentMutation();

  const validationSchema = Yup.object({
    document: Yup.array()
      .of(
        Yup.mixed()
          .test(
            'fileFormat',
            'Only PDF, JPG, PNG files are allowed',
            (value) => {
              if (value) {
                const fileType = value.type;
                return (
                  fileType === 'application/pdf' ||
                  fileType === 'image/jpeg' ||
                  fileType === 'image/png'
                );
              }
              return false;
            }
          )
          .test('fileSize', 'File size must be 5MB or less', (value) => {
            if (value) return value.size <= 5 * 1024 * 1024;
            return false;
          })
      )
      .required('Documents are required')
      .min(1, 'At least one document is required')
      .max(5, 'You can upload a maximum of 5 documents'),
  });

  useEffect(() => {
    const fetchFile = async () => {
      const requestData = getSingleStudentDocRequest?.data?.find(
        (item) => item?._id === docId
      );
      if (!requestData) return;

      const files = await Promise.all(
        requestData?.files?.map(
          async (file) => await convertImageUrlToFile(file.url)
        )
      );

      setInitialValues({
        title: requestData?.title || '',
        document: files || '',
        description: requestData?.description || '',
      });
    };

    fetchFile();
  }, [getSingleStudentDocRequest, docId]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const isfilteredData =
    getSingleStudentDocRequest?.data?.length > 0 &&
    getSingleStudentDocRequest?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const togModal = (id) => {
    setInitialValues({
      title: '',
      document: '',
      description: '',
    });
    setDocId(id);
    setOpenModal(!openModal);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const submited_date = new Date().toISOString();
    const updatedata = {
      ...values,
      id: docId,
      status: 'submitted',
      submited_date,
    };

    try {
      const finalData = new FormData();
      Object.entries(updatedata).forEach(([key, value]) => {
        if (key === 'document' && Array.isArray(value)) {
          value.forEach((item) => {
            finalData.append(`${key}`, item);
          });
        } else {
          finalData.append(key, value);
        }
      });
      const result = await submitSingleDocumentForStudent(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleStudentDocRequestRefetch();
        setOpenModal(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const uploadAction = [
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => (
        <button
          onClick={() => togModal(item?._id)}
          className="button d-flex px-3 py-1"
        >
          Upload
        </button>
      ),
    },
  ];

  return (
    <>
      {getSingleStudentDocRequestIsLoading ? (
        <LoaderSpiner />
      ) : (
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <h1>Document Upload Request</h1>
            <SearchComponent
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </CardHeader>
          <CardBody>
            <CommonTableComponent
              headers={[
                ...studentRequestDocumentsHeaderWithoutAction,
                ...uploadAction,
              ]}
              data={isfilteredData || []}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              emptyMessage="No Data found yet."
            />
          </CardBody>
        </Card>
      )}
      <SingleDocUploadForm
        initialValues={initialValues}
        OpenModal={openModal}
        toggle={togModal}
        handleAddSubmit={handleSubmit}
        submitBtn="Upload"
        validationSchema={validationSchema}
      />
    </>
  );
};

export default AllUploadDocumentsComponent;
