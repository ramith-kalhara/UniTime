import React from 'react'
import team1 from "../../assets/user/img/team-1.jpg"
import team2 from "../../assets/user/img/team-2.jpg"
import team3 from "../../assets/user/img/team-3.jpg"
import team4 from "../../assets/user/img/team-4.jpg"
function Professors() {
  return (
    <div>
         {/* Team Start */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Teachers</span>
            </p>
            <h1 className="mb-4">Meet Our Teachers</h1>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div className="position-relative overflow-hidden mb-4" style={{borderRadius: '100%'}}>
                <img className="img-fluid w-100" src={team1} alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-outline-light text-center px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
              <h4>Julia Smith</h4>
              <i>Music Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div className="position-relative overflow-hidden mb-4" style={{borderRadius: '100%'}}>
                <img className="img-fluid w-100" src={team2} alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-outline-light text-center px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
              <h4>Jhon Doe</h4>
              <i>Language Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div className="position-relative overflow-hidden mb-4" style={{borderRadius: '100%'}}>
                <img className="img-fluid w-100" src={team3} alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-outline-light text-center px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
              <h4>Mollie Ross</h4>
              <i>Dance Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div className="position-relative overflow-hidden mb-4" style={{borderRadius: '100%'}}>
                <img className="img-fluid w-100" src={team4} alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-outline-light text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-outline-light text-center px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
              <h4>Donald John</h4>
              <i>Art Teacher</i>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
    </div>
  )
}

export default Professors