import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../../../store/reducers/auth";
import { useDispatch } from "react-redux";
import SocialLogin from "../../../components/socialLogin/SocialLogin";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (email && password && confirmPassword) {
        if (password === confirmPassword) {
          setLoading(true);
          await dispatch(signup({ email, password })).then((res) => {
            if (res.meta.requestStatus === "rejected") {
              toast.error(res.payload);
              setLoading(false);
              return;
            } else {
              toast.success(res.payload.message);
              navigate("/login");
              setLoading(false);
              return;
            }
          });
        } else {
          toast.error("passwords do not match");
          return;
        }
      } else {
        toast.error("all field are required");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <form>
          <h3>Sign Up</h3>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={(e) => handleSignup(e)} disabled={loading}>
            {loading ? "Loading..." : "Confirm"}
          </button>
          <div className={styles.OR}>OR</div>
          <SocialLogin text={"Sign up"} />
          <div>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
