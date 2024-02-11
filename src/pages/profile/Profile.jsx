import React from "react";
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <form>
            <h3>User Profile</h3>
            <div className={styles.inputDiv}>
              <label>User Email</label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <h3>Update Password</h3>
            <div className={styles.inputDiv}>
              <label>Old Password</label>
              <input type="password" placeholder="Old Password" />
            </div>
            <div className={styles.inputDiv}>
              <label>New Password</label>
              <input type="password" placeholder="New Password" />
            </div>
            <div className={styles.inputDiv}>
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm New Password" />
            </div>
            <button>Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
