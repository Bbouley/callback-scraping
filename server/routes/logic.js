var ourResult = true;
var request = require('request');
var cheerio = require('cheerio');


function scraper(url, selector, cb) {
    request.get(url, function(err, res, html) {
        if(res && res.statusCode === 200) {
            $ = cheerio.load(html);
            var titles = $(selector);
            var output = [];
            [].forEach.call(titles, function(el) {
                output.push($(el).text());
            });
            cb(null, output[0]);
        } else {
            cb(err);
        }
    });
}

var hackerNewsPromise = new Promise(function(resolve, reject) {
    scraper('https://news.ycombinator.com/', 'td.title a', function(err, result) {
        if(err) {
            reject (err);
        } else {
            resolve (result);
        }
    });
});

var redditPromise = new Promise(function(resolve, reject) {
    scraper('https://www.reddit.com/r/Web_Development/', 'a.title', function(err, result) {
        if(err) {
            reject(err);
        } else {
            resolve (result);
        }
    });
});

var MDNPromise = new Promise(function(resolve, reject) {
    scraper('https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'title', function (err, result) {
        if(err) {
            reject (err);
        } else {
            resolve (result);
        }
    });
});

var pythonPromise = new Promise(function(resolve, reject) {
    scraper('https://www.python.org/', 'title', function(err, result) {
        if(err) {
            reject (err);
        } else {
            resolve (result);
        }
    });
});

var keyword = 'javascript';


module.exports  = {
    scraper : scraper,
    hackerNewsPromise : hackerNewsPromise,
    redditPromise : redditPromise,
    MDNPromise : MDNPromise,
    pythonPromise : pythonPromise,
    keyword : keyword
};
