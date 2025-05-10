import ProfileImg from "../../assets/admin/img/theme/team-3-800x800.jpg";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Label
} from "reactstrap";
// core components
import AdminHeader from "../../components/Headers/AdminHeader";
import AdminView from "../../components/Section/AdminView";

const Professor = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    departmentName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    moduleName: "",
    moduleCode: "",
    description: "",
  });

  const [courseCodes, setCourseCodes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8086/api/course/")
      .then((res) => setCourseCodes(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  useEffect(() => {
    if (formData.moduleCode) {
      axios.get(`http://localhost:8086/api/course/${formData.moduleCode}`)
        .then((response) => {
          const course = response.data;
          setFormData((prev) => ({
            ...prev,
            moduleName: course.courseName,
          }));
        })
        .catch((error) => console.error("Failed to fetch course name:", error));
    } else {
      setFormData((prev) => ({ ...prev, moduleName: "" }));
    }
  }, [formData.moduleCode]);


  const handleChange = (e) => {
    const { id, value } = e.target;

    const alphaOnly = /^[a-zA-Z\s]*$/;
    const numericOnly = /^[0-9]*$/;

    if (["fullName", "moduleName", "departmentName"].includes(id) && !alphaOnly.test(value)) {
      Swal.fire({
        icon: "error",
        title: `Invalid ${id.charAt(0).toUpperCase() + id.slice(1)}`,
        text: `${id.replace(/([A-Z])/g, " $1")} can only contain letters and spaces.`,
      });
      return;
    }

    if (id === "postalCode" && !numericOnly.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Postal Code",
        text: "Postal code must contain only numbers.",
      });
      return;
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullName, email, contactNumber, departmentName,
      address, city, country, postalCode,
      moduleCode, description, image // Make sure image is in formData
    } = formData;

    const professorData = {
      full_name: fullName,
      email: email,
      tp_num: contactNumber,
      department_name: departmentName,
      address: address,
      city: city,
      country: country,
      postal_code: postalCode,
      description: description,
      course: {
        courseId: parseInt(moduleCode),
      },
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const numberRegex = /\d/;

    if (!fullName || !email || !contactNumber || !departmentName || !address || !city || !country || !postalCode || !moduleCode || !description) {
      return Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
    }

    if (!emailRegex.test(email)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }

    if (!phoneRegex.test(contactNumber)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Contact Number",
        text: "Contact number must be exactly 10 digits.",
      });
    }

    if (numberRegex.test(city)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid City",
        text: "City cannot contain numbers.",
      });
    }

    if (numberRegex.test(country)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Country",
        text: "Country cannot contain numbers.",
      });
    }

    try {
      const data = new FormData();
      data.append("professor", new Blob([JSON.stringify(professorData)], { type: "application/json" }));
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch("http://localhost:8086/api/professor/create", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Professor creation failed");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Professor created successfully!",
      });

      // Reset if needed
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        departmentName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        moduleName: "",
        moduleCode: "",
        description: "",
        image: null, // Reset image
      });

    } catch (error) {
      console.error("Error creating professor:", error);
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <>
      <AdminHeader pageIndex={2} />
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
                    <h3 className="mb-0">Add Professor </h3>
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
                          <label className="form-control-label" htmlFor="contactNumber">
                            Contact Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="Contact Number"
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
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                image: e.target.files[0],
                              })
                            }
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
                          <Label htmlFor="moduleCode" className="form-control-label">Module Code</Label>
                          <Input
                            type="select"
                            name="moduleCode"
                            id="moduleCode"
                            className="form-control"
                            value={formData.moduleCode}
                            onChange={handleChange}
                          >
                            <option value="">Select Module Code</option>
                            {courseCodes.map((course) => (
                              <option key={course.courseId} value={course.courseId}>
                                {course.courseCode}
                              </option>
                            ))}
                          </Input>
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
                      Add Professor
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

export default Professor;
