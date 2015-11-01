var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var logic = require('./logic.js');

    var urls = {
        hackerUrl : 'https://news.ycombinator.com/',
        redditUrl : 'https://www.reddit.com/r/Web_Development/',
        pythonUrl : 'https://www.python.org/',
        MDNUrl : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    };



router.get('/', function(req, res, next) {

    logic.hackerNewsPromise.then(function(result) {
        if(result.match(keyword)) {
            return logic.redditPromise;
        } else {
            throw logic.MDNPromise;
        }
    }).then(function(result) {
        if(result.match(keyword)) {
            return logic.MDNPromise;
        } else {
            throw logic.MDNPromise;
        }
    }).then(function(result) {
        res.json(result);
    }).catch(function(err) {
        return logic.pythonPromise;
    }).then(function(result) {
        res.json(result);
    });

});




module.exports = router;
