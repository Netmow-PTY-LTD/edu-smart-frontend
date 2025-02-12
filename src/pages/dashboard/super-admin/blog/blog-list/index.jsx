import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAllBlogsQuery } from '@/slice/services/public/blogs/publicBlogsServices';
import { useDeleteBlogMutation } from '@/slice/services/super admin/superAdminBlogServices';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

export default function ContactMessages() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: allBlogs,
    isLoading: isAllBlogsLoading,
    error: allBlogsError,
    refetch: allBlogsRefetch,
  } = useGetAllBlogsQuery();

  console.log(allBlogs?.data);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredData =
    allBlogs?.data?.length > 0 &&
    allBlogs?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  console.log(filteredData);

  const [
    deleteBlog,
    {
      data: deleteBlogData,
      error: deleteBlogError,
      isLoading: deleteBlogIsLoading,
    },
  ] = useDeleteBlogMutation();

  const handleDeleteBlog = async (id) => {
    try {
      const result = await deleteBlog(id).unwrap();
      if (result) {
        toast.success(result?.message);
        allBlogsRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  const blogListHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {currentPage * perPageData + (index + 1)}
        </span>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => (
        <h5 className="fs-14 fw-medium text-capitalize">
          {item?.title ? item?.title : ''}
        </h5>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <h5 className="fs-14 fw-medium">
          {item?.description ? item?.description : ''}
        </h5>
      ),
    },
    {
      title: 'Image',
      key: 'image',
      render: (item) => (
        <>
          <div>
            <Image
              src={item?.image?.url ? item?.image?.url : ''}
              width={80}
              height={80}
              alt="image"
            />
          </div>
        </>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (item) => (
        <div
          className="text-danger fw-medium cursor-pointer"
          onClick={() => handleDeleteBlog(item?._id)}
        >
          <i className="ri-close-circle-fill align-start me-2 "></i>
          Delete
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="page-content">
        <div className="container">
          <ToastContainer />
          {isAllBlogsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h2>Blog List</h2>
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>
              <CardBody>
                <div className="contact-message-table">
                  <CommonTableComponent
                    headers={blogListHeaders}
                    data={filteredData ? filteredData : []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPageData={perPageData}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    emptyMessage="No Data found yet."
                  />
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
