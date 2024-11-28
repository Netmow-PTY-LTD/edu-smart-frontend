// import { useRouter } from 'next/router';
// import { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const handleAuth = () => {
//       const tokenFromQuery = router.query.token;
//       if (tokenFromQuery) {
//         Cookies.set('token', tokenFromQuery);
//         window.location.assign(
//           window.location.origin + window.location.pathname
//         );
//         return;
//       }

//       const storedToken = Cookies.get('token');
//       if (!storedToken) {
//         const restrictedPaths = [
//           'super_admin',
//           'admin',
//           'guardian',
//           'player',
//           'manager',
//           'trainer',
//         ];
//         const path = router.pathname.split('/')[1];
//         if (restrictedPaths.includes(path)) {
//           router.push('/auth/login');
//           return;
//         }
//       } else {
//         setUser(storedToken);
//       }
//     };

//     handleAuth();
//   }, [router]);

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
