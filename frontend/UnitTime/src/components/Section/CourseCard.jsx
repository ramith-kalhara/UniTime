import React from 'react'
import { Link } from 'react-router-dom'

function CourseCard({ CourseData }) {
  return (
    <div>



      <img className="card-img-top mb-2" src={CourseData.img} style={{ width: '350px', height: '234px', objectFit: 'cover', borderRadius: '8px' }} alt="" />
      <div className="card-body bg-light text-center p-4">
        <h4 >{CourseData.moduleName}</h4>
        <div className="d-flex justify-content-center mb-3">
          <small className="mr-3"><i className="fa fa-user text-primary" /> {CourseData.department}</small>
          <small className="mr-3"><i className="fa fa-folder text-primary" /> {CourseData.courseCode}</small>
          <small className="mr-3"><i className="fa fa-comments text-primary" /> {CourseData.creadit}</small>
        </div>
        <p>
          {CourseData.description}
        </p>
        <Link to={`/user/singleCourse/${CourseData.id}`} className="btn btn-primary px-4 mx-auto my-2">
          Read More
        </Link>

      </div>



    </div>
  )
}

export default CourseCard