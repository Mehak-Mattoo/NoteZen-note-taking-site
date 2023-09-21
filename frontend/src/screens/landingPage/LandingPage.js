import React, { useEffect } from "react";
import "./landingPage.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <>
      <div className="main">
        <div className="text">
          <h1>Note Zen</h1>
          <h6>Finding Clarity and Focus through Thoughtful Note-Taking</h6>

          <div className="buttons">
            <Link to="/login">
              <Button className="landingButton" variant="primary" active>
                Log In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="landingButton" active>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
