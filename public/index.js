
var images = [], x = -1;
images[0] = "Images/1.png";
images[1] = "Images/25.png";
images[2] = "Images/37.png";
images[3] = "Images/47.png";
images[4] = "Images/72.png";
images[5] = "Images/83.png";
storage = window.localStorage;



let questions = ["When does Space Otters Launch?", "How much will a Space Otter cost to mint?","Why should I own a Space Otter?", "What blockchain is space Otters on?", "How do I purchase a space otter?", "Is there a presale period?"];
let answers = ["Minting will begin on March 5, 2022 at 3:00pm EST(8:00 PM UTC)","0.03 ETH + gas fees", "Exclusive access to ETH giveaways and weekly crash competitions", "ethereum","You can mint a space otter when minting begins via metamask. Make sure you are on the ethereum mainnet and have the metamask extension installed.", "Nope. Otters will be minted first come first serve on March 5th at 3:00pm EST(8:00 UTC)"];
var hidden = true;
  
function returnHome(){
    document.documentElement.scrollTop = 0;
    }
function goToRoadmap(){
    document.documentElement.scrollTop = document.getElementById('Roadmap').offsetTop - 90;;
    }
function goToCrew(){
    document.documentElement.scrollTop = document.getElementById('teamTitle').offsetTop - 90;
     }
function goToFAQ(){
    document.documentElement.scrollTop = document.getElementById('FAQ').offsetTop - 90;
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

window.addEventListener('scroll',reveal);
window.addEventListener('scroll',timeline);
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
function timeline(){
    var reveal = document.querySelectorAll('.RoadmapListItem');

    for (var i=0; i<reveal.length;i++){
        var windowheight = window.innerHeight;
        var revealtop = reveal[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight -revealpoint){
            reveal[i].classList.add('active');
        }
        else{
            reveal[i].classList.remove('active');
        }
    }
}
function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("nftPics").src = images[x];
    
}   

async function onStart() {
    setInterval(displayNextImage, 500);
    for(let i = 1; i<= questions.length; i ++){
        document.getElementById(i).innerHTML =  questions[i-1];
    }
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
    //contract = new web3.eth.Contract(ABI, ADDRESS);
    await window.ethereum.send('eth_requestAccounts');
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('connectWallet').innerText = "Wallet Connected";
    console.log(account);
    /*
    totalSupply = await contract.methods.totalSupply().call();
    document.getElementById("mintCount").innerText =  totalSupply + " out of 10,000";
    document.getElementById("mintCountshow").classList.remove("hidden");

    var OttersOwned = await getOttersOwned();
    */
}

async function getOttersOwned() {
    let toReturn = await contract.methods.walletOfOwner(account).call();
    console.log(toReturn);
    return toReturn;
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
function crash(){
    window.open("./CrashGame/index.html", "_blank");
}

//ETH FUNCTIONS START HERE
var account = null;
    var contract = null;
    const ABI =[]
    const ADDRESS = '';

async function connectWallet(){
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
    await window.ethereum.send('eth_requestAccounts');
           

    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    if (account != null){
        document.getElementById('connectWallet').innerText = "Wallet Connected";
    }    
    console.log(account);
    //totalSupply = await contract.methods.totalSupply().call();
    //document.getElementById("mintCount").innerText =  totalSupply + " out of 10,000";
    //document.getElementById("mintCountshow").classList.remove("hidden");
    
}


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
            document.getElementById("launchText").innerHTML = "LAUNCHED!!! Mint your space otters NOW!";
            document.getElementById("launchText").style.fontSize = "100%";
            document.getElementById("dateBoxesh").remove();
            document.getElementById("dateBoxesd").remove();
            document.getElementById("dateBoxesm").remove();
            document.getElementById("dateBoxess").remove();
          }
        }, 1000);
    
}

async function mintClicked(){
        if (window.ethereum){
            await window.web3.currentProvider.enable();
            web3 = new Web3(window.web3.currentProvider);
            await window.ethereum.send('eth_requestAccounts');
            
            document.getElementById("error").setAttribute("id","error_active");
            setTimeout(() => {document.getElementById("error_active").setAttribute("id","error")},5000);
            var accounts = await web3.eth.getAccounts();
            account = accounts[0];
            console.log(account);
            /*
            contract = new web3.eth.Contract(ABI, ADDRESS);
            mintCount = document.getElementById('ctrl__counter-num').innerHTML
            if (mintCount >= 21){
                mintCount = 20;
            }
          
            cost = mintCount*30000000000000000;
            contract.methods.mint(mintCount).send({from: account, value: cost})
            */

        }
}
