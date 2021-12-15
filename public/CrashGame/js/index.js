var graphInterval;
var multipler;
var cashedOut = false;
var count = 0;
var coins = 10;

var xValues = [];
var yValues = [];
generateData("x", 1, 10, 1);

var chart = new Chart("myChart", {
  type: "line",   
  options: {
    scales: {
        yAxes: [{
            display: true,
            position: 'right'
        }],
        xAxes: [{
            ticks: {
                stepSize: 1,
                maxTicksLimit: 10,
                callback: function(value) {return Math.round(value)}
            }
        }]
    },
    legend: {display: false},
    title: {
        display: true,
        fontSize: 16
    },
    animation: {
        duration: 0
    }
  }
});

function generateData(value, i1, i2, step = 1) {
  for (let x = i1; x <= i2; x += step) {
    yValues.push(eval(value));
    xValues.push(x);
  }
}

function playCrash() {
    cashedOut = false;
    multiplier = (Math.log(100/(Math.random()*99.9+0.1))/Math.log(1.1))/0.6*1000;

    graphInterval = setInterval(updateGraph, 100);
    setTimeout(function() {
        clearInterval(graphInterval);
        
        if(cashedOut == false) {
            coins = 0;
        }

        cashedOut = true;
    }, multiplier);

    count = 0;
    multipler = 0;
}

function cashOut() {
    var currentMultiplier = Math.pow(1.1, 0.6*count/10);

    if (cashedOut == false) {
        console.log(currentMultiplier);
        coins *= currentMultiplier;
        cashedOut = true;
    }
    console.log(coins);
}

function updateGraph() {
    xValues = [];
    yValues = [];
    generateData("Math.pow(1.1, 0.6*x)", 0, count/10, 0.1);

    chart.data.labels = xValues;
    chart.data.datasets = [{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(0,0,255,0.5)",
        data: yValues
    }];

    if (yValues.at(-1) < 2) {
        chart.options.scales.yAxes[0].ticks.max = 2;
    } else {
        chart.options.scales.yAxes[0].ticks.max = yValues.at(-1);
    }

    chart.update();

    count++;
}