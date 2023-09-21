import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";

import Loading from "../../components/Header/Loading";
import ErrorMessage from "../../components/Header/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <>
      <MainScreen title="LOG IN"> </MainScreen>
      <Container>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label className="mb-3 px-2">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label className="mb-3 px-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="submitBtn" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-4">
          <Col>
            New User ?
            <Link
              to="/sign-up"
              style={{ color: "#EB6864", textDecoration: "underline" }}
            >
              Sign Up
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
