import axios from "axios";
import adminHeaderData from "../../data/AdminHeaderData";
import ProfileCover from "../../assets/admin/img/theme/profile-cover.jpg";
import { Button, Container, Row, Col } from "reactstrap";

const AdminHeader = ({ pageIndex }) => {
  const { title, description, buttonText, action } = adminHeaderData[pageIndex];

const handleButtonClick = async () => {
  try {
    let url = "";
    let filename = "";

    switch (action) {
      case "generateProfessorReport":
        url = "http://localhost:8086/api/professor/reportAll";
        filename = "professor_report.pdf";
        break;
      case "generateScheduleReport":
        url = "http://localhost:8086/api/schedule/reportAllSchedules";
        filename = "schedule_report.pdf";
        break;
      case "generateCourseReport":
        url = "http://localhost:8086/api/course/courseReportAll";
        filename = "course_report.pdf";
        break;
      default:
        console.warn("Unknown report action:", action);
        return;
    }

    const response = await axios.get(url, { responseType: "blob" });
    const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(`Error generating ${action} report:`, error);
    alert("Failed to generate report. Please try again.");
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
