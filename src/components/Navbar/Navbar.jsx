import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { UserContext } from "../../context/UserContext";
import MobileDrawer from "../MobileDrawer/MobileDrawer";

const Navbar = () => {
  const { userCredit, authenticated } = useContext(UserContext);
  return (
    <div className={`${styles.wrapper}`}>
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
            <div className={styles.credits}>
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
      <div className={styles.mobileIcon}>
        <MobileDrawer />
      </div>
    </div>
  );
};

export default Navbar;
