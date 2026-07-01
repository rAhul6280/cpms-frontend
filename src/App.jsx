import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthContextProvider from "./context/AuthContextProvider";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { ToastContainer } from "react-toastify";
import DashboardHome from "./components/dashboard/DashboardHome";
import Profile from "./components/dashboard/Profile";
import BrowseStudents from "./components/dashboard/BrowseStudents";
import StudentDetails from "./components/dashboard/StudentDetails";
import MySelections from "./components/dashboard/MySelections";
import AdminSelections from "./components/dashboard/AdminSelections";
import StudentSelections from "./components/dashboard/StudentSelections";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function ThemedToastContainer() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position='bottom-right'
      theme={theme === 'dark' ? 'dark' : 'light'}
      className='z-9999'
    />
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <AuthLayout authentication={false}>
              <Hero />
            </AuthLayout>
          )
        }
      ]
    },
    {
      path: "/dashboard",
      element: (
        <AuthLayout authentication={true}>
          <Dashboard />
        </AuthLayout>
      ),
      children: [
        {
          index: true,
          element: <DashboardHome />
        },
        {
          path: "profile",
          element:(
         <RoleProtectedRoute allowedRoles={['student']}>
              <Profile />
            </RoleProtectedRoute>
          )
        },
        {
          path: "student-selections",
          element: (
            <RoleProtectedRoute allowedRoles={['student']}>
              <StudentSelections />
            </RoleProtectedRoute>
          )
        },
        {
          path: "students",
          element: (
            <RoleProtectedRoute allowedRoles={['recruiter']}>
              <BrowseStudents />
            </RoleProtectedRoute>
          )
        },
        {
          path: "students/:studentId",
          element: (
            <RoleProtectedRoute allowedRoles={['recruiter']}>
              <StudentDetails />
            </RoleProtectedRoute>
          )
        },
        {
          path: "selections",
          element: (
            <RoleProtectedRoute allowedRoles={['recruiter']}>
              <MySelections />
            </RoleProtectedRoute>
          )
        },
        {
          path: "admin/selections",
          element: (
            <RoleProtectedRoute allowedRoles={['admin']}>
              <AdminSelections />
            </RoleProtectedRoute>
          )
        }
      ]
    },
    {
      path: "login",
      element: (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: "signup",
      element: (
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      ),
    },
  ]);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ThemedToastContainer />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;