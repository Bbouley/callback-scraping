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


hackerNewsPromise.then(function(result) {
    if(result.match(keyword)) {
        return redditPromise;
    } else {
        throw MDNPromise;
    }
}).then(function(result) {
    if(result.match(keyword)) {
        return (MDNPromise);
    } else {
        throw MDNPromise;
    }
}).then(function(result) {
    res.send(result);
}).catch(function(err) {
    return pythonPromise;
}).then(function(result) {
    res.send(result);
});



//*** This Code was for simple promises ***///


var promise = new Promise(function (resolve, reject) {
    if(ourResult) {
            resolve ('It Worked!');
        }
        else {
            reject (':(');
        }
});

var successFn = function(message) {
    // console.log('Success: ', message);
    return message;
};

var errorFn = function(message) {
    // console.log('Error:', message);
    return message;
};

promise.then(successFn, errorFn).then(function(result) {
    // console.log(result + '!!!!!!!!!!!!!');
    // console.log('-------------------------');
});

promise.then(function(result) {
    return 10;
}).then(function(result) {
    // console.log('Result 1 : ', result);
    return result * 10;
}).then(function(result) {
    // console.log('Result 2 : ', result);
    return result * 10;
}).then(function(result) {
    // console.log('Result 3 : ', result);
    throw 'err';
}).then(function(result) {
    // console.log('Result 4 : ', result);
    return result * 10;
}).then(function(result) {
    // console.log('Result 5 : ', result);
    return result * 10;
}).catch(function(err) {
    // console.log(err);
});

module.exports  = {
    scraper : scraper,
    hackerNewsPromise : hackerNewsPromise,
    redditPromise : redditPromise,
    MDNPromise : MDNPromise,
    pythonPromise : pythonPromise,
    keyword : keyword
};
