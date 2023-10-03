import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
/**Import all components*/
import Username from './components/Username';
import Password from './components/Password';
import Reset from './components/Reset';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';

/**root routes */
const router = createBrowserRouter([

    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/Password',
        element : <Password></Password>
    },
    {
        path : '/profile',
        element : <Profile></Profile>
    },

    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },

    {
        path : '/reset',
        element : <Reset>register Route</Reset>
    },
    {
        path : '*',
        element : <PageNotFound>register Route</PageNotFound>
    },
])


export default function App() {
  return (
    <main>
        
  <RouterProvider router = {router}></RouterProvider>
  
  </main>
  )
}
