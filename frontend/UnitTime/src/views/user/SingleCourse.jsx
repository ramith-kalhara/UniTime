import React from 'react';
import { useParams } from 'react-router-dom';
import CourseData from '../../data/CourseData';
import UserHeader from '../../components/Headers/UserHeader';
import CourseSideBar from '../../components/Sidebar/CourseSideBar';

function SingleCourse() {
  const { id } = useParams();
  const course = CourseData.find(item => item.id === parseInt(id));

  if (!course) return <p>Course not found</p>;

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
          <CourseSideBar />
        </div>
      </div>
    </div>
  );
}

export default SingleCourse;
