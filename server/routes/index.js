var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

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
            console.log(title);

                if(title.match('javascript')) {
                    cb(null, true);
                } else {
                    cb(null, false);
                }
        });
    }



router.get('/', function(req, res, next) {
    var test = (hasJavascript(urls.hackerUrl, 'td.title a', function(err, results) {
        if(err) {
            console.log('Something went wrong');
        } else {
            return results;
        }
    }));

    console.log(test);


});




module.exports = router;
