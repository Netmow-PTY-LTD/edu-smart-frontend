import Image from 'next/image';
import React from 'react';

const BlogCard = () => {
  return (
    <div class="course-card">
      <figure class="course-card__image">
        <Image
          src="/assets/images/landing/popularCourse/Program Image.png"
          alt="MBA in International Business at Harvard University"
          width={500}
          height={300}
        />
      </figure>
      <div class="blog-card__body">
        <header>
          <h5 class="blog-card__title">
            Top 10 Countries for International Students in 2024
          </h5>
        </header>
        <p class="blog-card__description">
          Discover the best destinations offering world-class education,
          affordable living, and vibrant student life.
        </p>
      </div>
      <footer>
        <button class="blog-card__button">
          Read More <i class="ri-arrow-right-line"></i>
        </button>
      </footer>
    </div>
  );
};

export default BlogCard;
