import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import CourseHeader from "../Headers/CourseHeader";
import axios from 'axios';

import blog1 from '../../assets/user/img/blog-1.jpg';
import blog2 from '../../assets/user/img/blog-2.jpg';
import blog3 from '../../assets/user/img/blog-3.jpg';

const courseImages = [blog1, blog2, blog3];

function Course() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [courseList, setCourseList] = useState([]);

  const handleFilterChange = (department) => {
    setSelectedDepartment(department);
  };

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

  const filteredCourses = selectedDepartment === 'All'
    ? courseList
    : courseList.filter(course => course.department === selectedDepartment);

  return (
    <div className="container-fluid pt-5 pb-3">
      <div className="container">
        <div className="text-center pb-2">
          <p className="section-title px-5">
            <span className="px-2">Our Course</span>
          </p>
          <h1 className="mb-4">Our Student University Course</h1>
        </div>

        <div className="row">
          <CourseHeader
            courseList={courseList}
            onFilterChange={handleFilterChange}
            selectedDepartment={selectedDepartment}
          />
        </div>

        <div className="row">
          {filteredCourses.map(item => (
            <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
              <div className="card border-0 shadow-sm h-100">
                <CourseCard CourseData={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Course;
