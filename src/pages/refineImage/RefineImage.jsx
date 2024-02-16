import React, { useContext, useState, useEffect } from "react";
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
  const [data, setData] = useState(null);
  const [variable, setVariable] = useState(null);
  const [upscale, setUpscale] = useState(null);
  const [option, setOption] = useState(null);

  let buttons = [
    {
      id: "u1v1",
      upscale: "U1",
      variate: "V1",
    },
    {
      id: "u2v2",
      upscale: "U2",
      variate: "V2",
    },
    {
      id: "u3v3",
      upscale: "U3",
      variate: "V3",
    },
    {
      id: "u4v4",
      upscale: "U4",
      variate: "V4",
    },
  ];
  const handleSelect = (button) => {
    setUpscale(button.upscale);
    setVariable(button.variate);
    setOption(button.id);
  };

  const handler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/selected-image");
    }, 5000);
  };

  useEffect(() => {
    let _data = window.localStorage.getItem("dreamsumi");
    setData(JSON.parse(_data));
  }, []);

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
                <img src={data?.attachments[0]?.url} alt="" />
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
