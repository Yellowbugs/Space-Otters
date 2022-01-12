const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/getCoins', urlencodedParser, function (req, res) {
	var con = mysql.createConnection({
		host: "us-cdbr-east-05.cleardb.net",
		user: "b64256d78a9063",
		password: "8326ac7e",
		database: "heroku_166199ff331728f"
	});

	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT coins FROM coinamounts WHERE id = ?",[req.query.id] , function (err, result) {
			if (err) throw err;
			res.send(JSON.parse(JSON.stringify(result))[0].coins.toString());
			con.end();
		});
	});
});

app.get('/*', function (req,res) {
    res.sendFile(req.url, {root: './public'});
});

var betAmount = 0;
var cashedOut = true;

app.post('/bet', urlencodedParser, function (req, res) {
	var con = mysql.createConnection({
		host: "us-cdbr-east-05.cleardb.net",
		user: "b64256d78a9063",
		password: "8326ac7e",
		database: "heroku_166199ff331728f"
	});

	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT coins FROM coinamounts WHERE id = ?",[req.body.id] , function (err, result) {
			if (err) throw err;
			betAmount = req.body.betAmount;
			if (betAmount < JSON.parse(JSON.stringify(result))[0].coins && betAmount > 0) {
				con.query("UPDATE coinamounts SET coins = ? WHERE id = ?",[JSON.parse(JSON.stringify(result))[0].coins - betAmount, req.body.id], function (err, result) {
					if (err) throw err;
					con.end();
					cashedOut = false;
					res.sendStatus(200);
				});
			} else {
				con.end();
				res.sendStatus(200);
			}
		});
	});
});

app.post('/cashout', urlencodedParser, function (req, res) {
	if (cashedOut == false) {
		var con = mysql.createConnection({
			host: "us-cdbr-east-05.cleardb.net",
			user: "b64256d78a9063",
			password: "8326ac7e",
			database: "heroku_166199ff331728f"
		});
	
		con.connect(function(err) {
			if (err) throw err;
			con.query("SELECT coins FROM coinamounts WHERE id = ?",[req.body.id] , function (err, result) {
				if (err) throw err;
				con.query("UPDATE coinamounts SET coins = ? WHERE id = ?",[JSON.parse(JSON.stringify(result))[0].coins + betAmount * req.body.multiplier, req.body.id], function (err, result) {
					if (err) throw err;
					con.end();
					cashedOut = true;
					res.sendStatus(200);
				});
			});
		});
	} else {
		res.sendStatus(200);
	}
});

app.listen(PORT, () => console.log(`Our app is running  on port ${PORT}`));


