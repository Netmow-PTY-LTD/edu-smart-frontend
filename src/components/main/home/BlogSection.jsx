import React from 'react';
import BlogCard from '../common/blogCard';

const BlogSection = () => {
  return (
    <section className="blog-section ">
      <div className="container">
        <header className="blog-heading">
          <h5 className="blog-subtitle">EduSmart Insights</h5>
          <h4 className="blog-title">
            Expert Tips, University Updates, and Student Success Stories to
            Inspire Your Journey
          </h4>
        </header>

        <article className="blog-content">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </article>

        <div className="d-flex justify-content-center align-item-center">
          <button className="blog-button">
            Real More Articles <i class="ri-arrow-right-line ms-1"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
