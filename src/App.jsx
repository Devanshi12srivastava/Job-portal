import './App.css'
import Navbar from './components/ui/shared/navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Herosection from './components/ui/Herosection'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import Companycreate from './components/admin/Companycreate'
import CompanySetup from './components/admin/CompanySetup'
import CompanyJob from './components/admin/CompanyJob'
const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
   {
    path:'/login',
    element:<Login/>
  },
   {
    path:'/signup',
    element:<Signup/>
  },
   {
    path:'/jobs',
    element:<Jobs/>
  },
   {
    path:'/browse',
    element:<Browse/>
  },
   {
    path:'/profile',
    element:<Profile/>
  },
   {
    path:'/description/:id',
    element:<JobDescription/>
  },
// for admin 
{
    path:'/admin/companies',
    element:<Companies/>
  },
  {
    path:'/admin/companies/create',
    element:<Companycreate/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetup/>
  },
    {
    path:'/admin/jobs',
    element:<CompanyJob/>
  },
])
function App() {


  return (
    <div >
    <RouterProvider router={appRouter}/>
     

      
    </div>
  )
}

export default App
