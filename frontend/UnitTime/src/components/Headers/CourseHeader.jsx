import React from 'react';

function CourseHeader({ courseList, onFilterChange, selectedDepartment }) {
  const uniqueDepartments = [...new Set(courseList.map(item => item.department))];

  return (
    <div className="col-12 text-center mb-2">
      <ul className="list-inline mb-4" id="schedule-filters">
        <li
          className={`btn btn-outline-primary m-1 ${selectedDepartment === 'All' ? 'active' : ''}`}
          onClick={() => onFilterChange('All')}
        >
          All
        </li>
        {uniqueDepartments.map((name, index) => (
          <li
            className={`btn btn-outline-primary m-1 ${selectedDepartment === name ? 'active' : ''}`}
            key={index}
            onClick={() => onFilterChange(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseHeader;
