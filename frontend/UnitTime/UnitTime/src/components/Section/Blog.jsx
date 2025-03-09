import React from 'react'
import blog1 from "../../assets/user/img/blog-1.jpg"
import blog2 from "../../assets/user/img/blog-2.jpg"
import blog3 from "../../assets/user/img/blog-3.jpg"
function Blog() {
  return (
    <div>
         {/* Blog Start */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Latest Blog</span>
            </p>
            <h1 className="mb-4">Latest Articles From Blog</h1>
          </div>
          <div className="row pb-3">
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2">
                <img className="card-img-top mb-2" src={blog1} alt="" />
                <div className="card-body bg-light text-center p-4">
                  <h4 >Diam amet eos at no eos</h4>
                  <div className="d-flex justify-content-center mb-3">
                    <small className="mr-3"><i className="fa fa-user text-primary" /> Admin</small>
                    <small className="mr-3"><i className="fa fa-folder text-primary" /> Web Design</small>
                    <small className="mr-3"><i className="fa fa-comments text-primary" /> 15</small>
                  </div>
                  <p>
                    Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                    eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                    lorem. Tempor ipsum justo amet stet...
                  </p>
                  <a href ="" className="btn btn-primary px-4 mx-auto my-2">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2">
                <img className="card-img-top mb-2" src={blog2} alt="" />
                <div className="card-body bg-light text-center p-4">
                  <h4 >Diam amet eos at no eos</h4>
                  <div className="d-flex justify-content-center mb-3">
                    <small className="mr-3"><i className="fa fa-user text-primary" /> Admin</small>
                    <small className="mr-3"><i className="fa fa-folder text-primary" /> Web Design</small>
                    <small className="mr-3"><i className="fa fa-comments text-primary" /> 15</small>
                  </div>
                  <p>
                    Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                    eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                    lorem. Tempor ipsum justo amet stet...
                  </p>
                  <a href="" className="btn btn-primary px-4 mx-auto my-2">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2">
                <img className="card-img-top mb-2" src={blog3} alt="" />
                <div className="card-body bg-light text-center p-4">
                  <h4 >Diam amet eos at no eos</h4>
                  <div className="d-flex justify-content-center mb-3">
                    <small className="mr-3"><i className="fa fa-user text-primary" /> Admin</small>
                    <small className="mr-3"><i className="fa fa-folder text-primary" /> Web Design</small>
                    <small className="mr-3"><i className="fa fa-comments text-primary" /> 15</small>
                  </div>
                  <p>
                    Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                    eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                    lorem. Tempor ipsum justo amet stet...
                  </p>
                  <a href="" className="btn btn-primary px-4 mx-auto my-2">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}
    </div>
  )
}

export default Blog