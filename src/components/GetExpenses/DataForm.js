import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import contextCreator from "../context/contextCreator";
import LoadingSpin from "react-loading-spin";

const DataForm = () => {
  //States
  const [expense, setExpense] = useState({ detail: "", price: "" });
  const context = useContext(contextCreator);
  const { expenseCreate, loader, theme } = context;

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

  //OnChange Function
  const onchange = async (e) => {
    let value = e.target.value
    value = value
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
    setExpense({ ...expense, [e.target.name]: value });
  };

  //Submit Form
  const handleClick = async (e) => {
    e.preventDefault();
    await expenseCreate(expense.detail, expense.price);
    setExpense({ detail: "", price: "" });
    alert("Expense has been added");
  };

  return (
    <div style={hStyle} className="container my-2">
      <h4>Expense Details</h4>
      <Form>
        {/* Customer Form Start */}
        <Form.Group className="mb-3">
          <label htmlFor="">Expense Detail</label>
          <Form.Control style={fStyle}
            type="text"
            name="detail"
            value={expense.detail}
            onChange={onchange}
            autoComplete="off"
          />

          <label htmlFor="">Cost Of This Expense</label>
          <Form.Control style={fStyle}
            type="number"
            name="price"
            value={expense.price}
            onChange={onchange}
            autoComplete="off"
          />

          <Button className="my-2"
            onClick={handleClick}
            disabled={
              expense.detail === "" || expense.price === "" ? true : false
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
        </Form.Group>
      </Form>
    </div>
  );
};

export default DataForm;
