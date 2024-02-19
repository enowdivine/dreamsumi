import React, { useContext, useEffect } from "react";
import styles from "./SelectedImage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const SelectedImage = () => {
  const { selectedImage, setSelectedImage } = useContext(UserContext);

  useEffect(() => {
    let _data = window.localStorage.getItem("selectedImage");
    setSelectedImage(_data);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h3>Selected Image</h3>
          <div className={styles.imgDiv}>
            <img src={selectedImage} alt="" />
          </div>
          <div className={styles.btns}>
            <Link to={"/refine-image"}>Go Back</Link>
            <Link to={"/print-options"}>Proceed to print options</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedImage;
