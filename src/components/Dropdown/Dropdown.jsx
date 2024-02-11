import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
