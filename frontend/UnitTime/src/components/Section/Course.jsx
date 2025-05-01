import React, { useState } from 'react';
import CourseCard from './CourseCard';
import CourseData from '../../data/CourseData';
import CourseHeader from "../Headers/CourseHeader";

function Course() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const handleFilterChange = (department) => {
    setSelectedDepartment(department);
  };

  const filteredCourses = selectedDepartment === 'All'
    ? CourseData
    : CourseData.filter(course => course.department === selectedDepartment);

  return (
    <div>
      {/* Gallery Start */}
      <div className="container-fluid pt-5 pb-3">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Course</span>
            </p>
            <h1 className="mb-4">Our Student University Course</h1>
          </div>

          {/* Filters Section */}
          <div className="row">
            <CourseHeader 
              courseList={CourseData} 
              onFilterChange={handleFilterChange}
              selectedDepartment={selectedDepartment}
            />
          </div>

          {/* Course Cards Section */}
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
      {/* Gallery End */}
    </div>
  );
}

export default Course;
