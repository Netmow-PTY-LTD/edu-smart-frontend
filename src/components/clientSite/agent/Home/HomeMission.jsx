import React from 'react';

const HomeMission = () => {
  return (
    <section className="mission-agentHome-section bg-white">
      <div className="container">
        <div className="section-heading">
          <h3>What We Do?</h3>
          <h2>EduSmart Guiding For Global Education Journey</h2>
        </div>

        <div>
          <div>
            <div>
              <div>
                <figure>
                  {' '}
                  <img src="#" alt="image-container" />
                </figure>
                <figure>
                  {' '}
                  <img src="#" alt="image-container" />
                </figure>
              </div>
              {/* info */}
              <div>
                <h2>Relocation Guideline For International Student</h2>
                <p>
                  At Edusmart, we guide you through every step of studying
                  abroad from choosing the right program to securing your visa
                  making your global education journey seamless.
                </p>
                <button>Contact Us Now </button>
              </div>
            </div>
          </div>

          <div>
            <figure>
              {' '}
              <img src="#" alt="image-container" />
            </figure>
            <h2>
              Choosing the right Institute & program to securing your visa
            </h2>
            <button>Apply Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMission;
