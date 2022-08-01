import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import { setGlobalLoading } from "../../redux/slices/globalSlices";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./index.scss";

const DataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "country",
      filter: "agTextColumnFilter",
      filterParams: {
        debounceMs: 800,
      },
      icons: "",
    },
    { field: "cases", filter: true },
    { field: "recovered", filter: true },
    { field: "deaths", filter: true },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      floatingFilter: true,
      resizable: true,
    };
  }, []);

  const cellClickedListener = useCallback((event) => {
    let countryName = event.data.country.toLowerCase();
    let countryID = event.data?.countryInfo?.iso2.toLowerCase();
    navigate(`/country/detail/${countryName}/${countryID}`);
  }, []);

  useEffect(() => {

    fetch("https://disease.sh/v3/covid-19/countries")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);
  return (
    <div className="tableContainer">
      <h2>CovidRegional</h2>
      <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
          pagination={true}
          paginationPageSize={20}
          rowHoverHighlight={true}
          icons={rowData?.countryInfo?.flag}
          suppressSizeToFit={true}
        />
      </div>
    </div>
  );
};

export default DataTable;
