
// reactstrap components
import React, { useState } from 'react';

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
import AdminView from '../../components/Section/AdminView';

const Room = () => {
  const [formData, setFormData] = useState({
    roomId: '',
    professorId: '',
    moduleId: '',
    // roomType: '',
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
  
    // Check required fields
    if (!formData.roomId) formErrors += 'Room ID is required.\n';
    if (!formData.professorId) formErrors += 'Professor ID is required.\n';
    if (!formData.moduleId) formErrors += 'Module ID is required.\n';
    // if (!formData.roomType) formErrors += 'Room Type is required.\n';
    if (!formData.lectureTitle) formErrors += 'Lecture Title is required.\n';
    if (!formData.date) formErrors += 'Date is required.\n';
    if (!formData.startTime) formErrors += 'Start Time is required.\n';
    if (!formData.endTime) formErrors += 'End Time is required.\n';
  
    // Validate time format and range
    if (formData.startTime && formData.endTime) {
      const start = dayjs(formData.startTime, 'HH:mm');
      const end = dayjs(formData.endTime, 'HH:mm');
  
      if (start.isSame(end)) {
        formErrors += 'Start Time and End Time cannot be the same.\n';
      }
  
      if (end.isBefore(start)) {
        formErrors += 'End Time must be after Start Time.\n';
      }
    }
  
    // Validate End Date is not in the past
    if (formData.endDate && formData.endDate.isBefore(dayjs(), 'day')) {
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


  const [formValues, setFormValues] = useState({
    roomNumber: '',
    capacity: '',
    roomType: '',
    department: '',
    hasSmartScreen: '',
    hasComputers: '',
    description: '',
    roomName:''
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
   
    if (!formValues.capacity) errorMessages += 'Capacity is required.\n';
    if (!formValues.department) errorMessages += 'Department is required.\n';
    if (!formValues.hasSmartScreen) errorMessages += 'Smart Screen option is required.\n';
    if (!formValues.description) errorMessages += 'Room Description is required.\n';
    if (!formValues.roomName) errorMessages += 'Room Name is required.\n';
  
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
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (validateRoomDetails()) {
      try {
        const formData = new FormData();
  
        const roomData = {
          roomName: formValues.roomName,
          department: formValues.department,
          description: formValues.description,
          capacity: formValues.capacity,
          roomType: formValues.roomType,
          smart_screen: formValues.hasSmartScreen,
        };
  
        formData.append("room", new Blob([JSON.stringify(roomData)], { type: "application/json" }));
        formData.append("image", formValues.image); // Attach the file
  
        const response = await fetch("http://localhost:8086/api/room/create", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) throw new Error("Something went wrong");
  
        Swal.fire({
          icon: "success",
          title: "Room Added",
          text: "Room has been successfully added!",
        });
  
        setFormValues({
          hasSmartScreen: '',
          capacity: '',
          roomType: '',
          department: '',
          description: '',
          roomName: '',
          image: null,
        });
  
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add room. Please try again.",
        });
      }
    }
  };
  
  
  


  return (
    <>
      <AdminHeader pageIndex={4} />
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
                      <Col lg="6">
                     <FormGroup>
  <label className="form-control-label" htmlFor="input-image">
    Image
  </label>
  <Input
    type="file"
    name="image"
    onChange={(e) => setFormValues({
      ...formValues,
      image: e.target.files[0]  // store the File object, not just the path
    })}
  />
</FormGroup>

                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-department">
                            Room Name 
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formValues.roomName}
                            name="roomName"
                            onChange={handleFormChange} 
                            placeholder="Room Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      
                  
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
                        value={formValues.description}
                        name="description"
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
