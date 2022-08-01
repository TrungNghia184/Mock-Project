import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { toastController } from "https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/index.esm.js";
import "./index.scss";
import "../../i18n"
import { useTranslation } from "react-i18next";
window.toastController = toastController;

export default function SignUp(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([
    {
      username: "admin",
      password: "admin",
    },
  ]);
  async function showAlert(color, message) {
    const toast = await toastController.create({
      color: `${color}`,
      duration: 2000,
      message: `${message}`,
      showCloseButton: true,
      position: "bottom",
    });
    await toast.present();
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Username must have more than 2 characters!")
        .max(15, "Username must have less than 16 characters!")
        .label("Full Name")
        .matches(
          /^[a-z]+$/,
          "Your username must only contains lowercase letters"
        )
        .required('Username is a required field'),
      password: Yup.string()
        .min(3, "Password must have more than 2 characters!")
        .max(15, "Password must have less than 16 characters!")
        .required('Password is a required field')
        .matches(
          /(?=.*[a-z])[a-zA-Z]/,
          "Your password must contains atleast 1 letter"
        )
        .matches(
          /(?=.*[0-9])/,
          "Your password must contains atleast 1 number"
        )
    }),
    onSubmit: function (values) {
      let newUser = { username: values.name, password: values.password };
      const checkForMatchedUser = function () {
        let matchedUser = usersList.filter(
          (user) => user.username === newUser.username
        );
        if (matchedUser.length > 0) {
          showAlert("danger", "This user already exists");
        } else {
          setUsersList((usersList) => [...usersList, newUser]);
          showAlert("success", "Register successfully");
          setTimeout(() => {
            props.currentPage("signIn");
          }, 2000);
        }
      };
      checkForMatchedUser();
    },
  });
  useEffect(() => {
    localStorage.setItem("listUsers", JSON.stringify(usersList));
  }, [usersList]);
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <h1>{t('register')}</h1>
      <div className="form-inputs">
        <label for="name">{t('username')}</label>
        <input
          type="text"
          name="name"
          id="name"
          className={`block w-full rounded border py-1 px-2 ${
            formik.touched.name && formik.errors.name
              ? "border-red-400"
              : "border-gray-300"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <span className="text-red-400">{formik.errors.name}</span>
        )}
      </div>
      <div className="form-inputs">
        <label for="password">{t('password')}</label>
        <input
          type="password"
          name="password"
          id="password"
          className={`block w-full rounded border py-1 px-2 ${
            formik.touched.password && formik.errors.password
              ? "border-red-400"
              : "border-gray-300"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-red-400">{formik.errors.password}</span>
        )}
      </div>
      <div className="button-container">
        <button className="button" type="submit">
          {t('signUp')}
        </button>
      </div>
    </form>
  );
}
