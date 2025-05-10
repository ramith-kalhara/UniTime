import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserHeader from '../../components/Headers/UserHeader';
import CourseSideBar from '../../components/Sidebar/CourseSideBar';

import blog1 from '../../assets/user/img/blog-1.jpg';
import blog2 from '../../assets/user/img/blog-2.jpg';
import blog3 from '../../assets/user/img/blog-3.jpg';

const courseImages = [blog1, blog2, blog3];

function SingleCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8086/api/course/${id}`)
      .then(response => {
        const data = response.data;

        setCourse({
          id: data.courseId,
          img: data.imageBase64 ? `data:image/jpeg;base64,${data.imageBase64}` : courseImages[data.courseId % courseImages.length],

          moduleName: data.name,
          description: data.description,
          department: data.department,
          courseCode: data.courseCode,
          creadit: data.credits,
          tags: [], // or fetch all courses and set tags if needed
          descriptionLong: data.description
        });
      })
      .catch(error => {
        console.error('Failed to load course:', error);
      });
  }, [id]);

  if (!course) return <p className="text-center py-5">Loading course...</p>;

  return (
    <div>
      <UserHeader pageIndex={6} />
      <div className="container py-5">
        <div className="row pt-5">
          <div className="col-lg-8">
            <div className="d-flex flex-column text-left mb-3">
              <p className="section-title pr-5"><span className="pr-2">Module Detail Page</span></p>
              <h1 className="mb-3">{course.moduleName}</h1>
              <div className="d-flex">
                <p className="mr-3"><i className="fa fa-user text-primary" /> {course.courseCode}</p>
                <p className="mr-3"><i className="fa fa-folder text-primary" /> {course.department}</p>
                <p className="mr-3"><i className="fa fa-comments text-primary" /> {course.creadit}</p>
              </div>
            </div>
            <div className="mb-5">
              <img className="img-fluid rounded w-100 mb-4" src={course.img} alt={course.moduleName} />
              <p style={{ textAlign: "justify" }}>{course.descriptionLong}</p>
            </div>
          </div>
          <CourseSideBar department={course.department} />
        </div>
      </div>
    </div>
  );
}

export default SingleCourse;
