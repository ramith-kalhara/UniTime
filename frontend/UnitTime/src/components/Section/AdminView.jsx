import React, { useState, useEffect } from "react";
import teamImage from "../../assets/admin/img/theme/team-4-800x800.jpg";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
function AdminView() {
  const [user, setUser] = useState(null);
  const [courseCount, setCourseCount] = useState(0);
  const [professorCount, setProfessorCount] = useState(0);
  const [imageBase64, setImageBase64] = useState("");

 const userId = JSON.parse(localStorage.getItem("user"))?.userId;

console.log("User ID", userId); // Check if the ID is present

  useEffect(() => {
    if (userId) {
      // Fetch user data by ID
      fetch(`http://localhost:8086/api/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          if (data.imageBase64) {
            setImageBase64(data.imageBase64);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to load user data.",
            confirmButtonColor: "#d33",
          });
        });

      // Fetch course count
      fetch("http://localhost:8086/api/course/")
        .then((response) => response.json())
        .then((data) => {
          setCourseCount(data.length); // Assuming response is an array of courses
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });

      // Fetch professor count
      fetch("http://localhost:8086/api/professor/")
        .then((response) => response.json())
        .then((data) => {
          setProfessorCount(data.length); // Assuming response is an array of professors
        })
        .catch((error) => {
          console.error("Error fetching professors:", error);
        });
    }
  }, [userId]);

  return (
    <div>
      <Card className="card-profile shadow">
        <Row className="justify-content-center">
          <Col className="order-lg-2" lg="3">
            <div className="card-profile-image">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="User Profile"
                  className="rounded-circle"
                  src={`data:image/jpeg;base64,${imageBase64}`} // Display the image
                  style={{ width: '180px', height: '180px' }}
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
                  <span className="heading">{professorCount}</span>
                  <span className="description">Professors</span>
                </div>
             
                <div>
                  <span className="heading">{courseCount}</span>
                  <span className="description">Courses</span>
                </div>
              </div>
            </div>
          </Row>
          <div className="text-center">
            <h3>
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
           
            </h3>
            <div className="h5 font-weight-300">
              <i className="ni location_pin mr-2" />
            </div>

            <div>
              <i className="ni education_hat mr-2" />
              Gmail: <br/>
              {user ? user.email : "Loading..."}
            </div>
            <hr className="my-4" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AdminView;