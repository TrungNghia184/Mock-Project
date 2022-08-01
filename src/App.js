import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
} from "react-router-dom";
import React, { createContext, Suspense, useEffect, useState } from "react";
import EntryPage from "./pages/entryPage";
import HomePage from "./pages/homePage";
import AuthRoute from "./components/authRoute";
import PrivateRoute from "./components/privateRouth";
import DarkModeSwitch from "./components/smallComponents/darkModeSwitch";
import NavBar from "./components/navBar";
import NewsPage from "./pages/newsPage";
import LoadingBackDrop from "./components/smallComponents/loadingBackdrop"
import { useTranslation } from "react-i18next";
import { loadingController } from "@ionic/core";
import CountryDetail from "./pages/countryDetail";

import "./i18n.js";
import "./App.scss";

export const ThemeManager = createContext(null);
function App() {
  const [ loading, setLoading ] = useState(false)
  const [screenSize, setScreenSize] = useState();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  const toggleLoading = () => {
    console.log('toggleLoading', loading)
    setLoading(!loading);
  };
  function getScreenSize() {
    setScreenSize(window.screen.width);
  }
  useEffect(() => {
    getScreenSize();
    window.addEventListener("resize", getScreenSize);
    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, []);
  return (
    <Suspense fallback="Loading...">
      <ThemeManager.Provider value={{ theme, toggleTheme }}>
        <ion-app id={theme}>
          <ion-content fullscreen>
            <LoadingBackDrop backdropState={loading}/>
            <NavBar />
            <DarkModeSwitch handleOnChange={toggleTheme} />
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  <AuthRoute>
                    <div className="container">
                      <EntryPage />
                      
                    </div>
                  </AuthRoute>
                }
              />
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage restricted={false} />
                  </PrivateRoute>
                }
              />
              <Route exact path="/news" element={<NewsPage />} />
              <Route
                path="/country/detail/:countryName/:countryID"
                element={<CountryDetail />}
              />
            </Routes>
          </ion-content>
        </ion-app>
      </ThemeManager.Provider>
    </Suspense>
  );
}

export default App;
