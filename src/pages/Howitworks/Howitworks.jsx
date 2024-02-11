import React from "react";
import styles from "./Howitworks.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Gallery from "../../components/Gallery/Gallery";
import data from "../../data/portfolio/carousel-slider.json";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Howitworks = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.getStarted}>
            <Link to={"/"}>Get Started</Link>
          </div>
          <h3>Get started and create your own art to frame</h3>
          <div className={styles.sectionDiv}>
            <div className={styles.imageDiv}>
              <img src="/assets/howItworks/two.png" />
            </div>
            <div className={styles.contentLeft}>
              <h3>Step 1</h3>
              <p>
                Jump into our platform, have fun, and design a picture that
                speaks to you.
              </p>
            </div>
          </div>
          <div className={styles.sectionDiv}>
            <div className={styles.contentLeft}>
              <h3>Step 2</h3>
              <p>
                Pick the ideal print size for your masterpiece, and we'll bring
                it to life on museum-quality fine art paper using archival inks
              </p>
            </div>
            <div className={styles.imageDiv}>
              <img src="/assets/howItworks/one.png" />
            </div>
          </div>
          <div className={styles.sectionDiv}>
            <div className={styles.imageDiv}>
              <img src="/assets/howItworks/three.png" />
            </div>
            <div className={styles.contentLeft}>
              <h3>Step 2</h3>
              <p>
                Select from our handcrafted frames or take your unframed print
                to your local frame shop.
              </p>
            </div>
          </div>
          <h3>Create your own art now!</h3>
          <div className={styles.getStarted}>
            <Link to={"/"}>Get Started</Link>
          </div>
          <div className={styles.showGallery}>
            <Link to={"/dreams"}>Show Gallery</Link>
          </div>
          <div className={styles.gallery}>
            <Gallery images={data} />
          </div>

          <footer>
            <div className={styles.footerTop}>
              <div>
                <h3>Connect with us</h3>
                <p>Email: hello@dreamsumiai.com</p>
              </div>
              <div>
                <h3>Our Socials</h3>
                <CiFacebook size={25} />
                <FaXTwitter
                  size={25}
                  style={{
                    marginLeft: 10,
                  }}
                />

                <CiLinkedin
                  size={25}
                  style={{
                    marginLeft: 10,
                  }}
                />

                <FaInstagram
                  size={25}
                  style={{
                    marginLeft: 10,
                  }}
                />
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>Copytight {new Date().getFullYear()} &copy; Dream Sumi AI</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Howitworks;
