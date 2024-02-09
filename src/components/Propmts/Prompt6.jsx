import React, { useContext } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = ({ edit }) => {
  const { generatedPrompt, setGeneratedPrompt } = useContext(UserContext);

  return (
    <div className={styles.content}>
      <div>
        <h3>Prompt Generated</h3>
      </div>
      <div>
        <p>{generatedPrompt}</p>
      </div>
      {edit && (
        <div className={styles.inputDiv}>
          <input
            type="text"
            placeholder="Enter ..."
            value={generatedPrompt}
            onChange={(e) => setGeneratedPrompt(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Prompt1;
