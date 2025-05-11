import React from 'react'
import about1 from "../../assets/user/img/about-1.jpg"
import about2 from "../../assets/user/img/about-2.jpg"
function About() {
  return (
    <div>
         {/* About Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img className="img-fluid rounded mb-5 mb-lg-0" src={about1} alt="" />
            </div>
            <div className="col-lg-7">
              <p className="section-title pr-5">
                <span className="pr-2">Learn About Us</span>
              </p>
              <h1 className="mb-4">The Best University for Your Future</h1>
              <p>
                At UniTime, we offer an exceptional education that shapes your future. 
                With expert faculty, cutting-edge facilities, and a supportive community,
                we’re here to help you succeed in your academic journey.
              </p>
              <div className="row pt-2 pb-4">
                <div className="col-6 col-md-4">
                  <img className="img-fluid rounded" src={about2} alt="" />
                </div>
                <div className="col-6 col-md-8">
                  <ul className="list-inline m-0">
                    <li className="py-2 border-top border-bottom">
                      <i className="fa fa-check text-primary mr-3" />World-class education dedicated to academic excellence.
                    </li>
                    <li className="py-2 border-bottom">
                      <i className="fa fa-check text-primary mr-3" />Innovative programs fostering personal and academic growth.
                    </li>
                    <li className="py-2 border-bottom">
                      <i className="fa fa-check text-primary mr-3" />Expert faculty and modern facilities for a rich learning experience.
                    </li>
                  </ul>
                </div>
              </div>
              <a href="" className="btn btn-primary mt-2 py-2 px-4">Learn More</a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </div>
  )
}

export default About