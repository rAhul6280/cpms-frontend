import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthContextProvider from "./context/AuthContextProvider";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Hero /> },
        {
          path: "dashboard",
          element: (
            <AuthLayout authentication={true}>
              <Dashboard />
            </AuthLayout>
          ),
        },
        {
          path: "login",
          element: (
            <AuthLayout authentication={false}>
              <Login/>
            </AuthLayout>
          ),
        },
        {
          path: "signup",
          element: (
            <AuthLayout authentication={false}>
              <Signup/>
            </AuthLayout>
          ),
        },
      ],
    },
  ]);
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
