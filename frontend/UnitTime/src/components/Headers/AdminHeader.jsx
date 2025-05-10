import axios from "axios";
import adminHeaderData from "../../data/AdminHeaderData";
import ProfileCover from "../../assets/admin/img/theme/profile-cover.jpg";
import { Button, Container, Row, Col } from "reactstrap";

const AdminHeader = ({ pageIndex }) => {
  const { title, description, buttonText, action } = adminHeaderData[pageIndex];

  const handleButtonClick = async () => {
    if (action === "generateProfessorReport") {
      try {
        const response = await axios.get("http://localhost:8086/api/professor/reportAll", {
          responseType: "blob", // important to handle binary PDF
        });

        // Create a URL from the PDF blob
        const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "professor_report.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error generating professor report:", error);
        alert("Failed to generate report. Please try again.");
      }
    }
  };

  return (
    <div
      className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style={{
        minHeight: "600px",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <span className="mask bg-gradient-default opacity-8" />
      <Container className="d-flex align-items-center" fluid>
        <Row>
          <Col lg="7" md="10">
            <h1 className="display-2 text-white">{title}</h1>
            <p className="text-white mt-0 mb-5">{description}</p>
            <Button color="info" onClick={handleButtonClick}>
              {buttonText}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminHeader;
