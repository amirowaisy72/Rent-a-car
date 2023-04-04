import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dispatch from "./components/Dispatch";
import Home from "./components/Home";
import AllStates from "./components/context/AllStates";
import VRegistration from "./components/VRegistration";
import Record from "./components/Record";
import GetExpenses from "./components/GetExpenses";
import ExpenseRecord from "./components/ExpenseRecord";
import ThisMonth from "./components/ThisMonth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CustomerHome from "./components/customer/CustomerHome";
import { useContext, useEffect, useState } from "react";

function App() {

  return (
    <>
      <AllStates>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="" element={<Home />}></Route>

            <Route exact path="/dispatch" element={<Dispatch />}></Route>
            <Route
              exact
              path="/vregistration"
              element={<VRegistration />}
            ></Route>
            <Route exact path="/record" element={<Record />}></Route>
            <Route exact path="/getExpense" element={<GetExpenses />}></Route>
            <Route
              exact
              path="/expenseRecord"
              element={<ExpenseRecord />}
            ></Route>
            <Route exact path="/thismonth" element={<ThisMonth />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route
              exact
              path="/customer/home"
              element={<CustomerHome />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </AllStates>
    </>
  );
}

export default App;
