var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/', function(req, res, next) {

    var mdnText = '';
    var pyText = '';

  request.get('https://news.ycombinator.com/', function(err, response, body) {
    if(err) {
        res.send(err);
    } else {
        var $ = cheerio.load(body);
        var titles = ($('.title')).text();
        var firstTitle = titles.split('2.')[0];
        if(firstTitle.indexOf('Javascript')>=0 || firstTitle.indexOf('javaScript') >=0) {
            request.get('https://developer.mozilla.org/en-US/docs/Web/JavaScript', function(err2, res2, body2) {
                $ = cheerio.load(body2);
                mdnText = ($('body')).html();
                res.send({'Here is mdn. Use it wisely...' : mdnText});
            });
        } else {
         request.get('https://www.reddit.com/r/Web_Development/', function(err, response, body) {
            if(err) {
                res.send(err);
            } else {
                var $ = cheerio.load(body);
                var titles = $('.thing').text();
                var firstTitle = titles.split('submitted')[0];

                     if(firstTitle.indexOf('javascript')>=0 || firstTitle.indexOf('javaScript') >=0) {
                        request.get('https://developer.mozilla.org/en-US/docs/Web/JavaScript', function(err2, res2, body2) {
                        $ = cheerio.load(body2);
                        mdnText = ($('.title')).text();
                        res.send({'Here is mdn. Use it wisely...': mdnText});
                        });

                    } else {
                        request.get('https://www.python.org/', function(err3, res3, body3) {
                        $ = cheerio.load(body3);
                        pyText = ($('title')).text();
                        res.send({'Pythons totally cool... ': pyText});
                        });
                       }
                    }
               });
           }
        }
    });
});




module.exports = router;
