import React, { useState } from 'react';
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
  const [formValues, setFormValues] = useState({
    moduleCode: '',
    moduleName: '',
    voteDescription: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { moduleCode, moduleName, voteDescription } = formValues;

    if (!moduleCode || !moduleName || !voteDescription) {
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

    Swal.fire({
      icon: 'success',
      title: 'Vote Created Successfully',
      text: 'Your vote has been created!',
    });

    // TODO: Add actual submit logic here
  };

  return (
    <>
      <AdminHeader pageIndex={2} />
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
                            type="text"
                            name="moduleCode"
                            maxLength="6"
                            placeholder="Enter Module Code"
                            value={formValues.moduleCode}
                            onChange={handleInputChange}
                          />
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
                              renderInput={({ inputRef, inputProps }) => (
                                <Input innerRef={inputRef} {...inputProps} />
                              )}
                            />
                          </LocalizationProvider>
                        </FormGroup>
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

                  <Button color="primary" type="submit">Create Vote</Button>
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
