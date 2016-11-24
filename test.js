//define instances
var students = require('bleacon');
var request = require('request');
//require('request-debug')(request);


var serverIP = "192.168.1.242";
var serverPort = "8080";
var serverAuth = "admin:changeit";
var serverDB = "/school/gateway";
var path = "http://" + serverAuth + "@" + serverIP + ":" + serverPort + serverDB;
var gateway = "Entrance";

//Discover Beacon
students.on('discover', function (students) {
    var timems = Date.now();
    var time = Date();
    var uuid = students.uuid;
    var major = students.major;
    var minor = students.minor;
    var data = {"Gateway": gateway, "uuid": uuid, "major": major, "minor": minor, "time": time, "timems": timems};
    startPostingData(data);
    //console.log(JSON.stringify(data));
});


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