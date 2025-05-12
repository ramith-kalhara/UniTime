import React, { useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import axios from "axios";

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
import AdminView from '../../components/Section/AdminView';

const Course = () => {
  const [startDate, setStartDate] = useState(dayjs()); // State for start date
  const [endDate, setEndDate] = useState(dayjs());   // State for end date
  const [courseCode, setCourseCode] = useState('');
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setdescription] = useState('');

  const [formDataState, setFormDataState] = useState({
    image: null,
  });


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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!courseCode || !name || !credits || !department || !description) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "All fields are required!",
      });
      return;
    }

    if (credits && isNaN(credits)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Credits must be a valid number.",
      });
      return;
    }

    const courseData = {
      courseCode,
      name,
      credits: parseInt(credits),
      department,
      description,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    };

    try {
      const formData = new FormData();
      formData.append("course", new Blob([JSON.stringify(courseData)], { type: "application/json" }));
      if (formDataState.image) {
        formData.append("image", formDataState.image);
      }

      const response = await fetch("http://localhost:8086/api/course/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Course creation failed");

      Swal.fire({
        icon: "success",
        title: "Course Added Successfully",
        text: "Your course has been added.",
      });

      // Optional: clear form
      setCourseCode("");
      setName("");
      setCredits("");
      setDepartment("");
      setdescription("");
      setStartDate(dayjs());
      setEndDate(dayjs());
      setFormDataState({ image: null });

    } catch (error) {
      console.error("Error adding course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add course. Please try again.",
      });
    }
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
      <AdminHeader pageIndex={7} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
     

          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
               <AdminView/>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Course</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" href="#pablo" onClick={handleSubmit} size="sm">
                      Add Course
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
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-image">
                            Image
                          </label>
                          <Input
                            type="file"
                            name="image"
                            onChange={(e) =>
                              setFormDataState({
                                ...formDataState,
                                image: e.target.files[0],
                              })
                            }
                          />
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
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
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

export default Course;
