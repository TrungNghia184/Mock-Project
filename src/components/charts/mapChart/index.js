import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";
import { setGlobalLoading } from "../../../redux/slices/globalSlices";
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json'

highchartsMap(Highcharts);
const initOptions = {
  chart: {
    heigh: 500,

  },
  title: {
    text: "Covid Map Chart",
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  xAxis: {
    categories: [],
    crosshair: true,
  },
  color: ["#F3475B"],
  yAxis: {
    min: 0,
    title: {
      text: null,
    },
  },
  series: [
    {
      mapData: {},
      name: "Số ca nhiễm",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      joinBy: ['hc-key', 'key'],
    },
  ],
};
export default function MapChart({countryID, isGlobal, inputData}) {
  const [mapData, setMapData] = useState({})
  const [options, setOptions] = useState({})
  const dispatch = useDispatch();
  useEffect(() => {
    import(`@highcharts/map-collection/countries/${countryID}/${countryID}-all.geo.json`
    ).then(res => {
      setMapData(res)
    })
  },[countryID])
  useEffect(() => {
    const data = mapData?.features
    if(data) {
      var fakeData = data.map((feature, index) => {
        return {key: feature.properties['hc-key'],
            value: index}
      })
    } else {setMapData(1)}

    setOptions({
      ...initOptions,
      series: [
        {
          ...initOptions.series[0],
          mapData: (isGlobal === 'true' ? mapDataWorld : mapData),
          data: (isGlobal === 'true' ? inputData : fakeData),
        }
      ]
    })
  }, [isGlobal, inputData, mapData])
  return (
    <div className="mapChartContainer">
      <HighchartsReact
        highcharts={Highcharts}
        options={cloneDeep(options)}
        constructorType="mapChart"
      />
    </div>
  );
}
