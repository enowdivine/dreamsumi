import React from "react";
import styles from "./Dreams.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import data from "../../data/portfolio/carousel-slider.json";
import row2 from "../../data/portfolio/row2.json";
import row3 from "../../data/portfolio/row3.json";
import Gallery from "../../components/Gallery/Gallery";
import GalleryLeft from "../../components/Gallery/GalleryLeft";

const Dreams = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.galleryDiv}>
          <Gallery images={data} />
        </div>
        <div className={styles.galleryDiv}>
          <GalleryLeft images={row2} />
        </div>
        <div className={styles.inputDiv}>
          <div>I want to dream of</div>
          <input type="text" placeholder="Write your dream ..." />
          <Link to="/prompts">
            <FaArrowRightLong size={24} color="grey" />
          </Link>
        </div>
        <div className={styles.galleryDiv}>
          <Gallery images={row3} />
        </div>
        <div className={styles.galleryDiv}>
          <GalleryLeft images={data} />
        </div>
      </div>
    </div>
  );
};

export default Dreams;
