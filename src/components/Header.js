import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import contextCreator from "./context/contextCreator";

const Header = () => {
  const context = useContext(contextCreator);
  const { theme, themeChange, user, logedUser, token, tokenHandler } = context;
  let location = useLocation();
  let navigation = useNavigate();

  //Theme Changer
  const handleTheme = () => {
    themeChange();
  };

  useEffect(() => {
    async function fetchUser() {
      // You can await here
      await logedUser();
      // ...
    }
    fetchUser();
  }, []); // Or [] if effect doesn't need props or state

  //Theme Text Setter
  let themeText = "";
  if (theme === "light") {
    themeText = "Enable Eye Protection Mode";
  } else {
    themeText = "Enable Light Mode";
  }

  //Theme Styler
  let style = {};
  if (theme === "dark") {
    style = { backgroundColor: "#23272B", color: "white" };
    document.body.style = "background: #1B5EA1;";
  } else {
    style = { backgroundColor: "white", color: "black" };
    document.body.style = "background: white;";
  }

  const handleLogout = async() => {
    localStorage.removeItem("token");
    await tokenHandler("", "get")
    navigation("/login");
  };

  return (
    <>
      {token || localStorage.getItem("token") ? (
        <Navbar bg={`${theme}`} variant={`${theme}`} expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {user.name}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user.type !== "CUSTOMER" ? (
                  <>
                    {/* Forms */}
                    <NavDropdown title="Forms" id="basic-nav-dropdown">
                      <NavDropdown.Item style={style} href="#action/3.1">
                        <Nav.Link
                          style={style}
                          as={Link}
                          to="/dispatch"
                          state={{ vehicle: "" }}
                          className={
                            location.pathname === "/dispatch" ? "active" : ""
                          }
                        >
                          Dispatch Details
                        </Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item style={style} href="#action/3.2">
                        <Nav.Link
                          style={style}
                          as={Link}
                          to="/vregistration"
                          className={
                            location.pathname === "/vregistration"
                              ? "active"
                              : ""
                          }
                        >
                          Vehicle Registration
                        </Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item style={style} href="#action/3.3">
                        <Nav.Link
                          style={style}
                          as={Link}
                          to="/getExpense"
                          className={
                            location.pathname === "/getExpense" ? "active" : ""
                          }
                        >
                          Expense Form
                        </Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                    {/* Forms End */}
                    {/* Show Details Tables */}
                    <NavDropdown title="Record" id="basic-nav-dropdown">
                      <NavDropdown.Item style={style} href="#action/4.1">
                        <Nav.Link
                          style={style}
                          as={Link}
                          to="/record"
                          className={
                            location.pathname === "/record" ? "active" : ""
                          }
                        >
                          All Dispatches
                        </Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item style={style} href="#action/3.2">
                        <Nav.Link
                          style={style}
                          as={Link}
                          to="/"
                          className={
                            location.pathname === "/" ? "active" : ""
                          }
                        >
                          All Vehicles
                        </Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item style={style} href="#action/3.3">
                        <Nav.Link
                          style={style}
                          as={Link}
                          to="/expenseRecord"
                          className={
                            location.pathname === "/expenseRecord"
                              ? "active"
                              : ""
                          }
                        >
                          All Expenses
                        </Nav.Link>
                        <Nav.Link
                          style={style}
                          as={Link}
                          to="/thismonth"
                          className={
                            location.pathname === "/thismonth" ? "active" : ""
                          }
                        >
                          This Month
                        </Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  ""
                )}

                {/* Theme Switcher */}
                {token || localStorage.getItem("token") ? (
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                ) : (
                  <Nav.Link
                    style={style}
                    as={Link}
                    to="/login"
                    className={location.pathname === "/login" ? "active" : ""}
                  >
                    Login
                  </Nav.Link>
                )}

                <Nav.Link>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleTheme}
                  >
                    {themeText}
                  </button>
                </Nav.Link>
                {/* Show Details Tables End */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
