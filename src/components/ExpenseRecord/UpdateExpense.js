import React from "react";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import contextCreator from "../context/contextCreator";
import LoadingSpin from "react-loading-spin";

const UpdateExpense = ({ modalShow, handleClose, updateRow }) => {
  // States
  const [newRow, setNewRow] = useState({
    detail: "",
    price: "",
  });
  const [deleteConfrim, setDeleteConfirm] = useState("Delete");
  const [loader, setLoader] = useState(false);

  //Context
  const context = useContext(contextCreator);
  const { updateExpense, deleteExpense, theme } = context;

  //Theme
  let style = {};
  if (theme === "dark") {
    style = { background: '#1B5EA1', color: 'white' };
  } else {
    style = { backgroundColor: "white", color: "black" };
  }

  let fStyle = {};
  if (theme === "dark") {
    fStyle = { backgroundColor: "#23272B", color: "white" };
  } else {
    fStyle = { backgroundColor: "white", color: "black" };
  }
  //Theme END

  //To close modal
  const handleUpdate = async () => {
    setLoader(true)
    // Update Dispatch Record info
    // Re-define new data
    let newDetail = "";
    let newPayment = "";
    if (newRow.detail === "") {
      newDetail = updateRow.detail;
    } else {
      newDetail = newRow.detail;
    }
    //
    if (newRow.price === "") {
      newPayment = updateRow.price;
    } else {
      newPayment = newRow.price;
    }

    await updateExpense(newDetail, newPayment, updateRow._id);
    setLoader(false)
    handleClose();
  };

  //Delete Record
  const handleDelete = async () => {
    setInterval(() => {
      setDeleteConfirm("Delete");
    }, 20000);
    if (deleteConfrim === "Delete") {
      setDeleteConfirm("Click Again");
    } else if (deleteConfrim === "Click Again") {
      setDeleteConfirm("Are You Sure?");
    } else {
      setLoader(true)
      await deleteExpense(updateRow._id);
      setLoader(false)
      handleClose();
    }
  };

  //On chnage function
  const onChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <Modal show={modalShow} onHide={handleUpdate}>
        <Modal.Header style={style} closeButton>
          <Modal.Title>Update Expenses Form</Modal.Title>
        </Modal.Header>
        <Modal.Body style={style}>
          <Form>
            <Form.Group className="mb-3">
              <label className="my-2" htmlFor="">
                Detail {updateRow.detail}
              </label>
              <Form.Control style={fStyle}
                type="text"
                name="detail"
                onChange={onChange}
                autoComplete="off"
              />

              <label className="my-2" htmlFor="">
                Price {updateRow.price}
              </label>
              <Form.Control style={fStyle}
                type="number"
                name="price"
                onChange={onChange}
                autoComplete="off"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={style}>
          <Button variant="success" onClick={handleUpdate}>
            {loader ? (
              <center>
                <LoadingSpin />
              </center>
            ) : (
              "Save Changes"
            )}
          </Button>
          <Button variant="success" onClick={handleDelete}>
            {loader ? (
              <center>
                <LoadingSpin />
              </center>
            ) : (
              deleteConfrim
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateExpense;
