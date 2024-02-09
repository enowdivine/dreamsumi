import React, { useContext } from "react";
import styles from "./Styles.module.css";
import { UserContext } from "../../context/UserContext";

const Prompt1 = () => {
  const { dreamAction, setDreamAction } = useContext(UserContext);

  return (
    <div className={styles.content}>
      <div>
        <h3>
          Can you describe where and what the subject/object is doing in the
          art?
        </h3>
      </div>
      <div className={styles.inputDiv}>
        <input
          type="text"
          placeholder="Enter ..."
          value={dreamAction}
          onChange={(e) => setDreamAction(e.target.value)}
        />
      </div>
      <div className={styles.tips}>
        <p>
          Tips: Include how you envision the subjects are composed. ie. Sitting
          down? Standing up? Are they looking straight towards you or somewhere
          else?
        </p>
      </div>
    </div>
  );
};

export default Prompt1;
