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
    <AuthContextProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position='bottom-right'
        className='z-9999'
      />
    </AuthContextProvider>
  );
}

export default App;