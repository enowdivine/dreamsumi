import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { userCredit, authenticated } = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
      <div className={styles.brand}>
        <Link to="/">Dream Sumi</Link>
      </div>
      <div className={styles.links}>
        <div>
          <Link to="/how-it-works">How it works</Link>
        </div>
        {authenticated ? (
          <>
            <div className={styles.profileImg}>
              <Dropdown />
            </div>
            <div>
              <Link to="#">Credits: {userCredit}</Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/signup">Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
