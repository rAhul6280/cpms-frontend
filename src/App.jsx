import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthContextProvider from "./context/AuthContextProvider";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Hero /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
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
