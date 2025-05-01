// pages/User/Professor.jsx
import React from 'react';
import Professors from '../../components/Section/Professors';
import UserHeader from '../../components/Headers/UserHeader';
import ProfessorsData from '../../data/ProfessorsData';

function Professor() {
  return (
    <div>
      <UserHeader pageIndex={2} />
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Professors</span>
            </p>
            <h1 className="mb-4">Meet Our Professors</h1>
          </div>

          {/* Show only 3 professors */}
          <Professors data={ProfessorsData} />
        </div>
      </div>
    </div>
  );
}

export default Professor;
