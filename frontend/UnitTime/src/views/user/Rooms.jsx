import React, { useEffect, useState } from 'react';
import Room from '../../components/Section/Room';
import UserHeader from '../../components/Headers/UserHeader';
import axios from 'axios';

import room1 from '../../assets/user/img/class-1.jpg';
import room2 from '../../assets/user/img/class-1.jpg';
import room3 from '../../assets/user/img/class-1.jpg';
import room4 from '../../assets/user/img/class-1.jpg';


const roomImages = [room1, room2, room3, room4];

function Rooms() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8086/api/schedule/')
      .then(response => {
        const transformedData = response.data.map((item, index) => ({
          id: item.id,
          img: roomImages[index % roomImages.length], // Rotate images
          room_type: item.room?.roomType || "N/A",
          description: item.scheduleDescription || "No description provided.",
          department: item.course?.department || "N/A",
          capacity: item.room?.capacity || "N/A",
          startTime: item.startTime,
          endTime: item.endTime,
          lectureName: item.lectureTitle,
          moduleName: item.course?.name || "N/A"
        }));
        setSchedules(transformedData);
      })
      .catch(error => {
        console.error('Failed to fetch schedule data:', error);
      });
  }, []);

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
            {schedules.map(item => (
              <Room key={item.id} ScheduleData={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
