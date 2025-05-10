
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
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header";

const ScheduleTable = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:8086/api/schedule/");
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedules();
  }, []);

  //Delete API
  const handleDelete = (scheduleId) => {
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
          const response = await axios.delete(`http://localhost:8086/api/schedule/${scheduleId}`);
          if (response.status === 200) {
            Swal.fire(
              'Deleted!',
              'The Schedule has been deleted.',
              'success'
            );

            // Remove the deleted room from the state
            setSchedules(schedules.filter(schedule => schedule.scheduleId !== scheduleId));
          }
        } catch (error) {
          Swal.fire(
            'Error!',
            'There was a problem deleting the Schedule.',
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
                <h3 className="mb-0">Schedule table</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Room Id</th>
                    <th scope="col">Shedule Title</th>
                    <th scope="col">Professor</th>
                    {/* <th scope="col">Students</th> */}
                    <th scope="col">Module Name</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          {schedule.startDate}
                        </span>
                      </th>
                      <td>{schedule.startTime}</td>
                      <td>{schedule.endTime}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          {schedule.room?.roomName}
                       
                        </Badge>
                      </td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          {schedule.lectureTitle}
                        </Badge>
                      </td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          {schedule.professor?.full_name}
                        </Badge>
                      </td>
               
                      <td>
                        <span className="mb-0 text-sm">
                          {schedule.course?.name}
                        </span>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" end>
                            <DropdownItem
                              onClick={() => handleDelete(schedule.scheduleId)}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => navigate('/admin/update-schedule', { state: schedule })}
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

export default ScheduleTable;
