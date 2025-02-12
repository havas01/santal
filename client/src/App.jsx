import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import DashboardPage from './components/DashboardPage'
function App() {
  const [userInfo, setuserInfo] = useState(null);
  const router = createBrowserRouter([
    {
      path : '/login',
      element : <LoginPage setuserInfo = {setuserInfo} userInfo = {userInfo}/>
    },
    {
      path : '/',
      element : <DashboardPage setuserInfo = {setuserInfo} userInfo = {userInfo}/>
    },
    {
      path : '/signup',
      element : <SignupPage/>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
