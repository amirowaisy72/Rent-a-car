import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import contextCreator from "./context/contextCreator";
import VStatus from "./homeComponents/VStatus";
//Application Update
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import CustomerHome from "./customer/CustomerHome";
//Application Update END

const Home = () => {
  //[Context state variables]
  const context = useContext(contextCreator);
  const { showUpdate, getVersion, updateLink, user } = context;
  //[Context state variables END]
  
  //[Version Controller]
  useEffect(() => {
    async function version() {
      // You can await here
      await getVersion();
      // ...
    }
    version();
  }, []);
  //[Version Controller END]

  // let style = {
  //   backgroundColor: "rgba(0, 0, 0, 0.2)",
  //   position: "absolute",
  //   left: 0,
  //   bottom: 0,
  //   right: 0,
  // };

  return (
    <>
    {/* Update Application */}
      <Modal show={showUpdate}>
        <Modal.Header>
          <Modal.Title>Update Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Dear user, it is required to please update the
            application to have a great experience of this application
          </p>
          <center>
            <Link to={updateLink}>
            <Button variant="primary">Update</Button></Link>
          </center>
        </Modal.Body>
      </Modal>
      {/* Update Application END */}

      {
        user.type !== 'CUSTOMER' ? <VStatus /> : <CustomerHome />
      }
      {/* <div style={style} className="text-center p-3 my-2">
        <small>Designed & developed by Amir Owaisy (Master)</small>
      </div> */}
    </>
  );
};

export default Home;
