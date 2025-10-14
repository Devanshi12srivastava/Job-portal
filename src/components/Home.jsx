import React, { useEffect } from 'react'
import Navbar from './ui/shared/Navbar'
import HeroSection from './ui/Herosection'
import CategoryCaraosel from './CategoryCaraosel'
import LatestJobs from './LatestJobs'
import Footer from './ui/shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  useGetAllJobs();
  const {user}=useSelector( store=>store.auth);
  const navigate=useNavigate();

  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/companies");
    }
  },[]);

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCaraosel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
