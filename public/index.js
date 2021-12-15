
var images = [], x = -1;
images[0] = "Images/1.png";
images[1] = "Images/25.png";
images[2] = "Images/37.png";
images[3] = "Images/47.png";
images[4] = "Images/72.png";
images[5] = "Images/83.png";


let questions = ["When does Space Otters Launch?", "How much will a Space Otter cost to mint?","Why should I own a Space Otter?"];
let answers = ["Minting will begin on December 22nd, 2021","0.03 ETH + gas fees", "Exclusive access to ETH giveaways and weekly crash competitions"];
var hidden = true;
  
function returnHome(){
    document.documentElement.scrollTop = 0;
    }
function goToRoadmap(){
    document.documentElement.scrollTop = 800;
    }
function goToFAQ(){
    document.documentElement.scrollTop = 2500;
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
async function addFile (files) {
    let node = await Ipfs.create({
        url: "https://api.pinata.cloud/psa",
        repo: 'file-path' + Math.random(),
        EXPERIMENTAL: {
            pubsub: true, // required, enables pubsub
          }
    })

    const key =  await node.key.gen('tobynapolitanoisverycute');
    console.log(key);
    node.name.resolve(key);

    for (let i = 0; i < files.length; i++) {
        const { cid } = await node.add(files[i]);
        const url = `https://gateway.pinata.cloud/ipfs/${cid._baseCache.entries().next().value[1]}`;
        //console.log(url);
        node.name.publish("/ipfs/" + cid._baseCache.entries().next().value[1], {key: 'tobynapolitanoisverycute',allowOffline: 'false'}).then(function (res) {
            console.log(key);
            node.name.resolve(res);
            console.log(res.value);
            console.log(`https://gateway.ipfs.io/ipns/${key.id}`)
        })
        
    }
    


}
async function updateCoins () {
    var json1 = `{
    "name": "Space Otters #1",
    "description": "10,000 uniquely generated NFTs. Welcome to Otter Space!",
    "image": "ipfs://QmWSgCbebZoen382iG8YmbLoU4MmrAWJFnyLzQwKLyiX6w/1.png",
    "dna": "39c0ecaec67883f4ade18c954accad35f3bda112",
    "edition": 1,
    "date": 1638247575364,
    "sellet_fee_basis_points": 500,
    "collection": {
        "name": "Space Otters",
        "description": "10,000 uniquely generated NFTs. Welcome to Otter Space!",
        "family": "Space Otters"
    },
    "properties": {
        "coin-amount": 10000,
        "creators": [
        {
            "address": "0xE7Fd69344eE1AdFC64B4C90bE0187E4bCC0417d8",
            "share": 100
        }
        ]
    },
    "attributes": [
        {
        "trait_type": "Space",
        "value": "Basic Space"
        },
        {
        "trait_type": "Planets",
        "value": "Sun"
        },
        {
        "trait_type": "Primary Colors",
        "value": "Green Primary Color_"
        },
        {
        "trait_type": "Clothes",
        "value": "Drums"
        },
        {
        "trait_type": "Helmets",
        "value": "Wizard Helmet"
        },
        {
        "trait_type": "Eyes",
        "value": "Money Eyes"
        }
    ]
}`;

    var json2 = `{
    "name": "Space Otters #2",
    "description": "10,000 uniquely generated NFTs. Welcome to Otter Space!",
    "image": "ipfs://QmWSgCbebZoen382iG8YmbLoU4MmrAWJFnyLzQwKLyiX6w/2.png",
    "dna": "29e221af6fa934d42c6fd17ef7430670547f4998",
    "edition": 2,
    "date": 1638247575589,
    "sellet_fee_basis_points": 500,
    "collection": {
        "name": "Space Otters",
        "description": "10,000 uniquely generated NFTs. Welcome to Otter Space!",
        "family": "Space Otters"
    },
    "properties": {
        "coin-amount": 10000,
        "creators": [
        {
            "address": "0xE7Fd69344eE1AdFC64B4C90bE0187E4bCC0417d8",
            "share": 100
        }
        ]
    },
    "attributes": [
        {
        "trait_type": "Space",
        "value": "Basic Space"
        },
        {
        "trait_type": "Planets",
        "value": "Sun"
        },
        {
        "trait_type": "Primary Colors",
        "value": "Lime Yellow Gradient Primary Color_"
        },
        {
        "trait_type": "Clothes",
        "value": "Diamond"
        },
        {
        "trait_type": "Helmets",
        "value": "Santa Helmet"
        },
        {
        "trait_type": "Eyes",
        "value": "Basic Suprised Eyes"
        }
    ]
}`;

    var files = [
        {
            path: '/metadata/1.json',
            content: json1
        },
        {
            path: '/metadata/2.json',
            content: json2
        }
    ]

    addFile(files);
}
async function onStart() {
    setInterval(displayNextImage, 500);
    for(let i = 1; i<= questions.length; i ++){
        document.getElementById(i).innerHTML =  questions[i-1];
    }
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
    contract = new web3.eth.Contract(ABI, ADDRESS);
    await window.ethereum.send('eth_requestAccounts');
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('connectWallet').innerText = "Wallet Connected";
    console.log(account);
    totalSupply = await contract.methods.totalSupply().call();
    document.getElementById("mintCount").innerText =  totalSupply + " out of 10,000";
    document.getElementById("mintCountshow").classList.remove("hidden");

    var OttersOwned = await contract.methods.walletOfOwner(account).call();
    let tokenURIs = [];
    let coinAmounts = [];

    updateCoins();

    for(let i = 0; i<OttersOwned.length;i++){
        var individualTokenURI = await contract.methods.tokenURI(OttersOwned[i]).call();
        tokenURIs.push("https://gateway.pinata.cloud/ipfs/" + individualTokenURI.substring(7));
    }
    console.log(tokenURIs);
    
    for(let i = 0; i<OttersOwned.length;i++){
        $.get( tokenURIs[i], function( data ) {
            coinAmounts[i] = data['properties']["coin-amount"];
      });
    }
    console.log(coinAmounts); 
}
function discord(){
    window.open("https://discord.com/invite/GM4yBWC"),'_blank';
}
function twitter(){
    window.open("https://twitter.com/spaceotters_nft"),'_blank';
}

function crash(){
    window.open("public/CrashGame/index.html"), "_blank";
}

//ETH FUNCTIONS START HERE
var account = null;
    var contract = null;
    const ABI =[
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "addressMintedBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "baseExtension",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "baseURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "cost",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "isWhitelisted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxMintAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_mintAmount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nftPerAddressLimit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "notRevealedUri",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "onlyWhitelisted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "_state",
                    "type": "bool"
                }
            ],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "paused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "reveal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "revealed",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_newBaseExtension",
                    "type": "string"
                }
            ],
            "name": "setBaseExtension",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_newBaseURI",
                    "type": "string"
                }
            ],
            "name": "setBaseURI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newCost",
                    "type": "uint256"
                }
            ],
            "name": "setCost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_limit",
                    "type": "uint256"
                }
            ],
            "name": "setNftPerAddressLimit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_notRevealedURI",
                    "type": "string"
                }
            ],
            "name": "setNotRevealedURI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "_state",
                    "type": "bool"
                }
            ],
            "name": "setOnlyWhitelisted",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newmaxMintAmount",
                    "type": "uint256"
                }
            ],
            "name": "setmaxMintAmount",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "tokenByIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "tokenOfOwnerByIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "walletOfOwner",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "_users",
                    "type": "address[]"
                }
            ],
            "name": "whitelistUsers",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "whitelistedAddresses",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const ADDRESS = '0xE2994D7C744fCbCe3A134F370E8B11fAa32cB905';

async function connectWallet(){
    await window.web3.currentProvider.enable();
    web3 = new Web3(window.web3.currentProvider);
    await window.ethereum.send('eth_requestAccounts');
           

    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('connectWallet').innerText = "Wallet Connected";
    console.log(account);
    
}


function timeTillLaunch(){
    var currentDate = new Date().getTime();
    var endDate = 1640174400000; 
    console.log(currentDate);
    console.log(endDate);
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
            document.getElementById("demo").innerHTML = "LAUNCHED";
          }
        }, 1000);
    
}

async function mintClicked(){
        if (window.ethereum){
            await window.web3.currentProvider.enable();
            web3 = new Web3(window.web3.currentProvider);
            await window.ethereum.send('eth_requestAccounts');
           

            var accounts = await web3.eth.getAccounts();
            account = accounts[0];
            console.log(account);
            
            contract = new web3.eth.Contract(ABI, ADDRESS);
            mintCount = document.getElementById('ctrl__counter-num').innerHTML
            if (mintCount >= 21){
                mintCount = 20;
            }
          
            cost = mintCount*10000000000000000;
            contract.methods.mint(mintCount).send({from: account, value: cost})
        

        }
}
