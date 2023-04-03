import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import contextCreator from "../context/contextCreator";

const Time = ({ dispatchDetail, handleChange }) => {
  const onchange = (e) => {
    handleChange({ ...dispatchDetail, [e.target.name]: e.target.value });
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
          dispatchDetail.guarantee === "" ||
          dispatchDetail.vnumber === "" ||
          dispatchDetail.destination === ""
            ? true
            : false
        }
      >
        <h4>Schedule Details</h4>
        {/* Time table Form Start */}
        {/* //To Do Date time to be set  */}
        <Form.Group className="mb-3">
          <label htmlFor="">For how many hours?</label>
          <Form.Control style={fStyle}
            type="number"
            name="hours"
            value={dispatchDetail.hours}
            onChange={onchange}
            autoComplete="off"
          />
        </Form.Group>

      </Form>
    </div>
  );
};

export default Time;
