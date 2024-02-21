import React, { useState, useContext } from "react";
import styles from "./drawerStyles.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";
import { UserContext } from "../../context/UserContext";

function MobileDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        dispatch(logout());
        setAuthenticated(false);
        navigate("/");
        window.location.reload(true);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      <button className={styles.toggleButton} onClick={toggleDrawer}>
        <GiHamburgerMenu color="white" size={24} />
      </button>

      {/* Drawer Content */}
      <div className={`${styles.drawerContainer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.drawer}>
          {/* Close Button */}
          <button className={styles.closeButton} onClick={toggleDrawer}>
            Close <IoMdClose />
          </button>

          {/* Drawer Links */}
          <ul className={styles.drawerList}>
            <li>
              <small>01.</small>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <small>02.</small>
              <Link to="/profile">PROFILE</Link>
            </li>
            <li>
              <small>03.</small>
              <Link to="/orders">ORDERS</Link>
            </li>
            <li>
              <small>04.</small>
              <Link to="/how-it-works">HOW IT WORKS</Link>
            </li>
            {authenticated ? (
              <li>
                <small>05.</small>
                <Link to="#" onClick={handleLogout}>
                  LOGOUT
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <small>05.</small>
                  <Link to="/login">LOGIN</Link>
                </li>
                <li>
                  <small>06.</small>
                  <Link to="/signup">SIGN UP</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;
