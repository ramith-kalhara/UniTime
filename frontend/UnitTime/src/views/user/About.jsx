// src/views/User/About.jsx
import React from 'react';
import Aboutsection from '../../components/Section/About';
import Facilities from '../../components/Section/Facilities';
import Professors from '../../components/Section/Professors';
import UserHeader from '../../components/Headers/UserHeader';

function About() {
  return (
    <div>
      <UserHeader pageIndex={1} /> 
      <Aboutsection />
      <Facilities />
      {/* <Professors /> */}
    </div>
  );
}

export default About;
