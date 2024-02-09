import React, { useState } from "react";
import styles from "./Prompt.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Prompt1 from "../../components/Propmts/Prompt1";
import Prompt2 from "../../components/Propmts/Prompt2";
import Prompt3 from "../../components/Propmts/Prompt3";
import Prompt4 from "../../components/Propmts/Prompt4";
import Prompt5 from "../../components/Propmts/Prompt5";
import Prompt6 from "../../components/Propmts/Prompt6";
import Prompt7 from "../../components/Propmts/Prompt7";
import { useNavigate } from "react-router-dom";

const Prompts = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [editPromt, setEditPromt] = useState(false);

  const incrementCount = () => {
    if (count === 6) {
      navigate("/generate-image");
      return;
    }
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count === 0) {
      navigate("/");
      return;
    }
    if (count === 5 && !editPromt) {
      setEditPromt(true);
      return;
    }
    if (count === 5 && editPromt) {
      setEditPromt(false);
      return;
    }
    setCount(count - 1);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div>
          {count === 0 ? (
            <Prompt1 />
          ) : count === 1 ? (
            <Prompt2 />
          ) : count === 2 ? (
            <Prompt3 />
          ) : count === 3 ? (
            <Prompt4 />
          ) : count === 4 ? (
            <Prompt5 />
          ) : count === 5 ? (
            <Prompt6 edit={editPromt} />
          ) : (
            <Prompt7 />
          )}

          <div className={styles.btnDiv}>
            <button onClick={decrementCount}>
              {count === 5 && !editPromt
                ? "Edit Prompt"
                : count === 5 && editPromt
                ? "Save Prompt"
                : "Previous"}
            </button>
            <button onClick={incrementCount}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
