
import teamImage from "../../assets/admin/img/theme/team-4-800x800.jpg";
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
                      <th scope="col">TimeSlot</th>
                      <th scope="col">Professor</th>
                      <th scope="col">Students</th>
                      <th scope="col">Module Name</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              2 / 27 /2025
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>11.21 AM</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          
                          Mr.Kumara
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip742438047"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip941738690"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip941738690"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip804044742"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip804044742"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            OSSA
                          </span>
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
                          <DropdownMenu className="dropdown-menu-arrow" end>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Update
                            </DropdownItem>
                           
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              2 / 27 /2025
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>11.21 AM</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          
                          Mr.Kumara
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip742438047"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip941738690"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip941738690"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip804044742"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip804044742"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            OSSA
                          </span>
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
                              onClick={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Update
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              2 / 27 /2025
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>11.21 AM</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          
                          Mr.Kumara
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip742438047"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip941738690"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip941738690"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip804044742"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip804044742"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            OSSA
                          </span>
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
                              onClick={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Update
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              2 / 27 /2025
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>11.21 AM</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          
                          Mr.Kumara
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip742438047"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip941738690"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip941738690"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip804044742"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip804044742"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            OSSA
                          </span>
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
                              onClick={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Update
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              2 / 27 /2025
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>11.21 AM</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          
                          Mr.Kumara
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip742438047"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip941738690"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip941738690"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip804044742"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip804044742"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={teamImage}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td>
                      <td>
                        <Media>
                          <span className="mb-0 text-sm">
                            OSSA
                          </span>
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
                              onClick={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Update
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
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
  