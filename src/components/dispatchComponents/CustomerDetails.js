import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import contextCreator from "../context/contextCreator";

const CustomerDetails = ({ dispatchDetail, handleChange }) => {
  const [customerSuggest, setCustomerSuggest] = useState([]);
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

  const onchangeCustomer = async (e) => {
    const keyword = e.target.value;
    let value = e.target.value;
    value = value
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    handleChange({ ...dispatchDetail, [e.target.name]: value });
    setLoader(true);
    //API Call
    const response = await fetch(`${host}dispatches/readcustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ keyword }),
    });
    const json = await response.json();
    setLoader(false);
    // Generate unique names array
    const uniqueCustomers = Array.from(new Set(json.map((a) => a.cname))).map(
      (cname) => {
        return json.find((a) => a.cname === cname);
      }
    );
    setCustomerSuggest(uniqueCustomers);
  };

  const onchange = (e) => {
    let value = e.target.value;
    value = value
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    handleChange({ ...dispatchDetail, [e.target.name]: value });
  };

  //Customer Name Suggestion
  const handleClick = (name, idcard, mobile, address, guarantee) => {
    handleChange({
      ...dispatchDetail,
      ["cname"]: name,
      ["idcard"]: idcard,
      ["cmobile"]: mobile,
      ["caddress"]: address,
      ["guarantee"]: guarantee,
    });
  };

  return (
    <div style={hStyle} className="container my-2">
      <h4>Customer Details</h4>
      <Form>
        {loader ? (
          <center>
            <LoadingSpin />
          </center>
        ) : (
          <nav>
            <ul className="pagination">
              {customerSuggest.map((c) => {
                return (
                  <li key={c._id} className="page-item">
                    <Link
                      onClick={() => {
                        handleClick(
                          c.cname,
                          c.idcard,
                          c.cmobile,
                          c.caddress,
                          c.guarantee
                        );
                      }}
                      className="page-link"
                      to=""
                    >
                      {c.cname}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Customer Form Start */}
        <Form.Group className="mb-3">
          <label htmlFor="">Customer Name</label>
          <Form.Control
            style={fStyle}
            type="text"
            name="cname"
            value={dispatchDetail.cname}
            onChange={onchangeCustomer}
            autoComplete="off"
          />

          <label htmlFor="">ID Card Number</label>
          <Form.Control
            style={fStyle}
            type="number"
            name="idcard"
            value={dispatchDetail.idcard}
            onChange={onchange}
            autoComplete="off" maxLength={13}
          />

          <label htmlFor="">Mobile #</label>
          <Form.Control
            style={fStyle}
            type="text"
            name="cmobile"
            value={dispatchDetail.cmobile}
            onChange={onchange}
            autoComplete="off"
          />

          <label htmlFor="">Complete Address</label>
          <Form.Control
            style={fStyle}
            type="text"
            name="caddress"
            value={dispatchDetail.caddress}
            onChange={onchange}
            autoComplete="off"
          />

          <label htmlFor="">Refference</label>
          <Form.Control
            style={fStyle}
            type="text"
            name="guarantee"
            value={dispatchDetail.guarantee}
            onChange={onchange}
            autoComplete="off"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default CustomerDetails;
