import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import DashboardPage from './components/DashboardPage'
import Post from './components/Post'
import Posts from './components/Posts'
import Listoption from './components/Listoption'
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
    },
    {
      path : '/posts',
      element : <Posts/>
    },
    {
      path : '/list',
      element : <Listoption/>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
