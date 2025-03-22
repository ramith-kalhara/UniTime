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
            <h1 className="mb-4">Rooms Type</h1>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img className="card-img-top mb-2" src={room1} alt="" />
                <div className="card-body text-center">
                  <h4 className="card-title">Lectuer room</h4>
                  <p className="card-text">
                  Book a lecture room for academic sessions, seminars, or meetings with ease through our web application.
                  </p>
                  <p className="card-text">
                  *Any food and beverage items are not allowed except water*
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
                      <strong>Operating Hours</strong>
                    </div>
                    <div className="col-6 py-1">9:00 AM to 5:00 PM</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href="" className="btn btn-primary px-4 mx-auto mb-4">Book Now</a>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img className="card-img-top mb-2" src={room2}alt="" />
                <div className="card-body text-center">
                  <h4 className="card-title">Computer Lab</h4>
                  <p className="card-text">
                  Reserve a computer lab equipped with the latest technology for practical sessions, IT training, or research work.
                  </p>
                  <p className="card-text">
                  *Any food and beverage items are not allowed except water*
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
                      <strong>Operating Hours</strong>
                    </div>
                    <div className="col-6 py-1">9:00 AM to 5:00 PM</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href ="" className="btn btn-primary px-4 mx-auto mb-4">Book Now</a>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img className="card-img-top mb-2" src={room3}alt="" />
                <div className="card-body text-center">
                  <h4 className="card-title">Smart Class Room</h4>
                  <p className="card-text">
                  Schedule a smart classroom with advanced digital tools for interactive and engaging learning experiences.
                  </p>
                  <p className="card-text">
                  *Any food and beverage items are not allowed except water*
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
                      <strong>Operating Hours</strong>
                    </div>
                    <div className="col-6 py-1">9:00 AM to 5:00 PM</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href="" className="btn btn-primary px-4 mx-auto mb-4">Book Now</a>
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