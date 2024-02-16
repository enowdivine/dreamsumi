import React, { useState, useContext } from "react";
import styles from "./Prompt.module.css";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import Prompt1 from "../../components/Propmts/Prompt1";
import Prompt2 from "../../components/Propmts/Prompt2";
import Prompt3 from "../../components/Propmts/Prompt3";
import Prompt4 from "../../components/Propmts/Prompt4";
import Prompt5 from "../../components/Propmts/Prompt5";
import Prompt6 from "../../components/Propmts/Prompt6";
import Prompt7 from "../../components/Propmts/Prompt7";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserContext } from "../../context/UserContext";
import { generateImage, checkProgress } from "../../store/reducers/app";

const Prompts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    generatingImage,
    setGeneratingImage,
    generatedPrompt,
    aspectRatio,
    artStyle,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
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

  const generate = async () => {
    try {
      if (!generatedPrompt) {
        toast.error("No Prompt Generated");
        return;
      }
      setLoading(true);
      await dispatch(
        generateImage(
          `${generatedPrompt} with a ${artStyle} style ${
            aspectRatio === "Square"
              ? ""
              : aspectRatio === "Landscape"
              ? "--ar 141:100"
              : "--ar  100:141"
          }`
        )
      )
        .then((res) => {
          console.log(res);
          if (res.meta.requestStatus === "rejected") {
            toast.error("An error occured");
            setLoading(false);
            setGeneratingImage(false);
            return;
          }
          // setInterval(async () => {
          //   await dispatch(
          //     checkProgress({
          //       jobId: result.jobid,
          //       userToken,
          //     })
          //   ).then((_result) => {
          //     if (_result.status === "completed") {
          //       window.localStorage.setItem(
          //         "dreamsumi",
          //         JSON.stringify(_result)
          //       );
          //       navigate("/refine-image");
          //     }
          //     if (
          //       _result.status === "failed" ||
          //       _result.status === "cancelled"
          //     ) {
          //       toast.error("Something went wrong!!");
          //       setLoading(false);
          //     }
          //   });
          // }, 2000);
        })
        .catch((err) => {
          toast.error("Something went wrong!!");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
            <Prompt7 Loading={loading} SetLoading={setLoading} />
          )}

          <div className={styles.btnDiv}>
            <button onClick={decrementCount}>
              {count === 5 && !editPromt
                ? "Edit Prompt"
                : count === 5 && editPromt
                ? "Save Prompt"
                : "Previous"}
            </button>
            <button
              onClick={() => {
                if (count === 6) {
                  setLoading(true);
                  setGeneratingImage(true);
                  generate();
                  return;
                }
                incrementCount();
              }}
              disabled={generatingImage}
            >
              {count === 6 ? "Create Image" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
