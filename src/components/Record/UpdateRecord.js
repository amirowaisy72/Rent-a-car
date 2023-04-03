import React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import contextCreator from "../context/contextCreator";
import LoadingSpin from "react-loading-spin";

const UpdateRecord = ({ modalShow, handleClose, updateRow }) => {
  // States
  const [newRow, setNewRow] = useState({
    cname: "",
    cmobile: "",
    caddress: "",
    guarantee: "",
    destination: "",
    price: "",
    hours: "",
  });
  const [deleteConfrim, setDeleteConfirm] = useState("Delete");
  const [loader, setLoader] = useState(false)

  //Context
  const context = useContext(contextCreator);
  const { updateDispatches, deleteDispatch, updateVehicleStatus, theme } = context;

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
    let newcname = "";
    let newcmobile = "";
    let newcaddress = "";
    let newguarantee = "";
    let newdestination = "";
    let newprice = "";
    let newhours = "";
    if (newRow.cname === "") {
      newcname = updateRow.cname;
    } else {
      newcname = newRow.cname;
    }
    //
    if (newRow.cmobile === "") {
      newcmobile = updateRow.cmobile;
    } else {
      newcmobile = newRow.cmobile;
    }
    //
    if (newRow.caddress === "") {
      newcaddress = updateRow.caddress;
    } else {
      newcaddress = newRow.caddress;
    }
    //
    if (newRow.guarantee === "") {
      newguarantee = updateRow.guarantee;
    } else {
      newguarantee = newRow.guarantee;
    }
    //
    if (newRow.destination === "") {
      newdestination = updateRow.destination;
    } else {
      newdestination = newRow.destination;
    }
    //
    if (newRow.price === "") {
      newprice = updateRow.price;
    } else {
      newprice = newRow.price;
    }
    //
    if (newRow.hours === "") {
      newhours = updateRow.hours;
    } else {
      newhours = newRow.hours;
    }

    await updateDispatches(
      newcname,
      newcmobile,
      newcaddress,
      newguarantee,
      newdestination,
      newprice,
      newhours,
      updateRow._id
    );
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
      await deleteDispatch(updateRow._id);
      await updateVehicleStatus(updateRow.vnumber, "Lobby");
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
          <Modal.Title>Update Record Form</Modal.Title>
        </Modal.Header>
        <Modal.Body style={style}>
          <Form>
            <Form.Group className="mb-3">
              <label className="my-2" htmlFor="">
                Customer Name {updateRow.cname}
              </label>
              <Form.Control style={fStyle}
                type="text"
                name="cname"
                onChange={onChange}
                autoComplete="off"
              />

              <label className="my-2" htmlFor="">
                Mobile Number {updateRow.cmobile}
              </label>
              <Form.Control style={fStyle}
                type="text"
                name="cmobile"
                onChange={onChange}
                autoComplete="off"
              />

              <label className="my-2" htmlFor="">
                Address {updateRow.caddress}
              </label>
              <Form.Control style={fStyle}
                type="text"
                name="caddress"
                onChange={onChange}
                autoComplete="off"
              />

              <label className="my-2" htmlFor="">
                Refference {updateRow.guarantee}
              </label>
              <Form.Control style={fStyle}
                type="text"
                name="guarantee"
                onChange={onChange}
                autoComplete="off"
              />

              <label className="my-2" htmlFor="">
                Destination {updateRow.destination}
              </label>
              <Form.Control style={fStyle}
                type="text"
                name="destination"
                onChange={onChange}
                autoComplete="off"
              />

              <label className="my-2" htmlFor="">
                Payment {updateRow.price}
              </label>
              <Form.Control style={fStyle}
                type="number"
                name="price"
                onChange={onChange}
                autoComplete="off"
              />

              <label className="my-2" htmlFor="">
                Extend Time from {updateRow.hours} Hours to ?
              </label>
              <Form.Control style={fStyle}
                type="number"
                name="hours"
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

export default UpdateRecord;
