import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../../components/signInForm";
import SignUp from "../../components/signUpForm";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import "../../i18n"
import "./index.scss";


export default function EntryPage() {
  const { t } = useTranslation();
  const [signInOrSignUp, setSignInOrSignUp] = useState("signUp");
  const [language, setLanguage] = useState("en");
  const selectedLanguage = useSelector((state) => state.global.language);
  function setSignIn() {
    setSignInOrSignUp("signIn");
    let selectedDOM = document.getElementById("welcome-form");
    selectedDOM.classList.remove("toLeft");
    selectedDOM.classList.add("toRight");
  }
  function setSignUp() {
    setSignInOrSignUp("signUp");
    let selectedDOM = document.getElementById("welcome-form");
    selectedDOM.classList.remove("toRight");
    selectedDOM.classList.add("toLeft");
  }
  useEffect(() => {
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);
  return (
    <Suspense fallback="Loading...">
      <div className="formContainer" id="welcome-form">
        <div className="absolute-welcome-left">
          <h1>{t("welcomeTo")}</h1>
          <p>
            {t('welcomeSignUp')}
          </p>
        </div>
        <div className="absolute-welcome-right">
          <h1>{t('welcomeBack')}</h1>
          <p>{t('welcomeSignIn')}</p>
        </div>
        <div className="formContainer__welcome">
          <div className="formContainer__welcome--content">
            {signInOrSignUp === "signIn" ? (
              <>
                <button
                  className="nav-button signup-button"
                  onClick={setSignUp}
                >
                  {t('signUp')}
                </button>
              </>
            ) : (
              <>
                <button
                  className="nav-button signin-button"
                  onClick={setSignIn}
                >
                  {t('signIn')}
                </button>
              </>
            )}
          </div>
        </div>
        {signInOrSignUp === "signIn" ? (
          <SignIn />
        ) : (
          <SignUp currentPage={setSignInOrSignUp} />
        )}
      </div>
    </Suspense>
  );
}

{
  /* <div className="button-container">
        <button
          className="nav-button signin-button"
          onClick={setSignIn}
          style={signInOrSignUp === "signIn" ? clickedButtonStyle : {}}
        >
          Sign In
        </button>
        <button
          className="nav-button signup-button"
          onClick={setSignUp}
          style={signInOrSignUp === "signUp" ? clickedButtonStyle : {}}
        >
          Sign Up
        </button>
      </div>
      {window.screen.width < 769 ? (
        <></>
      ) : (
        <div className="welcome-container">
          <div className="welcome-message">
            <p className="welcome-title">Welcome to&nbsp;</p>
            <p className="page-name">CovidGlobal</p>
            <p className="page-missions">
              Our missions is to inform you the latest news about Covid-19
              around the world and best analytical data about the destruction of
              the virus.
            </p>
          </div>
        </div>
      )}
      {signInOrSignUp === "signIn" ? (
        <SignIn />
      ) : (
        <SignUp currentPage={setSignInOrSignUp} />
      )} */
}
