// src/components/Headers/UserHeader.jsx
import React from 'react';
import userHeaderData from '../../data/userHeaderData';  // Importing data from the new file

function UserHeader({ pageIndex }) {
  // Assuming you are passing the page index dynamically to get the right header details
  const { title, breadcrumb } = userHeaderData[pageIndex]; 

  return (
    <div>
      {/* Header Start */}
      <div className="container-fluid bg-primary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
          <h3 className="display-3 font-weight-bold text-white">{title}</h3>
          <div className="d-inline-flex text-white">
            {breadcrumb.map((item, index) => (
              <p key={index} className="m-0">
                {index === 0 ? (
                  <a className="text-white" href="#">
                    {item}
                  </a>
                ) : (
                  <>
                    <span className="px-2">/</span>
                    {item}
                  </>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Header End */}
    </div>
  );
}

export default UserHeader;
