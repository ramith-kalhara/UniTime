import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ProfileImg from "../../assets/admin/img/theme/team-4-800x800.jpg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
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

const Vote = () => {
  const [startDateTime, setStartDateTime] = useState(dayjs());
  const [endDateTime, setEndDateTime] = useState(dayjs());
  const [courseCodes, setCourseCodes] = useState([]);
  const [professors, setProfessors] = useState([]);



  const [formValues, setFormValues] = useState({

    moduleCode: '',
    moduleName: '',
    voteDescription: '',
    professor: ['']
  });
  const handleProfessorChange = (index, value) => {
    const updatedProfessors = [...formValues.professor];
    updatedProfessors[index] = value;
    setFormValues({ ...formValues, professor: updatedProfessors });
  };

  const addProfessorField = () => {
    setFormValues({ ...formValues, professor: [...formValues.professor, ''] });
  };


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseRes = await fetch("http://localhost:8086/api/course/");
        if (courseRes.ok) {
          const courseData = await courseRes.json();
          setCourseCodes(courseData);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchCourses();
  }, []);
  




  const handleInputChange = async (e) => {
    const { name, value, options, type } = e.target;

    if (name === 'professor' && type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);

      setFormValues((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
      return;
    }

    // When user selects moduleCode (which is actually courseId)
    if (name === "moduleCode") {
      try {
        const response = await fetch(`http://localhost:8086/api/course/${value}`);
        if (response.ok) {
          const data = await response.json();
          setFormValues((prev) => ({
            ...prev,
            moduleCode: value,
            moduleName: data.name || '',
          }));
    
          // 👇 Set professors to only those related to selected course
          setProfessors(data.professors || []);
        } else {
          setFormValues((prev) => ({
            ...prev,
            moduleCode: '',
            moduleName: '',
          }));
          setProfessors([]); // clear professors on failed fetch
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setFormValues((prev) => ({
          ...prev,
          moduleCode: '',
          moduleName: '',
        }));
        setProfessors([]);
      }
      return;
    }
    

    // Validate module name
    if (name === 'moduleName' && /[^a-zA-Z\s]/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Module Name",
        text: "Module Name can only contain letters and spaces.",
      });
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { moduleCode, moduleName, voteDescription, professor } = formValues;

    // Form Validation
    if (!moduleCode || !moduleName || !voteDescription || professor.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'All fields are required.',
      });
      return;
    }

    if (/^\d+$/.test(moduleName)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Module Name',
        text: 'Module Name cannot contain only numbers.',
      });
      return;
    }

    if (!startDateTime || !endDateTime || !dayjs(endDateTime).isAfter(startDateTime)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date Range',
        text: 'End date must be after start date.',
      });
      return;
    }

    // Prepare data for API request
    const voteData = {
      startTime: dayjs(startDateTime).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: dayjs(endDateTime).format('YYYY-MM-DDTHH:mm:ss'),
      description: voteDescription,
      course: {
        courseId: moduleCode
      },
      professors: formValues.professor.filter(Boolean).map(id => ({ id }))
    };


    try {
      // Send the data to the API
      const response = await fetch("http://localhost:8086/api/vote/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });

      console.log(voteData)

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Vote Created Successfully',
          text: 'Your vote has been created!',
        });
        // Optionally, clear the form or redirect the user
        setFormValues({
          moduleCode: '',
          moduleName: '',
          voteDescription: '',
          professor: [],
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed to Create Vote',
          text: errorData.message || 'An unexpected error occurred.',
        });
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error submitting your vote.',
      });
    }
  };


  return (
    <>
      <AdminHeader pageIndex={8} />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img alt="..." className="rounded-circle" src={ProfileImg} />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button className="mr-4" color="info" size="sm">Connect</Button>
                  <Button className="float-right" color="default" size="sm">Message</Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div><span className="heading">22</span><span className="description">Friends</span></div>
                      <div><span className="heading">10</span><span className="description">Photos</span></div>
                      <div><span className="heading">89</span><span className="description">Comments</span></div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>Jessica Jones<span className="font-weight-light">, 27</span></h3>
                  <div className="h5 font-weight-300">Bucharest, Romania</div>
                  <div className="h5 mt-4">Solution Manager - Creative Tim Officer</div>
                  <div>University of Computer Science</div>
                  <hr className="my-4" />
                  <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>Show more</a>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8"><h3 className="mb-0">Start Vote</h3></Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" size="sm">Settings</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>


                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Module information</h6>
                  <div className="pl-lg-4">
                    <Row>

                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="moduleCode">Module Code</label>
                          <Input
                            type="select"
                            name="moduleCode"
                            className="form-control"
                            value={formValues.moduleCode}
                            onChange={handleInputChange}
                          >
                            <option value={''}>Select Module Code</option>
                            {courseCodes.map((course) => (
                              <option key={course.courseId} value={course.courseId}>
                                {course.courseCode}
                              </option>
                            ))}

                          </Input>
                        </FormGroup>



                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="moduleName">Module Name</label>
                          <Input
                            type="text"
                            name="moduleName"
                            placeholder="Enter Module Name"
                            value={formValues.moduleName}
                            onChange={handleInputChange}
                            disabled
                          />

                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Vote Time & Date Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              label="Start Date"
                              value={startDateTime}
                              onChange={(newValue) => setStartDateTime(newValue)}
                              ampm={false} // 24-hour format
                              renderInput={({ inputRef, inputProps }) => (
                                <Input innerRef={inputRef} {...inputProps} />
                              )}
                            />
                          </LocalizationProvider>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              label="End Date"
                              value={endDateTime}
                              onChange={(newValue) => setEndDateTime(newValue)}
                              ampm={false} // 24-hour format
                              renderInput={({ inputRef, inputProps }) => (
                                <Input innerRef={inputRef} {...inputProps} />
                              )}
                            />
                          </LocalizationProvider>
                        </FormGroup>
                      </Col>
                    </Row>

                  </div>

                  <h6 className="heading-small text-muted mb-4">Vote Time & Date Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="professor">Professors</label>
                          {formValues.professor.map((selectedProfId, index) => (
                            <div key={index} className="mb-2">
                              <Input
                                type="select"
                                name={`professor-${index}`}
                                className="form-control"
                                value={selectedProfId}
                                onChange={(e) => handleProfessorChange(index, e.target.value)}
                              >
                                <option value="">-- Select Professor --</option>
                                {professors.map((prof) => (
                                  <option key={prof.id} value={prof.id}>
                                    {prof.full_name}
                                  </option>
                                ))}
                              </Input>
                            </div>
                          ))}
                          <Button type="button" color="secondary" onClick={addProfessorField}>
                            + Add Professor
                          </Button>
                        </FormGroup>

                        {/* Show selected professor names */}
                        {formValues.professor.some(id => id) && (
                          <ul className="mt-2">
                            {formValues.professor.map((id, idx) => {
                              const prof = professors.find(p => p.id === id);
                              return id ? <li key={idx}>{prof?.full_name || id}</li> : null;
                            })}
                          </ul>
                        )}
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Vote Description</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Vote Description</label>
                      <Input
                        type="textarea"
                        name="voteDescription"
                        rows="4"
                        placeholder="Enter Vote Description"
                        value={formValues.voteDescription}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </div>

                  <div className="text-center">
                    <Button color="primary" type="submit">Create Vote</Button>
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

export default Vote;
