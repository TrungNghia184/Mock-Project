import { toastController } from "@ionic/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import i18n from "i18next";
import "./index.scss";
import "../../i18n";
import DataTable from "../../components/dataTable";
import NumberDisplayBox from "../../components/smallComponents/numberDisplayBox";
import Selector from "../../components/smallComponents/selector";
import LineChart from "../../components/charts/lineChart";
import MapChart from "../../components/charts/mapChart";
import numeral from "numeral";
export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const selectedLanguage = useSelector((state) => state.global.language);
  const [totalCovidData, setTotalCovidData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState([]);
  // const [selectedCountries, setSelectedCountries] = useState("");
  const [lineChartData, setLineChartData] = useState([]);
  async function getTotalData() {
    const rawTotalData = await fetch("https://disease.sh/v3/covid-19/all");
    let refinedData = await rawTotalData.json();
    let covidTotalCases = numeral(refinedData?.cases).format("0,0");
    let covidTotalRecovered = numeral(refinedData?.recovered).format("0,0");
    let covidTotalDeaths = numeral(refinedData?.deaths).format("0,0");
    setTotalCovidData([covidTotalCases, covidTotalRecovered, covidTotalDeaths]);
  }
  useEffect(() => {
    getTotalData();
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((result) => result.json())
      .then((data) => {
        let mapData = data.map((data) => {
          return {
            key: data.countryInfo?.iso2?.toLowerCase(),
            value: data.cases,
          };
        });
        setMapData(mapData);
      })
      .catch((err) => console.error(err));
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => response.json())
      .then((response) => {
        let objToArr = Object.entries(response);
        let dateList = Object.entries(objToArr[0][1]).map((item) => item[0]);
        let confirmedCases = Object.entries(objToArr[0][1]).map(
          (item) => item[1]
        );
        let deathsCases = Object.entries(objToArr[1][1]).map((item) => item[1]);
        let recoveredCases = Object.entries(objToArr[2][1]).map(
          (item) => item[1]
        );
        let lineChartData = [];
        for (let i = 0; i < recoveredCases.length; i++) {
          lineChartData.push({
            Date: dateList[i],
            Confirmed: confirmedCases[i],
            Recovered: recoveredCases[i],
            Deaths: deathsCases[i],
          });
        }
        setLineChartData(lineChartData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);
  function handleOnCountryChange(e) {
    const countryID =
      e.target.options[e.target.selectedIndex].dataset.countryid;
    navigate(`/country/detail/${e.target.value}/${countryID}`);
  }
  return (
    <div id="homePage">
      <div className="totalNumber">
        <h2>CovidGlobal</h2>
        <img src="https://thumbs.dreamstime.com/b/coronavirus-covid-icon-symbol-logo-earth-symbol-isolated-white-vector-illustration-coronavirus-covid-symbol-logo-icon-175369789.jpg"/>
        <div className="totalNumber__each">
          <NumberDisplayBox
            header={t('confirmed')}
            number={totalCovidData[0]}
          />
          <NumberDisplayBox
            header={t('recovered')}
            number={totalCovidData[1]}
          />
          <NumberDisplayBox
            header={t('deaths')}
            number={totalCovidData[2]}
          />
        </div>
      </div>
      <div className="countryNumber">
        <div>
          <h3>{t('goToCountryDetail')}</h3>
          <Selector
            countries={countries}
            handleOnChange={handleOnCountryChange}
          />
        </div>
        <DataTable />
      </div>
      <div className="totalChart" id="chartContainer">
        <h3>{t('chartData')}</h3>
        <LineChart data={lineChartData} />
        <hr></hr>
        <MapChart isGlobal={"true"} inputData={mapData} />
      </div>
    </div>
  );
}

// const columnDefs = ;
