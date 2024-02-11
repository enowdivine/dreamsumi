import React from "react";
import styles from "./OrderComplete.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const OrderComplete = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <h2>Order Complete</h2>
        <p>Thank your for your purchase 🎉</p>
        <Link to={"/orders"}>View orders</Link>
      </div>
    </div>
  );
};

export default OrderComplete;
