import React from "react";
import ProfessorsData from "../../data/ProfessorsData"; // Import data

function Professors() {
  return (
    <div>
      {/* Team Start */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Professors</span>
            </p>
            <h1 className="mb-4">Meet Our Professors</h1>
          </div>
          <div className="row">
            {ProfessorsData.map((professor) => (
              <div key={professor.id} className="col-md-6 col-lg-3 text-center team mb-5">
                <div className="position-relative overflow-hidden mb-4" style={{ borderRadius: "100%" }}>
                  <img className="img-fluid w-100" src={professor.imageUrl} alt={professor.name} />
                  <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                    <a className="btn btn-outline-light text-center mr-2 px-0" style={{ width: "38px", height: "38px" }} href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a className="btn btn-outline-light text-center mr-2 px-0" style={{ width: "38px", height: "38px" }} href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a className="btn btn-outline-light text-center px-0" style={{ width: "38px", height: "38px" }} href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
                <h4>{professor.name}</h4>
                <i>{professor.module}</i>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Team End */}
    </div>
  );
}

export default Professors;
