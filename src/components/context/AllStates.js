import React, { useState } from "react";
import { useEffect } from "react";
import context from "./contextCreator";
import CustomerHome from "../customer/CustomerHome";
import VStatus from "../homeComponents/VStatus";

const AllStates = (props) => {
  //Info
  //Tesseract to read image
  //States
  const [vStatus, setVStatus] = useState([]);
  const [dispatch, setDispatch] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loader, setLoader] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState({});
  const [home, setHome] = useState("")
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateLink, setUpdateLink] = useState("");
  const [token, setToken] = useState(null);
  // const host = "http://localhost:5000/";
  const host = "https://fluffy-cod-leather-jacket.cyclic.app/";

  //App.js
  //dispatchComponent => CustomerDetails
  //dispatchComponent => Price
  //dispatchComponent => VehicleDetails
  //auth => Login
  //auth => Register

  //Update Controller
  //Get from backend
  const frontEndVersion = 3;
  const getVersion = async () => {
    // //Api Call
    const response = await fetch(`${host}version`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const backendVersion = json.version;
    const link = json.link;
    if (frontEndVersion < backendVersion) {
      setShowUpdate(true);
      setUpdateLink(link);
    }
    //
  };

  //Token
  const tokenHandler = (token, method) => {
    if (method === "set") {
      setToken(token);
    } else {
      setToken(null);
    }
    // console.log(token)
  };

  //Get Logged in user detail
  const logedUser = async () => {
    setHome('')
    //Api Call
    if (localStorage.getItem("token")) {
      const response = await fetch(`${host}auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (json.success) {
        setTheme(json.user.theme);
        setUser(json.user);
        if(json.user.type === 'CUSTOMER'){
          setHome(<CustomerHome />)
        }else{
          setHome(<VStatus />)
        }
      } else {
        // console.log(json.reason);
      }
    } else {
      console.log("User can not be fetched");
    }
  };

  //Theme Switcher
  const themeChange = async () => {
    let newTheme = "";
    if (theme === "dark") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }
    //Api Call
    const response = await fetch(`${host}auth/updateuser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ newTheme }),
    });
    const json = await response.json();

    //Change in Client
    setTheme(newTheme);
  };
  //Getting all Initial Data
  //Get all Data from Expenses Table DONE
  const allExpenses = async () => {
    setLoader(true);
    const response = await fetch(`${host}expenses/readall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setLoader(false);
    setExpenses(json);
  };

  //Get all Data from Vehicle Status Table DONE
  const allVehicles = async () => {
    setLoader(true);
    const response = await fetch(`${host}vehicles/readall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setLoader(false);
    setVStatus(json);
  };

  //Get all Data from Dispatch Table DONE
  const allDispatches = async () => {
    setLoader(true);
    const response = await fetch(`${host}dispatches/readall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setLoader(false);
    setDispatch(json);
  };

  //All Insertions/Updations
  //Vehicles Registration DONE
  const vRegistration = async (vname, vnumber, routeStatus, mChange) => {
    setLoader(true);
    //API Call
    const response = await fetch(`${host}vehicles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ vname, vnumber, routeStatus, mChange }),
    });
    const json = await response.json();
    setLoader(false);
    setVStatus(vStatus.concat(json.vehicles));
    return json.success;
  };

  //Insert data into Expenses Table DONE
  const expenseCreate = async (detail, price) => {
    setLoader(true);
    //API Call
    const response = await fetch(`${host}expenses/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ detail, price }),
    });
    const json = await response.json();
    setLoader(false);
    setExpenses(expenses.concat(json.expenses));
  };

  //Insert data into Dispatch table DONE
  const addDispatch = async (
    cname,
    idcard,
    cmobile,
    caddress,
    guarantee,
    vnumber,
    destination,
    hours,
    price
  ) => {
    //API Call
    const response = await fetch(`${host}dispatches/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        cname,
        idcard,
        cmobile,
        caddress,
        guarantee,
        vnumber,
        destination,
        hours,
        price,
      }),
    });
    const json = await response.json();
    setDispatch(dispatch.concat(json.dispatches));
    return json.success;
  };

  //Update vehicles Status DONE
  const updateVehicleStatus = async (vnumber, routeStatus) => {
    //API Call
    const response = await fetch(`${host}vehicles/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vnumber, routeStatus }),
    });
    // const json = await response.json();

    //Edit in client
    let neData = await JSON.parse(JSON.stringify(vStatus));
    for (let index = 0; index < neData.length; index++) {
      const element = neData[index];
      if (element.vnumber === vnumber) {
        neData[index].routeStatus = routeStatus;
        break;
      }
    }
    setVStatus(neData);
  };

  //Update vehicles Mobile Oil DONE
  const updateVehicleMobil = async (vnumber, mChange) => {
    setLoader(true);
    //API Call
    const response = await fetch(`${host}vehicles/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vnumber, mChange }),
    });
    // const json = await response.json();
    setLoader(false);

    //Edit in client
    let neData = await JSON.parse(JSON.stringify(vStatus));
    for (let index = 0; index < neData.length; index++) {
      const element = neData[index];
      if (element.vnumber === vnumber) {
        neData[index].mChange = mChange;
        break;
      }
    }
    setVStatus(neData);
  };

  //Update Dispatch table DONE
  const updateDispatches = async (
    cname,
    cmobile,
    caddress,
    guarantee,
    destination,
    price,
    hours,
    id
  ) => {
    setLoader(true);
    //API Call
    const response = await fetch(`${host}dispatches/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cname,
        cmobile,
        caddress,
        guarantee,
        destination,
        price,
        hours,
        id,
      }),
    });
    // const json = await response.json();
    setLoader(false);
    //Update Client Side
    let neData = await JSON.parse(JSON.stringify(dispatch));
    for (let index = 0; index < neData.length; index++) {
      const element = neData[index];
      if (element._id === id) {
        neData[index].cname = cname;
        neData[index].cmobile = cmobile;
        neData[index].caddress = caddress;
        neData[index].guarantee = guarantee;
        neData[index].destination = destination;
        neData[index].price = price;
        neData[index].hours = hours;
        break;
      }
    }
    setDispatch(neData);
  };

  //Update Expense table DONE
  const updateExpense = async (detail, price, id) => {
    //API Call
    const response = await fetch(`${host}expenses/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        detail,
        price,
        id,
      }),
    });
    // const json = await response.json();
    //Edit in client
    let neData = await JSON.parse(JSON.stringify(expenses));
    for (let index = 0; index < neData.length; index++) {
      const element = neData[index];
      if (element._id === id) {
        neData[index].detail = detail;
        neData[index].price = price;
        break;
      }
    }
    setExpenses(neData);
  };

  // // Search Vehicle number DONE
  // const searchVNum = (keyword) => {
  //   //To Do
  // };

  // Search AllDispatches. (General Search) number DONE
  const searchDispatches = async (keyword) => {
    setLoader(true);
    //API Call
    const response = await fetch(`${host}dispatches/general`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ keyword }),
    });
    const json = await response.json();
    setLoader(false);
    setDispatch(json);
  };

  //Delete Vehicle DONE
  const deleteVehicle = async (id) => {
    setLoader(true);
    //Delete in Database
    //API Call
    const response = await fetch(`${host}vehicles/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    // const json = await response.json();
    setLoader(false);

    //Delete in clinet
    //Delete Clinet side
    const newData = vStatus.filter((v) => {
      return v._id !== id;
    });
    setVStatus(newData);
  };

  //Delete Dispatch Row DONE
  const deleteDispatch = async (id) => {
    //API Call
    const response = await fetch(`${host}dispatches/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    // const json = await response.json();

    //Delete in clinet
    //Delete Clinet side
    const newData = dispatch.filter((d) => {
      return d._id !== id;
    });
    setDispatch(newData);
  };

  //Delete Expense Row DONE
  const deleteExpense = async (id) => {
    //API Call
    const response = await fetch(`${host}expenses/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    // const json = await response.json();

    //Delete in clinet
    //Delete Clinet side
    const newData = expenses.filter((d) => {
      return d._id !== id;
    });
    setExpenses(newData);
  };

  //Customers
  const [shops, setShops] = useState([]);

  //Get All Rent A Car Shops
  const getShops = async () => {
    //API Call
    const response = await fetch(`${host}auth/getallShops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // setLoader(false);
    if (json.success) {
      setShops(json.business);
    } else {
      alert(json.reason);
    }
  };

  //Get All Cars of a shop
  const totalCars = async (id) => {
    // // API Call
    // console.log(id)
    // const response = await fetch(`${host}vehicles/readVehiclesOfShop/${id}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // return "hello"
  };

  return (
    <>
      <context.Provider
        value={{
          user,
          dispatch,
          vStatus,
          expenses,
          loader,
          theme,
          shops,
          showUpdate,
          updateLink,
          token,
          home,
          allVehicles,
          allDispatches,
          allExpenses,
          addDispatch,
          updateVehicleStatus,
          updateVehicleMobil,
          vRegistration,
          expenseCreate,
          deleteVehicle,
          updateDispatches,
          updateExpense,
          deleteDispatch,
          deleteExpense,
          searchDispatches,
          themeChange,
          logedUser,
          getShops,
          totalCars,
          getVersion,
          tokenHandler,
        }}
      >
        {props.children}
      </context.Provider>
    </>
  );
};

export default AllStates;
