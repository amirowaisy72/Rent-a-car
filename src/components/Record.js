import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Record/Search";
import TableData from "./Record/TableData";

const Record = () => {
  let navigation = useNavigate();

  if (!localStorage.getItem("token")) {
    navigation("/login");
  }
  return (
    <>
      <Search />
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

export default Record;
