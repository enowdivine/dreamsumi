import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <form>
          <h3>Sign Up</h3>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button>Confirm</button>
          <div>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
