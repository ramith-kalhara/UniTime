
import React from 'react'
import { Link } from "react-router-dom";

function UserNavbar() {
  return (
    <div>
        {/* Navbar Start */}
      <div className="container-fluid bg-light position-relative shadow">
        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
          <a href="" className="navbar-brand font-weight-bold text-secondary" style={{fontSize: '50px'}}>
            <i className="flaticon-043-teddy-bear" />
            <span className="text-primary">UniTime</span>
          </a>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav font-weight-bold mx-auto py-0">
              <a href="index.html" className="nav-item nav-link active">Home</a>
              <Link to="/user/about" className="nav-item nav-link">About</Link>
              <Link to="/user/room" className="nav-item nav-link">Shedule</Link>
              <Link to="/user/professor" className="nav-item nav-link">Professor</Link>
              <Link to="/user/course" className="nav-item nav-link">Course</Link>
              <Link to="/user/vote" className="nav-item nav-link">Vote</Link>
              <Link to="/user/shedule" className="nav-item nav-link">Calander</Link>
              {/* <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                >Pages</a>
              <div class="dropdown-menu rounded-0 m-0">
                <a href="blog.html" class="dropdown-item">Blog Grid</a>
                <a href="single.html" class="dropdown-item">Blog Detail</a>
              </div>
            </div> */}
              <Link to="/user/contact" className="nav-item nav-link">Contact</Link>
            </div>
            <a href ="" className="btn btn-primary px-4 mr-2">Login</a>
            <a href ="" className="btn btn-primary px-4 ">Logout</a>
          </div>
        </nav>
      </div>
      {/* Navbar End */}
        
    </div>
  )
}

export default UserNavbar