import React from "react";
import { useNavigate } from "react-router-dom";
import TableData from "./ExpenseRecord/TableData";

const ExpenseRecord = () => {
  let navigation = useNavigate();

  if (!localStorage.getItem("token")) {
    navigation("/login");
  }
  return (
    <>
      <TableData />
      {/* <div
        className="text-center p-3 my-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <small>Designed & developed by Amir Owaisy (Master)</small>
      </div> */}
    </>
  );
};

export default ExpenseRecord;
