var graphInterval;
var multiplier;
var cashedOut = false;
var count = 0;
var coins = 10;
var fillColor = "green";
var cashedOutReward = 0;
var crashed;
var currentMultiplier = 0;
var rocket = new Image(61,68);
rocket.src = "../../Images/rocket.png";
var rocket1 = new Image(81,47);
rocket1.src = "../../Images/rocket1.png";
var rocket2 = new Image(77,49);
rocket2.src = "../../Images/rocket2.png";
var rocket3 = new Image(68,60);
rocket3.src = "../../Images/rocket3.png";
var explosion = new Image(61,68);
explosion.src = "../../Images/explosion.png";
var ottersOwned = [];

var xValues = [];
var yValues = [];

getOtters();

var chart = new Chart("myChart", {
  type: "line",   
  options: {
    scales: {
        yAxes: [{
            display: true,
            position: 'right',
                ticks: {
                    min: 1,
                    max: 2,
                    maxTicksLimit: 10,
                }
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
    },
    responsive:true,
    maintainAspectRatio: false,
  },
  
});

function generateData(value, i1, i2, step = 1) {
  for (let x = i1; x <= i2; x += step) {
    yValues.push(eval(value));
    xValues.push(x);
  }
}

function playCrash() {
    crashed = false;
    betAmount = document.getElementById('betAmount').value;
    if(betAmount > parseInt(document.getElementById("coins").innerText.substring(7))){
        if (document.getElementById("error") != null){
            document.getElementById("error").setAttribute("id","error_active");
            setTimeout(() => {document.getElementById("error_active").setAttribute("id","error")},5000);}
    }
    if(ottersOwned.length == 0){
       if (document.getElementById("error2") != null){
           document.getElementById("error2").setAttribute("id","error_active");
           setTimeout(() => {document.getElementById("error_active").setAttribute("id","error2")},5000);}
    }
    $.post('/bet', { id: document.getElementById('otters').value, betAmount: betAmount }, function(data) {
        multiplier = (Math.log(data)/Math.log(1.1))/0.6*1000;
        cashedOut = false;
        fillColor = "green";
        start = new Date().getTime();

        updateCoins();

        clearInterval(graphInterval);
        graphInterval = setInterval(updateGraph, 100);
        setTimeout(function() {
            clearInterval(graphInterval);
            crashed = true;
            if(cashedOut == false) {
                    fillColor = "red";
                    cashedOutReward = 0;
                 }
                 chart.update();
            crashed = true;
        }, multiplier);

    });
}

function cashOut() {
    elapsed = new Date().getTime() - start;
    currentMultiplier = Math.pow(1.1, 0.6*(elapsed/1000));
    $.post('/cashout',{currentMultiplier: currentMultiplier}, function() {
        updateCoins();
    });
    if (cashedOut == false){
        cashedOutReward = (Math.round((betAmount*currentMultiplier) * 100)/100);
    }
    if(crashed == false && cashedOut == false){
        document.getElementById("coins").style.color = 'green';
        setTimeout(function(){
        document.getElementById("coins").style.color = "black";
        }, 2000);
    }
    cashedOut = true;

}
 
function updateGraph() {
    xValues = [];
    yValues = [];


    elapsed = new Date().getTime() - start;
    currentMultiplier = Math.pow(1.1, 0.6*(elapsed/1000));	
    generateData("Math.pow(1.1, 0.6*x)", 0, (Math.log(currentMultiplier)/Math.log(1.1))/0.6, 0.1);
    chart.data.labels = xValues;
    chart.data.datasets = [{
        fill: false,
        radius: 0,
        borderColor: "rgb(255,24,23)",
        borderCapStyle: "round",
        data: yValues,
        spanGaps: true,
    }];
  
    
    let myLineExtend = Chart.controllers.line.prototype.draw;
    let canvas = document.getElementById('myChart');
    let ctx = canvas.getContext('2d');
    Chart.helpers.extend(Chart.controllers.line.prototype, {
        draw: function() {
            myLineExtend.apply(this, arguments);

            this.chart.chart.ctx.textAlign = "center"
            this.chart.chart.ctx.font = "normal 50px Russo One";
            this.chart.chart.ctx.fillStyle = fillColor;
            this.chart.chart.ctx.shadowColor="black";
            this.chart.chart.ctx.shadowBlur=5;
            this.chart.chart.ctx.lineWidth=1;
            this.chart.chart.ctx.strokeStyle="black";

            if (cashedOut == true){
                this.chart.chart.ctx.fillText("Cashed Out!", 300, 150);
                this.chart.chart.ctx.fillText("+"+ cashedOutReward + " Ottercoins", 300, 210)
            }

            if(cashedOut == false && crashed == true){
                this.chart.chart.ctx.fillText("x" + Math.round(currentMultiplier * 100)/100, 300, 150)
                this.chart.chart.ctx.fillText("+0" + " Ottercoins", 300, 210);
            } 

            if(crashed == false && cashedOut == false){
                this.chart.chart.ctx.fillText("x" + Math.round(currentMultiplier * 100)/100, 300, 150)
                this.chart.chart.ctx.fillText("+"+ (Math.round(betAmount * 100)/100* Math.round(currentMultiplier * 100)/100).toFixed(2) + " Ottercoins", 300, 210)
                this.chart.chart.ctx.strokeText("x" + Math.round(currentMultiplier * 100)/100, 300, 150);
                this.chart.chart.ctx.strokeText("+"+ (Math.round(betAmount * 100)/100* Math.round(currentMultiplier * 100)/100).toFixed(2) + " Ottercoins", 300, 210);
            }
            if(crashed){
                if (yValues.at(-1) < 2) {
                    ctx.drawImage(explosion, canvas.clientWidth - 80, (canvas.clientHeight - 80) - ((yValues.at(-1) - 1) * (canvas.clientHeight - 80)));
                } else {
                    ctx.drawImage(explosion, canvas.clientWidth - 80, 0);
                } 
            }
            else{
                if (yValues.at(-1) < 1.1) {
                    ctx.drawImage(rocket1, canvas.clientWidth - 80, (canvas.clientHeight - 60) - ((yValues.at(-1) - 1) * (canvas.clientHeight - 80)));
                }
                else if (yValues.at(-1) < 1.2) {
                    ctx.drawImage(rocket2, canvas.clientWidth - 80, (canvas.clientHeight - 60) - ((yValues.at(-1) - 1) * (canvas.clientHeight - 80)));
                }
                else if (yValues.at(-1) < 1.3) {
                    ctx.drawImage(rocket3, canvas.clientWidth - 80, (canvas.clientHeight - 75) - ((yValues.at(-1) - 1) * (canvas.clientHeight - 80)));
                }
                else if (yValues.at(-1) < 2) {
                    ctx.drawImage(rocket, canvas.clientWidth - 80, (canvas.clientHeight - 80) - ((yValues.at(-1) - 1) * (canvas.clientHeight - 80)));
                } else {
                    ctx.drawImage(rocket, canvas.clientWidth - 80, 0);
            }
        }
        }
      });
    if (yValues.at(-1) < 2) {
        chart.options.scales.yAxes[0].ticks.max = 2;
    } else {
        chart.options.scales.yAxes[0].ticks.max = yValues.at(-1);
    }
    


    chart.update();    
}

function updateCoins() {
    var otterSelected;
    if(document.getElementById('otters').value == "Choose Otter"){
        otterSelected = 0;
        }
    else{
        otterSelected = document.getElementById('otters').value
    }
    $.get('/getCoins', { id:  otterSelected}, function(data) {
        $("#coins").html("Coins: "+ Number(Number(data).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]));
    });
}

async function getOtters(){
    var account = null;
    var contract = null;
    const ABI =[]
    const ADDRESS = '';
    
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
    //contract = new web3.eth.Contract(ABI, ADDRESS);
    await window.ethereum.send('eth_requestAccounts');
           
    var accounts = await web3.eth.getAccounts();
    var account = accounts[0];
    console.log(account);
    //var ottersOwned =  await contract.methods.walletOfOwner(account).call();
    //console.log(ottersOwned);
    //for(i=0;i<ottersOwned.length;i++){
    //    document.getElementById('otters').innerHTML += '<option value = "'+ottersOwned[i]+'">'+ottersOwned[i]+'</option>' 
    //}
    updateCoins();
    
    return ottersOwned;
}

function goBackToWebsite(){
    window.open("../index.html", "_self").focus();
}
function discord(){
    window.open("https://discord.gg/C4YcMmxkH2"),'_blank';
}
function twitter(){
    window.open("https://twitter.com/spaceotters_nft"),'_blank';
}
function instagram(){
    window.open("https://www.instagram.com/spaceotters_nft/"),'_blank';
}
function returnHome(){
    document.documentElement.scrollTop = 0;
}
function gotoHowToPlay(){
    document.documentElement.scrollTop = document.getElementById('howToPlay').offsetTop - 115;
}
function gotoLeaderbordLookupPlaceholder(){
    document.documentElement.scrollTop = document.getElementById('leaderboardLookupPlaceholder').offsetTop - 90;;
}
function gotoFAQ(){
    document.documentElement.scrollTop = document.getElementById('FAQ').offsetTop - 90;
    }
async function connectWallet(){
    
        await window.web3.currentProvider.enable();
        web3 = new Web3(window.web3.currentProvider);
        //contract = new web3.eth.Contract(ABI, ADDRESS);
        await window.ethereum.send('eth_requestAccounts');
        
    
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        if (account != null){
            document.getElementById('connectWallet').innerText = "Wallet Connected";
        }
        //totalSupply = await contract.methods.totalSupply().call();
        getOtters();
    }
function reveal(){
        var reveal = document.querySelectorAll('.purplebox');
    
        for (var i=0; i<reveal.length;i++){
            var windowheight = window.innerHeight;
            var revealtop = reveal[i].getBoundingClientRect().top;
            var revealpoint = 150;
    
            if(revealtop < windowheight -revealpoint){
                reveal[i].classList.add('active');
            }
            
        }
    
    }
window.addEventListener('scroll',reveal);
function timeTillLaunch(){
    var currentDate = new Date().getTime();
    var endDate = 1646510400000; 
    var x = setInterval(function() {
        var currentDate = new Date().getTime();
        var d = endDate - currentDate;
        var days = Math.floor(d / (1000 * 60 * 60 * 24));
        var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((d % (1000 * 60)) / 1000);
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours ;
        document.getElementById("minutes").innerHTML = minutes ;
        document.getElementById("seconds").innerHTML = seconds ;
        if (d < 0) {
            clearInterval(x);
            document.getElementById("launchText").innerHTML = "Competition Live!!";
            document.getElementById("launchText").style.fontSize = "100%";
            document.getElementById("dateBoxesh").remove();
            document.getElementById("dateBoxesd").remove();
            document.getElementById("dateBoxesm").remove();
            document.getElementById("dateBoxess").remove();
          }
        }, 1000);
    
}
window.onload = timeTillLaunch();

let questions = ["How can I play in the crash game?","How does the Crash Game work?","How long do the competitions last?", "What prizes can I win?","What is the Ottercoin lookup for?", "What happens if I run out of Ottercoins","Why are my otters not showing up?"];
let answers = ["own a Space Otter either through minting or buying on Open Sea","Check the \"How To Play\" section","Most compitions will last a week starting on Sunday night. However, there will be daily games in the future. Check our twitter and discord for updates.", "The top few winners of the week's competition will recieve prizes of ETH and Space Otters. These rewards will increase as the community grows. Merch and special prizes will come as well. Visit the discord to check out this weeks prizes!", "The Ottercoin lookup feature allows for you to check how many Ottercoins a specific otter has for the current competition. This is useful when purchasing otters from Open Sea.","Don't worry, Ottercoins are replenished for free at the start of every new compition! You can always buy another otter if you want to play again too", "Make sure you have the Metamask extension enabled and are connected to the Ethereum mainnet"];
var hidden = true;

window.onload = function loadFAQ(){
    for(let i = 1; i<= questions.length; i ++){
        document.getElementById(i).innerHTML = questions[i-1];
    }
}


function showAnswer(id){
    var answer = answers[id-1];
    var question = questions[id-1];
    var holder = document.getElementById(id);
    if(hidden){
        holder.innerHTML = question + '<br>' + answer;
        hidden = false;
    }
    else{
        holder.innerHTML =  question ;
        hidden = true;
    }
}
