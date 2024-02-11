import React, { useContext, useEffect } from "react";
import styles from "./Styles.module.css";
import artStyles from "../../data/artStyles/styles.json";
import { UserContext } from "../../context/UserContext";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Prompt1 = ({ Loading, SetLoading }) => {
  const navigate = useNavigate();
  const { artStyle, setArtStyle, setGeneratingImage } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      navigate("/refine-image");
    }, 5000);
  }, []);
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
                  // backgroundImage: `url(${style.image})`,
                  opacity: artStyle === style.label ? 0.2 : 0.8,
                }}
                className={styles.artStyle}
              >
                {style.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Prompt1;
