import { lazy } from 'react';

// project imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';

// jwt auth
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));
const EnquiryForm = Loadable(lazy(() => import('pages/view/enquries/EnquiryForm')));
const ThankYou = Loadable(lazy(() => import('../utils/defult/ThankYou')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    {
      path: '/EnquiryForm',
      element: <EnquiryForm />
    },
    {
      path: 'thank-you',
      element: <ThankYou />
    },

  ]
};

export default LoginRoutes;
