import React, { useState, useCallback } from "react";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import styles from "./styles.module.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ text }) => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);

  const REDIRECT_URI = "https://dreamsumiai.netlify.app/login";

  return (
    <div className={styles.loginContainer}>
      <div className={styles.facebook}>
        <LoginSocialFacebook
          appId={process.env.REACT_APP_FB_APP_ID || "1556270135133846"}
          // fieldsProfile={
          //     'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
          // }
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          // redirect_uri={REDIRECT_URI}
          onResolve={({ provider, data }) => {
            console.log("completed");
            localStorage.setItem("data", JSON.stringify({ provider, data }));
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <button className={styles.facebookLogin}>
            <FaFacebook />
            {"   "} {text} with Facebook
          </button>
        </LoginSocialFacebook>
      </div>

      <div className={styles.google}>
        <LoginSocialGoogle
          client_id={
            process.env.REACT_APP_GG_APP_ID ||
            "574116481630-sltoijl2j2cigt5htcm30gpv51oat5ab.apps.googleusercontent.com"
          }
          onLoginStart={onLoginStart}
          // redirect_uri={REDIRECT_URI}
          // scope="openid profile email"
          // discoveryDocs="claims_supported"
          // access_type="offline"
          onResolve={({ provider, data }) => {
            console.log("completed");
            localStorage.setItem("data", JSON.stringify({ provider, data }));
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <button className={styles.googleLogin}>
            <FcGoogle />
            {"   "}
            {text} with Google
          </button>
        </LoginSocialGoogle>
      </div>
    </div>
  );
};

export default SocialLogin;
