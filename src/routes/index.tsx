import { createBrowserRouter, RouterProvider, Navigate, redirect } from 'react-router-dom';

import { getCookie } from '../utils/cookieUtils';
import { PlatformLayout } from '../components/layout/PlatformLayout';
import { AuthLayout } from '../features/auth/components/AuthLayout/AuthLayout';
import { Login } from '../features/auth/components/Login/Login';
import { OtpForm } from '../features/auth/components/OtpForm/OtpForm';

import { platformRoutes } from './platformRoutes';

const isAuthenticated = () => {
  const authResponse = getCookie('auth_response');
  if (authResponse) {
    try {
      const parsed = JSON.parse(authResponse);
      return !!parsed?.data?.access_token;
    } catch {
      return false;
    }
  }
  return false;
};

const protectedLoader = () => {
  if (!isAuthenticated()) return redirect('/auth/login');
  return null;
};

const publicLoader = () => {
  if (isAuthenticated()) return redirect('/');
  return null;
};

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    loader: publicLoader,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'otp', element: <OtpForm /> },
      { path: '', element: <Navigate to="login" replace /> },
    ],
  },
  {
    path: '/',
    element: <PlatformLayout />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      ...platformRoutes,
      { path: '*', element: <div>404 Not Found</div> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
