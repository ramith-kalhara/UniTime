import React from 'react';
import CourseData from '../../data/CourseData'; // ✅ Import the data

function CourseSideBar() {
  // Extract all unique departments
  const uniqueDepartments = [...new Set(CourseData.map(item => item.department))];

  // Filter only IT department modules
  const itModules = CourseData.filter(item => item.department === "IT");
  const tags = CourseData.filter(item => item.moduleName === "ITPM");

  return (
    <div className="col-lg-4 mt-5 mt-lg-0">
      
      {/* Category List */}
      <div className="mb-5">
        <h2 className="mb-4">Department</h2>
        <ul className="list-group list-group-flush">
          {uniqueDepartments.map((dept, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center px-0" key={index}>
              <a href="#">{dept}</a>
              <span className="badge badge-primary badge-pill">
                {CourseData.filter(item => item.department === dept).length}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Module */}
      <div className="mb-5">
        <h2 className="mb-4">Related Module</h2>
        {itModules.map(item => (
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
    {/* Tag Cloud */}
<div className="mb-5">
  <h2 className="mb-4">Tag Cloud</h2>
  <div className="d-flex flex-wrap m-n1">
    {tags.length > 0 && tags[0].tags.map((tag, index) => (
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
