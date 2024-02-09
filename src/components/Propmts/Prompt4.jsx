import React, { useContext } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = () => {
  const { dreamMode, setDreamMode } = useContext(UserContext);

  return (
    <div className={styles.content}>
      <div>
        <h3>Is there a mood/feeling or color pallet suits your vision?</h3>
      </div>
      <div className={styles.inputDiv}>
        <input
          type="text"
          placeholder="Enter ..."
          value={dreamMode}
          onChange={(e) => setDreamMode(e.target.value)}
        />
      </div>
      <div className={styles.tips}>
        <p>
          Tips: Choose a color scheme that resonates with your emotions. Warm
          colors like reds and yellows can convey energy and warmth, while cool
          blues and greens create a calming atmosphere.
        </p>
      </div>
    </div>
  );
};

export default Prompt1;
