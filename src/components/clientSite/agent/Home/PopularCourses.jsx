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
          <div class="course-card">
            <figure class="course-card__image">
              <img
                src="/assets/images/agent/Program Image.png"
                alt="MBA in International Business at Harvard University"
              />
            </figure>
            <div class="course-card__body">
              <header>
                <h6 class="course-card__university">
                  <i class="course-card__icon ri-map-pin-fill"></i>
                  Harvard University
                </h6>
                <h5 class="course-card__title">
                  MBA in International Business
                </h5>
              </header>
              <p class="course-card__description">
                Gain global leadership skills and expertise in international
                markets, preparing you for top executive roles worldwide.
              </p>
            </div>
            <footer>
              <button class="course-card__button">View Details</button>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PopularCourses;
