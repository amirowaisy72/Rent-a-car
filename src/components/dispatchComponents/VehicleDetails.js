import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useLocation } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import contextCreator from "../context/contextCreator";

const VehicleDetails = ({ dispatchDetail, handleChange }) => {
  //
  const [vehicleNumSugg, setVehicleNumSugg] = useState([]);
  const [loader, setLoader] = useState(false);
  const host = "https://fluffy-cod-leather-jacket.cyclic.app/";
  // const host = "http://localhost:5000/";

  const context = useContext(contextCreator);
  const { theme } = context;

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

  const onchange = async (e) => {
    const keyword = e.target.value;
    let value = e.target.value
    value = value.toUpperCase()
    handleChange({ ...dispatchDetail, [e.target.name]: value });
    setLoader(true);
    //API Call
    const response = await fetch(`${host}vehicles/readvehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ keyword }),
    });
    const json = await response.json();
    setLoader(false);
    setVehicleNumSugg(json);
  };

  //Vehicle Numbers Suggestion
  const handleClick = (number) => {
    handleChange({ ...dispatchDetail, ["vnumber"]: number });
  };

  return (
    <div style={hStyle} className="container my-2">
      <Form
        hidden={
          dispatchDetail.cname === "" ||
          dispatchDetail.cmobile === "" ||
          dispatchDetail.caddress === "" ||
          dispatchDetail.guarantee === ""
            ? true
            : false
        }
      >
        <h4>Vehicle Details</h4>
        {loader ? (
          <center>
            <LoadingSpin />
          </center>
        ) : (
          <nav>
            <ul className="pagination">
              {vehicleNumSugg.map((v) => {
                return (
                  <li key={v._id} className="page-item">
                    <Link
                      onClick={() => {
                        handleClick(v.vnumber);
                      }}
                      className="page-link"
                      to=""
                    >
                      {v.vnumber}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        {/* Vehicle Numbers Suggestions */}

        {/* Show error here, no vehicles found, please register this vehicle first */}

        {/* Vehicle Form Start */}
        <Form.Group className="mb-3">
          <label htmlFor="">Vehicle Number</label>
          <Form.Control style={fStyle}
            type="text"
            name="vnumber"
            value={dispatchDetail.vnumber}
            onChange={onchange}
            autoComplete="off"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default VehicleDetails;
