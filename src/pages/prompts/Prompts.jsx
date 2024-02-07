import React from "react";
import styles from "./Prompt.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Prompt1 from "../../components/Propmts/Prompt1";

const Prompts = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div>
          <Prompt1 />
          <div className={styles.btnDiv}>
            <Link to="#">Previous</Link>
            <Link to="#">Next</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
