import React from 'react'
import portfoli1 from "../../assets/user/img/portfolio-1.jpg"
import portfoli2 from "../../assets/user/img/portfolio-2.jpg"
import portfoli3 from "../../assets/user/img/portfolio-3.jpg"
import portfoli4 from "../../assets/user/img/portfolio-4.jpg"
import portfoli5 from "../../assets/user/img/portfolio-5.jpg"
import portfoli6 from "../../assets/user/img/portfolio-6.jpg"

function Course() {
  return (
    <div>
        {/* Gallery Start */}
      <div className="container-fluid pt-5 pb-3">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Course</span>
            </p>
            <h1 className="mb-4">Our Student University Course</h1>
          </div>
          {/* Section for Academic Schedule */}
          <div className="row">
            <div className="col-12 text-center mb-2">
              {/* <h2>My Academic Schedule</h2> */}
              <ul className="list-inline mb-4" id="schedule-filters">
                <li className="btn btn-outline-primary m-1 active" data-filter="*">
                  All Subjects
                </li>
                <li className="btn btn-outline-primary m-1" data-filter=".network-design">
                  Network Design
                </li>
                <li className="btn btn-outline-primary m-1" data-filter=".data-science">
                  Data Science
                </li>
                <li className="btn btn-outline-primary m-1" data-filter=".frameworks">
                  Frameworks
                </li>
                <li className="btn btn-outline-primary m-1" data-filter=".business-management">
                  Business Management
                </li>
              </ul>
            </div>
          </div>
          <div className="row portfolio-container">
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item first">
              <div className="position-relative overflow-hidden mb-2">
                <img className="img-fluid w-100" src={portfoli1} alt="" />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href={portfoli1} data-lightbox="portfolio">
                    <i className="fa fa-plus text-white" style={{fontSize: '60px'}} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item second">
              <div className="position-relative overflow-hidden mb-2">
                <img className="img-fluid w-100" src={portfoli2}  alt="" />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href={portfoli2}  data-lightbox="portfolio">
                    <i className="fa fa-plus text-white" style={{fontSize: '60px'}} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item third">
              <div className="position-relative overflow-hidden mb-2">
                <img className="img-fluid w-100" src={portfoli2}  alt="" />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href={portfoli3}  data-lightbox="portfolio">
                    <i className="fa fa-plus text-white" style={{fontSize: '60px'}} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item first">
              <div className="position-relative overflow-hidden mb-2">
                <img className="img-fluid w-100" src={portfoli4}  alt="" />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href={portfoli4}  data-lightbox="portfolio">
                    <i className="fa fa-plus text-white" style={{fontSize: '60px'}} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item second">
              <div className="position-relative overflow-hidden mb-2">
                <img className="img-fluid w-100" src={portfoli5}  alt="" />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href={portfoli5}  data-lightbox="portfolio">
                    <i className="fa fa-plus text-white" style={{fontSize: '60px'}} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item third">
              <div className="position-relative overflow-hidden mb-2">
                <img className="img-fluid w-100" src={portfoli6}  alt="" />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href={portfoli6}  data-lightbox="portfolio">
                    <i className="fa fa-plus text-white" style={{fontSize: '60px'}} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery End */}
    </div>
  )
}

export default Course