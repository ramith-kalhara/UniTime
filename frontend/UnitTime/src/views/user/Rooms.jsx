import React, { useEffect, useState } from 'react';
import Room from '../../components/Section/Room';
import UserHeader from '../../components/Headers/UserHeader';
import axios from 'axios';

import room1 from '../../assets/user/img/class-1.jpg';
import room2 from '../../assets/user/img/class-1.jpg';
import room3 from '../../assets/user/img/class-1.jpg';
import room4 from '../../assets/user/img/class-1.jpg';
import AiSchedule from '../../components/Section/AiSchedule';


const roomImages = [room1, room2, room3, room4];

function Rooms() {
  const [schedules, setSchedules] = useState([]);
  const [aiSchedules, setAiSchedules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8086/api/schedule/')
      .then(response => {
        const transformedData = response.data.map((item, index) => ({
          id: item.id,
          img: item.imageBase64
            ? `data:image/jpeg;base64,${item.imageBase64}`
            : roomImages[index % roomImages.length],
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

  useEffect(() => {
    axios.get('http://localhost:8086/ai-schedule/')
      .then(async (response) => {
        const schedulePromises = response.data.map(async (item, index) => {
          const professorRes = await axios.get(`http://localhost:8086/api/professor/${item.professorId}`);
          const professor = professorRes.data;

          const roomRes = await axios.get(`http://localhost:8086/api/room/${item.roomId}`);
          const room = roomRes.data;

          const courseRes = await axios.get(`http://localhost:8086/api/course/${item.courseId}`);
          const course = courseRes.data;

          const [day, time] = item.timeSlot.split(" ");

          return {
            id: index + 1,
            img: professor.imageBase64
              ? `data:image/jpeg;base64,${professor.imageBase64}`
              : roomImages[index % roomImages.length],
            room_type: room.roomType || "N/A",
            description: "AI-powered scheduled lecture.",
            department: course.department || "N/A",
            capacity: room.capacity || "N/A",
            startTime: `${day} ${time}`,
            profName: professor.full_name || "Unknown Professor",
            moduleName: course.name || "Unknown Module"
          };
        });

        const fullAISchedules = await Promise.all(schedulePromises);
        setAiSchedules(fullAISchedules);
      })
      .catch(error => {
        console.error('Failed to fetch AI schedule data:', error);
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


        {/* AI-Powered Schedule Section */}
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">AI Smart System</span>
            </p>
            <h1 className="mb-4">AI Powered Schedule</h1>
          </div>
          <div className="row">
            {aiSchedules.map(item => (
              <AiSchedule key={item.id} ScheduleData={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
