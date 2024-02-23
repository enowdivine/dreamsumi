import React, { useContext, useEffect } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = () => {
  const { dream, setDream, setGeneratingImage } = useContext(UserContext);

  useEffect(() => {
    setGeneratingImage(false);
  }, []);
  return (
    <div className={styles.content}>
      <div>
        <h3>
          What objects, people, or animals do you envision as the main focus of
          your artwork?
        </h3>
      </div>
      <div className={styles.inputDiv}>
        <input
          type="text"
          placeholder="Enter ..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
        />
      </div>
      <div className={styles.tips}>
        <p>
          Tips: Consider the main focus of your artwork. If it's a nature scene,
          think about trees, mountains, or animals. For a portrait, decide on
          the person or object you want to emphasize.
        </p>
        <p>
          Try and be as specific if you can. Eg. “An orange british short hair
          cat” instead of just “cat”
        </p>
      </div>
    </div>
  );
};

export default Prompt1;
