import React, { useState, useContext, useEffect } from "react";
import styles from "./Dropdown.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";
import { UserContext } from "../../context/UserContext";
import SocialLogout from "../socialLogin/SocialLogout";

function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthenticated, socialProvider, setSocialProvider } =
    useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const provider = JSON.parse(
      localStorage.getItem("dreamsumiai-social-provider")
    );
    setSocialProvider(provider);
  }, []);

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

  return (
    <div className={styles.container}>
      <div className={styles.profileIcon} onClick={toggleDropdown}>
        <AiOutlineUser size={20} color="black" />
      </div>

      {isOpen && (
        <div className={styles.dropdownContent}>
          <Link to="/profile">Profile</Link>
          <Link to="/orders">Orders</Link>
          {socialProvider && socialProvider === "GOOGLE" ? (
            <Link to="#">
              <SocialLogout text={"Logout"} />
            </Link>
          ) : (
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
