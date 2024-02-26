import React, { useState, useEffect } from "react";
import styles from "./PrintOption.module.css";
import { desktopStyles, tabletStyles, mobileStyles } from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import skus from "../../data/shipping/sku.json";

const PrintOption = () => {
  const [screenSize, setScreenSize] = useState("");
  const [image, setImage] = useState("");
  const [aspectRatio, setAspectRatio] = useState("Square");
  const [sizing, setSizing] = useState(() =>
    aspectRatio === "Square" ? "12x12 / 30x30cm" : "21x29.7cm / 8.3x11.7 A4"
  );
  const [size, setSize] = useState(() =>
    aspectRatio === "Square" ? "30x30cm" : "A4"
  );
  const [color, setColor] = useState("black");
  const [mount, setMount] = useState("2.4mm");
  const [mockup, setMockup] = useState("");
  const [sku, setSKU] = useState("");

  useEffect(() => {
    let _data = window.localStorage.getItem("selectedImage");
    // setImage(_data.split("?")[0]);
    setImage(_data);
    let ratio = window.localStorage.getItem("AspectRatio");
    setAspectRatio(ratio);
  }, []);

  useEffect(() => {
    if (aspectRatio === "Square") {
      setSizing("12x12 / 30x30cm");
      setSize("30x30cm");
    } else {
      setSizing("21x29.7cm / 8.3x11.7 A4");
      setSize("A4");
    }
  }, [aspectRatio]);

  useEffect(() => {
    skus.map((item) => {
      if (item.Colour === color && item.Size === sizing && item.Mat === mount) {
        localStorage.setItem("sku", item.SKU);
        setSKU(item.SKU);
      }
    });

    localStorage.setItem("color", color);

    // Format data
    let sizeArr = sizing.split(" ");
    if (aspectRatio === "Square") {
      setSize(sizeArr[2]);
      setMockup(`${sizeArr[2]}-${color}-${mount}-${aspectRatio}.png`);
    } else {
      setSize(sizeArr[3]);
      setMockup(`${sizeArr[3]}-${color}-${mount}-${aspectRatio}.png`);
    }
  }, [sizing, color, mount, aspectRatio]);

  useEffect(() => {
    const handleScreenSizeChange = () => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        setScreenSize("mobile");
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleScreenSizeChange();
    window.addEventListener("resize", handleScreenSizeChange);

    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  }, []);

  const getStylesBasedOnScreenSize = () => {
    switch (screenSize) {
      case "mobile":
        return mobileStyles;
      case "tablet":
        return tabletStyles;
      default:
        return desktopStyles;
    }
  };

  const currentStyles = getStylesBasedOnScreenSize();

  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.formSection}>
            <div className={styles.form}>
              <div className={styles.inputDiv}>
                <p>Sizing</p>
                <select
                  value={sizing}
                  onChange={(e) => setSizing(e.target.value)}
                  required
                >
                  {aspectRatio !== "Square" && (
                    <option value="21x29.7cm / 8.3x11.7 A4">
                      21x29.7cm / 8.3x11.7 (A4)
                    </option>
                  )}
                  {aspectRatio !== "Square" && (
                    <option value="29.7x42cm / 11.7x16.5 A3">
                      29.7x42cm / 11.7x16.5 (A3)
                    </option>
                  )}
                  {aspectRatio !== "Square" && (
                    <option value="42x59.4cm / 16.5x23.4 A2">
                      42x59.4cm / 16.5x23.4 (A2)
                    </option>
                  )}

                  {aspectRatio !== "Square" && (
                    <option value="59.4x84.1cm / 23.4x33.1 A1">
                      59.4x84.1cm / 23.4x33.1 (A1)
                    </option>
                  )}
                  {aspectRatio === "Square" && (
                    <option value="12x12 / 30x30cm"> 12x12 / 30x30cm</option>
                  )}
                  {aspectRatio === "Square" && (
                    <option value="16x16 / 40x40cm">16x16 / 40x40cm</option>
                  )}
                  {aspectRatio === "Square" && (
                    <option value="20x20 / 50x50cm">20x20 / 50x50cm</option>
                  )}
                  {aspectRatio === "Square" && (
                    <option value="24x24 / 60x60cm"> 24x24 / 60x60cm</option>
                  )}
                </select>
              </div>
              <div className={styles.inputDiv}>
                <p>Color</p>
                <select
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  required
                >
                  <option value="natural">Natural</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                </select>
              </div>
              <div className={styles.inputDiv}>
                <p>Frame</p>
                <select
                  onChange={(e) => setMount(e.target.value)}
                  value={mount}
                  required
                >
                  <option value="2.4mm">Mount</option>
                  <option value="No-Mount">No Mount</option>
                </select>
              </div>
              <div className={styles.infoMt}>
                <p>SKU</p>
                <p>{sku}</p>
                <p className={styles.danger}>{mockup}</p>
              </div>
            </div>
          </div>
          <div className={styles.displaySection}>
            <div
              className={styles.image}
              style={{
                height: "70vh",
                backgroundImage: `url('/assets/mockup/${mockup}')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <img
                style={currentStyles[`${size}-${mount}-${aspectRatio}`]}
                src={image}
                alt=""
              />
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
