import React from 'react';

const PopularCourses = () => {
  return (
    <section className="popular-coureses-section ">
      <div className="container">
        <header className="popular-coureses-heading">
          <h5 className="popular-coureses-subtitle">
            Looking For Most Popular Programs?
          </h5>
          <h4 className="popular-coureses-title">
            Discover The Most Popular Courses That Shape Your Future
          </h4>
        </header>

        <article className="popular-coureses-content">
          <article class="course-card">
            <figure class="course-card__image">
              <img
                src="#"
                alt="MBA in International Business at Harvard University"
              />
            </figure>
            <header class="course-card__header">
              <h6 class="course-card__university">
                <i class="course-card__icon">icon</i> Harvard University
              </h6>
              <h2 class="course-card__title">MBA in International Business</h2>
            </header>
            <p class="course-card__description">
              Gain global leadership skills and expertise in international
              markets, preparing you for top executive roles worldwide.
            </p>
            <footer class="course-card__footer">
              <button class="course-card__button">View Details</button>
            </footer>
          </article>
        </article>
      </div>
    </section>
  );
};

export default PopularCourses;
