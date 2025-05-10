import React from 'react'
import ProfileCover from "../../assets/user/img/header.png";
function Hero() {
  return (
    <div>
         {/* Header Start */}
      <div className="container-fluid bg-primary px-0 px-md-5 mb-5">
        <div className="row align-items-center px-3">
          <div className="col-lg-6 text-center text-lg-left">
            <h4 className="text-white mb-4 mt-5 mt-lg-0">Student Learning Center</h4>
            <h1 className="display-3 font-weight-bold text-white">
              New Approach to Student Education
            </h1>
            <p className="text-white mb-4">
            UNITIME is your all-in-one platform for managing courses, connecting with professors, 
            and optimizing your university experience with modern tools.
            </p>
            <a href="/" className="btn btn-secondary mt-1 py-3 px-5">Learn More</a>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <img className="img-fluid mt-5" src={ProfileCover} alt="" />
          </div>
        </div>
      </div>
      {/* Header End */}
    </div>
  )
}

export default Hero