import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './components/LoginPage'
const router = createBrowserRouter([
  {
    path : '/',
    element : <LoginPage />
  }
])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
