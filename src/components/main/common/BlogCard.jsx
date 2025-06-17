import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DOMPurify from 'dompurify';

const BlogCard = ({ blog }) => {
  const truncateText = (text, maxLength) => {
    const textContent = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };
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
      <div className="blog-card__body" style={{minHeight:'120px'}}>
        <header>
          <h5 className="blog-card__title">
            {blog?.title ? blog?.title : 'Blog Image'}
          </h5>
        </header>
        <p className="blog-card__description">
          {blog?.description ? truncateText(blog?.description, 150) : ''}{' '}
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
