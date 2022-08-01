import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LineChart from "../../components/charts/lineChart";
import MapChart from "../../components/charts/mapChart";
import Selector from "../../components/smallComponents/selector";
import NumberDisplayBox from "../../components/smallComponents/numberDisplayBox";
import { setGlobalLoading } from "../../redux/slices/globalSlices";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import "../../i18n"
import "./index.scss";
export default function CountryDetail() {
  const selectedLanguage = useSelector((state) => state.global.language);
  const [language, setLanguage] = useState("en");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { countryName, countryID } = useParams();
  const [selectedCountryName, setSelectedCountryName] = useState("viet-nam");
  const [selectedCountryID, setSelectedCountryID] = useState([]);
  const [selectedCountriesData, setSelectedCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryTotalCases, setCountryTotalCases] = useState([]);
  function capitalizeCountryName(countryName) {
    let splittedCountryName = countryName.split("-");
    for (let i = 0; i < splittedCountryName.length; i++) {
      splittedCountryName[i] =
        splittedCountryName[i][0].toUpperCase() +
        splittedCountryName[i].substring(1);
    }
    return splittedCountryName.join(" ");
  }
  useEffect(() => {
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);
  useEffect(() => {
    dispatch(setGlobalLoading(true))
    setSelectedCountryID(countryID);
    setSelectedCountryName(capitalizeCountryName(countryName));
    fetch(`https://api.covid19api.com/dayone/country/${countryName}`)
      .then((result) => result.json())
      .then((data) => setSelectedCountriesData(data));
    fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`)
      .then((result) => result.json())
      .then((data) =>
        setCountryTotalCases([data.cases, data.recovered, data.deaths])
      );
      dispatch(setGlobalLoading(false));
  }, []);
  function handleOnChange(e) {
    dispatch(setGlobalLoading(true));
    setSelectedCountry(e.target.value);
    setSelectedCountryName(capitalizeCountryName(e.target.value));
    let countryID = e.target.options[e.target.selectedIndex].dataset.countryid;
    setSelectedCountryID(countryID);
    fetch(`https://disease.sh/v3/covid-19/countries/${e.target.value}`)
      .then((result) => result.json())
      .then((data) =>
        setCountryTotalCases([data.cases, data.recovered, data.deaths])
      );
    fetch(`https://api.covid19api.com/dayone/country/${e.target.value}`)
      .then((result) => result.json())
      .then((data) => setSelectedCountriesData(data));
      dispatch(setGlobalLoading(false));
  }
  return (
    <div className="countryDetail">
      <h2>{t('detailOf') + ` ${selectedCountryName}`}</h2>
      <div className="totalNumber">
        <NumberDisplayBox
          header={"Confirmed cases"}
          number={countryTotalCases[0]}
        />
        <NumberDisplayBox
          header={"Recovered cases"}
          number={countryTotalCases[1]}
        />
        <NumberDisplayBox
          header={"Deaths cases"}
          number={countryTotalCases[2]}
        />
      </div>
      <div className="lineChartAndSelector">
        <Selector handleOnChange={handleOnChange} />
        <LineChart data={selectedCountriesData} />
      </div>
      <MapChart countryID={selectedCountryID} />
    </div>
  );
}
