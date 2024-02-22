import React, { useState, useContext } from "react";
import styles from "./Dropdown.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";
import { UserContext } from "../../context/UserContext";
// import { GoogleLogout } from "react-google-login";

// const googleId =
//   "574116481630-sltoijl2j2cigt5htcm30gpv51oat5ab.apps.googleusercontent.com";

function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
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

  // const onGoogleSuccess = (res) => {
  //   console.log(res);
  // };

  // const onGoogleFailure = (res) => {
  //   console.log("Failed", res);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.profileIcon} onClick={toggleDropdown}>
        <AiOutlineUser size={20} color="black" />
      </div>

      {isOpen && (
        <div className={styles.dropdownContent}>
          <Link to="/profile">Profile</Link>
          <Link to="/orders">Orders</Link>
          <Link to="#" onClick={handleLogout}>
            Logout
          </Link>
          {/* <GoogleLogout
            clientId={googleId}
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            render={(renderProps) => (
              // <button
              //   className={styles.googleLogin}
              //   onClick={renderProps.onClick}
              //   disabled={renderProps.disabled}
              // >
              //   <FcGoogle /> Logout
              // </button>
              <Link onClick={renderProps.onClick}>Logout</Link>
            )}
          /> */}
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
