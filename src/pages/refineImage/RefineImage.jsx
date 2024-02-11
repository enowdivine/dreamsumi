import React, { useContext, useState } from "react";
import styles from "./RefineImage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const images = [
  "/assets/demo/image1.jpeg",
  "/assets/demo/image2.jpeg",
  "/assets/demo/image3.jpeg",
  "/assets/demo/image4.jpeg",
];

const RefineImage = () => {
  const navigate = useNavigate();
  const { selectedImage, setSelectedImage } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/selected-image");
    }, 5000);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className={styles.Loader}>
          <h4>
            {selectedImage
              ? "Refining selected image ..."
              : " Generating image..."}
          </h4>
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
      ) : (
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h3>Initials Sketches of your image below</h3>
            <p>Select an image to further refine/finalise</p>
            <div className={styles.generatedSection}>
              <div className={styles.images}>
                {images.map((item, index) =>
                  index % 2 === 0 ? (
                    <div className={styles.row} key={index / 2}>
                      <img
                        src={item}
                        alt={`Image ${index}`}
                        onClick={() => setSelectedImage(index)}
                        style={{
                          border:
                            selectedImage === index ? "2px solid white" : "",
                        }}
                      />
                      {images[index + 1] && (
                        <img
                          src={images[index + 1]}
                          alt={`Image ${index + 1}`}
                          onClick={() => setSelectedImage(index + 1)}
                          style={{
                            border:
                              selectedImage === index + 1
                                ? "2px solid white"
                                : "",
                          }}
                        />
                      )}
                    </div>
                  ) : null
                )}
              </div>

              <div className={styles.btns}>
                <button onClick={handler}>I really like this selection</button>
                <button onClick={handler}>
                  I like this selection but it can be refined
                </button>
                <button onClick={handler}>
                  I don’t like these images and want to redo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefineImage;
