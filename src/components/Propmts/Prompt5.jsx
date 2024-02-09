import React, { useContext } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = () => {
  const { aspectRatio, setAspectRatio } = useContext(UserContext);

  return (
    <div className={styles.content}>
      <div>
        <h3>Pick an Aspect Ratio Potrait</h3>
      </div>
      <div className={styles.inputDiv}>
        <input type="text" placeholder="Write your dream ..." />
      </div>
    </div>
  );
};

export default Prompt1;
