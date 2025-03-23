import React, { useState } from 'react';

import teamImage from "../../assets/admin/img/theme/team-4-800x800.jpg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';  // Import SweetAlert for alert messages
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

const CourseUpdate = () => {
  const [startDate, setStartDate] = useState(dayjs()); // State for start date
  const [endDate, setEndDate] = useState(dayjs());   // State for end date
  const [courseCode, setCourseCode] = useState('');
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('');
  const [department, setDepartment] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleNameChange = (e) => {
    const { value } = e.target;
  
    // Allow only letters and spaces
    if (/[^a-zA-Z\s]/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Name can only contain letters and spaces.",
      });
      return; // Don't update state if invalid
    }
  
    // If valid, update the name state
    setName(value);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!courseCode || !name || !credits || !department || !courseDescription) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "All fields are required!",
      });
      return;
    }

    // Validate Credits should be a number
    if (credits && isNaN(credits)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Credits must be a valid number.",
      });
      return;
    }

    // Validate email (for the name field assuming it's an email)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address for the name field.",
      });
      return;
    }

    // Check if start date is before end date
    if (startDate.isAfter(endDate)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date Range",
        text: "The start date cannot be after the end date.",
      });
      return;
    }

    // If all validations pass
    console.log('Course submitted:', {
      courseCode,
      name,
      credits,
      department,
      courseDescription,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    });

    Swal.fire({
      icon: "success",
      title: "Course Added Successfully",
      text: "Your course has been added.",
    });
  };

  // Handle Credits change (ensure it's a number)
  const handleCreditsChange = (e) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value)) {
      setCredits(value);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "You can only enter numbers in the Credits field.",
      });
    }
  };
  return (
    <>
      <AdminHeader pageIndex={1} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img alt="..." className="rounded-circle" src={teamImage} />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button className="mr-4" color="info" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
                    Connect
                  </Button>
                  <Button className="float-right" color="default" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
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
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs, and records all of his own music.
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
                    <h3 className="mb-0">Update Course</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" href="#pablo" onClick={handleSubmit}  size="sm">
                      Update Course
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Course information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Course Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            id="input-username"
                            maxLength="6"
                            placeholder="Course Code"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={name}
                            onChange={handleNameChange}
                            id="input-email"
                            placeholder="Name"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            Credits
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={credits}
                            onChange={handleCreditsChange} 
                            id="input-first-name"
                            placeholder="Credits"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">
                            Department
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            id="input-last-name"
                            placeholder="Department"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
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
                      <Col lg="6">
                        <FormGroup>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="End Date"
                                value={startDate}
                                onChange={setStartDate}
                                renderInput={(props) => <Input {...props} />}
                              />
                            </LocalizationProvider>
                          </FormGroup>
                      </Col>
                    </Row>
                    
                      <FormGroup>
                        <label> Description </label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="Description"
                          value={courseDescription}
                          onChange={(e) => setCourseDescription(e.target.value)}
                          type="textarea"
                        />
                      </FormGroup>
                    
                 
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

export default CourseUpdate;
