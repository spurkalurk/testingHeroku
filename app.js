var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//configure bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var port = process.env.PORT || 3000;

var router=express.Router();

//middleware to use for all requests
app.use(function(req, res, next){
	console.log('Something is happenninnnngggggg....')
	next();
})

//test
app.get('/', function (req, res) {
res.json('Hello there friend');
});

//create a bear
router.route('/bears')
	.post(function(req, res){
		var bear= new Bear();
		bear.name = req.body.name;

		bear.save(function(err){
			if (err)
				res.send(err);

			res.json({message: 'Bear Created!'});
		});
	})

	.get(function(req, res) {
		Bear.find(function(err, bears){
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

app.route('bears/:bear_id')
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear){
			if (err)
				res.send(err);
			res.json(bear);
		});
	});

//prefix all routes with /api
app.use('/api', router);

//start server
var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;
console.log('Example app listening at http://%s:%s', host, port);
});



var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@ds051923.mongolab.com:51923/testtest');

var Bear = require('./app/models/bear');

// respond with "Hello World!" on the homepage

// app.get('/', function (req, res) {
// res.send('Hello World!');
// });
// ß
// var server = app.listen(3000, function () {
// var host = server.address().address;
// var port = server.address().port;
// console.log('Example app listening at http://%s:%s', host, port);
// });