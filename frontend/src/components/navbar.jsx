import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import githubLogo from "../assets/github-mark-white.svg";

const Navbar = () => {
  return (
    <nav id="navbar">
      <Link to="/">
        <div>
          <img src={githubLogo} alt="GitHub Logo" id="logo" />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
