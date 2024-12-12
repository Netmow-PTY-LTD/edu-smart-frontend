import Image from 'next/image';
import userImage from '../../../../../public/assets/images/landing/testimonials/user-picture.jpg';

const UniversityTestimonials = ({ university }) => {
  const image = null;
  return (
    <section className="testimonial-section">
      <div className="testimonal-section-content">
        <h3 className="testimonial-title">Testimonials</h3>
        <p className="testimonial-description">
          Malaysia started focusing on the development of telecommunication,
          Telekom Malaysia Berhad (TM) took a leap of faith by establishing the
          first private-owned higher learning institute.
        </p>
        <div className="testimonial-feedback  d-flex flex-column flex-lg-row gap-3">
          {/* testimonial card 1 */}
          <div className="feedback-card">
            <div className="feedback-card__header">
              {image ? (
                <figure className="feedback-card__user-picture">
                  <Image
                    src={image}
                    alt="User Picture"
                    width={80}
                    height={80}
                    className="rounded-circle"
                  />
                </figure>
              ) : (
                <figure className="feedback-card__user-picture">
                  <Image
                    src={userImage}
                    alt="User Picture"
                    width={80}
                    height={80}
                    className="rounded-circle"
                  />
                </figure>
              )}
              <div className="feedback-card__info">
                <h5 className="feedback-card__user-name">Emanuel</h5>
                <p className="feedback-card__user-designation">Supervisor</p>
                <p className="feedback-card__rating mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                </p>
              </div>
            </div>
            <p className="feedback-card__feedback">
              But in certain circumstances and owing to the claims of duty or
              the obligations of business it will frequently occur that ..
            </p>
          </div>
          {/* testimonial card 2 */}
          <div className="feedback-card">
            <div className="feedback-card__header">
              {image ? (
                <figure className="feedback-card__user-picture">
                  <Image
                    src={image}
                    alt="User Picture"
                    width={80}
                    height={80}
                    className="rounded-circle"
                  />
                </figure>
              ) : (
                <figure className="feedback-card__user-picture">
                  <Image
                    src={userImage}
                    alt="User Picture"
                    width={80}
                    height={80}
                    className="rounded-circle"
                  />
                </figure>
              )}
              <div className="feedback-card__info">
                <h5 className="feedback-card__user-name">Emanuel</h5>
                <p className="feedback-card__user-designation">Supervisor</p>
                <p className="feedback-card__rating mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                </p>
              </div>
            </div>
            <p className="feedback-card__feedback">
              But in certain circumstances and owing to the claims of duty or
              the obligations of business it will frequently occur that ..
            </p>
          </div>
          {/* testimonial card 3 */}
          <div className="feedback-card">
            <div className="feedback-card__header">
              {image ? (
                <figure className="feedback-card__user-picture">
                  <Image
                    src={image}
                    alt="User Picture"
                    width={80}
                    height={80}
                    className="rounded-circle"
                  />
                </figure>
              ) : (
                <figure className="feedback-card__user-picture">
                  <Image
                    src={userImage}
                    alt="User Picture"
                    width={80}
                    height={80}
                    className="rounded-circle"
                  />
                </figure>
              )}
              <div className="feedback-card__info">
                <h5 className="feedback-card__user-name">Emanuel</h5>
                <p className="feedback-card__user-designation">Supervisor</p>
                <p className="feedback-card__rating mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.75l-5.5 3.25 1.5-6.5L2 9.75l6.75-.5L12 2l2.25 7.25L21 9.75l-6 4.75 1.5 6.5L12 17.75z" />
                  </svg>
                </p>
              </div>
            </div>
            <p className="feedback-card__feedback">
              But in certain circumstances and owing to the claims of duty or
              the obligations of business it will frequently occur that ..
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityTestimonials;
