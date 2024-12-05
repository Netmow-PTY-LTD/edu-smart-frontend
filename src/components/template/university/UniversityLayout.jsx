import React from 'react';
import UniversityHeader from './common/Header';
import UniversityFooter from './common/Footer';

export default function UniversityLayout({ children }) {
  return (
    <>
      <UniversityHeader />
      <main>{children}</main>
      <UniversityFooter />
    </>
  );
}
