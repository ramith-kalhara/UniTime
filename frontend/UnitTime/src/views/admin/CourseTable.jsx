
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
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              IT3020
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>ITPM</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          4
                        </Badge>
                      </td>
                      <td>
                      <Media>
                            <span className="mb-0 text-sm">
                              Computing
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
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              IT3020
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>ITPM</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          4
                        </Badge>
                      </td>
                      <td>
                      <Media>
                            <span className="mb-0 text-sm">
                              Computing
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
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              IT3010
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>OSSA</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          4
                        </Badge>
                      </td>
                      <td>
                      <Media>
                            <span className="mb-0 text-sm">
                              Computing
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
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              IT1020
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>CS</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          2
                        </Badge>
                      </td>
                      <td>
                      <Media>
                            <span className="mb-0 text-sm">
                              Computing
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
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
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
  