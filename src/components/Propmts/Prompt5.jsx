import React, { useContext } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = () => {
  const { aspectRatio, setAspectRatio } = useContext(UserContext);

  const updateAspectRation = (text) => {
    setAspectRatio(text);
    localStorage.setItem("AspectRatio", text);
  };

  return (
    <div className={styles.content}>
      <div>
        <h3>Pick an Aspect Ratio Potrait</h3>
      </div>
      <div className={styles.aspectRatio}>
        <div
          style={{
            background: aspectRatio === "Portrait" ? "#aaa" : "#fff",
          }}
          className={styles.portrait}
          onClick={() => updateAspectRation("Portrait")}
        >
          Potrait
        </div>
        <div
          style={{
            background: aspectRatio === "Landscape" ? "#aaa" : "#fff",
          }}
          className={styles.landscape}
          onClick={() => updateAspectRation("Landscape")}
        >
          Landscape
        </div>
        <div
          style={{
            background: aspectRatio === "Square" ? "#aaa" : "#fff",
          }}
          className={styles.square}
          onClick={() => updateAspectRation("Square")}
        >
          Square
        </div>
      </div>
    </div>
  );
};

export default Prompt1;
