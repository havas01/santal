import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
function App() {
  const [userInfo, setuserInfo] = useState({userName : 'nill'});
  const router = createBrowserRouter([
    {
      path : '/',
      element : <LoginPage setuserInfo = {setuserInfo} userInfo = {userInfo}/>
    },
    {
      path : '/dashboard',
      element : <DashboardPage userInfo = {userInfo}/>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
