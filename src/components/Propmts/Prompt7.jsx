import React, { useContext } from "react";
import styles from "./Styles.module.css";
import artStyles from "../../data/artStyles/styles.json";
import { UserContext } from "../../context/UserContext";
import { ThreeCircles } from "react-loader-spinner";

const Prompt1 = ({ Loading }) => {
  const { artStyle, setArtStyle } = useContext(UserContext);

  return (
    <div className={styles.content}>
      {Loading ? (
        <div className={styles.Loader}>
          <h3>Generating Image...</h3>
          <div>
            <ThreeCircles
              height="100"
              width="100"
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <h3>Choose Art Style</h3>
          </div>
          <div className={styles.artStyles}>
            {artStyles.map((style, index) => (
              <div
                onClick={() => setArtStyle(style.label)}
                key={index}
                style={{
                  backgroundImage: `url(${style.image})`,
                  opacity: artStyle === style.label ? 0.3 : 1,
                }}
                className={styles.artStyle}
              >
                <div className={styles.overlay}>
                  <p>{style.label}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Prompt1;
