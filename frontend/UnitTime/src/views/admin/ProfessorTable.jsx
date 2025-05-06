import teamImage from "../../assets/admin/img/theme/team-4-800x800.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import Header from "../../components/Headers/Header";
  
  const ProfessorTable = () => {
    const navigate = useNavigate();
    const [professor, setprofessor] = useState([]);
  
    useEffect(() => {
      const fetchprofessor = async () => {
        try {
          const response = await axios.get("http://localhost:8086/api/professor/");
          setprofessor(response.data);
        } catch (error) {
          console.error("Error fetching professor:", error);
        }
      };
  
      fetchprofessor();
    }, []);
  
    //Delete API
    const handleDelete = (professorId) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:8086/api/professor/${professorId}`);
            if (response.status === 200) {
              Swal.fire(
                'Deleted!',
                'The professor has been deleted.',
                'success'
              );
  
              // Remove the deleted room from the state
              setprofessor(professor.filter(professor => professor.professorId !== professorId));
            }
          } catch (error) {
            Swal.fire(
              'Error!',
              'There was a problem deleting the professor.',
              'error'
            );
          }
        }
      });
    };
  

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Professors</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Course</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {professor.map((professor, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={teamImage}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                             {professor.full_name}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>aruna123</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {professor.email}
                        </Badge>
                      </td>
                      
                      <td>
                        <div className="d-flex align-items-center">
                        <Media>
                            <span className="mb-0 text-sm">
                            {professor.course?.name}
                            </span>
                          </Media>
                        </div>
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
                          <DropdownMenu className="dropdown-menu-arrow" end>
                            <DropdownItem
                              href="#pablo"
                              onClick={() => handleDelete(professor.id)}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={() => navigate('/admin/update-professor', { state: professor })}

                            >
                              Update
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
  
        </Container>
      </>
    );
  };
  
  export default ProfessorTable;
  