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


    function hasJavascript(url, selector, cb) {

        return request(url, function(err, response, html) {
            var $ = cheerio.load(html);
            var title = $(selector).first().text();

                if(title.match('javascript')) {
                    cb(null, true);
                } else {
                    cb(null, false);
                }
        });
    }

    function getFun(url, selector, cb) {

        request(url, function(err, response, html) {
            var $ = cheerio.load(html);
            var fun = $(selector);
            cb(null, fun);
        });

    }



router.get('/', function(req, res, next) {
    console.log(logic.keyword);
    console.log(logic.keyword);

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

    // var test = hasJavascript(urls.hackerUrl, 'td.title a', function(err, results) {
    //     if(!results) {
    //         getFun(urls.pythonUrl, 'img', function(err, results) {
    //             res.send(results.attr('src'));
    //         });
    //     } else {
    //         hasJavascript(urls.redditUrl, 'a.title', function(err ,results) {
    //             if(!results) {
    //                 getFun(urls.pythonUrl, 'img', function(err, results) {
    //                     res.send(results.attr('src'));
    //                 });
    //             } else {
    //                 getFun(urls.mozilla, 'img', function(err, results) {
    //                     res.send(results.attr('src'));
    //                 });
    //             }
    //         });
    //     }
    // });

});




module.exports = router;
