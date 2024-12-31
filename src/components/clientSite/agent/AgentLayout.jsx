import React from 'react';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';

export default function AgentLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
