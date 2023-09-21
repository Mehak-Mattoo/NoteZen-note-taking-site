import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "1rem 0rem",
      }}
    >
      <Spinner animation="grow" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
