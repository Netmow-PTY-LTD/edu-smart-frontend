import React from 'react';

const HomeMission = () => {
  return (
    <section className="mission-section bg-white">
    <div className="container">
      <header className="mission-heading">
        <h3 className="mission-subtitle">What We Do?</h3>
        <h2 className="mission-title">EduSmart Guiding For Global Education Journey</h2>
      </header>
  
      <article className="mission-content">
        <div className="relocation-section">
          <div className="relocation-images">
            <figure className="relocation-image">
              <img src="/assets/images/agent/mission-image/earth.png" alt="Student assistance illustration" />
            </figure>
            <figure className="relocation-image">
              <img src="/assets/images/agent/mission-image/happy-student.png" alt="Educational journey concept" />
            </figure>
          </div>
  
          <div className="relocation-info">
            <h2 className="relocation-title">Relocation Guideline For International Students</h2>
            <p className="relocation-description">
              At Edusmart, we guide you through every step of studying abroad, from choosing the right program to securing your visa, making your global education journey seamless.
            </p>
            <button className="relocation-button">Contact Us Now</button>
          </div>
        </div>
  
        <div className="institute-section">
          <figure className="institute-image">
            <img src="/assets/images/agent/mission-image/institute.png" alt="Choosing the right institute" />
          </figure>
          <h2 className="institute-title">Choosing the Right Institute & Program to Securing Your Visa</h2>
          <button className="institute-button">Apply Now</button>
        </div>
      </article>
    </div>
  </section>
  
  );
};

export default HomeMission;
