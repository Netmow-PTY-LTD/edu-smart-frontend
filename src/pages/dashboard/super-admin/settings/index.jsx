import Layout from '@/components/layout';
import React, { useState } from 'react';
import classnames from 'classnames';

import { Card, CardBody, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import StudentProfileUI from '@/components/sAdminDashboard/temporaryUIWithFunctional/StudentProfile';
import CurrencySettings from '@/components/sAdminDashboard/Settings/CurrencySettings';
import BusinessSettings from '@/components/sAdminDashboard/Settings/BusinessSettings';

const Settings = () => {
  const [customverticalTab, setcustomverticalTab] = useState(1);
  const customtoggleVertical = (tab) => {
    if (customverticalTab !== tab) {
      setcustomverticalTab(tab);
    }
  };
  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
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
                              'mb-2 d-flex flex-column align-items-center justify-content-center py-3 gap-2': true,
                              active: customverticalTab === 1,
                            })}
                            onClick={() => {
                              customtoggleVertical(1);
                            }}
                          >
                          
                            <i class="ri-briefcase-line d-block fs-20 mb-1"></i>
                            Business Settings & Branding
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              'mb-2 d-flex flex-column align-items-center justify-content-start py-3 gap-2': true,
                              active: customverticalTab === 2,
                            })}
                            onClick={() => {
                              customtoggleVertical(2);
                            }}
                          >
                            <i className="ri-file-image-fill d-block fs-20 mb-1"></i>
                           Currency Settings
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              'mb-2 d-flex flex-column align-items-center justify-content-start py-3 gap-2': true,
                              active: customverticalTab === 3,
                            })}
                            onClick={() => {
                              customtoggleVertical(3);
                            }}
                          >
                            <i class="ri-global-line d-block fs-20 mb-1"></i>
                           Domain & DNS Management
                          </NavLink>
                        </NavItem>
                        <NavItem id="stripesettings">
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              'mb-2 d-flex flex-column align-items-center justify-content-start py-3 gap-2': true,
                              active: customverticalTab === 4,
                            })}
                            onClick={() => {
                              customtoggleVertical(4);
                            }}
                          >
                            <i className="ri-bank-card-line d-block fs-20 mb-1"></i>
                            Payment Settings
                          </NavLink>
                        </NavItem>
                        <NavItem id="stripesettings">
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              'mb-2 d-flex flex-column align-items-center justify-content-start py-3 gap-2': true,
                              active: customverticalTab === 5,
                            })}
                            onClick={() => {
                              customtoggleVertical(5);
                            }}
                          >
                            <i className="ri-mail-settings-line d-block fs-20 mb-1"></i>
                           SMTP & Email Config
                          </NavLink>
                        </NavItem>
                        <NavItem id="stripesettings">
                          <NavLink
                            style={{ cursor: 'pointer' }}
                            className={classnames({
                              'mb-2 d-flex flex-column align-items-center justify-content-start py-3 gap-2': true,
                              active: customverticalTab === 6,
                            })}
                            onClick={() => {
                              customtoggleVertical(6);
                            }}
                          >
                            <i className="ri-user-line d-block fs-20 mb-1"></i>
                          Profiles
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                    {customverticalTab === 1 && (
                      <Col lg={10}>
                       <BusinessSettings/>
                      </Col>
                    )}
                    {customverticalTab === 2 && (
                      <Col lg={10}>
                       <CurrencySettings/>
                      </Col>
                    )}
                    {customverticalTab === 6 && (
                      <Col lg={10}>
                       <StudentProfileUI/>
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
