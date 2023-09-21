import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  const footerStyle = {
    width: "85vw",
    position: "fixed",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    fontSize: "1vw",
    fontWeight: "600",
    letterSpacing: "2px",
    padding: "0.6rem",
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <footer className="text-center" style={footerStyle}>
              Made by
              <a
                style={{
                  color: "#EB6864",
                  paddingLeft: "0.2rem",
                }}
                href="https://github.com/Mehak-Mattoo"
                target="blank"
              >
                Mehak Mattoo &hearts;
              </a>
            </footer>
          </Col>
        </Row>
      </Container>
    </>
  );
}
