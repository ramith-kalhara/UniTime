// src/components/Headers/AdminHeader.jsx
import React from "react";
import adminHeaderData from "../../data/AdminHeaderData"; // Importing data from the new file
import ProfileCover from "../../assets/admin/img/theme/profile-cover.jpg";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const AdminHeader = ({ pageIndex }) => {
  // Assuming you are passing the page index dynamically to get the right header details
  const { title, description, buttonText, buttonLink } = adminHeaderData[pageIndex];

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          // backgroundImage: `url(${ProfileCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
           
              <h1 className="display-2 text-white">{title}</h1>
              <p className="text-white mt-0 mb-5">{description}</p>
              <Button color="info" href={buttonLink} onClick={(e) => e.preventDefault()}>
                {buttonText}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminHeader;
