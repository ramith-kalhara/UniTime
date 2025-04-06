import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header";

const CourseTable = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8086/api/course/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8086/api/course/${courseId}`);
          setCourses(courses.filter(course => course.courseId !== courseId));
          Swal.fire('Deleted!', 'Course has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete course.', 'error');
        }
      }
    });
  };
  


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>


        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Course List</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Course Code </th>
                    <th scope="col">Name</th>
                    <th scope="col">Creadit</th>
                    <th scope="col">Department</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
  {courses.map((course, index) => (
    <tr key={index}>
      <th scope="row">
        <Media className="align-items-center">
          <Media>
            <span className="mb-0 text-sm">{course.courseCode}</span>
          </Media>
        </Media>
      </th>
      <td>{course.name}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          {course.credits}
        </Badge>
      </td>
      <td>
        <Media>
          <span className="mb-0 text-sm">{course.department}</span>
        </Media>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem onClick={() => handleDelete(course.courseId)}>
              Delete
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/admin/update-course', { state: course })}>
              Update
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  ))}
</tbody>

              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CourseTable;
