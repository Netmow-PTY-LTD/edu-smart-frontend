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
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Ms.-Torzoma-Khatun-Toma-270x300-1.jpg'
  },
  {
    name: 'Mr M A Haque',
    designation: 'Chief Operating Officer',
    email: 'admin@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-09-at-11.00.57_027f0f72.jpg'
  },
  {
    name: 'Mrs Nahid Akter',
    designation: 'Advisor (Research & Training)',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/07/Screenshot_5.png'
  },
  {
    name: 'Prof Dr Mohammad Abu Eusuf',
    designation: 'Chief Technical Advisor',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Prof-Dr-Mohammad-Abu-Eusuf.webp'
  },
  {
    name: 'Assoc Prof. Md. Kalam Hossain',
    designation: 'Director (Finance)',
    contact: '+88 01712617156',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/666.jpg'
  },
  {
    name: 'Leorona Chowdhury, PhD Scholar',
    designation: 'Director of Marketing',
    contact: '+6 0147051337',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Leorona-Chowdhury-176x300-1.jpg'
  },
  {
    name: 'Assoc Prof. G M Aminul Islam',
    designation: 'Advisor (Public Admin)',
    contact: '+88 01711177030',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/G-M-Aminul-Islam-227x300-1.jpg'
  },
  {
    name: 'Eng Mujibur Rahman',
    designation: 'Advisor (Int’l Collaboration)',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-6.26.14-PM.jpeg'
  },

  {
    name: 'Hasna Parvin',
    designation: 'Admin Manager',
    contact: '+88 01771899752',
    email: 'admission@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Hasna-Parvin-Boishakhi-275x300-1.png'
  },
    {
    name: 'Shakhoat Hossen',
    designation: 'Graphics Designer',
    contact: '+88 01713273757',
    email: 'support@edusmart.study',
    image: 'https://edu-smart.sgp1.cdn.digitaloceanspaces.com/Shakhoat%20Hossen.jpg'
  },
  {
    name: 'Nusrat Nurani Priya',
    designation: '(Account & Logistic)',
    contact: '+88 01771899851',
    email: 'info@edusmart.study',
    image: 'https://edu-smart.sgp1.cdn.digitaloceanspaces.com/Nusrat%20Nurani%20Priya.jpg'
  },
  {
    name: 'MD MAHBUBER RAHMAN (DOLAR)',
    designation: 'Counselor, Malaysia',
    contact: '+601136704887',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-15-at-1.27.22-PM.jpeg'
  },
  {
    name: 'Md. Safiul Bashar, MBA',
    designation: 'Sr Executive (Work Permit)',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-13-at-14.01.11_4b2a9fb1.jpg'
  },
  {
    name: 'Riku Datta (Sr. Counselor)',
    designation: 'Int Std Affairs, Malaysia',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-09-at-11.28.53_21c4ae9e.webp'
  },
    {
    name: 'Ms Indah (Asian Market)',
    designation: 'Marketing Research Executive',
    contact: '',
    email: 'indah@edusmart.study',
    image: 'https://edu-smart.sgp1.cdn.digitaloceanspaces.com/indah.jpg'
  },
      {
    name: `Ms Amalia (Int Affair's)`,
    designation: 'Influencer',
    contact: '',
    email: 'amalia@edusmart.study',
    image: `https://edu-smart.sgp1.cdn.digitaloceanspaces.com/Ms%20Amalia%20(Int%20Affair's).jpg`
  },
      {
    name: 'Sharmin Eti',
    designation: 'Marketing Executive',
    contact: '',
    email: 'info@edusmart.study',
    image: 'https://edu-smart.sgp1.cdn.digitaloceanspaces.com/sharmin_eti.jpg'
  },
 {
    name: 'Shamera Mubashira',
    contact: '+8801750818414',
    designation: 'Counselor (European Study)',
    email: 'info@edusmart.study',
    image: 'https://edu-smart.sgp1.cdn.digitaloceanspaces.com/shamera-mubashira.png'
  },
   {
    name: 'Shabrina Mamun Tania',
    designation: 'Information Officer',
    contact: '+601826-337901',
    email: 'info@edusmart.study',
    image: 'https://edu-smart.sgp1.cdn.digitaloceanspaces.com/shabrina_mamun_tania.png'
  },
  {
    name: 'Shohag Ahmed',
    designation: 'Office Assistant',
    email: 'info@edusmart.study',
    image: 'https://psrglobal.com.bd/wp-content/uploads/2023/10/Shohag-Ali-image-240x300-1.jpg'
  },
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
  const card = e.currentTarget;
  const overlay = card.querySelector('.overlay');

  overlay.style.opacity = 1;
  card.style.transform = 'scale(1.02)';
  card.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
};


const handleMouseLeave = (e) => {
  const card = e.currentTarget;
  const overlay = card.querySelector('.overlay');

  overlay.style.opacity = 0;
  card.style.transform = 'scale(1)';
  card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
};

  return (
    <MainLayout>
      <PageBanner
        title="Management"
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />
<section className="management-team-section py-5">
  <div className="container">
    <h1 className="text-center mb-5" style={{ fontSize: '25px', fontWeight: '700', color: '#0c3c60' }}>
      Meet Our Management Team
    </h1>
    <Row className="g-4">
      {teamMembers.map((member, index) => (
        <Col md={4} sm={6} xs={12} key={index}>
          <div
            style={{
              borderRadius: '16px',
              padding: '25px 20px',
              background: 'linear-gradient(to bottom right, #ffffff, #f2f9ff)',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              height: '100%',
              cursor: 'pointer'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{
              position: 'relative',
              width: '150px',
              height: '150px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '5px solid #fff',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
              <div className="overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'rgba(0, 128, 128, 0.7)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                opacity: 0,
                transition: 'opacity 0.4s ease'
              }}>
                {member.contact}
              </div>
            </div>

            <h5 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0c3c60',
              marginBottom: '8px'
            }}>{member.name}</h5>

            <p style={{
              color: '#6c757d',
              fontSize: '14px',
              fontStyle: 'italic',
              marginBottom: '12px'
            }}>{member.designation}</p>

            {member.contact && (
              <p style={{ fontSize: '14px', marginBottom: '5px' }}>
                📞 {member.contact}
              </p>
            )}

            {member.email && (
              <p style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                margin: 0
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                  fill="#28a745"
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
