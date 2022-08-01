import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button } from "rsuite";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from "moment";

const createOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YY"));
  return {
    chart: {
      heigh: 500
    },
    title: {
      text: "Covid Line Chart",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    color: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    legend: {},
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        "<tr><td style=color:{series.color};padding:0>{series.name}:</td>" +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Số ca nhiễm",
        data: data.map((data) => data.Confirmed),
      },
      {
        name: "Số ca tử vong",
        data: data.map((data) => data.Deaths),
      },
      {
        name: "Số ca hồi phục",
        data: data.map((data) => data.Recovered),
      },
    ],
  };
};

export default function LineChart({ data }) {
  const [options, setOptions] = useState({});
  const [chartDisplay, setChartDisplay] = useState('all');
  const dispatch = useDispatch();
  useEffect(() => {

    setOptions(createOptions(data));
  }, [data]);
  return (
    <div className="lineChartContainer">
        <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onclick={() => setChartDisplay('all')}>All</Button>
            <Button onclick={() => setChartDisplay('30days')}>30D</Button>
            <Button onclick={() => setChartDisplay('1day')}>1D</Button>
        </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
