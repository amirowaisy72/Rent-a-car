import React, { useContext, useEffect, useState } from "react";
import contextCreator from "../context/contextCreator";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import UpdateMobil from "./UpdateMobil";
import moment from "moment/moment";
import LoadingSpin from "react-loading-spin";
import { Link, useNavigate } from "react-router-dom";

const VStatus = () => {
  //States
  const context = useContext(contextCreator);
  const { vStatus, allVehicles, loader, theme } = context;
  const [modalShow, setModalShow] = useState(false);
  const [vehicle, setVehicle] = useState({});

  //Theme
  let style = {};
  if (theme === "dark") {
    style = { backgroundColor: "#23272B", color: "white" };
  } else {
    style = { backgroundColor: "white", color: "black" };
  }

  let hStyle = {};
  if (theme === "dark") {
    hStyle = { color: "white" };
  } else {
    hStyle = { color: "black" };
  }

  let airoplaneStyle = {};
  if (theme === "dark") {
    airoplaneStyle = { color: "white" };
  } else {
    airoplaneStyle = { color: "black" };
  }
  //Theme End

  //Modal Close/Show functions
  const handleClose = () => setModalShow(false);

  const handleShow = (v) => {
    setModalShow(true);
    setVehicle(v);
  };

  useEffect(() => {
    async function fetchVehicles() {
      // You can await here
      await allVehicles()
      // ...
    }
    fetchVehicles();
  }, []); // Or [] if effect doesn't need props or state

  //Date Controller
  const dateConverter = (startDate, timeEnd, type) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(timeEnd);
    let result = moment(newStartDate).diff(newEndDate, type);
    return result;
  };

  //Dispatch Vehicle
  const handleDispatch = (vehicle) => {
    //
  };

  //Date/Time calculator
  const timeEnd = Date.now();
  const timeMaker = (startDate) => {
    const years = dateConverter(startDate, timeEnd, "years");
    const month = dateConverter(startDate, timeEnd, "months");
    const days = dateConverter(startDate, timeEnd, "days");
    const hours = dateConverter(startDate, timeEnd, "hours");
    const minutes = dateConverter(startDate, timeEnd, "minutes");
    if (years !== 0) {
      return Math.abs(years) + " Years ago";
    } else if (month !== 0) {
      return Math.abs(month) + " Months ago";
    } else if (days !== 0) {
      return Math.abs(days) + " Days ago";
    } else if (hours !== 0) {
      return Math.abs(hours) + " Hours ago";
    } else if (minutes !== 0) {
      return Math.abs(minutes) + " Minutes ago";
    } else {
      return "Just now";
    }
  };

  return (
    <>
      <div style={hStyle}>
        <div className="container my-2">
          <h2 className="text-center">Vehicles Status</h2>
          {vStatus.length === 0 ? (
            <>
              Add a vehicle
              <Link to="/vRegistration">
                <i style={airoplaneStyle} className="fa-solid mx-2 fa-car"></i>
              </Link>
            </>
          ) : (
            <div className="row">
              {loader ? (
                <center>
                  <LoadingSpin />
                </center>
              ) : (
                ""
              )}
              {vStatus.map((v) => {
                return (
                  <div key={v._id} className="col-md my-2">
                    <Card bg={`${theme}`} style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>
                          {v.vname} {v.vnumber}
                        </Card.Title>
                        {/* <Card.Text> */}
                        <ListGroup>
                          <ListGroup.Item style={style}>
                            Status : {v.routeStatus}
                          </ListGroup.Item>
                          <ListGroup.Item style={style}>
                            <center>
                              {" "}
                              <h5>Mobil Oil Status</h5>{" "}
                            </center>
                          </ListGroup.Item>
                          <ListGroup.Item style={style}>
                            {timeMaker(v.mChange)}
                          </ListGroup.Item>
                          <ListGroup.Item style={style}>
                            <center>
                              <i
                                onClick={() => {
                                  handleShow(v);
                                }}
                                className="fa-solid fa-pen-to-square mx-2"
                              ></i>
                              {v.routeStatus === "Lobby" ? (
                                <Link
                                  style={airoplaneStyle}
                                  state={{ vehicle: v.vnumber }}
                                  to="/dispatch"
                                >
                                  <i
                                    onClick={handleDispatch}
                                    className="fa-solid mx-2 fa-plane"
                                  ></i>
                                </Link>
                              ) : (
                                ""
                              )}
                            </center>
                          </ListGroup.Item>
                        </ListGroup>
                        {/* </Card.Text> */}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <UpdateMobil
          vehicle={vehicle}
          modalShow={modalShow}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </div>
    </>
  );
};

export default VStatus;
