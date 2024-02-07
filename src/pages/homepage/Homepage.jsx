import React from "react";
import styles from "./Homepage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div>
            <h3>I want to dream of ...</h3>
          </div>
          <div className={styles.inputDiv}>
            <input type="text" placeholder="Write your dream ..." />
            <Link to="/prompts">
              <FaArrowRightLong size={24} color="grey" />
            </Link>
          </div>
          <div className={styles.btnDiv}>
            <Link to="/dreams">See what other are dreaming</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
