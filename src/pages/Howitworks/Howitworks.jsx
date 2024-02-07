import React from "react";
import styles from "./Howitworks.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Howitworks = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>Howitworks</div>
    </div>
  );
};

export default Howitworks;
