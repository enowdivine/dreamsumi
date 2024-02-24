import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../../store/reducers/auth";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const decodedToken = decodeToken(token);
    setUserId(decodedToken.userId);
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword && password) {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        setLoading(true);
        await dispatch(
          resetPassword({ id: userId, newPassword: password })
        ).then((res) => {
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
          <h3>New password</h3>
          <input
            type="password"
            placeholder="Password"
            autoComplete={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            autoComplete={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={(e) => handleLogin(e)} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
