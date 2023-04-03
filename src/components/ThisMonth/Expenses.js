import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import contextCreator from "../context/contextCreator";
import moment, { months } from "moment/moment";

const Expenses = () => {
    //States
  const context = useContext(contextCreator);
  const { expenses, allExpenses, theme } = context;

  //Theme
  let hStyle = {};
  if (theme === "dark") {
    hStyle = { color: 'white' }
  }else{
    hStyle = { color: 'black' }
  }
  //Theme End

  //Render all Dispatches
  useEffect(() => {
    allExpenses();
  }, []);

  //Month
  let currentMonth = moment(new Date()).format("MM");
  let totalExpense = 0
  for (let index = 0; index < expenses.length; index++) {
    const element = expenses[index];
    let entryMonth = moment(element.date).format("MM");
    if(currentMonth === entryMonth){
        totalExpense = totalExpense + element.price
    }
  }

  return (
    <>
      <div className="container my-2">
      <center><h4 style={hStyle}>Expenses This Month</h4></center>
        <Table responsive striped bordered hover variant={`${theme}`}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Expense Detail</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((r) => {
                let entryMonth = moment(r.date).format("MM");
              return (
                entryMonth === currentMonth ?
                <tr key={r._id}>
                  <td>{entryMonth}</td>
                  <td>{r.detail}</td>
                  <td>{r.price}</td>
                </tr> : ''
              );
            })}
            <tr>
                <td></td>
                <td></td>
                <td>Total Expense = {totalExpense} Rs.</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Expenses
