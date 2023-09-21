import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";

export default function Header({ setSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logOutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" bg="primary">
        <Container>
          <Navbar.Brand>
            <Link to="/"> Note Zen</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/"> Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>
            </Nav>

            <Form inline>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                    className=" mr-sm-2"
                  />
                </Col>
                <Col>
                  <Button style={{ backgroundColor: "#802e2b" }} type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
            <Nav>
              {userInfo ? (
                <>
                  <NavDropdown
                    style={{ maxWidth: "max-content" }}
                    title={`${userInfo.name}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link to="/profile">My Profile</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link>
                  <Link to="/login">Login </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
