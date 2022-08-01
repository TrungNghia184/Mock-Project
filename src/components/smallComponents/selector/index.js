import {
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleBreakpoints } from "@mui/system";
import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import "../../../i18n"
import "./index.scss";
import "./index.scss";

export default function Selector({ value, handleOnChange }) {
  const selectedLanguage = useSelector((state) => state.global.language);
  const [language, setLanguage] = useState("en");
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState("");
  useEffect(() => {
    fetch("https://api.covid19api.com/countries")
      .then((result) => result.json())
      .then((data) => setCountries(data));
  }, []);
  return (
    <div className="selectorContainer">
      <FormControl>
        <NativeSelect
          value={value}
          onChange={handleOnChange}
          inputProps={{
            name: "country",
            id: "selector",
          }}
        >
          {countries.map((country) => {
            return (
              <option
                value={country.Slug.toLowerCase()}
                data-countryid={country.ISO2.toLowerCase()}
              >
                {country.Country}
              </option>
            );
          })}
        </NativeSelect>
        <FormHelperText sx={{ color: 'text.secondary' }}>{t('selectCountry')}</FormHelperText>
      </FormControl>
    </div>
  );
}
