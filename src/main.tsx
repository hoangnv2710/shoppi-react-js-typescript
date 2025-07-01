import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as React from "react";
import 'styles/global.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from '@/layout';
import HomePage from 'pages/client/home';
import RegisterPage from 'pages/client/auth/register';
import LoginPage from 'pages/client/auth/login';
import { App } from 'antd';
import { AuthContextProvider } from './components/context/auth.context';
import RequireAuth from './components/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/user",
        element: (
          <RequireAuth>
            <div>user</div>
          </RequireAuth>
        )
        ,
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <div>admin</div>
      </RequireAuth>
    )
    ,
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </App>
  </StrictMode>,
)
