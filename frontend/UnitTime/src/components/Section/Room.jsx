import React from 'react'
import room1 from "../../assets/user/img/class-1.jpg"
import room2 from "../../assets/user/img/class-2.jpg"
import room3 from "../../assets/user/img/class-3.jpg"
function Room() {
  return (
    <div>
         {/* Class Start */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Popular Rooms</span>
            </p>
            <h1 className="mb-4">Rooms for Your Kids</h1>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img className="card-img-top mb-2" src={room1} alt="" />
                <div className="card-body text-center">
                  <h4 className="card-title">Drawing Class</h4>
                  <p className="card-text">
                    Justo ea diam stet diam ipsum no sit, ipsum vero et et diam
                    ipsum duo et no et, ipsum ipsum erat duo amet clita duo
                  </p>
                </div>
                <div className="card-footer bg-transparent py-4 px-5">
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Age of Kids</strong>
                    </div>
                    <div className="col-6 py-1">3 - 6 Years</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Total Seats</strong>
                    </div>
                    <div className="col-6 py-1">40 Seats</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Class Time</strong>
                    </div>
                    <div className="col-6 py-1">08:00 - 10:00</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href="" className="btn btn-primary px-4 mx-auto mb-4">Join Now</a>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img className="card-img-top mb-2" src={room2}alt="" />
                <div className="card-body text-center">
                  <h4 className="card-title">Language Learning</h4>
                  <p className="card-text">
                    Justo ea diam stet diam ipsum no sit, ipsum vero et et diam
                    ipsum duo et no et, ipsum ipsum erat duo amet clita duo
                  </p>
                </div>
                <div className="card-footer bg-transparent py-4 px-5">
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Age of Kids</strong>
                    </div>
                    <div className="col-6 py-1">3 - 6 Years</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Total Seats</strong>
                    </div>
                    <div className="col-6 py-1">40 Seats</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Class Time</strong>
                    </div>
                    <div className="col-6 py-1">08:00 - 10:00</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href ="" className="btn btn-primary px-4 mx-auto mb-4">Join Now</a>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img className="card-img-top mb-2" src={room3}alt="" />
                <div className="card-body text-center">
                  <h4 className="card-title">Basic Science</h4>
                  <p className="card-text">
                    Justo ea diam stet diam ipsum no sit, ipsum vero et et diam
                    ipsum duo et no et, ipsum ipsum erat duo amet clita duo
                  </p>
                </div>
                <div className="card-footer bg-transparent py-4 px-5">
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Age of Kids</strong>
                    </div>
                    <div className="col-6 py-1">3 - 6 Years</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Total Seats</strong>
                    </div>
                    <div className="col-6 py-1">40 Seats</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Class Time</strong>
                    </div>
                    <div className="col-6 py-1">08:00 - 10:00</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href="" className="btn btn-primary px-4 mx-auto mb-4">Join Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Class End */}
    </div>
  )
}

export default Room