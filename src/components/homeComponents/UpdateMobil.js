import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import contextCreator from "../context/contextCreator";
import { Link } from "react-router-dom";
import LoadingSpin from "react-loading-spin";

const UpdateMobil = ({ modalShow, handleClose, vehicle }) => {
  //States
  const [status, setStatus] = useState({
    routeStatus: "",
    mChange: "",
  });

  //Context
  const context = useContext(contextCreator);
  const {
    updateVehicleStatus,
    updateVehicleMobil,
    deleteVehicle,
    loader,
    theme,
  } = context;
  const [deleteConfrim, setDeleteConfirm] = useState("Delete");

  //Theme
  let style = {};
  if (theme === "dark") {
    style = { background: "#1B5EA1", color: "white" };
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
    //Update Vehicle info
    let newDate = "";
    if (status.mChange === "") {
      newDate = vehicle.mChange;
    } else {
      newDate = status.mChange;
    }
    await updateVehicleMobil(vehicle.vnumber, newDate);
    handleClose();
  };

  //Delete Vehicle
  const handleDelete = async () => {
    setInterval(() => {
      setDeleteConfirm("Delete");
    }, 20000);
    if (deleteConfrim === "Delete") {
      setDeleteConfirm("Click Again");
    } else if (deleteConfrim === "Click Again") {
      setDeleteConfirm("Are You Sure?");
    } else {
      await deleteVehicle(vehicle._id);
      handleClose();
    }
  };

  //On chnage function
  const onChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const handleClick = async (vnumber) => {
    await updateVehicleStatus(vnumber, "Lobby");
    handleClose();
  };

  return (
    <div className="container">
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header style={style} closeButton>
          <Modal.Title>
            {vehicle.vname} {vehicle.vnumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={style}>
          <Form>
            <Form.Group className="mb-3">
              <label className="my-2" htmlFor="">
                Status : {vehicle.routeStatus}
              </label>
              {vehicle.routeStatus !== "Lobby" ? (
                <nav>
                  <ul className="pagination">
                    <li className="page-item">
                      <Link
                        onClick={() => {
                          handleClick(vehicle.vnumber);
                        }}
                        className="page-link"
                        to=""
                      >
                        Change Status To Lobby
                      </Link>
                    </li>
                  </ul>
                </nav>
              ) : (
                ""
              )}

              <label className="my-2" htmlFor="">
                Update Mobil Oil Change. Last Changed at {vehicle.mChange}
              </label>
              <Form.Control style={fStyle}
                type="date"
                name="mChange"
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

export default UpdateMobil;
