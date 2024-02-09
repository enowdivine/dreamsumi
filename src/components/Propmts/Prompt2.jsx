import React, { useContext } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = () => {
  const { dreamLocation, setDreamLocation } = useContext(UserContext);

  return (
    <div className={styles.content}>
      <div>
        <h3>Where do you see your artwork taking place?</h3>
      </div>
      <div className={styles.inputDiv}>
        <input
          type="text"
          placeholder="Enter ..."
          value={dreamLocation}
          onChange={(e) => setDreamLocation(e.target.value)}
        />
      </div>
      <div className={styles.tips}>
        <p>
          Tips: Imagine the environment where your artwork unfolds. Picture a
          bustling cityscape, a tranquil beach, or a magical forest. Don’t
          forget to include the time of day if this is an outdoor location!
        </p>
      </div>
    </div>
  );
};

export default Prompt1;
