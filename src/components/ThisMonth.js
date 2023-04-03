import React, { useContext } from "react";
import Dispatches from "./ThisMonth/Dispatches";
import Expenses from "./ThisMonth/Expenses";
import LoadingSpin from "react-loading-spin";
import contextCreator from "./context/contextCreator";
import { useNavigate } from "react-router-dom";

const ThisMonth = () => {
  let navigation = useNavigate();

  if (!localStorage.getItem("token")) {
    navigation("/login");
  }
  const context = useContext(contextCreator);
  const { loader } = context;
  return (
    <>
      <div className="container">
        {loader ? (
          <center>
            <LoadingSpin />
          </center>
        ) : (
          ""
        )}
      </div>
      <Dispatches />
      <Expenses />
      {/* <div
        className="text-center p-3 my-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <small>Designed & developed by Amir Owaisy (Master)</small>
      </div> */}
    </>
  );
};

export default ThisMonth;
