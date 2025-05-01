import React from 'react'
import Hero from '../../components/Section/Hero'
import Facilities from '../../components/Section/Facilities'
import About from '../../components/Section/About'
import Room from '../../components/Section/Room'
import BookRoom from '../../components/Section/BookRoom'
import Professors from '../../components/Section/Professors'
import Testimonial from '../../components/Section/Testimonial'
import Blog from '../../components/Section/Blog'
import VoteSlider from '../../components/Section/VoteSlider'
import ScheduleData from '../../data/ScheduleData'
import ProfessorsData from '../../data/ProfessorsData'
import CourseHeader from '../../components/Headers/CourseHeader'
import CourseCard from "../../components/Section/CourseCard"
import CourseData from "../../data/CourseData"
function Home() {
 
  return (
    <div>
       <Hero/>
       <Facilities/>
       <About/>

       {/* Room Section */}
       <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Start Your Future</span>
            </p>
            <h1 className="mb-4">Scheduled Lectures</h1>
          </div>
          <div className="row">
            {ScheduleData.slice(0,3).map(item => (
              <Room key={item.id} ScheduleData={item} />
            ))}
          </div>
        </div>
      </div>
       {/* <BookRoom/> */}

      {/* Proffessor section  */}

      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Best Professors</span>
            </p>
            <h1 className="mb-4">Meet Our Best Professors</h1>
          </div>

          {/* Show only 3 professors */}
          <Professors data={ProfessorsData.slice(0,3)} />
        </div>
      </div>
      
      
      <div className="container-fluid pt-5 pb-3">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Course</span>
            </p>
            <h1 className="mb-4">Our Student University Course</h1>
          </div>

        

          {/* Course Cards Section */}
          <div className="row">
            {CourseData.slice(0,3).map(item => (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <div className="card border-0 shadow-sm h-100">
                  <CourseCard CourseData={item} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home