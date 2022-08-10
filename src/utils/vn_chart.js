/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/08/11
 */
'use strict'
const sample = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        type: "",
        label: "",
        data: [],
        fill: false,
        backgroundColor: "",
        borderColor: "",
        lineTension: 0.1
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: ""
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: ""
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: ""
          }
        }
      ]
    }
  }
}


export function hoursChart(data, chartTitle, xTitle, yTitle,) {

}
