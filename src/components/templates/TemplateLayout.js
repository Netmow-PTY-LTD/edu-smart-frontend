import React from 'react';
import DefaultHeader from './default/common/DefaultHeader';
import DefaultFooter from './default/common/DefaultFooter';
import FooterCTA from './default/common/FooterCTA';

export default function TemplateLayout({ children }) {
  return (
    <>
      <DefaultHeader />
      <main>{children}</main>
      <FooterCTA />
      <DefaultFooter />
    </>
  );
}
