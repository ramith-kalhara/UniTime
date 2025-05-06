import React, { useEffect, useState } from 'react';
import Hero from '../../components/Section/Hero'
import Facilities from '../../components/Section/Facilities'
import About from '../../components/Section/About'
import Room from '../../components/Section/Room'
import Professors from '../../components/Section/Professors'
import CourseCard from "../../components/Section/CourseCard"
import CourseData from "../../data/CourseData"
import axios from 'axios';


import room1 from '../../assets/user/img/class-1.jpg';
import room2 from '../../assets/user/img/class-1.jpg';
import room3 from '../../assets/user/img/class-1.jpg';
import room4 from '../../assets/user/img/class-1.jpg';
const roomImages = [room1, room2, room3, room4];

import team1 from '../../assets/user/img/team-1.jpg';
import team2 from '../../assets/user/img/team-2.jpg';
import team3 from '../../assets/user/img/team-3.jpg';
import team4 from '../../assets/user/img/team-4.jpg';
const imageList = [team1, team2, team3, team4];

import blog1 from '../../assets/user/img/blog-1.jpg';
import blog2 from '../../assets/user/img/blog-2.jpg';
import blog3 from '../../assets/user/img/blog-3.jpg';
const courseImages = [blog1, blog2, blog3];
function Home() {
  const [schedules, setSchedules] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8086/api/schedule/')
      .then(response => {
        const transformedData = response.data.map((item, index) => ({
          id: item.id,
          img: roomImages[index % roomImages.length], // Rotate images
          room_type: item.room?.roomType || "N/A",
          description: item.scheduleDescription || "No description provided.",
          department: item.course?.department || "N/A",
          capacity: item.room?.capacity || "N/A",
          startTime: item.startTime,
          endTime: item.endTime,
          lectureName: item.lectureTitle,
          moduleName: item.course?.name || "N/A"
        }));
        setSchedules(transformedData);
      })
      .catch(error => {
        console.error('Failed to fetch schedule data:', error);
      });
  }, []);



  useEffect(() => {
    axios.get('http://localhost:8086/api/professor/')
      .then(response => {
        const transformedData = response.data.map((prof, index) => ({
          id: prof.id,
          imageUrl: imageList[index % imageList.length], // cycle images
          name: prof.full_name,
          moduleId: prof.course?.courseCode || 'N/A',
          module: prof.course?.name || 'N/A'
        }));
        setProfessors(transformedData);
      })
      .catch(error => {
        console.error('Failed to fetch professors:', error);
      });
  }, []);

    useEffect(() => {
    axios.get('http://localhost:8086/api/course/')
      .then(response => {
        const allCourses = response.data;

        const transformed = allCourses.map((item, index) => ({
          id: item.courseId,
          img: courseImages[index % courseImages.length],
          moduleName: item.name,
          description: item.description,
          department: item.department,
          courseCode: item.courseCode,
          creadit: item.credits,
          tags: allCourses.map(c => c.name), // All course names
          descriptionLong: item.description
        }));

        setCourseList(transformed);
      })
      .catch(error => {
        console.error('Failed to fetch course data:', error);
      });
  }, []);
 
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
            {schedules.slice(0,3).map(item => (
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
          <Professors data={professors.slice(0,3)} />
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
            {courseList.slice(0,3).map(item => (
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