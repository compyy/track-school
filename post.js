'use strict';
var request = require('request');
var config = require('./config.js');


module.exports.postData = function postData(data, path) {
    if (config.baseProt == 'rest') {
        postDataRest(data, path);
    }
    else if (config.baseProt == 'php') {
        for (var j = 0; j < data.length; j++) {
            var phpData = config.basePHP + "?beacon_major=" + data[j].major + "&beacon_minor=" +
                data[j].minor + "&beacon_distance=" + data[j].proximity + "&beacon_gateway=" + data[j].Gateway;
            //console.log(phpData);
            postDataPHP(phpData);
        }
    }

}

function postDataRest(data, path) {
    request.post(path,
        {json: true, body: data, timeout: 1500},
        function (err, res, body) {
            if (config.debugLogs) {

                if (res) {
                    if (res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 202) {
                        console.log("Posting the Beacon Data was ok.", JSON.stringify(data));
                    }
                    else {
                        console.log("Posting the Beacon Data failed:", "\nError Code:", res.statusCode, "\nError Description:", res.statusMessage);
                    }
                }
                else if (err) {
                    if (err.code == "EHOSTUNREACH" || err.code == "ETIMEDOUT") {
                        console.log("Posting data failed, Server is unreachable on IP: ", serverIP, " on Port: ", serverPort);
                    }
                    else if (err.code == "ECONNREFUSED") {
                        console.log("Posting data failed, Server is refusing connection on IP: ", serverIP, " on Port: ", serverPort);
                    }
                }
                //console.log('REQUEST RESULTS:', err, res.statusCode, body);
                //console.log(body);
            }
        }
    );

}

function postDataPHP(phpData) {
    request.post(phpData,
        {json: true, body: null, timeout: 1500},
        function (err, res, body) {
            if (config.debugLogs) {

                if (res) {
                    if (res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 202) {
                        console.log("Posting the Beacon Data was ok.", JSON.stringify(phpData));
                    }
                    else {
                        console.log("Posting the Beacon Data failed:", "\nError Code:", res.statusCode, "\nError Description:", res.statusMessage);
                    }
                }
                else if (err) {
                    if (err.code == "EHOSTUNREACH" || err.code == "ETIMEDOUT") {
                        console.log("Posting data failed, Server is unreachable on IP: ", serverIP, " on Port: ", serverPort);
                    }
                    else if (err.code == "ECONNREFUSED") {
                        console.log("Posting data failed, Server is refusing connection on IP: ", serverIP, " on Port: ", serverPort);
                    }
                }
                //console.log('REQUEST RESULTS:', err, res.statusCode, body);
                //console.log(body);
            }
        }
    );
}