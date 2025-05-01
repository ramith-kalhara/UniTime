import React from 'react';
import Room from '../../components/Section/Room';
import UserHeader from '../../components/Headers/UserHeader';
import ScheduleData from '../../data/ScheduleData';

function Rooms() {
  return (
    <div>
      <UserHeader pageIndex={0} />
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Start Your Future</span>
            </p>
            <h1 className="mb-4">Scheduled Lectures</h1>
          </div>
          <div className="row">
            {ScheduleData.map(item => (
              <Room key={item.id} ScheduleData={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
