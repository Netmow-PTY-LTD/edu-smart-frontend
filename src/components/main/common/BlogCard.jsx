import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <figure className="course-card__image">
        <Image
          src={
            blog?.image?.url
              ? blog?.image?.url
              : '/assets/images/landing/popularCourse/Program Image.png'
          }
          alt={blog?.title ? blog?.title : 'Blog Image'}
          width={500}
          height={300}
        />
      </figure>
      <div className="blog-card__body">
        <header>
          <h5 className="blog-card__title">
            {blog?.title ? blog?.title : 'Blog Image'}
          </h5>
        </header>
        <p className="blog-card__description">
          {blog?.description ? blog?.description : ''}{' '}
        </p>
      </div>
      <footer>
        <Link
          href={blog?.slug ? `/blog/${blog?.slug}` : ''}
          className="blog-card__button"
        >
          Read More <i className="ri-arrow-right-line"></i>
        </Link>
      </footer>
    </div>
  );
};

export default BlogCard;
