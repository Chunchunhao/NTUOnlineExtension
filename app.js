var express = require('express');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.set('port', process.env.PORT || 9527);

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res){
    return res.send('Error 404: No course found');
});

app.get('/score/:year/:term/:ccode/:cnumber', function(req, res){

	var year = parseInt(req.params.year),
		term = req.params.term,
		CouCode = req.params.ccode,
		classNumber = req.params.cnumber

	var scoreArr1 = [],
		scoreArr2 = [],
		scoreArr3 = []
	var webPrefix = "http://if163.aca.ntu.edu.tw/eportfolio/student/Curve.asp?Year=" 
	var webSufix1 = (year - 0 ) + "&Term=" + term + "&CouCode=" + CouCode + "&Class=" + classNumber
	var webSufix2 = (year - 1 ) + "&Term=" + term + "&CouCode=" + CouCode + "&Class=" + classNumber
	var webSufix3 = (year - 2 ) + "&Term=" + term + "&CouCode=" + CouCode + "&Class=" + classNumber

	request(webPrefix + webSufix1, function (err, rsp, html) {
		if (!err && rsp.statusCode == 200) {
		    var $ = cheerio.load(html);
		    $('font').each(function(i, element){
		    	var a = $(this).text()
		    	var num = a.match(/\d+/)
		    	console.log(num[0]);
		    	scoreArr1.push(num[0])
		    });
		} // Success fst year
		else {
			console.log("empty")
		}
		request(webPrefix + webSufix2, function (err, rsp, html) {
			if (!err && rsp.statusCode == 200) {
			    //console.log(html);
			    var $ = cheerio.load(html);
			    $('font').each(function(i, element){
			    	var a = $(this).text()
			    	var num = a.match(/\d+/)
			    	console.log(num[0]);
			    	scoreArr2.push(num[0])
			    });
			}
			else{
				console.log("empty")
			}
			request(webPrefix + webSufix3, function (err, rsp, html) {
				if (!err && rsp.statusCode == 200) {
				    //console.log(html);
				    var $ = cheerio.load(html);
				    $('font').each(function(i, element){
				    	var a = $(this).text()
				    	var num = a.match(/\d+/)
				    	console.log(num[0]);
				    	scoreArr3.push(num[0])
				    });
				}
				else{
					console.log("empty")
				}
			   	res.json( {
			        s1: scoreArr1,
			        s2: scoreArr2,
			        s3: scoreArr3
			    });
			});
		});
	});
});

app.get('/score/:year/:term/:ccode', function(req, res){

	var year = parseInt(req.params.year),
		term = req.params.term,
		CouCode = req.params.ccode

	var scoreArr1 = [],
		scoreArr2 = [],
		scoreArr3 = []
	var webPrefix = "http://if163.aca.ntu.edu.tw/eportfolio/student/Curve.asp?Year=" 
	var webSufix1 = (year - 0 ) + "&Term=" + term + "&CouCode=" + CouCode + "&Class="
	var webSufix2 = (year - 1 ) + "&Term=" + term + "&CouCode=" + CouCode + "&Class="
	var webSufix3 = (year - 2 ) + "&Term=" + term + "&CouCode=" + CouCode + "&Class="

	request(webPrefix + webSufix1, function (err, rsp, html) {
		if (!err && rsp.statusCode == 200) {
		    var $ = cheerio.load(html);
		    $('font').each(function(i, element){
		    	var a = $(this).text()
		    	var num = a.match(/\d+/)
		    	console.log(num[0]);
		    	scoreArr1.push(num[0])
		    });
		} // Success fst year
		else {
			console.log("empty")
		}
		request(webPrefix + webSufix2, function (err, rsp, html) {
			if (!err && rsp.statusCode == 200) {
			    //console.log(html);
			    var $ = cheerio.load(html);
			    $('font').each(function(i, element){
			    	var a = $(this).text()
			    	var num = a.match(/\d+/)
			    	console.log(num[0]);
			    	scoreArr2.push(num[0])
			    });
			}
			else{
				console.log("empty")
			}
			request(webPrefix + webSufix3, function (err, rsp, html) {
				if (!err && rsp.statusCode == 200) {
				    //console.log(html);
				    var $ = cheerio.load(html);
				    $('font').each(function(i, element){
				    	var a = $(this).text()
				    	var num = a.match(/\d+/)
				    	console.log(num[0]);
				    	scoreArr3.push(num[0])
				    });
				}
				else{
					console.log("empty")
				}
			   	res.json( {
			        s1: scoreArr1,
			        s2: scoreArr2,
			        s3: scoreArr3
			    });
			});
		});
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});