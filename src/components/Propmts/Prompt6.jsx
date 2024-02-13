import React, { useContext, useEffect } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = ({ edit }) => {
  const {
    dream,
    dreamObject,
    dreamAction,
    dreamLocation,
    dreamMode,
    artStyle,
    aspectRatio,
    generatedPrompt,
    setGeneratedPrompt,
  } = useContext(UserContext);

  const text = `${dreamObject} ${dream} ${dreamAction} in a ${dreamLocation}  with a ${dreamMode} Colour Scheme  in ${artStyle}  Style with an aspect ratio of ${aspectRatio}`;

  useEffect(() => {
    setGeneratedPrompt(text);
  }, [
    dreamObject,
    dreamAction,
    dreamLocation,
    dreamMode,
    artStyle,
    aspectRatio,
  ]);
  return (
    <div className={styles.content}>
      <div>
        <h3>Prompt Generated</h3>
      </div>
      <div className={styles.generatedPrompt}>
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
