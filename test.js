//define instances
var students = require('bleacon');
var request = require('request');
//require('request-debug')(request);


var serverIP = "www.manaralabs.com";
var serverPort = "8080";
var serverAuth = "admin:changeit";
var serverDB = "/school/gateway";
//var path = "http://" + serverAuth + "@" + serverIP + ":" + serverPort + serverDB;
var path = "http://manaralabs.com/ses/addAndroidLog.php";
var beacon_gateway = "Admin Office";

//Discover Beacon
students.on('discover', function (students) {
    var timems = Date.now();
    var time = Date();
    var beacon_uuid = students.uuid;
    var beacon_major = students.major;
    var beacon_minor = students.minor;
    var beacon_distance = students.accuracy;
    //var data = {"Gateway": gateway, "uuid": uuid, "major": major, "minor": minor, "time": time, "timems": timems};
//    var data = {"beacon_major":major,"beacon_minor":minor,"beacon_uuid":timems};

    insertBeaconPHP(beacon_major, beacon_minor, beacon_gateway, beacon_distance);
    //startPostingData(data);
    console.log(JSON.stringify(students));
});
var insertBeaconPHP = function (beacon_major, beacon_minor, beacon_gateway, beacon_distance) {
    path = "http://192.168.1.242/ses/addAndroidLog.php?beacon_major=" + beacon_major + "&beacon_minor=" + beacon_minor + "&beacon_distance=" + beacon_distance + "&beacon_gateway=" + beacon_gateway;
    request.post(path,
        {json: true, body: null, timeout: 1500},
        function (err, res, body) {
            console.log('REQUEST RESULTS:', err, res, body);

        }
    );
};

//posting Data to Remote Server
var startPostingData = function (data) {
    request.post(path,
        {json: true, body: data, timeout: 1500},
        function (err, res, body) {
            //*debug information

            if (res) {
                if (res.statusCode == 201) {
                    console.log("Posting the Beacon Data was ok.\n ", JSON.stringify(data), "\n", res.headers.location);
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
            //debug Information ends here
            //console.log('REQUEST RESULTS:', err, res.statusCode, body);
            //console.log(body);
            //debug Information ends here

        }
    );

};

students.startScanning();