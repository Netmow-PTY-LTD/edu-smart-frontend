import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AccessGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const savedRoutes = JSON.parse(
      localStorage.getItem('selectedRoutes') || '[]'
    );
    const currentPath = router.pathname;

    const dashboardIndex = currentPath.indexOf('/dashboard/');
    let relativePath = '';

    if (dashboardIndex !== -1) {
      const parts = currentPath.split('/');
      if (parts.length > 3) {
        relativePath = '/' + parts.slice(3).join('/');
      } else {
        relativePath = '/';
      }
    }

    if (savedRoutes.includes(relativePath)) {
      alert('✅ You are allowed to access this page!');
    } else {
      console.log('❌ Not allowed:', relativePath);
    }
  }, [router.pathname]);

  return null; // No UI rendered
};

export default AccessGuard;
