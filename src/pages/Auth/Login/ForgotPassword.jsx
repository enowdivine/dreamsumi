import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../../../store/reducers/auth";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      if (email) {
        setLoading(true);
        await dispatch(forgotPassword({ email })).then((res) => {
          if (res.meta.requestStatus === "rejected") {
            toast.error(res.payload);
            setLoading(false);
            return;
          } else {
            toast.success(res.payload.message);
            navigate("/");
            setLoading(false);
            return;
          }
        });
      } else {
        toast.error("all field are required");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <form>
          <h3>Enter email</h3>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={(e) => handleForgotPassword(e)} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
          <div>
            <p>Remember account?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
