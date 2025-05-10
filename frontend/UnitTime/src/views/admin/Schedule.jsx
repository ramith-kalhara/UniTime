import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';

import teamImage from "../../assets/admin/img/theme/team-4-800x800.jpg";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label
} from "reactstrap";
import AdminHeader from "../../components/Headers/AdminHeader";

const Schedule = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [lecture_title, setLectureTitle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [schedule_description, setscheduleDescription] = useState("");
  const [roomId, setRoomId] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [formValues, setFormValues] = useState({
    image: null,
  });
  

  //get data to select option menu 
  const [professors, setProfessors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [rooms, setRooms] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch professors
        const professorResponse = await fetch("http://localhost:8086/api/professor/");
        if (!professorResponse.ok) {
          throw new Error("Failed to fetch professors");
        }
        const professorData = await professorResponse.json();
        setProfessors(professorData);

        // Fetch courses
        const courseResponse = await fetch("http://localhost:8086/api/course/");
        if (!courseResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const courseData = await courseResponse.json();
        setCourses(courseData);

        // Fetch rooms
        const roomResponse = await fetch("http://localhost:8086/api/room/");
        if (!roomResponse.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const roomData = await roomResponse.json();
        setRooms(roomData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleCapacityChange = (e) => {
    const { value } = e.target;
    // Allow only numbers in the capacity field
    if (/^[0-9]*$/.test(value)) {
      setCapacity(value);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "You can only enter numbers in the Capacity field.",
      });
    }
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!startDate || !startTime || !endTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start date and time, and End time are required!",
      });
      return;
    }
  
    const now = dayjs();
    if (dayjs(startDate).isBefore(now, "day")) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Start date cannot be in the past.",
      });
      return;
    }
  
    const scheduleData = {
      capacity: parseInt(capacity),
      lectureTitle: lecture_title,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      startTime: dayjs(startTime).format("HH:mm:ss"),
      endTime: dayjs(endTime).format("HH:mm:ss"),
      scheduleDescription: schedule_description,
      room: { id: roomId },
      professor: { id: professorId },
      course: { courseId: courseId },
    };
  
    try {
      const formData = new FormData();
      formData.append("schedule", new Blob([JSON.stringify(scheduleData)], { type: "application/json" }));
      if (formValues.image) {
        formData.append("image", formValues.image);
      }
  
      const response = await fetch("http://localhost:8086/api/schedule/create", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Schedule creation failed");
  
      Swal.fire({
        icon: "success",
        title: "Schedule Created",
        text: "Schedule successfully added!",
      });
  
      // Optionally reset your form state here...
  
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create schedule. Please try again.",
      });
    }
  };
  


  return (
    <>
      <AdminHeader pageIndex={5} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={teamImage}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Schedule</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>



                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Schedule Information</h6>
                  <div className="pl-lg-4">
                    {/* Schedule Information */}
                    <Row>


                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-roomNumber" className="form-control-label">
                            Select Room
                          </Label>
                          <Input
                            type="select"
                            name="roomId"
                            id="input-roomNumber"
                            className="form-control"
                            value={roomId} // Use roomId here
                            onChange={(e) => setRoomId(e.target.value)} // Set roomId here
                          >
                            <option value="">Select Room</option>
                            {rooms.map((room) => (
                              <option key={room.id} value={room.id}>
                                {room.roomName}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>

                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="input-professorName" className="form-control-label">
                            Select Professor
                          </Label>
                          <Input
                            type="select"
                            name="professorId"
                            id="input-professorName"
                            className="form-control"
                            value={professorId} // Use professorId here
                            onChange={(e) => setProfessorId(e.target.value)} // Set professorId here
                          >
                            <option value="">Select Professor</option>
                            {professors.map((professor) => (
                              <option key={professor.id} value={professor.id}>
                                {professor.full_name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>


                      </Col>


                    </Row>

                    <Row>
                      {/* Capacity Field */}
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-capacity">
                            Capacity
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-Capacity"
                            placeholder="Capacity"
                            type="text"
                            value={capacity}
                            onChange={handleCapacityChange}
                          />
                        </FormGroup>
                      </Col>

                      {/* Module Code Field */}
                      <Col lg="6">


                        <FormGroup>
                          <Label htmlFor="input-moduleCode" className="form-control-label">
                            Select Module Code
                          </Label>
                          <Input
                            type="select"
                            name="moduleCode"
                            id="input-moduleCode"
                            className="form-control"
                            value={courseId} // Use courseId here
                            onChange={(e) => setCourseId(e.target.value)} // Set courseId here
                          >
                            <option value="">Select Module Code</option>
                            {courses.map((course) => (
                              <option key={course.courseId} value={course.courseId}>
                                {course.courseCode}
                              </option>
                            ))}
                          </Input>

                        </FormGroup>

                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-lectureTitle">
                            Lecture Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-lectureTitle"
                            placeholder="Lecture Title"
                            type="text"
                            value={lecture_title}
                            onChange={(e) => setLectureTitle(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-image">
                            Image
                          </label>
                          <Input
  type="file"
  name="image"
  onChange={(e) =>
    setFormValues({
      ...formValues,
      image: e.target.files[0], // this stores the file
    })
  }
/>

                        </FormGroup>

                      </Col>
                    </Row>

                    {/* Date and Time Pickers */}
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Start Date"
                              value={startDate}
                              onChange={setStartDate}
                              renderInput={(props) => <Input {...props} />}
                            />
                          </LocalizationProvider>
                        </FormGroup>
                      </Col>

                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              label="Start Time"
                              value={startTime}
                              onChange={setStartTime}
                              renderInput={(props) => <Input {...props} />}
                            />
                          </LocalizationProvider>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              label="End Time"
                              value={endTime}
                              onChange={setEndTime}
                              renderInput={(props) => <Input {...props} />}
                            />
                          </LocalizationProvider>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Schedule Description */}
                  <h6 className="heading-small text-muted mb-4">Schedule Description</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Schedule Description</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about your schedule ..."
                        rows="4"
                        type="textarea"
                        value={schedule_description}
                        onChange={(e) => setscheduleDescription(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="text-center">
                    <Button color="primary" type="submit">
                      Save Schedule
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Schedule;
