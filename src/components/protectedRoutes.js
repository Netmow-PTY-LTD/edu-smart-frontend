// import { useAuth } from '@/contexts/authContext';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const ProtectedRoute = (WrappedComponent) => {
//   const WithAuth = (props) => {
//     // const { user } = useAuth();
//     const router = useRouter();

//     // useEffect(() => {
//     //   if (!user) {
//     //     router.push('/auth/login');
//     //   }
//     // }, [user, router]);

//     // if (!user) {
//     //   return null;
//     // }

//     return <WrappedComponent {...props} />;
//   };

//   WithAuth.displayName = `ProtectedRoute(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

//   return WithAuth;
// };

// export default ProtectedRoute;
