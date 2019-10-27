/** VnStat To Visual Chart
 * @copyright IITII
 * @author IITII
 * @license MIT
 * @description
 * At First, Using bash to generate data,
 * then using JavaScript to deal whit it.*/

'use strict';
const fs = require('fs');
const path = require('path');
const moment = require('./public/js/moment');
//const {exec} = require('child_process');

const config = require('./config.json');
const chartData = require('./public/chartjs/chart.json');
const data = require('./public/chartjs/vnstat.json');

// Deep copy
// Avoid repeated visits due to the shallow copying
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
            fs.writeFileSync(config.saveDir + config.saveName[0], JSON.stringify(hours), config.fsOptions);
            console.log("Wrote " + config.saveName[0]);
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
                    fs.writeFileSync(config.saveDir + config.saveName[1], JSON.stringify(days), config.fsOptions);
                    console.log("Wrote " + config.saveName[1]);
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
                    fs.writeFileSync(config.saveDir + config.saveName[2], JSON.stringify(months), config.fsOptions);
                    console.log("Wrote " + config.saveName[2]);
                }
            });
        }
    });
    barChart(tops, data.interfaces[interfaceIndex].traffic.tops, config.TOP10.barChart, function (err) {
        if (err)
            console.error(err);
        else {
            //console.log(tops)
            // count(tops,1,config.TOP10.countChart,function (err) {
            //     if (err)
            //         console.error(err);
            //     else{
            //         fs.writeFileSync(config.saveDir+config.saveName[3],JSON.stringify(tops),config.fsOptions);
            //         console.log("Wrote tops.json!");
            //     }
            // });

            // tops.data.datasets.push(JSON.parse(JSON.stringify(tops.data.datasets[0])));
            // tops.data.datasets.push(JSON.parse(JSON.stringify(tops.data.datasets[1])));
            // tops.data.datasets[2].type = config.chartType[2];
            // tops.data.datasets[3].type = config.chartType[2];
            fs.writeFileSync(config.saveDir + config.saveName[3], JSON.stringify(tops), config.fsOptions);
            console.log("Wrote " + config.saveName[3]);
        }
    });
} catch (e) {
    console.error(e);
}