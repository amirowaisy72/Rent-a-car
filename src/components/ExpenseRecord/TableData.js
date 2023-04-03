import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import contextCreator from "../context/contextCreator";
import UpdateExpense from "./UpdateExpense";
import LoadingSpin from "react-loading-spin";
import moment from "moment/moment";

const TableData = () => {
  //States
  const context = useContext(contextCreator);
  const { expenses, allExpenses, loader, theme } = context;
  const [updateRow, setUpdateRow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  //Render all Dispatches
  useEffect(() => {
    allExpenses();
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
      <div className="container my-4">
        {loader ? (
          <center>
            <LoadingSpin />
          </center>
        ) : (
          ""
        )}
        <Table responsive striped bordered hover variant={`${theme}`}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Expense Detail</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((r) => {
              let date = moment(r.date).format("DD/MM");
              return (
                <tr key={r._id}>
                  <td>{date}</td>
                  <td>{r.detail}</td>
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
      <UpdateExpense
        modalShow={modalShow}
        handleClose={handleClose}
        updateRow={updateRow}
      />
    </>
  );
};

export default TableData;
