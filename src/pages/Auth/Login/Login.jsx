import React, { useContext, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../../store/reducers/auth";
import { UserContext } from "../../../context/UserContext";
import { useDispatch } from "react-redux";
import SocialLogin from "../../../components/socialLogin/SocialLogin";

const Login = () => {
  const { setUserToken, setAuthenticated, setUserCredit } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        setLoading(true);
        await dispatch(login({ email, password })).then((res) => {
          if (res.meta.requestStatus === "rejected") {
            toast.error(res.payload);
            setLoading(false);
            return;
          } else {
            toast.success(res.payload.message);
            setAuthenticated(true);
            setUserCredit(res.payload.credit);
            setUserToken(res.payload.token);
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
          <h3>Login</h3>
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
          <button onClick={(e) => handleLogin(e)} disabled={loading}>
            {loading ? "Loading..." : "Confirm"}
          </button>
          <div className={styles.OR}>OR</div>
          <SocialLogin text={"Login"} />
          <div>
            <p>Don't have an account?</p>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
