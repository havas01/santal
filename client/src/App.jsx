import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import DashboardPage from './components/DashboardPage'
function App() {
  const router = createBrowserRouter([
    {
      path : '/login',
      element : <LoginPage/>
    },
    {
      path : '/',
      element : <DashboardPage />
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
