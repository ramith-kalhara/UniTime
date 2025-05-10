import teamImage from "../../assets/admin/img/theme/team-4-800x800.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Header from "../../components/Headers/Header";
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  Container,
  Row,
  PaginationItem,
  CardFooter,
  UncontrolledTooltip,
  PaginationLink,
  Pagination

} from "reactstrap";
// core components



const RoomTable = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8086/api/room/")
      .then(res => setRooms(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  const handleDelete = (roomId) => {
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
          const response = await axios.delete(`http://localhost:8086/api/room/${roomId}`);
          if (response.status === 200) {
            Swal.fire(
              'Deleted!',
              'The room has been deleted.',
              'success'
            );

            // Remove the deleted room from the state
            setRooms(rooms.filter(room => room.id !== roomId));
          }
        } catch (error) {
          Swal.fire(
            'Error!',
            'There was a problem deleting the room.',
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


        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Room table</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Room Number</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">Department</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{room.id}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{room.capacity}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {room.roomType}
                        </Badge>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">{room.department}</span>
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
                            <DropdownItem
                              href="#pablo"
                              onClick={() => handleDelete(room.id)}  // Trigger delete onClick
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={() => navigate('/admin/update-room', { state: room })}
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RoomTable;
