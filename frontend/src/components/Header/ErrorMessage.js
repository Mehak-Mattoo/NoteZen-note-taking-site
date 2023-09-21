import React from "react";
import Alert from "react-bootstrap/Alert";

export default function ErrorMessage(props) {
  return (
    <>
      <div>
        <Alert variant={props.variant} dismissible>
          <b>{props.children}</b>
        </Alert>
      </div>
    </>
  );
}
