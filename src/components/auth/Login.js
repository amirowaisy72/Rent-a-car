import React, { useContext, useState } from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import contextCreator from "../context/contextCreator";
import { useNavigate } from "react-router-dom";
//[Application Update]
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpin from "react-loading-spin";
//[Application Update END]

const Login = () => {
  //[Host Info]
  // const host = "http://localhost:5000/";
  const host = "https://fluffy-cod-leather-jacket.cyclic.app/";
  //[Host Info END]

  //[Context state variables]
  const context = useContext(contextCreator);
  const { theme, logedUser, showUpdate, getVersion, updateLink, tokenHandler } =
    context;
  //[Context state variables END]

  //[Component States]
  const [loader, setLoader] = useState(false);
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
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
  let navigation = useNavigate();
  //Data taker
  const onChange = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
  };
  //[Other Necessary Stuff END]

  //[Login details submit handler]
  const handleClick = async () => {
    //API Call
    setLoader(true);
    const response = await fetch(`${host}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginDetail.email,
        password: loginDetail.password,
      }),
    });
    const json = await response.json();
    // setLoader(false);
    if (!json.success) {
      alert(json.error);
      setLoader(false);
    } else {
      localStorage.setItem("token", json.authToken);
      await tokenHandler(json.authToken, "set");
      await logedUser();
      if (json.type === "CUSTOMER") {
        //Redirect to customer
        setLoader(false);
        navigation("/customer/home");
      } else {
        //Redirect to shop page
        setLoader(false);
        navigation("/");
      }
    }
  };
  //[Login details submit handler END]

  //[Theme Style]
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
  //[Theme Style END]

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
      {/* Login Form */}
      <MDBContainer
        style={hStyle}
        className="p-3 my-5 d-flex flex-column w-100"
      >
        <center>
        <h2 className="mb-5">Login to Rentify</h2>
        </center>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          name="email"
          style={fStyle}
          value={loginDetail.email}
          onChange={onChange}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          name="password"
          style={fStyle}
          value={loginDetail.password}
          onChange={onChange}
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
          {loader ? <LoadingSpin /> : "Sign in"}
        </button>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <Link to="/register" style={hStyle}>
              Register
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
      {/* Login Form END */}
    </>
  );
};

export default Login;
