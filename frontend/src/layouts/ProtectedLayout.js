// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import FloatingBalanceCard from '../components/FloatingBalanceCard';
// import { authService

// function ProtectedLayout() {
//   const isAuthenticated = authService.isAuthenticated();
//   const isAdmin = authService.isAdmin();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <>
//       <Outlet />
//       {isAdmin && <FloatingBalanceCard />}
//     </>
//   );
// }

// export default ProtectedLayout; 