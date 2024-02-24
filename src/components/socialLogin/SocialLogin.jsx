import React, { useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../../context/UserContext";
import { useDispatch } from "react-redux";
import { google } from "../../store/reducers/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocialLogin = ({ text }) => {
  const { setUserToken, setAuthenticated, setUserCredit, setSocialProvider } =
    useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId:
          "574116481630-sltoijl2j2cigt5htcm30gpv51oat5ab.apps.googleusercontent.com",
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  });

  const onGoogleSuccess = async (res) => {
    try {
      const { email, googleId } = res.profileObj;
      await dispatch(google({ email, googleId, provider: "GOOGLE" })).then(
        (res) => {
          if (res.meta.requestStatus === "rejected") {
            toast.error(res.payload);
            return;
          } else {
            toast.success(res.payload.message);
            setAuthenticated(true);
            setUserCredit(res.payload.credit);
            setUserToken(res.payload.token);
            setSocialProvider(res.payload.provider);
            navigate("/");
            return;
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleFailure = (res) => {
    console.log("Failed", res);
  };

  const onFacebookSuccess = (res) => {
    console.log(res);
  };

  const onFacebookFailure = (res) => {
    console.log("Failed", res);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.facebookDiv}>
        <GoogleLogin
          clientId="1556270135133846"
          buttonText="Login"
          onSuccess={onFacebookSuccess}
          onFailure={onFacebookFailure}
          cookiePolicy="single_host_origin"
          isSignedIn={true}
          render={(renderProps) => (
            <button
              className={styles.facebookLogin}
              onClick={renderProps.onClick}
              // disabled={renderProps.disabled}
              disabled={true}
            >
              <FaFacebook /> {text} with Facebook
            </button>
          )}
        />
      </div>

      <div className={styles.googleDiv}>
        <GoogleLogin
          clientId="574116481630-sltoijl2j2cigt5htcm30gpv51oat5ab.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFailure}
          cookiePolicy="single_host_origin"
          isSignedIn={true}
          render={(renderProps) => (
            <button
              className={styles.googleLogin}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FcGoogle /> {text} with Google
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
