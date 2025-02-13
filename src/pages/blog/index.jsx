import BlogCard from '@/components/main/common/BlogCard';
import PageBanner from '@/components/main/common/PageBanner';
import MainLayout from '@/components/main/layout';
import { useGetAllBlogsQuery } from '@/slice/services/public/blogs/publicBlogsServices';
import React from 'react';

export default function Blog() {
  const { data: allBlogs } = useGetAllBlogsQuery();

  return (
    <MainLayout>
      <PageBanner
        title="All Blogs"
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />
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
              allBlogs?.data?.map((item, i) => (
                <BlogCard blog={item} key={i} />
              ))}
          </article>

          {/* <div className="d-flex justify-content-center align-item-center">
          <button className="blog-button">
            Real More Articles <i className="ri-arrow-right-line ms-1"></i>
          </button>
        </div> */}
        </div>
      </section>
    </MainLayout>
  );
}
