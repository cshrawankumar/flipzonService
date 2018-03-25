var affiliate = require('flipkart-affiliate-client');
var amazon = require('amazon-product-api');
var express = require('express');
var app = express();
var body;

var fkclient = affiliate.createClient({
    FkAffId: 'csaikiran',
    FkAffToken: 'cc45070647474e258efbd2c01955b6d3',
    responseType: 'json'
});

var amazonclient = amazon.createClient({
    awsId: "aws ID",
    awsSecret: "aws Secret",
    awsTag: "aws Tag"
});



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

app.get('/',(req,res)=>{
    res.send("Welcome to Flipzon App...");
});

app.get('/search',(req,res)=>{
    console.log(req.query.query);
    fkclient.keywordSearch({
        query: req.query.query,
        resultCount: req.query.count || 5
      }, function(err, results){
        if(err){
          console.log(err);
        } else{
            res.send(JSON.parse(results));
        }
    });
});

app.listen(3000,function(req,res){
    console.log('server started!!');
});