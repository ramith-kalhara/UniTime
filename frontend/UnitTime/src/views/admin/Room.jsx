
// reactstrap components
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
  // core components
  import AdminHeader from "../../components/Headers/AdminHeader";
  
  const Room = () => {
    return (
      <>
        <AdminHeader  pageIndex={4} />
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
                      Assign
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
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
                  <form>
                    <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Room ID
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Room ID"
                                id="input-username"
                                placeholder="room_number"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        
                    </Row>
                    <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Professor Id
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Professor Id"
                                id="input-username"
                                placeholder="Professor Id"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        
                    </Row>
                    <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Module ID 
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Module ID "
                                id="input-username"
                                placeholder="Module Id "
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        
                    </Row>
                    <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Room Type
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Room Type  "
                                id="input-username"
                                placeholder="Room Type"
                                type="text"
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
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Room information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Room Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Room Number"
                              id="input-username"
                              placeholder="room_number"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Capacity
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="capacity"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="roomType">
                            Room Type
                          </label>
                          <Input
                            type="select"
                            id="roomType"
                            bsSize="lg"
                            className="form-control form-control-alternative"
                            defaultValue=""
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
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Department
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Department"
                              id="input-first-name"
                              placeholder="Department"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="hasProjector">
                            Has Smart Screen
                          </label>
                          <Input
                            type="select"
                            id="hasSmartScreen"
                            bsSize="lg"
                            className="form-control form-control-alternative"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Input>
                        </FormGroup>

                        </Col>
                        <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="hasComputers">
                            Has Computers
                          </label>
                          <Input
                            type="select"
                            id="hasComputers"
                            bsSize="lg"
                            className="form-control form-control-alternative"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </Input>
                        </FormGroup>

                        </Col>
                      </Row>
                      
                    </div>
                    <hr className="my-4" />
                   
                   
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Room Description</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Room Description</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="Room Description"
                          rows="4"
                          defaultValue="Room Description."
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
  
  export default Room;
  