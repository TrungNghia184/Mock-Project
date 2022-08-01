import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toastController } from "https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/index.esm.js";
import "./index.scss";
import "../../i18n";

window.toastController = toastController;
export default function SignIn(props) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleUserNameChange(e) {
    setUsername(e.target.value);
  }
  function checkAuthentication(e) {
    e.preventDefault();
    let usersList = JSON.parse(localStorage.getItem("listUsers"));
    let matchedUser = usersList.filter((user) => {
      if (user.username === username && user.password === password) {
        return user;
      }
    });
    if (matchedUser.length > 0) {
      localStorage.setItem("token", true);
      navigate("/");
    } else {
      showAlert();
    }
  }
  async function showAlert() {
    const toast = await toastController.create({
      color: "danger",
      duration: 2000,
      message: "Wrong username or password",
      showCloseButton: true,
      position: "bottom",
    });
    await toast.present();
  }
  return (
    <form onSubmit={checkAuthentication}>
      <h1>{t("signIn")}</h1>
      <div className="form-group1">
        <label className="label" for="username">
          {t("username")}
        </label>
        <input
          className="input"
          type="text"
          id="username"
          onChange={handleUserNameChange}
          required
        />
      </div>
      <div className="form-group2">
        <label className="label" for="password">
          {t("password")}
        </label>
        <input
          className="input"
          type="password"
          id="passwordSignIn"
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div className="button-container">
        <button className="button" type="submit">
          {t("login")}
        </button>
      </div>
    </form>
  );
}
