//____________________________________BEGIN setup
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')))




//____________________________________END setup





app.get("/", function(req, res) {

    res.render("index")

});




app.get("/api/:state", function(req, res) {
    var state = req.params.state;
    var url = "http://www.opensecrets.org/api/?method=getLegislators&id=" + state + "&output=json&apikey=15896170d79aff1bdd2a33b74dbcebe8";
    var callback = function(response) {
        response.on("error", function(err) {
            console.log(err)
        })
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            console.log(str);
            var obj = undefined;

            try {
                obj = JSON.parse(str)
                res.json(obj)
            } catch (e) {
                console.log(e);
            }

        });
    }

    http.request(url, callback).end();


});

app.get("/api/contributors/:cid", function(req, res) {
    var representativesCID = req.params.cid
    var url = "http://www.opensecrets.org/api/?method=candContrib&cid=" + representativesCID + "&cycle=2016&output=json&apikey=15896170d79aff1bdd2a33b74dbcebe8"
    var callback = function(response) {
        response.on("error", function(err) {
            console.log(err)
        })
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            console.log(str);
            var obj = undefined;

            try {
                obj = JSON.parse(str)
                res.json(obj)
            } catch (e) {
                console.log(e);
            }

        });
    }

    http.request(url, callback).end();


});








//____________________________________BEGIN Start server

app.listen("3000", function(err) {

        if (err) {
            console.log("server is not working");
        } else {
            console.log("Server is working on 3000");
        }
    })
    //____________________________________END Stat server
