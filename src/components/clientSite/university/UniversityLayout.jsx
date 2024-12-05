import Footer from './common/Footer';
import Header from './common/Header';

export default function UniversityLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
