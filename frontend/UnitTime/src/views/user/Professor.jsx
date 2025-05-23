// pages/User/Professor.jsx
import React, { useEffect, useState } from 'react';
import Professors from '../../components/Section/Professors';
import UserHeader from '../../components/Headers/UserHeader';
import axios from 'axios';

import team1 from '../../assets/user/img/team-1.jpg';
import team2 from '../../assets/user/img/team-2.jpg';
import team3 from '../../assets/user/img/team-3.jpg';
import team4 from '../../assets/user/img/team-4.jpg';

const imageList = [team1, team2, team3, team4];

function Professor() {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8086/api/professor/')
      .then(response => {
        const transformedData = response.data.map((prof, index) => ({
          id: prof.id,
          imageUrl: prof.imageBase64 
            ? `data:image/jpeg;base64,${prof.imageBase64}` 
            : imageList[index % imageList.length], // fallback if no image
          name: prof.full_name,
          moduleId: prof.course?.courseCode || 'N/A',
          module: prof.course?.name || 'N/A'
        }));
        setProfessors(transformedData);
      })
      .catch(error => {
        console.error('Failed to fetch professors:', error);
      });
  }, []);

  // Filter professors based on course name
  const filteredProfessors = professors.filter((prof) =>
    prof.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          {/* Search Input */}
          <div className="mb-4 text-center">
            <input
              type="text"
              placeholder="Search by Course Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control w-50 mx-auto"
            />
          </div>

          {/* Professor List */}
          <Professors data={filteredProfessors} />
        </div>
      </div>
    </div>
  );
}

export default Professor;
