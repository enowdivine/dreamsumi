import React, { useContext, useState } from "react";
import styles from "./PrintOption.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const image = "/assets/demo/image1.jpeg";

const PrintOption = () => {
  const { selectedImage } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.formSection}>
            <div className={styles.form}>
              <div className={styles.inputDiv}>
                <p>Sizing</p>
                <select>
                  <option>one</option>
                  <option>two</option>
                </select>
              </div>
              <div className={styles.inputDiv}>
                <p>Color</p>
                <select>
                  <option>one</option>
                  <option>two</option>
                </select>
              </div>
              <div className={styles.inputDiv}>
                <p>Frame</p>
                <select>
                  <option>one</option>
                  <option>two</option>
                </select>
              </div>
              <div className={styles.infoMt}>
                <p>SKU</p>
                <p>GLOBAL-CFPM-A4</p>
                <p className={styles.danger}>A4-black-2.4mm-Landscape.png</p>
              </div>
            </div>
          </div>
          <div className={styles.displaySection}>
            <div
              className={styles.image}
              style={{
                height: "70vh",
                backgroundImage: `url('/assets/mockup/30x30cm-black-2.4mm-square.png')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                // position: "relative",
              }}
            >
              <img />
            </div>
            <div className={styles.btns}>
              <Link to={"/selected-image"}>Back</Link>
              <Link to={"/checkout"}>Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintOption;
