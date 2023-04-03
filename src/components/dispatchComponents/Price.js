import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import contextCreator from "../context/contextCreator";
import LoadingSpin from "react-loading-spin";

const Price = ({ dispatchDetail, handleChange }) => {
  const [loader, setLoader] = useState(false);
  const host = "https://fluffy-cod-leather-jacket.cyclic.app/";
  // const host = "http://localhost:5000/";
  const context = useContext(contextCreator);
  const { addDispatch, updateVehicleStatus, theme } = context;
  const onchange = (e) => {
    handleChange({ ...dispatchDetail, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const keyword = dispatchDetail.vnumber;
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
    if (json.length === 0) {
      alert("Vehicle number does not match with anyone");
      setLoader(false);
    } else if (json[0].routeStatus !== "Lobby") {
      alert("This vehicle cannot be dispatched");
      setLoader(false);
    } else {
      await addDispatch(
        dispatchDetail.cname,
        dispatchDetail.idcard,
        dispatchDetail.cmobile,
        dispatchDetail.caddress,
        dispatchDetail.guarantee,
        dispatchDetail.vnumber,
        dispatchDetail.destination,
        dispatchDetail.hours,
        dispatchDetail.price
      );
      //Update vehicle status also
      await updateVehicleStatus(
        dispatchDetail.vnumber,
        dispatchDetail.destination
      );
      setLoader(false);
      handleChange({
        cname: "",
        idcard: "",
        cmobile: "",
        caddress: "",
        guarantee: "",
        vnumber: "",
        destination: "",
        hours: "",
        price: "",
      });
    }
  };

  return (
    <div style={hStyle} className="container my-2">
      <Form
        hidden={
          dispatchDetail.cname === "" ||
          dispatchDetail.cmobile === "" ||
          dispatchDetail.caddress === "" ||
          dispatchDetail.guarantee === "" ||
          dispatchDetail.vnumber === "" ||
          dispatchDetail.destination === "" ||
          dispatchDetail.hours === ""
            ? true
            : false
        }
        onSubmit={handleSubmit}
      >
        <h4>Payment Details</h4>
        {/* Time table Form Start */}
        {/* //To Do Date time to be set  */}
        <Form.Group className="mb-3">
          <label htmlFor="">How much you will charge for this?</label>
          <Form.Control style={fStyle}
            type="number"
            name="price"
            value={dispatchDetail.price}
            onChange={onchange}
            autoComplete="off"
          />
        </Form.Group>

        <Button
          disabled={
            dispatchDetail.cname === "" ||
            dispatchDetail.cmobile === "" ||
            dispatchDetail.caddress === "" ||
            dispatchDetail.guarantee === "" ||
            dispatchDetail.vnumber === "" ||
            dispatchDetail.destination === "" ||
            dispatchDetail.hours === "" ||
            dispatchDetail.price === ""
              ? true
              : false
          }
          variant="success"
          type="submit"
        >
          {loader ? (
            <center>
              <LoadingSpin />
            </center>
          ) : (
            "Submit Data"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Price;
