import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import contextCreator from "../context/contextCreator";

const RouteDetails = ({ dispatchDetail, handleChange }) => {

  const onchange = (e) => {
    let value = e.target.value
    value = value
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
    handleChange({ ...dispatchDetail, [e.target.name]: value });
  };

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

  return (
    <div style={hStyle} className="container my-2">
      <Form
        hidden={
          dispatchDetail.cname === "" ||
          dispatchDetail.cmobile === "" ||
          dispatchDetail.caddress === "" ||
          dispatchDetail.guarantee === ""||
          dispatchDetail.vnumber === ""
            ? true
            : false
        }
      >
      <h4>Route Details</h4>
        {/* Route Form Start */}
        <Form.Group className="mb-3">
          <label htmlFor="">Where to go?</label>
          <Form.Control style={fStyle}
            type="text"
            name="destination"
            value={dispatchDetail.destination}
            onChange={onchange}
            autoComplete="off"
          />
        </Form.Group>

      </Form>
    </div>
  );
};

export default RouteDetails;
