function vnstat() {
    let chartData = {
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
    };
    let config = {
        interface: "ens4",
        "DecimalNumber": 2,
        "chartType": [
            "bar",
            "line",
            "pie"
        ],
        "color": [
            "rgb(255, 99, 132)",
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(54, 162, 235)"
        ],
        "labels": [
            "RX (下载)",
            "TX (上传)"
        ],
        "fsOptions": {
            "charset": "utf-8"
        },
        "trafficUnit": {
            "KB": 1,
            "MB": 1024,
            "GB": 1048576,
            "TB": 1073741824
        },
        "Hours": {
            "countChart": {
                "chartType": [
                    "line",
                    "line"
                ]
            },
            "barChart": {
                "labels": [
                    "RX",
                    "TX",
                    "Hours",
                    "Traffic (G)"
                ],
                "chartType": [
                    "bar",
                    "bar",
                    "bar"
                ],
                "title": "Last 24 Hours Traffic",
                "color": [
                    "rgb(255, 99, 132)",
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(54, 162, 235)"
                ]
            }
        },
        "daily": {
            "countChart": {
                "chartType": [
                    "line",
                    "line"
                ]
            },
            "barChart": {
                "labels": [
                    "RX",
                    "TX",
                    "Date",
                    "Traffic (G)"
                ],
                "chartType": [
                    "bar",
                    "bar",
                    "bar"
                ],
                "title": "Daily Traffic",
                "color": [
                    "rgb(255, 99, 132)",
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(54, 162, 235)"
                ]
            }
        },
        "monthly": {
            "countChart": {
                "chartType": [
                    "line",
                    "line"
                ]
            },
            "barChart": {
                "labels": [
                    "RX",
                    "TX",
                    "Months",
                    "Traffic (G)"
                ],
                "chartType": [
                    "bar",
                    "bar",
                    "bar"
                ],
                "title": "Monthly Traffic",
                "color": [
                    "rgb(25, 99, 132)",
                    "rgb(25, 99, 132)",
                    "rgb(5, 162, 235)",
                    "rgb(5, 162, 235)"
                ]
            }
        },
        "TOP10": {
            "countChart": {
                "chartType": [
                    "line",
                    "line"
                ]
            },
            "barChart": {
                "labels": [
                    "RX",
                    "TX",
                    "Date",
                    "Traffic (G)"
                ],
                "chartType": [
                    "bar",
                    "bar",
                    "bar"
                ],
                "title": "TOP10 days",
                "color": [
                    "rgb(25, 99, 132)",
                    "rgb(25, 99, 132)",
                    "rgb(5, 162, 235)",
                    "rgb(5, 162, 235)"
                ]
            }
        }
    };
    //config = JSON.parse(config);
    let data = document.getElementById('input').value;
    data = JSON.parse(data);
    let hours = JSON.parse(JSON.stringify(chartData));
    let days = JSON.parse(JSON.stringify(chartData));
    let tops = JSON.parse(JSON.stringify(chartData));
    let months = JSON.parse(JSON.stringify(chartData));

    function bitsToGb(array) {
        array.some(value => {
            value.rx = (value.rx / config.trafficUnit.GB).toFixed(config.DecimalNumber);
            value.tx = (value.tx / config.trafficUnit.GB).toFixed(config.DecimalNumber);
        });
    }

    function barChart(chart, array, option, cb) {
        // 0 for RX
        // 1 for TX
        // Deep copy
        chart.data.datasets.push(JSON.parse(JSON.stringify(chart.data.datasets[0])));

        // set labels
        if (option.hasOwnProperty("labels")) {
            chart.data.datasets[0].label = option.labels[0];
            chart.data.datasets[1].label = option.labels[1];
            chart.options.scales.xAxes[0].scaleLabel.labelString = option.labels[2];
            chart.options.scales.yAxes[0].scaleLabel.labelString = option.labels[3];
        }
        if (option.hasOwnProperty("chartType")) {
            chart.type = option.chartType[0];
            chart.data.datasets[0].type = option.chartType[1];
            chart.data.datasets[1].type = option.chartType[2];
        }
        if (option.hasOwnProperty("title")) {
            chart.options.title.text = option.title;
        }
        // set line color
        chart.data.datasets[0].borderColor = option.hasOwnProperty("color") ? option.color[0] : config.color[0];
        chart.data.datasets[0].backgroundColor = option.hasOwnProperty("color") ? option.color[1] : config.color[1];
        chart.data.datasets[1].borderColor = option.hasOwnProperty("color") ? option.color[2] : config.color[2];
        chart.data.datasets[1].backgroundColor = option.hasOwnProperty("color") ? option.color[3] : config.color[3];

        let pop;
        let temp;
        // Array.length is decreasing
        let type = 0;
        if (array[0].date.hasOwnProperty('day'))
            type = 1;
        for (let i = 0; i < array.length;) {
            pop = array.pop();
            temp = type === 0 ? pop.date.year + "-" + pop.date.month : pop.date.year + "-" + pop.date.month + "-" + pop.date.day;
            chart.data.labels.push(temp);
            chart.data.datasets[0].data.push(pop.rx);
            chart.data.datasets[1].data.push(pop.tx);
        }
        return cb();
    }

    function count(chart, miniIndex, option, cb) {
        chart.data.datasets.push(JSON.parse(JSON.stringify(chart.data.datasets[0])));
        chart.data.datasets.push(JSON.parse(JSON.stringify(chart.data.datasets[1])));
        if (option.hasOwnProperty("chartType")) {
            chart.data.datasets[2].type = option.chartType[0];
            chart.data.datasets[3].type = option.chartType[1];
        }
        chart.data.datasets.some((value, index) => {
            if (index > miniIndex) {
                value.data.some((value1, index1) => {
                    if (index1 > 0) {
                        value.data[index1] = (Number.parseFloat(value.data[index1]) + Number.parseFloat(value.data[index1 - 1])).toFixed(config.DecimalNumber);
                    }
                });
            }
        });
        return cb();
    }

    try {
        // get right index for special interface
        let interfaceIndex = 0;
        data.interfaces.some((value, index) => {
            if (value.id === config.interface)
                interfaceIndex = index;
        });
        // convert KB to GB
        bitsToGb(data.interfaces[interfaceIndex].traffic.hours);
        bitsToGb(data.interfaces[interfaceIndex].traffic.days);
        bitsToGb(data.interfaces[interfaceIndex].traffic.months);
        bitsToGb(data.interfaces[interfaceIndex].traffic.tops);
        barChart(hours, data.interfaces[interfaceIndex].traffic.hours, config.Hours.barChart, function (err) {
            if (err)
                console.error(err);
            else {
                let currentHour = moment().hour();
                let date = moment().date();
                hours.data.labels.some((value, index) => {
                    let temp = currentHour - 23 + index;
                    hours.data.labels[index] = temp >= 0 ? date + '-' + temp : (date - 1) + '-' + (temp + 24);
                });
                new Chart(document.getElementById("HOUR"), hours);
            }
        });
        barChart(days, data.interfaces[interfaceIndex].traffic.days, config.daily.barChart, function (err) {
            if (err)
                console.error(err);
            else {
                count(days, 1, config.daily.countChart, function (err) {
                    if (err)
                        console.error(err);
                    else {
                        //console.log(days.data.datasets);
                        new Chart(document.getElementById("DAY"), days);
                    }
                });
            }
        });
        barChart(months, data.interfaces[interfaceIndex].traffic.months, config.monthly.barChart, function (err) {
            if (err)
                console.error(err);
            else {
                //console.log(months)
                count(months, 1, config.monthly.countChart, function (err) {
                    if (err)
                        console.error(err);
                    else {
                        //console.log(months.data.datasets);
                        new Chart(document.getElementById("MONTH"), months);
                    }
                });
            }
        });
        barChart(tops, data.interfaces[interfaceIndex].traffic.tops, config.TOP10.barChart, function (err) {
            if (err)
                console.error(err);
            else {
                new Chart(document.getElementById("TOP10"), tops);
            }
        });
    } catch (e) {
        console.error(e);
    }
}