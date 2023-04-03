import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import contextCreator from "./context/contextCreator";
import LoadingSpin from "react-loading-spin";
import { useNavigate } from "react-router-dom";

const VRegistration = () => {
  //States
  const [vehicle, setVehicle] = useState({
    vname: "",
    vnumber: "",
    routeStatus: "Lobby",
    mChange: "",
    currentMeter: "",
  });
  let navigation = useNavigate()

  if(!localStorage.getItem("token")){
    navigation('/login')
  }

  const context = useContext(contextCreator);
  const { vRegistration, loader, theme, user } = context;

  //Theme
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
  //Theme END

  const onchange = (e) => {
    let value = e.target.value
    value = value.toUpperCase()
    setVehicle({ ...vehicle, [e.target.name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      vehicle.vname === "" ||
      vehicle.vnumber === "" ||
      vehicle.routeStatus === "" ||
      vehicle.mChange === ""
    ) {
      alert("Some fields are missing");
    } else {
      let result = await vRegistration(
        vehicle.vname,
        vehicle.vnumber,
        vehicle.routeStatus,
        vehicle.mChange
      );
      if (result === false) {
        alert("Problem occured while registring this Vehicle");
      } else {
        alert("Successfully Registered");
        setVehicle({
          vname: "",
          vnumber: "",
          routeStatus: "",
          mChange: "",
          currentMeter: "",
        });
      }
    }
  };

  // const handleStatusField = () => {
  //   setVehicle({ routeStatus: "Lobby" });
  // };

  return (
    <div style={hStyle} className="container my-2">
      <center>
        <h4>Vehicle Registration Form</h4>
      </center>
      <Form>
        {/* Vehicle Form Start */}
        <Form.Group className="mb-3">
          <label htmlFor="">Car Number</label>
          <Form.Control
            style={fStyle}
            type="text"
            name="vnumber"
            value={vehicle.vnumber}
            onChange={onchange}
            autoComplete="off"
          />

          <label htmlFor="">Car Name</label>
          <Form.Control
            style={fStyle}
            type="text"
            name="vname"
            value={vehicle.vname}
            onChange={onchange}
            autoComplete="off"
          />

          {/* Lobby
          <nav className="my-4">
            <ul className="pagination">
              <li className="page-item">
                <Link onClick={handleStatusField} className="page-link" to="">
                  Lobby
                </Link>
              </li>
            </ul>
          </nav> */}

          <label htmlFor="">Route Status</label>
          <Form.Control
            style={fStyle}
            disabled={true}
            type="text"
            name="routeStatus"
            value={vehicle.routeStatus}
            onChange={onchange}
            autoComplete="off"
          />

          <label htmlFor="">Mobil Oil Change Date</label>

          <Form.Control
            style={fStyle}
            type="date"
            name="mChange"
            value={vehicle.mChange}
            onChange={onchange}
            autoComplete="off"
          />

          <Button className="my-2" variant="success" onClick={handleClick}>
            {loader ? (
              <center>
                <LoadingSpin />
              </center>
            ) : (
              "Save Vehicle"
            )}
          </Button>
        </Form.Group>
      </Form>
      {/* <div
        className="text-center p-3 my-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <small>Designed & developed by Amir Owaisy (Master)</small>
      </div> */}
    </div>
  );
};

export default VRegistration;
