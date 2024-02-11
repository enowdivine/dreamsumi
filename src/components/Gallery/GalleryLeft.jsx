import React from "react";
import styles from "./Gallery.module.css";

function GalleryLeft({ images }) {
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryLeft}>
        {images.map((item, index) => (
          <div
            key={index}
            className={styles.imageContainer}
            style={{
              backgroundImage: `url(${item.background})`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <div className={styles.overlay}>
              <p>{item.art_style}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryLeft;
