import React from 'react';
import TemplateLayout from '../TemplateLayout';
import TemplateBanner from './common/TemplateBanner';

const FaqTemp = () => {
  return (
    <TemplateLayout>
      <TemplateBanner
        title="FAQ"
        subtitle=""
        bgImage="template1/assets/img/privacy_bg.jpg"
      />
      <div className="container">
        <div className="page-main-content">
          <h2>FAQ</h2>
          <p>Content Coming Soon</p>
        </div>
      </div>
    </TemplateLayout>
  );
};

export default FaqTemp;
