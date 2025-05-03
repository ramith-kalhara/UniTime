// components/Section/Professors.jsx
import React from "react";
import ProfessorCard from "./ProfessorCard";

function Professors({ data }) {
  return (
    <div className="row">
      {data.map((professor) => (
        <ProfessorCard key={professor.id} professor={professor} />
      ))}
    </div>
  );
}

export default Professors;
