import ProfileImg from "../../assets/admin/img/theme/team-3-800x800.jpg";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// reactstrap components
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
// core components
import AdminHeader from "../../components/Headers/AdminHeader";

const ProfessorUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const professor = location.state; // coming from navigate

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    tp_num: "",
    departmentName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    moduleName: "",
    moduleCode: "",
    description: "",
  });

  useEffect(() => {
    if (!professor) {
      Swal.fire({
        icon: "error",
        title: "No Professor Data",
        text: "Professor data not found. Redirecting back.",
      }).then(() => navigate('/admin/index'));
      return;
    }
  
    setFormData({
      id: professor.id,
      fullName: professor.full_name || "",
      email: professor.email || "",
      tp_num: professor.tp_num || "" ,
      departmentName: professor.department_name || "",
      address: professor.address || "",
      city: professor.city || "",
      country: professor.country || "",
      postalCode: professor.postal_code || "",
      moduleCode: professor.module_id || "",
      description: professor.description || "",
    });
  }, [professor, navigate]);


  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "fullName" && /[^a-zA-Z\s]/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Full Name",
        text: "Full name can only contain letters and spaces.",
      });
      return; // Don't update the state if the full name contains non-letter characters
    }
    if (id === "moduleName" && /[^a-zA-Z\s]/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Full Name",
        text: "Full name can only contain letters and spaces.",
      });
      return; // Don't update the state if the full name contains non-letter characters
    }
    if (id === "departmentName" && /[^a-zA-Z\s]/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Full Name",
        text: "Full name can only contain letters and spaces.",
      });
      return; // Don't update the state if the full name contains non-letter characters
    }

    // Validate postal code field to ensure it only contains numbers
    if (id === "postalCode" && /[^0-9]/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Postal Code",
        text: "Postal code must contain only numbers.",
      });
      return; // Don't update the state if the postal code contains non-numeric characters
    }

    // Update state for valid inputs
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      tp_num,
      departmentName,
      address,
      city,
      country,
      postalCode,
      // moduleName,
      moduleCode,
      description,
    } = formData;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const numberRegex = /\d/;

    if (
      !fullName ||
      !email ||
      !tp_num ||
      !departmentName ||
      !address ||
      !city ||
      !country ||
      !postalCode ||
      // !moduleName ||
      !moduleCode ||
      !description
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!phoneRegex.test(tp_num)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Contact Number",
        text: "Contact number must be exactly 10 digits.",
      });
      return;
    }

    if (numberRegex.test(city)) {
      Swal.fire({
        icon: "error",
        title: "Invalid City",
        text: "City cannot contain numbers.",
      });
      return;
    }

    if (numberRegex.test(country)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Country",
        text: "Country cannot contain numbers.",
      });
      return;
    }

    // ✅ AXIOS PUT REQUEST HERE
    try {
      const response = await axios.put(
        `http://localhost:8086/api/professor/${professor.id}`
        ,
        {
          id: professor.id,
          full_name: formData.fullName,
          email: formData.email,
          tp_num: parseInt(formData.contactNumber, 10),
          department_name: formData.departmentName,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          postal_code: formData.postalCode,
          module_id: formData.moduleCode,
          description: formData.description
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Professor updated successfully!",
      }).then(() => {
        navigate('/admin/index'); // redirect to list page or wherever you want
      });

    } catch (error) {
      console.error("Error updating professor:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating the professor.",
      });
    }
  };


  return (
    <>
      <AdminHeader pageIndex={3} />
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
                        src={ProfileImg}
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
                    <h3 className="mb-0">Update Professor </h3>
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
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Professor Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="fullName">
                            Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="email">
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="tp_num">
                            Contact Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="tp_num"
                            value={formData.tp_num}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="departmentName">
                            Department Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="departmentName"
                            value={formData.departmentName}
                            onChange={handleChange}
                            placeholder="Department Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Contact Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="address">
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="city">
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="country">
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="postalCode">
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Postal code"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Module Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="moduleName">
                            Module Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="moduleName"
                            value={formData.moduleName}
                            onChange={handleChange}
                            placeholder="Module Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="moduleCode">
                            Module Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="moduleCode"
                            value={formData.moduleCode}
                            onChange={handleChange}
                            placeholder="Module Code"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Description</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        className="form-control-alternative"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="A few words about you..."
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <div className="text-center">
                    <Button color="primary" type="submit">
                      Update Professor
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

export default ProfessorUpdate;
