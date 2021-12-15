var express = require('express')
var app = express()

app.get('/*', function (req,res) {
    res.sendFile(req.url, {root: './public'});
});

app.listen(80, () => console.log('App listening at port eighty'));