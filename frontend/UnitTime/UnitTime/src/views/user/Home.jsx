import React from 'react'
import Hero from '../../components/Section/Hero'
import Facilities from '../../components/Section/Facilities'
import About from '../../components/Section/About'
import Room from '../../components/Section/Room'
import BookRoom from '../../components/Section/BookRoom'
import Professors from '../../components/Section/Professors'
import Testimonial from '../../components/Section/Testimonial'
import Blog from '../../components/Section/Blog'


function Home() {
 
  return (
    <div>
       <Hero/>
       <Facilities/>
       <About/>
       <Room/>
       <BookRoom/>
       <Professors/>
      
       <Blog/>
    </div>
  )
}

export default Home