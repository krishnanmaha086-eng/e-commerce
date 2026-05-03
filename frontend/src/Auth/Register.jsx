import { useState } from "react";
import axios from "axios";
import styles from "./auth.module.css";

import { showToast } from "../utils/cartToast";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const res = await axios.post(
                "https://mongodb-uri-kcd5.onrender.com/api/register",
                { name, email, password }
            );

           showToast("Registered Successfully ✅");
            window.location = "/login";
        } catch (err) {
            showToast("Registration Failed ❌");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

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

                <button onClick={handleRegister}>
                    Register
                </button>

                <p>
                    Already have an account?{" "}
                    <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}