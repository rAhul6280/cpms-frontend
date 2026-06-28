import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthContextProvider from "./context/AuthContextProvider";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import { ToastContainer } from "react-toastify";

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
        // We can add nested routes here if needed in future
      ]
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
