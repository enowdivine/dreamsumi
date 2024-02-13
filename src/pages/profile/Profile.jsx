import React, { useContext, useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import { updateDetails } from "../../store/reducers/auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Profile = () => {
  const { userEmail, userId, userToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      if (email && password && newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
          setLoading(true);
          await dispatch(
            updateDetails({
              id: userId,
              email,
              userToken,
              newPassword,
              oldPassword: password,
              updatePassword: confirmPassword,
            })
          ).then((res) => {
            if (res.meta.requestStatus === "rejected") {
              toast.error(res.payload);
              setLoading(false);
              return;
            } else {
              toast.success(res.payload.message);
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

  useEffect(() => {
    setEmail(userEmail);
  }, []);
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <form>
            <h3>User Profile</h3>
            <div className={styles.inputDiv}>
              <label>User Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Old Password</label>
              <input
                type="password"
                placeholder="Old Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>New Password</label>
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button onClick={(e) => updateUser(e)} disabled={loading}>
              {loading ? "Loading..." : "Update Details"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
