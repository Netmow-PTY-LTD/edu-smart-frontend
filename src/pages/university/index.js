import HeroHome from '@/components/template/university/HeroHome';
import UniversityLayout from '@/components/template/university/UniversityLayout';
import React from 'react';

export default function UniversityHome() {
  return (
    <UniversityLayout>
      <HeroHome />
      <section className="sqdk-about">
        <div className="container">
          <div className="sqdk-about-content">
            <div className="sqdk-about-left-content">
              <div className="sqdk-about-text-temp">
                <h2>Our </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UniversityLayout>
  );
}