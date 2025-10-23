import './App.css'
import Navbar from './components/ui/shared/Navbar'
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
import Postjob from './components/admin/Postjob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
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
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><Companycreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
    {
    path:'/admin/jobs',
    element:<ProtectedRoute><CompanyJob/></ProtectedRoute>
  },
   {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><Postjob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
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
