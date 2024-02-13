import React, { useContext, useState } from "react";
import styles from "./SelectedImage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const image = "/assets/demo/image1.jpeg";

const SelectedImage = () => {
  const { selectedImage } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h3>Selected Image</h3>
          <div className={styles.imgDiv}>
            <img src={image} alt="" />
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
