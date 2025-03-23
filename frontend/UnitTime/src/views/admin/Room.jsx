
// reactstrap components
import React, { useState } from 'react';

import teamImage from "../../assets/admin/img/theme/team-4-800x800.jpg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
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
// core components
import AdminHeader from "../../components/Headers/AdminHeader";

const Room = () => {
  const [formData, setFormData] = useState({
    roomId: '',
    professorId: '',
    moduleId: '',
    roomType: '',
    lectureTitle: '',
    date: null,
    startTime: '',
    endTime: '',
    endDate: dayjs(),
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, date: newValue });
  };

  const validate = () => {
    let formErrors = '';

    // Check if required fields are filled
    if (!formData.roomId) formErrors += 'Room ID is required.\n';
    if (!formData.professorId) formErrors += 'Professor ID is required.\n';
    if (!formData.moduleId) formErrors += 'Module ID is required.\n';
    if (!formData.roomType) formErrors += 'Room Type is required.\n';
    if (!formData.lectureTitle) formErrors += 'Lecture Title is required.\n';
    if (!formData.date) formErrors += 'Date is required.\n';
    if (!formData.startTime) formErrors += 'Start Time is required.\n';
    if (!formData.endTime) formErrors += 'End Time is required.\n';

    // Validate that the End Date is not in the past
    if (formData.endDate.isBefore(dayjs(), 'day')) {
      formErrors += 'End Date cannot be in the past.\n';
    }

    if (formErrors) {
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Failed',
        text: formErrors,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        icon: 'success',
        title: 'Form Submitted Successfully',
        text: 'Your form has been submitted!',
      });
      // You can add the form submission logic here, like calling an API or saving the data.
    }
  };
  const [formValues, setFormValues] = useState({
    roomNumber: '',
    capacity: '',
    roomType: '',
    department: '',
    hasSmartScreen: '',
    hasComputers: '',
    roomDescription: '',
  });
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
  
    // Validate 'capacity' field to only allow numeric values
    if (name === 'capacity') {
      if (/^[0-9]*$/.test(value)) {
        setFormValues({ ...formValues, [name]: value });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Input',
          text: 'You can only enter numbers in the Capacity field.',
        });
      }
    }
  
    // Validate 'department' field to only allow letters and spaces
    else if (name === 'department' && /[^a-zA-Z\s]/.test(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Department',
        text: 'Department can only contain letters and spaces.',
      });
      return; // Prevent update if invalid
    }
  
    // For other fields, update the state normally
    else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  

  const validateRoomDetails = () => {
    let errorMessages = '';
  
    // Validate required fields
    if (!formValues.roomNumber) errorMessages += 'Room Number is required.\n';
    if (!formValues.capacity) errorMessages += 'Capacity is required.\n';
    if (!formValues.roomType) errorMessages += 'Room Type is required.\n';
    if (!formValues.department) errorMessages += 'Department is required.\n';
    if (!formValues.hasSmartScreen) errorMessages += 'Smart Screen option is required.\n';
    if (!formValues.hasComputers) errorMessages += 'Computers option is required.\n';
    if (!formValues.roomDescription) errorMessages += 'Room Description is required.\n';
  
    // Validate Capacity should be a number
    if (formValues.capacity && isNaN(formValues.capacity)) {
      errorMessages += 'Capacity must be a valid number.\n';
    }
  
    // Additional check: If capacity is entered, ensure it's a positive number
    if (formValues.capacity && Number(formValues.capacity) <= 0) {
      errorMessages += 'Capacity must be a positive number.\n';
    }
  
    // Return errors if any exist
    if (errorMessages) {
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Failed',
        text: errorMessages,
      });
      return false;
    }
    return true;
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Run the validation function
    if (validateRoomDetails()) {
      // If validation passes, submit the form
      Swal.fire({
        icon: 'success',
        title: 'Form Submitted Successfully',
        text: 'Your form has been submitted!',
      });
  
      // Handle actual form submission logic here (e.g., API call)
    }
  };
  


  return (
    <>
      <AdminHeader pageIndex={4} />
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
                    onClick={handleSubmit}
                    size="sm"
                  >
                    Assign
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={handleSubmit}
                    size="sm"
                  >
                    Assign
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                    </div>
                  </div>
                </Row>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="roomId">
                          Room ID
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="roomId"
                          value={formData.roomId}
                          onChange={handleChange}
                          placeholder="room_number"
                          maxLength="6"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="professorId">
                          Professor Id
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="professorId"
                          value={formData.professorId}
                          onChange={handleChange}
                          placeholder="Professor Id"
                          maxLength="10"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="moduleId">
                          Module ID
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="moduleId"
                          value={formData.moduleId}
                          onChange={handleChange}
                          placeholder="Module Id"
                          maxLength="6"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                          <label className="form-control-label" htmlFor="input-roomType">
                            Room Type
                          </label>
                          <Input
                            type="select"
                            id="input-roomType"
                            name="roomType"
                            bsSize="lg"
                            className="form-control form-control-alternative"
                            value={formValues.roomType}
                            onChange={handleChange}
                          >
                            <option value="" disabled>Select room type</option>
                            <option value="Lecture Hall">Lecture Hall</option>
                            <option value="Lab">Lab</option>
                            <option value="Auditorium">Auditorium</option>
                            <option value="Seminar Room">Seminar Room</option>
                            <option value="Tutorial Room">Tutorial Room</option>
                          </Input>
                        </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="lectureTitle">
                          Lecture Title
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="lectureTitle"
                          value={formData.lectureTitle}
                          onChange={handleChange}
                          placeholder="Lecture Title"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                            value={formData.endDate}
                            onChange={handleDateChange}
                            renderInput={(props) => <Input {...props} />}
                          />
                        </LocalizationProvider>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="startTime">
                          Start Time
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          placeholder="Start Time"
                          type="time"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="endTime">
                          End Time
                        </label>
                        <Input
                          className="form-control-alternative"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          placeholder="End Time"
                          type="time"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                 
                </form>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Room</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <h6 className="heading-small text-muted mb-4">Room information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-roomNumber">
                            Room Id
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.roomNumber}
                            name="roomNumber"
                            onChange={handleFormChange}
                            placeholder="Room Number"
                            maxLength="6"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-capacity">
                            Capacity
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.capacity}
                            name="capacity"
                            onChange={handleFormChange}
                            placeholder="Capacity"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-roomType">
                            Room Type
                          </label>
                          <Input
                            type="select"
                            id="input-roomType"
                            name="roomType"
                            bsSize="lg"
                            className="form-control form-control-alternative"
                            value={formValues.roomType}
                            onChange={handleFormChange}
                          >
                            <option value="" disabled>Select room type</option>
                            <option value="Lecture Hall">Lecture Hall</option>
                            <option value="Lab">Lab</option>
                            <option value="Auditorium">Auditorium</option>
                            <option value="Seminar Room">Seminar Room</option>
                            <option value="Tutorial Room">Tutorial Room</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-department">
                            Department
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.department}
                            name="department"
                            onChange={handleFormChange} 
                            placeholder="Department"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-hasSmartScreen">
                            Has Smart Screen
                          </label>
                          <Input
                            type="select"
                            id="input-hasSmartScreen"
                            name="hasSmartScreen"
                            bsSize="lg"
                            className="form-control form-control-alternative"
                            value={formValues.hasSmartScreen}
                            onChange={handleFormChange}
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-hasComputers">
                            Has Computers
                          </label>
                          <Input
                            type="select"
                            id="input-hasComputers"
                            name="hasComputers"
                            bsSize="lg"
                            className="form-control form-control-alternative"
                            value={formValues.hasComputers}
                            onChange={handleFormChange}
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Room Description */}
                  <h6 className="heading-small text-muted mb-4">Room Description</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Room Description</label>
                      <Input
                        className="form-control-alternative"
                        value={formValues.roomDescription}
                        name="roomDescription"
                        onChange={handleFormChange}
                        placeholder="Room Description"
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Add Room</button>
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

export default Room;
