// import { lazy } from 'react';

// // project imports
// import Loadable from 'components/Loadable';

// // jwt auth
// const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
// const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

// // ==============================|| AUTH ROUTING ||============================== //

// const LoginRoutes = {
//   path: '/',
//   children: [
//     {
//       path: '/',
//       children: [
//         {
//           path: '/login',
//           element: <LoginPage />
//         },
//         {
//           path: '/register',
//           element: <RegisterPage />
//         }
//       ]
//     }
//   ]
// };

// export default LoginRoutes;
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    }
  ]
};

export default LoginRoutes;
