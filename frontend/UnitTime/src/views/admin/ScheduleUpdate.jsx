import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import axios from "axios";
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
} from "reactstrap";
import AdminHeader from "../../components/Headers/AdminHeader";

const ScheduleUpdate = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [roomNumber, setRoomNumber] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [capacity, setCapacity] = useState("");
  const [scheduleDescription, setScheduleDescription] = useState("");

  const location = useLocation();
  const schedule = location.state;
  useEffect(() => {
    if (schedule) {
      setRoomNumber(schedule.roomNumber);
      setProfessorName(schedule.professorName);
      setLectureTitle(schedule.lectureTitle);
      setModuleCode(schedule.moduleCode);
      setCapacity(schedule.capacity.toString());
      setStartDate(dayjs(schedule.startDate));
      setStartTime(dayjs(schedule.startTime, "HH:mm:ss"));
      setEndTime(dayjs(schedule.endTime, "HH:mm:ss"));
      setScheduleDescription(schedule.scheduleDescription || "");
    }
  }, [schedule]);


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!roomNumber || !professorName || !lectureTitle || !moduleCode) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    if (!startDate || !startTime || !endTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start date and time, and End time are required!",
      });
      return;
    }

    // Validate Capacity should be a number
    if (capacity && isNaN(capacity)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Capacity must be a valid number.",
      });
      return;
    }



    const updatedSchedule = {
      scheduleId: schedule.scheduleId,
      roomNumber,
      professorName,
      capacity: parseInt(capacity),
      moduleCode,
      lectureTitle,
      startDate: startDate.format("YYYY-MM-DD"),
      startTime: startTime.format("HH:mm:ss"),
      endTime: endTime.format("HH:mm:ss"),
      scheduleDescription,
    };


    axios.put(`http://localhost:8086/api/schedule/${schedule.scheduleId}`, updatedSchedule)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Schedule Updated",
          text: "Your schedule has been updated successfully!",
        });
      })
      .catch((err) => {
        console.error("Failed to update schedule", err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "There was a problem updating the schedule.",
        });
      });

  };

  // Ensure the Capacity input only allows numbers
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
  return (
    <>
      <AdminHeader pageIndex={6} />
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
                    <h3 className="mb-0">Update Schedule</h3>
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
                          <label className="form-control-label" htmlFor="input-roomNumber">
                            Room Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-roomNumber"
                            placeholder="Room Number"
                            maxLength="6"
                            type="text"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-professorName">
                            Professor Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-professorName"
                            placeholder="Professor Name"
                            type="text"
                            value={professorName}
                            onChange={(e) => setProfessorName(e.target.value)}
                          />
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
                          <label className="form-control-label" htmlFor="input-moduleCode">
                            Module Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-moduleCode"
                            placeholder="Module Code"
                            type="text"
                            maxLength="6"
                            value={moduleCode}
                            onChange={(e) => setModuleCode(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-lectureTitle">
                            Lecture Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-lectureTitle"
                            placeholder="Lecture Title"
                            type="text"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
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
                        value={scheduleDescription}
                        onChange={(e) => setScheduleDescription(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="text-center">
                    <Button color="primary" type="submit">
                      Update Schedule
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

export default ScheduleUpdate;
