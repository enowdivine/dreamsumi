import React from "react";
import styles from "./Dreams.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Dreams = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>Dreams</div>
    </div>
  );
};

export default Dreams;
