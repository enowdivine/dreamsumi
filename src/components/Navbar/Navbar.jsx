import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.brand}>
        <Link to="/">Dream Sumi</Link>
      </div>
      <div className={styles.links}>
        <div>
          <Link to="/how-it-works">How it works</Link>
        </div>
        <div className={styles.profileImg}>
          <Dropdown />
        </div>
        <div>
          <Link to="#">Credits:</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
