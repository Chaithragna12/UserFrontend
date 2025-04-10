import React from 'react'
import AboutUs from '../Components/About/About'
import Homepage from '../Components/Homepage/Homepage'
import Nav from '../Components/Nav/Nav'
import Menu from '../Components/Menu/Menu'
import Reviews from '../Components/Reviews/Reviews'
import ContactForm from '../Components/Contact/Contact'
import Footer from '../Components/Footer/Footer'
import Foot from '../Components/Footer/Foot'
const Home = () => {
  return (
    <div>
        <Nav />
        <Homepage />  
        <AboutUs />
        <Menu />
        <Reviews />
        <ContactForm />
        <Footer />
        <Foot />
        
      
    </div>
  )
}

export default Home
