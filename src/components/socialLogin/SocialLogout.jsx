import React, { useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { gapi } from "gapi-script";
import { GoogleLogout } from "react-google-login";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/reducers/auth";
import { useDispatch } from "react-redux";

const googleId =
  "574116481630-sltoijl2j2cigt5htcm30gpv51oat5ab.apps.googleusercontent.com";

const SocialLogout = ({ text }) => {
  const { setUserToken, setAuthenticated, setUserCredit, setSocialProvider } =
    useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: googleId,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onGoogleSuccess = (res) => {
    console.log(res);
    dispatch(logout());
    setUserToken("");
    setUserCredit("");
    setSocialProvider("");
    setAuthenticated(false);
    navigate("/");
    window.location.reload(true);
    toast.success("Logout success");
  };

  return (
    <div className={styles.loginContainer}>
      {/* <div className={styles.facebookDiv}>
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
      </div> */}

      <div className={styles.googleDiv}>
        <GoogleLogout
          clientId={googleId}
          onLogoutSuccess={onGoogleSuccess}
          render={(renderProps) => (
            <Link
              to={"#"}
              className={styles.googleLogout}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {text}
            </Link>
          )}
        />
      </div>
    </div>
  );
};

export default SocialLogout;
