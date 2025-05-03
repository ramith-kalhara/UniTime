// components/Section/ProfessorCard.jsx
import React from "react";

function ProfessorCard({ professor }) {
  return (
    <div className="col-md-6 col-lg-4 text-center team mb-5">
      <div className="position-relative overflow-hidden mb-4 mr-5" style={{ borderRadius: "100%" }}>
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
  );
}

export default ProfessorCard;
