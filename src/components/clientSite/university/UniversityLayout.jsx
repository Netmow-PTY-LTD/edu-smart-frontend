import Footer from '@/components/main/common/Footer';
import Header from '@/components/main/common/Header';

export default function UniversityLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
