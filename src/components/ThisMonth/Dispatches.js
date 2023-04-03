import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import contextCreator from "../context/contextCreator";
import dateFormat from "dateformat";
import moment, { months } from "moment/moment";

const Dispatches = () => {
  //States
  const context = useContext(contextCreator);
  const { dispatch, allDispatches, theme } = context;

  //Theme
  let hStyle = {};
  if (theme === "dark") {
    hStyle = { color: 'white' }
  }else{
    hStyle = { color: 'black' }
  }
  //Theme End

  //Month
  let currentMonth = moment(new Date()).format("MM");
  let totalIncome = 0;
  for (let index = 0; index < dispatch.length; index++) {
    const element = dispatch[index];
    let entryMonth = moment(element.date).format("MM");
    if (currentMonth === entryMonth) {
      totalIncome = totalIncome + element.price;
    }
  }

  //Render all Dispatches
  useEffect(() => {
    allDispatches();
  }, []);

  return (
    <div className="container my-2">
      <center>
        <h4 style={hStyle}>Income This Month</h4>
      </center>
      <Table responsive striped bordered hover variant={`${theme}`}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Customer</th>
            <th>Mobile #</th>
            <th>Address</th>
            <th>Refference</th>
            <th>Car</th>
            <th>Destination</th>
            <th>Period</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {dispatch.map((r) => {
            let entryMonth = moment(r.date).format("MM");
            return entryMonth === currentMonth ? (
              <tr key={r._id}>
                <td>{entryMonth}</td>
                <td>{r.cname}</td>
                <td>{r.cmobile}</td>
                <td>{r.caddress}</td>
                <td>{r.guarantee}</td>
                <td>{r.vnumber}</td>
                <td>{r.destination}</td>
                <td>{r.hours} Hours</td>
                <td>{r.price}</td>
              </tr>
            ) : (
              ""
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total Income = {totalIncome} Rs.</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Dispatches;
