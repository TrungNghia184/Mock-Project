import React, { useEffect, useState } from "react";
import { IonSegment, IonSegmentButton } from "@ionic/react";
import {
  BrowserRouter as Router,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../redux/slices/globalSlices";
import { menuController } from "https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/index.esm.js";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet } from '@ionic/react';
import "./index.scss";
import "../../i18n";
window.menuController = menuController;
export default function NavBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function openMenu() {
    await menuController.open();
  }
  async function onLogout() {
    localStorage.setItem("token", false);
    navigate("/login");
    await menuController.close();
  }
  async function closeMenu() {
    await menuController.close();
  }
  function changeLanguage(e) {
    console.log(e.target.value)
    dispatch(setLanguage(e.target.value));
  }
  return (
    <nav className="navbar">
      {window.screen.width < 768 ? (
        <>
          <ion-menu side="start" content-id="main-content">
            <ion-header>
              <ion-toolbar color="primary" translucent>
                <ion-text color="white">Menu</ion-text>
              </ion-toolbar>
            </ion-header>
            <ion-content color="primary">
              <ion-list color="secondary">
                <IonSegment onIonChange={changeLanguage}>
                  <IonSegmentButton value="en">
                    <ion-label>English</ion-label>
                  </IonSegmentButton>
                  <IonSegmentButton value="vie">
                    <ion-label>Vietnamese</ion-label>
                  </IonSegmentButton>
                </IonSegment>
                <ion-item>
                  <NavLink
                    className="navbar__links"
                    to="/"
                    onClick={closeMenu}
                    end
                  >
                    <ion-icon name="home" slot="start"></ion-icon>
                    <ion-label>{t("home")}</ion-label>
                  </NavLink>
                </ion-item>
                <ion-item>
                  <NavLink
                    className="navbar__links"
                    to="/news"
                    onClick={closeMenu}
                    end
                  >
                    <ion-icon name="newspaper-outline"></ion-icon>
                    <ion-label>{t("news")}</ion-label>
                  </NavLink>
                </ion-item>
                <ion-item>
                  <NavLink
                    className="navbar__links"
                    to="/login"
                    onClick={closeMenu}
                    end
                  >
                    <ion-icon name="log-in-outline"></ion-icon>
                    <ion-label>{t("Login")}</ion-label>
                  </NavLink>
                </ion-item>
                {localStorage.getItem("token") === "true" ? (
                  <ion-item>
                    <button onClick={onLogout}>
                      <ion-icon name="log-out-outline"></ion-icon>
                      <ion-label>{t("logout")}</ion-label>
                    </button>
                  </ion-item>
                ) : (
                  <></>
                )}{" "}
              </ion-list>
            </ion-content>
          </ion-menu>
          <div class="ion-page" id="main-content">
            <ion-header>
              <ion-toolbar color="primary">
                <ion-buttons slot="start" color="dark">
                  <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-text color="white">Menu</ion-text>
              </ion-toolbar>
            </ion-header>
          </div>
        </>
      ) : (
        <>
          <NavLink className="navbar__links" to="/" end>
            {t("home")}
          </NavLink>
          <NavLink className="navbar__links" to="/news" end>
            {t("news")}
          </NavLink>
          <NavLink
            className="navbar__links"
            to="/country/detail/algeria/dz"
            end
          >
            {t("Detail")}
          </NavLink>
          {localStorage.getItem("token") !== "true" ? (
            <NavLink className="navbar__links" to="/login" end>
              {t("login")}
            </NavLink>
          ) : (
            <></>
          )}
          {localStorage.getItem("token") === "true" ? (
            <NavLink className="navbar__links logout" to="#" onClick={onLogout}>
              {t("logout")}
            </NavLink>
          ) : (
            <></>
          )}
          {/* <IonSegment class="ion-segment" onIonChange={changeLanguage}>
            <IonSegmentButton value="en">
              <ion-text>Eng</ion-text>
            </IonSegmentButton>
            <IonSegmentButton value="vie">
              <ion-text>Vie</ion-text>
            </IonSegmentButton>
          </IonSegment> */}
          <FormControl className="languageSelector">
            <InputLabel id="select-label">Language</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Language"
              onChange={changeLanguage}
            >
              <MenuItem value={`en`}>En</MenuItem>
              <MenuItem value={`vie`}>Vie</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
      {/* <NavLink className="navbar__links" to="/" end>
          Home
        </NavLink>
        <NavLink className="navbar__links" to="/news" end>
          News
        </NavLink>
        <NavLink className="navbar__links" to="/login" end>
          Sign In/ Sign Up
        </NavLink>
        {(localStorage.getItem("token") === 'true') ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <></>
        )} */}
    </nav>
  );
}
