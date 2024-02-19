import React, { useContext, useState, useEffect } from "react";
import styles from "./RefineImage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  checkProgress,
  upscaleImage,
  variateImage,
} from "../../store/reducers/app";

const RefineImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setSelectedImage } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [variable, setVariable] = useState(null);
  const [upscale, setUpscale] = useState(null);
  const [option, setOption] = useState(null);
  const [selected, setSelected] = useState(false);

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

  const iLike = async () => {
    try {
      if (!option) {
        toast.error("Select an image");
        return;
      }
      setLoading(true);
      setSelected(true);
      await dispatch(
        upscaleImage({
          button: upscale,
          jobId: data.jobid,
        })
      ).then((result) => {
        if (result) {
          setInterval(async () => {
            await dispatch(checkProgress(result.payload.jobid)).then(
              (_result) => {
                if (_result.payload.status === "completed") {
                  window.localStorage.setItem(
                    "jobId",
                    JSON.stringify(_result.payload.jobid)
                  );
                  setSelectedImage(_result.payload.attachments[0].url);
                  window.localStorage.setItem(
                    "selectedImage",
                    _result.payload.attachments[0].url
                  );
                  setSelected(false);
                  navigate("/selected-image");
                  return;
                }
                if (
                  _result.payload.status === "failed" ||
                  _result.payload.status === "cancelled"
                ) {
                  toast.error("Something went wrong!!");
                  setLoading(false);
                  return;
                }
              }
            );
          }, 2000);
        } else {
          toast.error("Something went wrong!!");
          setLoading(false);
          return;
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  const iRefine = async () => {
    if (!option) {
      toast.error("Select an image");
      return;
    }
    setLoading(true);
    await dispatch(
      variateImage({
        button: variable,
        jobId: data.jobid,
      })
    ).then((result) => {
      if (result) {
        setInterval(async () => {
          await dispatch(checkProgress(result.payload.jobid)).then(
            (_result) => {
              if (_result.payload.status === "completed") {
                window.localStorage.setItem(
                  "dreamsumi",
                  JSON.stringify(_result.payload)
                );
                window.location.reload();
              }
              if (
                _result.payload.status === "failed" ||
                _result.payload.status === "cancelled"
              ) {
                toast.error("Something went wrong!!");
                setLoading(false);
                return;
              }
            }
          );
        }, 2000);
      } else {
        toast.error("Something went wrong!!");
        setLoading(false);
        return;
      }
    });
  };

  const iDislike = () => {
    navigate("/prompts");
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
            {selected ? "Refining selected image ..." : " Generating image..."}
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
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexWrap: "wrap",
                    height: "50%",
                    width: "50%",
                  }}
                >
                  {buttons.map((button, index) => (
                    <div
                      onClick={() => handleSelect(button)}
                      key={index}
                      style={{
                        height: "300px",
                        width: "300px",
                        backgroundColor: button.id === option ? "grey" : "",
                        opacity: 0.5,
                      }}
                    ></div>
                  ))}
                </div>
                <img src={data?.attachments[0]?.url} alt="" />
              </div>

              <div className={styles.btns}>
                <button onClick={iLike}>I really like this selection</button>
                <button onClick={iRefine}>
                  I like this selection but it can be refined
                </button>
                <button onClick={iDislike}>
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
