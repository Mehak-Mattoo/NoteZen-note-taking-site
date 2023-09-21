import MainScreen from "../../components/MainScreen";
import { useState, useEffect } from "react";
import "./ProfileScreen.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userAction";
import ErrorMessage from "../../components/Header/ErrorMessage";
import Loading from "../../components/Header/Loading";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password }));
  };

  return (
    <>
      <MainScreen title="PROFILE" />
      <Container>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label className="my-3">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label className="my-3">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="my-3">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label className="my-3">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="pic"></Form.Group>
              <Button className="my-2" type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
