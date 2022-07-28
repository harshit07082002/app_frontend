import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <ul>
        <li id="app" className="li">
          App
        </li>
        <div className="containNav">
          <Link to={"/"} className="li">
            Home
          </Link>
          <Link to={"/student"} className="li">
            Students
          </Link>
          <Link to={"/books"} className="li">
            Books
          </Link>
        </div>
      </ul>
    </header>
  );
};

export default Navbar;
