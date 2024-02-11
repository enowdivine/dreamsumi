import React from "react";
import styles from "./Orders.module.css";
import Navbar from "../../components/Navbar/Navbar";
import TableComponent from "../../components/Table/Table";

const Orders = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <TableComponent />
        </div>
      </div>
    </div>
  );
};

export default Orders;
