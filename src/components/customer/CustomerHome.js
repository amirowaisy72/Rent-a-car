import React, { useContext, useEffect } from "react";
import contextCreator from "../context/contextCreator";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const CustomerHome = () => {
  const context = useContext(contextCreator);
  const { getShops, shops, theme } = context;

  useEffect(() => {
    getShops();
  });

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

  let iterate = 0;

  return (
    <>
      <div style={hStyle}>
        <div className="container my-2">
          <h2 className="text-center">Welcome to Rent a Car Portal</h2>
          <div className="row">
            {/* {loader ? (
              <center>
                <LoadingSpin />
              </center>
            ) : (
              ""
            )} */}
            {shops.map((v) => {
              return (
                <div key={v.id} className="col-md my-2">
                  <Card bg={`${theme}`} style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>
                        {v.name} <br />
                        {v.mobile}
                      </Card.Title>
                      {/* <Card.Text> */}
                      <ListGroup>
                        <ListGroup.Item style={style}>
                          <center>
                            {" "}
                            <h5>Cars Status</h5>{" "}
                          </center>
                        </ListGroup.Item>
                        <ListGroup.Item style={style}>
                          <center>Toal Cars : {v.totalVehicles}</center>
                        </ListGroup.Item>
                        <ListGroup.Item style={style}>
                          {v.cars.map((car) => {
                            iterate = iterate + 1;
                            return (
                              <div key={iterate}>
                                <i style={airoplaneStyle} className="fa-solid mx-2 fa-car"></i>
                                {car} <br key={iterate} />
                              </div>
                            );
                          })}
                        </ListGroup.Item>
                        <ListGroup.Item style={style}>
                          <center>Available : {v.totalCarsLobby}</center>
                        </ListGroup.Item>
                        {v.totalCarsLobby !== 0 ? (
                          <ListGroup.Item style={style}>
                           {v.availableCars.map((car) => {
                            iterate = iterate + 1;
                            return (
                              <div key={iterate}>
                                <i style={airoplaneStyle} className="fa-solid mx-2 fa-car"></i>
                                {car} <br key={iterate} />
                              </div>
                            );
                          })}
                          </ListGroup.Item>
                        ) : (
                          ""
                        )}

                        <ListGroup.Item style={style}>
                          On-Route : {v.totalCarsRoute}
                        </ListGroup.Item>
                        
                      </ListGroup>
                      {/* </Card.Text> */}
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default CustomerHome;
