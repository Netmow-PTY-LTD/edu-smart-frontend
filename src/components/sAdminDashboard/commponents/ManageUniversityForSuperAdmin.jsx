
import UniversitySponsorsList from '@/components/university/UniversitySponsorsList';
import DescriptionCardForm from '@/components/common/DescriptionFormCardCom';
import FAQCardForm from '@/components/common/FAQCardForm';
import GalleryFormCard from '@/components/common/GalleryFormCard';
import SocialLinksCardForm from '@/components/common/SocialLinksCardFormComponent';
import classnames from 'classnames';
import React, { useState } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';

const ManageUniversityForSuperAdmin = ({ university_id }) => {
  const [customverticalTab, setcustomverticalTab] = useState(1);
  const customtoggleVertical = (tab) => {
    if (customverticalTab !== tab) {
      setcustomverticalTab(tab);
    }
  };

  const descriptionFields = [
    { name: 'faculty_description', label: 'Faculty Description *' },
    { name: 'gallery_description', label: 'Gallery Description *' },
    { name: 'faq_description', label: 'FAQ Description *' },
    { name: 'testimonial_description', label: 'Testimonial Description *' },
  ];

  const socialLinkFields = [
    { name: 'facebook', label: 'Facebook:' },
    { name: 'twitter', label: 'Twitter:' },
    { name: 'instagram', label: 'Instagram:' },
    { name: 'youtube', label: 'Youtube:' },
  ];

  return (
    <>
      <Row>
        <Col xxl={12}>
          <Card>
            <CardBody>
              <Row>
                <Col lg={2}>
                  <Nav
                    pills
                    className="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center p-3 "
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          'mb-2 d-flex align-items-center justify-content-center py-3 gap-2': true,
                          active: customverticalTab === 1,
                        })}
                        onClick={() => {
                          customtoggleVertical(1);
                        }}
                      >
                        <i className="ri-file-info-fill d-block fs-20 mb-1"></i>
                        All Sections Descriptions
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          'mb-2 d-flex align-items-center justify-content-center py-3 gap-2': true,
                          active: customverticalTab === 2,
                        })}
                        onClick={() => {
                          customtoggleVertical(2);
                        }}
                      >
                        <i className="ri-file-image-fill d-block fs-20 mb-1"></i>
                        Slider
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          'mb-2 d-flex align-items-center justify-content-center py-3 gap-2': true,
                          active: customverticalTab === 3,
                        })}
                        onClick={() => {
                          customtoggleVertical(3);
                        }}
                      >
                        <i className="ri-gallery-fill d-block fs-20 mb-1"></i>
                        Gallery
                      </NavLink>
                    </NavItem>
                    <NavItem id="stripesettings">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          'mb-2 d-flex align-items-center justify-content-center py-3 gap-2': true,
                          active: customverticalTab === 4,
                        })}
                        onClick={() => {
                          customtoggleVertical(4);
                        }}
                      >
                        <i className="ri-question-answer-fill d-block fs-20 mb-1"></i>
                        FAQs
                      </NavLink>
                    </NavItem>
                    <NavItem id="stripesettings">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          'mb-2 d-flex align-items-center justify-content-center py-3 gap-2': true,
                          active: customverticalTab === 5,
                        })}
                        onClick={() => {
                          customtoggleVertical(5);
                        }}
                      >
                        <i className="ri-hand-coin-fill d-block fs-20 mb-1"></i>
                        Sponsors
                      </NavLink>
                    </NavItem>
                    <NavItem id="stripesettings">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          'mb-2 d-flex align-items-center justify-content-center py-3 gap-2': true,
                          active: customverticalTab === 6,
                        })}
                        onClick={() => {
                          customtoggleVertical(6);
                        }}
                      >
                        <i className="ri-shield-star-fill d-block fs-20 mb-1"></i>
                        Testimonials
                      </NavLink>
                    </NavItem>
                    <NavItem id="stripesettings">
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          'mb-2 d-flex align-items-center justify-content-center py-3 gap-2': true,
                          active: customverticalTab === 7,
                        })}
                        onClick={() => {
                          customtoggleVertical(7);
                        }}
                      >
                        <i className="ri-links-fill d-block fs-20 mb-1"></i>
                        Social Links
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                {/* {customverticalTab === 1 && <BusinessSettings />} */}
                {customverticalTab === 5 && (
                  <UniversitySponsorsList university_id={university_id} />
                )}
                {customverticalTab === 1 && (
                  <DescriptionCardForm
                    title="Added All Description Here"
                    fields={descriptionFields}
                    submitButtonText="Add Description"
                    className="m-5 p-4 p-md-5"
                  />
                )}
                {customverticalTab === 2 && (
                  <GalleryFormCard
                    className="m-5 p-4 p-md-5"
                    cardTitle="Sliders"
                  />
                )}
                {customverticalTab === 3 && (
                  <GalleryFormCard
                    className="m-5 p-4 p-md-5"
                    cardTitle="Gallerys"
                  />
                )}
                {customverticalTab === 4 && (
                  <Col>
                    <FAQCardForm className="m-5 p-4 p-md-5" />
                  </Col>
                )}
                {customverticalTab === 7 && (
                  <SocialLinksCardForm
                    title="Add Social Links Here"
                    fields={socialLinkFields}
                    submitButtonText="Add Social Links"
                    className="m-5 p-4 p-md-5"
                  />
                )}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ManageUniversityForSuperAdmin;
