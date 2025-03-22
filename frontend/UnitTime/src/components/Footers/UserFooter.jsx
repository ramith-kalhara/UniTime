import React from 'react'

function UserFooter() {
  return (
    <div>
        {/* Footer Start */}
      <div className="container-fluid bg-secondary text-white mt-5 py-5 px-sm-3 px-md-5">
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 mb-5">
            <a href="" className="navbar-brand font-weight-bold text-primary m-0 mb-4 p-0" style={{fontSize: '40px', lineHeight: '40px'}}>
              <i className="flaticon-043-teddy-bear" />
              <span className="text-white">UniTime</span>
            </a>
            <p>
            A comprehensive web application for efficient university scheduling and management. 
            Streamline course planning, room assignments, and faculty coordination.
            </p>
            <div className="d-flex justify-content-start mt-4">
              <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-twitter" /></a>
              <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-linkedin-in" /></a>
              <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0" style={{width: '38px', height: '38px'}} href="#"><i className="fab fa-instagram" /></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h3 className="text-primary mb-4">Get In Touch</h3>
            <div className="d-flex">
              <h4 className="fa fa-map-marker-alt text-primary" />
              <div className="pl-3">
                <h5 className="text-white">Address</h5>
                <p>No. 25, Galle Road, Colombo 03, Sri Lanka</p>
              </div>
            </div>
            <div className="d-flex">
              <h4 className="fa fa-envelope text-primary" />
              <div className="pl-3">
                <h5 className="text-white">Email</h5>
                <p> study@unitime.lk</p>
              </div>
            </div>
            <div className="d-flex">
              <h4 className="fa fa-phone-alt text-primary" />
              <div className="pl-3">
                <h5 className="text-white">Phone</h5>
                <p>+94 11 234 5678</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h3 className="text-primary mb-4">Quick Links</h3>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Home</a>
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />About Us</a>
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Our Rooms</a>
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Our Teachers</a>
              <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Our Blog</a>
              <a className="text-white" href="#"><i className="fa fa-angle-right mr-2" />Contact Us</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h3 className="text-primary mb-4">Newsletter</h3>
            <form action="">
              <div className="form-group">
                <input type="text" className="form-control border-0 py-4" placeholder="Your Name" required="required" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control border-0 py-4" placeholder="Your Email" required="required" />
              </div>
              <div>
                <button className="btn btn-primary btn-block border-0 py-3" type="submit">
                  Submit Now
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="container-fluid pt-5" style={{borderTop: '1px solid rgba(23, 162, 184, 0.2)'}}>
          <p className="m-0 text-center text-white">
            ©
            <a className="text-primary font-weight-bold" href="#">UniTime.com</a>.
            All Rights Reserved.
            {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
            Designed by
            <a className="text-primary font-weight-bold" href="https://htmlcodex.com" />
            <br />Distributed By:
            <a href="https://themewagon.com" target="_blank" />
          </p>
        </div>
      </div>
      {/* Footer End */}
    </div>
  )
}

export default UserFooter