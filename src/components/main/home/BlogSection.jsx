import React from 'react';
import BlogCard from '../common/BlogCard';
import { useGetAllBlogsQuery } from '@/slice/services/public/blogs/publicBlogsServices';

const BlogSection = () => {
  const { data: allBlogs } = useGetAllBlogsQuery();

  return (
    <section className="blog-section ">
      <div className="container">
        <div className="blog-heading">
          <h5 className="blog-subtitle">EduSmart Insights</h5>
          <h4 className="blog-title">
            Expert Tips, University Updates, and Student Success Stories to
            Inspire Your Journey
          </h4>
        </div>

        <article className="blog-content">
          {allBlogs?.data?.length > 0 &&
            allBlogs?.data?.map((item, i) => <BlogCard blog={item} key={i} />)}
        </article>

        {/* <div className="d-flex justify-content-center align-item-center">
          <button className="blog-button">
            Real More Articles <i className="ri-arrow-right-line ms-1"></i>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default BlogSection;
