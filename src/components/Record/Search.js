import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import contextCreator from "../context/contextCreator";
import LoadingSpin from "react-loading-spin";

const Search = () => {
  const context = useContext(contextCreator);
  const { searchDispatches, loader, theme } = context;

  //Theme
  let fStyle = {};
  if (theme === "dark") {
    fStyle = { backgroundColor: "#23272B", color: "white" };
  } else {
    fStyle = { backgroundColor: "white", color: "black" };
  }
  //Theme END

  //On chnage function
  const onchange = async (e) => {
    await searchDispatches(e.target.value);
  };

  return (
    <div className="container my-2">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control style={fStyle}
            type="text"
            name="search"
            onChange={onchange}
            autoComplete="off"
          />
        </Form.Group>
      </Form>
      {loader ? (
        <center>
          <LoadingSpin />
        </center>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
