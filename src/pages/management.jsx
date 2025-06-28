import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import PageBanner from '@/components/main/common/PageBanner';
import MainLayout from '@/components/main/layout';
import OurServices from '@/components/main/home/OurServices';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

export default function About() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get('token');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_PROD || '';

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/v1/public/team`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const result = await res.json();

      const fixedMembers = (result?.data || []).map((m) => ({
        ...m,
        image: m.image?.startsWith('http') ? m.image : `${baseUrl}${m.image}`,
      }));

      setMembers(fixedMembers);
    } catch (error) {
      toast.error('Failed to fetch members');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const groupedByCountry = members.reduce((acc, member) => {
    if (!acc[member.country]) acc[member.country] = [];
    acc[member.country].push(member);
    return acc;
  }, {});

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

  const getTitleByCountry = (country) => {
    return country === 'Bangladesh'
      ? `Meet Our Management (${country})`
      : `Meet Our Team (${country})`;
  };

  return (
    <MainLayout>
      <ToastContainer />
      <PageBanner title="Management" bgImage="/assets/images/agent/agent_slider_bg.png" />

      <section className="management-team-section" style={{ background: '#e4e4e4', padding: '80px 0' }}>
        <div className="container">
          {loading ? (
            <div className="text-center my-5">
              <Spinner color="primary" />
            </div>
          ) : (
            Object.entries(groupedByCountry).map(([country, members]) => (
              <div key={country} style={{ marginBottom: '100px' }}>
                <h1
                  className="text-center"
                  style={{
                    fontSize: '25px',
                    fontWeight: '700',
                    color: '#0c3c60',
                    position: 'relative',
                    marginBottom: '50px',
                  }}
                >
                  {getTitleByCountry(country)}
                  <span
                    style={{
                      position: 'absolute',
                      height: '5px',
                      width: '100px',
                      background: 'rgb(12, 60, 96)',
                      top: '40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  ></span>
                </h1>

                <Row className="g-4">
                  {members.map((member, index) => (
                    <Col md={4} sm={6} xs={12} key={index}>
                      <div
                        style={{
                          borderRadius: '18px',
                          padding: '25px 20px',
                          background: 'linear-gradient(224deg, rgb(211, 233, 236), rgb(255, 255, 255))',
                          textAlign: 'center',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          boxShadow: '-18px 18px 32px #d8d8d8,18px -18px 32px #ffffff',
                          height: '100%',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          style={{
                            position: 'relative',
                            width: '150px',
                            height: '150px',
                            margin: '0 auto 20px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '5px solid #fff',
                            boxShadow: '0 0 6px 1px rgb(42 132 200 / 47%)',
                          }}
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '50%',
                            }}
                          />
                          <div
                            className="overlay"
                            style={{
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
                              transition: 'opacity 0.4s ease',
                            }}
                          >
                            {member.contact || 'No Contact'}
                          </div>
                        </div>

                        <h5
                          style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#0c3c60',
                            marginBottom: '8px',
                          }}
                        >
                          {member.name}
                        </h5>

                        <p
                          style={{
                            color: '#6c757d',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            marginBottom: '12px',
                            fontWeight: 'bold',
                          }}
                          className="mb-2"
                        >
                          {member.designation}
                        </p>

                        {member.contact && (
                          <p style={{ fontSize: '14px' }} className="mb-2">
                            <i
                              className="bi bi-telephone-fill"
                              style={{ marginRight: '2px', lineHeight: '0' }}
                            ></i>{' '}
                            {member.contact}
                          </p>
                        )}

                        {member.email && (
                          <p
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              fontSize: '14px',
                              margin: 0,
                            }}
                          >
                            <i
                              className="bi bi-envelope-fill"
                              style={{ marginRight: '2px', lineHeight: '0' }}
                            ></i>
                            {member.email}
                          </p>
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))
          )}
        </div>
      </section>

      <OurServices />
    </MainLayout>
  );
}
