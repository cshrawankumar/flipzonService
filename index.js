var affiliate = require('flipkart-affiliate-client');
var amazon = require('amazon-product-api');
var express = require('express');
var app = express();
var body;
var util = require('util'),
OperationHelper = require('apac').OperationHelper;
 
var opHelper = new OperationHelper({
    awsId:     'AKIAI5EADFA24M2WJJTA',
    awsSecret: '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',
    assocId:   'cshrawankumar-21',
    locale: 'IN'
});

var fkclient = affiliate.createClient({
    FkAffId: 'csaikiran',
    FkAffToken: 'cc45070647474e258efbd2c01955b6d3',
    responseType: 'json'
});

var amazonclient = amazon.createClient({
    awsId: "AKIAI5EADFA24M2WJJTA",
    awsSecret: "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",
    awsTag: "cshrawankumar-21"
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
          res.send(JSON.parse(err));
        } else{
            res.send(JSON.parse(results));
        }
    });
});

app.get('/search/amazon',(req,res)=>{

    opHelper.execute('ItemSearch', {
        'SearchIndex': 'All',
        'Keywords': req.query.query || "All",
        'ResponseGroup': 'ItemAttributes',       
    }, function(error, results) {
        // if (error) { console.log('Error: ' + error + "\n") }
        // console.log("Results:\n" + util.inspect(results) + "\n");
        // res.send(results);
        if(error){
            console.log(error);
            res.send(JSON.stringify(error));
          } else{
              res.send(JSON.stringify(results));
          }
    });
});



app.listen(3000,function(req,res){
    console.log('server started!!');
});