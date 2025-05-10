import React, { useEffect, useState } from 'react';
import axios from 'axios';

import blog1 from '../../assets/user/img/blog-1.jpg';
import blog2 from '../../assets/user/img/blog-2.jpg';
import blog3 from '../../assets/user/img/blog-3.jpg';

const courseImages = [blog1, blog2, blog3];

function CourseSideBar({ department }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8086/api/course/')
      .then(response => {
        const apiCourses = response.data;

        const formattedCourses = apiCourses.map((course, index) => ({
          id: course.courseId,
          img: courseImages[index % courseImages.length],
          moduleName: course.name,
          description: course.description,
          department: course.department,
          courseCode: course.courseCode,
          creadit: course.credits,
          tags: apiCourses
          .map(c => c.name)
          .filter(name => name !== course.name), // You can populate this if needed
          descriptionLong: course.description
        }));

        setCourses(formattedCourses);
      })
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

  // Extract departments
  const uniqueDepartments = [...new Set(courses.map(item => item.department))];


  const relatedModules = courses.filter(item => item.department === department);

  // Sample tag logic: from first IT course
  const tags = relatedModules.length > 0 ? relatedModules[0].tags : [];


  return (
    <div className="col-lg-4 mt-5 mt-lg-0">
      
      {/* Department List */}
      <div className="mb-5">
        <h2 className="mb-4">Department</h2>
        <ul className="list-group list-group-flush">
          {uniqueDepartments.map((dept, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center px-0" key={index}>
              <a href="#">{dept}</a>
              <span className="badge badge-primary badge-pill">
                {courses.filter(item => item.department === dept).length}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Modules (e.g., IT Department) */}
     {/* Related Modules */}
<div className="mb-5">
  <h2 className="mb-4">Related Module</h2>
  {relatedModules.map(item => (
    <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mb-3" key={item.id}>
      <img
        className="img-fluid"
        src={item.img}
        alt={item.moduleName}
        style={{ width: '80px', height: '80px' }}
      />
      <div className="pl-3">
        <h5>{item.moduleName}</h5>
        <div className="d-flex">
          <small className="mr-3"><i className="fa fa-user text-primary" /> {item.courseCode}</small>
          <small className="mr-3"><i className="fa fa-folder text-primary" /> {item.department}</small>
          <small className="mr-3"><i className="fa fa-comments text-primary" /> {item.creadit}</small>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Tag Cloud */}
      <div className="mb-5">
        <h2 className="mb-4">Tag Cloud</h2>
        <div className="d-flex flex-wrap m-n1">
          {tags.map((tag, index) => (
            <a key={index} href="#" className="btn btn-outline-primary m-1">
              {tag}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

export default CourseSideBar;
