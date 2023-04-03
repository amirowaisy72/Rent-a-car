import React, { useContext, useEffect, useState } from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import contextCreator from "../context/contextCreator";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
//Application Update
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
//Application Update END

const Register = () => {
  //[Host Info]
  const host = "http://localhost:5000/";
  // const host = "https://fluffy-cod-leather-jacket.cyclic.app/";
  //[Host Info END]

  //[Context state variables]
  const context = useContext(contextCreator);
  const [loader, setLoader] = useState(false);
  const { theme, logedUser, showUpdate, getVersion, updateLink, tokenHandler } =
    context;
  //[Context state variables END]

  //[Component States]
  const [signUpDetail, setSignupDetail] = useState({
    type: "What is your role in this system?",
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  //[Component States END]

  //[Version Controller]
  useEffect(() => {
    async function version() {
      // You can await here
      await getVersion();
      // ...
    }
    version();
  }, []);
  //[Version Controller END]

  //[Other Necessary Stuff]
  //Navigator
  let navigate = useNavigate();
  //Data taker
  const onChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "name") {
      value = value
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    } else {
      //
    }
    setSignupDetail({ ...signUpDetail, [e.target.name]: value });
  };
  //Type Customer Handler
  const handleCustomer = () => {
    setSignupDetail({ ...signUpDetail, ["type"]: "CUSTOMER" });
  };
  //Type business handler
  const handleBusiness = () => {
    setSignupDetail({ ...signUpDetail, ["type"]: "BUSINESS HOLDER" });
  };
  //[Other Necessary Stuff END]

  //[Theme Styler]
  let hStyle = {};
  if (theme === "dark") {
    hStyle = { color: "white" };
  } else {
    hStyle = { color: "black" };
  }

  let fStyle = {};
  if (theme === "dark") {
    fStyle = { backgroundColor: "#23272B", color: "white" };
  } else {
    fStyle = { backgroundColor: "white", color: "black" };
  }
  //[Theme Styler END]

  //[Register details handler]
  const handleClick = async () => {
    if (signUpDetail.type === "What is your role in this system?") {
      alert("Please select type of yuor account");
    } else if (signUpDetail.name === "") {
      alert("Please write your full name");
    } else if (signUpDetail.mobile.length < 11) {
      alert("Invalid Phone Number. Correct pattern is 03xxxxxxxxx");
    } else if (signUpDetail.email.length < 16) {
      alert("Invalid Email Address");
    } else if (signUpDetail.password.length < 6) {
      alert("Password must be 6 characters long");
    } else {
      setLoader(true);
      //API Call
      const response = await fetch(`${host}auth/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetail),
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.error);
        setLoader(false);
      } else {
        localStorage.setItem("token", json.authToken);
        await tokenHandler(json.authToken, "set");
        await logedUser();
        if (signUpDetail.type === "CUSTOMER") {
          //Redirect to customer page
          setLoader(false);
          navigate("/customer/home");
        } else {
          //Redirect to business page
          setLoader(false);
          navigate("/");
        }
      }
    }
  };
  //[Register details handler END]

  return (
    <>
      {/* Update Application */}
      <Modal show={showUpdate}>
        <Modal.Header>
          <Modal.Title>Update Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Dear user, it is required to please update the application to have a
            great experience of this application
          </p>
          <center>
            <Link to={updateLink}>
              <Button variant="primary">Update</Button>
            </Link>
          </center>
        </Modal.Body>
      </Modal>
      {/* Update Application END */}
      {/* Register Form */}
      <MDBContainer
        style={hStyle}
        className="p-3 my-5 d-flex flex-column w-100"
      >
        <center>
        <h2 className="mb-5">Signup to Rentify</h2>
        </center>
        <Dropdown className="mb-4" style={{ width: "100%" }}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            onChange={onChange}
          >
            {signUpDetail.type}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={handleCustomer}>
              Customer
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={handleBusiness}>
              Business Holder
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <MDBInput
          wrapperClass="mb-4"
          label={`${
            signUpDetail.type === "CUSTOMER"
              ? "Full Name"
              : "Business Registered Name. e.g Hassan Rent A Car"
          } (Maximum 24 characters allowed)`}
          id="form1"
          type="text"
          style={fStyle}
          autoComplete="off"
          onChange={onChange}
          name="name"
          maxLength={24}
          value={signUpDetail.name}
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Mobile Number"
          id="form2"
          type="number"
          style={fStyle}
          autoComplete="off"
          onChange={onChange}
          name="mobile"
          value={signUpDetail.mobile}
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form3"
          type="email"
          style={fStyle}
          onChange={onChange}
          name="email"
          value={signUpDetail.email}
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form4"
          type="password"
          style={fStyle}
          onChange={onChange}
          name="password"
          value={signUpDetail.password}
        />
        {/* 
      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
        <a href="!#">Forgot password?</a>
      </div> */}

        <button className="btn btn-primary" onClick={handleClick}>
          {loader ? <LoadingSpin /> : "Create Account"}
        </button>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" style={hStyle}>
              Login
            </Link>
          </p>
          {/* <p>or sign up with:</p> */}

          {/* <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        >
          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="facebook-f" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="twitter" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="google" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="github" size="sm" />
          </MDBBtn>
        </div> */}
        </div>
      </MDBContainer>
      {/* Register Form END */}
    </>
  );
};

export default Register;
