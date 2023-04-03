import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerDetails from "./dispatchComponents/CustomerDetails";
import Price from "./dispatchComponents/Price";
import RouteDetails from "./dispatchComponents/RouteDetails";
import Time from "./dispatchComponents/Time";
import VehicleDetails from "./dispatchComponents/VehicleDetails";

const Dispatch = () => {
  let navigation = useNavigate();

  if (!localStorage.getItem("token")) {
    navigation("/login");
  } 
  //Vehicle carry
  const location = useLocation()
  //States
  const [dispatchDetail, setDispatchDetail] = useState({
    cname: "",
    idcard: "",
    cmobile: "",
    caddress: "",
    guarantee: "",
    vnumber: location.state ? location.state.vehicle : "",
    destination: "",
    hours: "",
    price: "",
  });

  // let style = {
  //   backgroundColor: "rgba(0, 0, 0, 0.2)",
  //   position: "absolute",
  //   left: 0,
  //   bottom: 0,
  //   right: 0,
  // };
  
  const handleChange = (value) => {
    setDispatchDetail(value);
  };

  return (
    <>
      <CustomerDetails
        handleChange={handleChange}
        dispatchDetail={dispatchDetail}
      />
      <VehicleDetails
        handleChange={handleChange}
        dispatchDetail={dispatchDetail}
      />
      <RouteDetails
        handleChange={handleChange}
        dispatchDetail={dispatchDetail}
      />
      <Time
        handleChange={handleChange}
        dispatchDetail={dispatchDetail}
      />
      <Price
        handleChange={handleChange}
        dispatchDetail={dispatchDetail}
      />
      {/* <div style={style} className="text-center p-3 my-2">
        <small>Designed & developed by Amir Owaisy (Master)</small>
      </div> */}
    </>
  );
};

export default Dispatch;
