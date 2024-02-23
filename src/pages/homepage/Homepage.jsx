import React, { useContext } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { UserContext } from "../../context/UserContext";

const Homepage = () => {
  const { dream, setDream } = useContext(UserContext);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/prompts");
    }
  };

  return (
    <div className={styles.homewrapper}>
      <Navbar />
      <div className={styles.videoBackground}>
        <video autoPlay loop muted playsInline>
          <source src="/assets/videos/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div>
              <h3>I want to dream of ...</h3>
            </div>
            <form>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="Write your dream ..."
                  value={dream}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setDream(e.target.value)}
                />
                <Link to="/prompts">
                  <FaArrowRightLong size={24} color="grey" />
                </Link>
              </div>
            </form>
            <div className={styles.btnDiv}>
              <Link to="/dreams">See what other are dreaming</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
