import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Hero from './pages/Hero'
import RecruiterDashboard from './pages/RecruiterDashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UpdateProfile from './pages/UpdateProfile'

function App() {
  const router=createBrowserRouter([
    
    {
      path:'/',
      element:<Home/>,
      children:[
        {
          index:true,
          element:<Hero/>
        },
        {
          path:'dashboard',
          element:<RecruiterDashboard/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'signup',
          element:<Signup/>
        },
        {
          path:'update-profile',
          element:<UpdateProfile/>
        }
      ]
    }
  ])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
