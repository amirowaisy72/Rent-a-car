import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import contextCreator from "../context/contextCreator";
import UpdateRecord from "./UpdateRecord";
import dateFormat from "dateformat";
import moment, { months } from "moment/moment";
import LoadingSpin from "react-loading-spin";

const TableData = () => {
  //States
  const context = useContext(contextCreator);
  const { dispatch, allDispatches, loader, theme } = context;
  const [updateRow, setUpdateRow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  //Render all Dispatches
  useEffect(() => {
    allDispatches();
  }, []);

  //Modal Close/Show functions
  const handleClose = () => setModalShow(false);

  //Update/Delete Record
  const update = (data) => {
    setModalShow(true);
    setUpdateRow(data);
    //Call Update function from AllStates
  };
  return (
    <>
      <div className="container my-2">
        <Table responsive striped bordered hover variant={`${theme}`}>
          <thead>
            <tr>
              <th>Date</th>
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
              // let date = dateFormat(r.date)
              let date = moment(r.date).format("DD/MM");
              return (
                <tr key={r._id}>
                  <td>{date}</td>
                  <td>{r.cname}</td>
                  <td>{r.cmobile}</td>
                  <td>{r.caddress}</td>
                  <td>{r.guarantee}</td>
                  <td>{r.vnumber}</td>
                  <td>{r.destination}</td>
                  <td>{r.hours} Hours</td>
                  <td>{r.price}</td>
                  <td
                    onClick={() => {
                      update(r);
                    }}
                    className="fa-solid fa-pen-to-square mx-2"
                  ></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <UpdateRecord
        modalShow={modalShow}
        handleClose={handleClose}
        updateRow={updateRow}
      />
    </>
  );
};

export default TableData;
