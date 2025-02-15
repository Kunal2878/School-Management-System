import { useState } from 'react'
import{createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import LandingPage from './Frontend/Pages/LandingPage'
import UserOption from './Frontend/Pages/UserOption'
import Nav from './Frontend/Components/Navbar/Navbar'
import RegisterPrincipal from './Frontend/Pages/Principal/RegisterPrincipal'
import Login from './Frontend/Pages/Login'
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/user-options",
      element: <UserOption/>
    },
    {
      path: "/admin-signup",
      element: <RegisterPrincipal/>
    },
    {
      path: "/login",
      element: <Login/>
    }
  ])

  return (
    <div className='w-full flex flex-col bg-white overflow-x-hidden'>
      <RouterProvider router={routes} />
    </div>
  )
}
export default App
