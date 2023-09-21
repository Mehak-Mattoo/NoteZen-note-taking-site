import React from "react";
import Container from "react-bootstrap/Container";
import "./MainScreen.css";

export default function MainScreen(props) {
  return (
    <>
      <Container>
        <div className="mainback">
          {props.title && (
            <>
              <div className="page">
                <h2 className="heading"> {props.title}</h2>
                <hr />
              </div>
              {props.children}
            </>
          )}
        </div>
      </Container>
    </>
  );
}
