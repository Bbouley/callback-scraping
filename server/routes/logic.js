var ourResult = true;

var promise = new Promise(function (resolve, reject) {
    if(ourResult) {
            resolve ('It Worked!');
        }
        else {
            reject (':(');
        }
});

// promise.then(function(result) {
//     console.log('Result: ', result);
// }).catch(function(result) {
//     console.log('Reject: ',result);
// });

var successFn = function(message) {
    console.log('Success: ', message);
    return message;
};

var errorFn = function(message) {
    console.log('Error:', message);
    return message;
};

// promise.then(successFn, errorFn).then(function(result) {
//     console.log(result + '!!!!!!!!!!!!!');
// });

promise.then(function(result) {
    return 10;
}).then(function(result) {
    console.log('Result 1 : ', result);
    return result * 10;
}).then(function(result) {
    console.log('Result 2 : ', result);
    return result * 10;
}).then(function(result) {
    console.log('Result 3 : ', result);
    throw 'err';
}).then(function(result) {
    console.log('Result 4 : ', result);
    return result * 10;
}).then(function(result) {
    console.log('Result 5 : ', result);
    return result * 10;
}).catch(function(err) {
    console.log(err);
});
