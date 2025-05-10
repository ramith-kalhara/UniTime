
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from 'react';
const Header = () => {
  const [professorCount, setProfessorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);


  useEffect(() => {
    const fetchAllCounts = async () => {
      try {
        const [professorRes, userRes, courseRes, roomRes] = await Promise.all([
          fetch("http://localhost:8086/api/professor/"),
          fetch("http://localhost:8086/api/user/"),
          fetch("http://localhost:8086/api/course/"),
          fetch("http://localhost:8086/api/room/") // Adjust if GET endpoint is different
        ]);

        if (professorRes.ok && userRes.ok && courseRes.ok && roomRes.ok) {
          const [professorData, userData, courseData, roomData] = await Promise.all([
            professorRes.json(),
            userRes.json(),
            courseRes.json(),
            roomRes.json()
          ]);

          setProfessorCount(professorData.length);
          setUserCount(userData.length);
          setCourseCount(courseData.length);
          setRoomCount(roomData.length);
        } else {
          console.error("Failed to fetch one or more datasets.");
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchAllCounts();
  }, []);




  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Professor
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {professorCount}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>

                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Student
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{userCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>

                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Course
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{courseCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>

                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Room
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> {roomCount} </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
