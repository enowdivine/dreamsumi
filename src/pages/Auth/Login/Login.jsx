import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <form>
          <h3>Login</h3>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Confirm</button>
          <div>
            <p>Don't have an account?</p>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
