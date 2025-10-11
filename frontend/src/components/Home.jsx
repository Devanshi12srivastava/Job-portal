import React from 'react'
import Navbar from './ui/shared/Navbar'
import HeroSection from './ui/Herosection'
import CategoryCaraosel from './CategoryCaraosel'
import LatestJobs from './LatestJobs'
import Footer from './ui/shared/Footer'
const Home = () => {
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
