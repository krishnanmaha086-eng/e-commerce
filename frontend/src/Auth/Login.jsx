import { useState } from "react";
import axios from "axios";
import styles from "./auth.module.css";

import { showToast } from "../utils/cartToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        { email, password }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      showToast("Login Successfully ✅");
      window.location = "/";
    } catch (err) {
      showToast("Login Failed ❌");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <a href="/register">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}