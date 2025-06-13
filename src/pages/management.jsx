import React from 'react';
import { Col, Row } from 'reactstrap';
import PageBanner from '@/components/main/common/PageBanner';
import OurServices from '@/components/main/home/OurServices';
import MainLayout from '@/components/main/layout';

const teamMembers = [
  {
    name: 'Ms Torzoma Khatun (Toma)',
    designation: 'Director Admin',
    contact: '+88 01842111721',
    email: 'toma_karim@yahoo.com',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Ms.-Torzoma-Khatun-Toma-270x300-1.jpg'
  },
  {
    name: 'Mr M A Haque',
    designation: 'Chief Operating Officer',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-09-at-11.00.57_027f0f72.jpg'
  },
  {
    name: 'Mrs Nahid Akter',
    designation: 'Advisor (Research & Training)',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/07/Screenshot_5.png'
  },
  {
    name: 'Prof Dr Mohammad Abu Eusuf',
    designation: 'Chief Technical Advisor',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/666.jpg'
  },
  {
    name: 'Assoc Prof. Md. Kalam Hossain',
    designation: 'Director (Finance)',
    contact: '+88 01712617156',
    email: 'psrglobaladmission@gmail.com',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/666.jpg'
  },
  {
    name: 'Leorona Chowdhury, PhD Scholar',
    designation: 'Director (Intl. Marketing), President, Malaysia',
    contact: '+6 0147051337',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Leorona-Chowdhury-176x300-1.jpg'
  },
  {
    name: 'Assoc Prof. G M Aminul Islam',
    designation: 'Advisor (Public Admin)',
    contact: '+88 01711177030',
    email: 'khlaminul@gmail.com',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/G-M-Aminul-Islam-227x300-1.jpg'
  },
  {
    name: 'Eng Mujibur Rahman',
    designation: 'Advisor (Int’l Collaboration)',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-6.26.14-PM.jpeg'
  },
  {
    name: 'Ashraful Islam',
    designation: 'Asst Director (Marketing)',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Ashraful-Islam.webp'
  },
  {
    name: 'Hasna Parvin',
    designation: 'Admin/Manager',
    contact: '+88 01771899752',
    email: 'psrglobaladmission@gmail.com',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Hasna-Parvin-Boishakhi-275x300-1.png'
  },
  {
    name: 'Rotna Akter, MSS',
    designation: 'Counselor',
    contact: '+88 01771899850',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Rotna-Akter.webp'
  },
  {
    name: 'Nusrat Nurani Priya',
    designation: '(Account & Logistic)',
    contact: '+88 01771899851',
    email: 'info@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/11/Untitled-600-x-600-px-6.jpg'
  },
  {
    name: 'MD MAHBUBER RAHMAN (DOLAR)',
    designation: 'Counselor, Malaysia',
    contact: '+601136704887',
    email: 'info.malaysia@psrglobal.com.bd',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-15-at-1.27.22-PM.jpeg'
  },
  {
    name: 'Md. Safiul Bashar, MBA',
    designation: 'Sr Executive (Work Permit)',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-13-at-14.01.11_4b2a9fb1.jpg'
  },
  {
    name: 'Riku Datta',
    designation: 'Int Std Affairs, Malaysia',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-09-at-11.28.53_21c4ae9e.webp'
  },
  {
    name: 'Shohag Ahmed',
    designation: 'Office Assistant',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Shohag-Ali-image-240x300-1.jpg'
  },
  {
    name: 'Md Bashir',
    designation: 'Driver',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/WhatsApp-Image-2023-01-06-at-12.13.02-PM-1-768x1152-1.jpeg'
  }
];

export default function About() {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    background: '#fff',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    height: '100%'
  };

  const imageWrapperStyle = {
    position: 'relative',
    width: '150px',
    height: '150px',
    margin: '0 auto 15px',
    borderRadius: '50%',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '4px solid #f5f5f5'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: '0.4s ease',
    color: '#fff',
    fontWeight: 'bold'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector('.overlay').style.opacity = 1;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector('.overlay').style.opacity = 0;
  };

  return (
    <MainLayout>
      <PageBanner
        title="Management"
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />
<section className="management-team-section py-5">
  <div className="container">
    <h1 className="text-center mb-5" style={{ fontSize: '25px' }}>
      Meet Our Management Team
    </h1>
    <Row className="g-4">
      {teamMembers.map((member, index) => (
        <Col md={4} sm={6} xs={12} key={index}>
          <div
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={imageWrapperStyle}>
              <img
                src={member.image}
                alt={member.name}
                style={imageStyle}
              />
              <div className="overlay" style={overlayStyle}>
                {member.contact}
              </div>
            </div>
            <h5 style={{ fontWeight: 'bold', fontSize: '20px' }}>{member.name}</h5>
            <p style={{ color: '#6c757d', marginBottom: '5px' }}>{member.designation}</p>
            {member.contact && <p style={{ margin: '5px 0' }}>📞 {member.contact}</p>}
            {member.email && (
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: 0 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                  fill="green"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 13.5l8-6.5H4l8 6.5zm0 2.5l-8-6.5V18h16v-8.5l-8 6.5z" />
                </svg>
                {member.email}
              </p>
            )}
          </div>
        </Col>
      ))}
    </Row>
  </div>
</section>


      <OurServices />
    </MainLayout>
  );
}
``
