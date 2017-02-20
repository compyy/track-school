'use strict';

var config = require('./config.js');
var post = require('./post.js');
var bleacon = require('bleacon');
var later = require('later');
var detectionService = require('./detection.service');

var path = 'http://' + config.baseUser + ':' + config.basePassword + '@' + config.baseUrl + config.baseDB;
var agentId = config.agent.name;
var change = false;


// listen for detections
function startScanning() {
    console.log("Student scanning started");

    // schedule the batched detections to be sent to the server
    var sched = later.parse.recur().every(config.batchSendFrequency).second();
    later.setInterval(sendDetections, sched);

    bleacon.on('discover', function (bleacon) {
        // Format = {"uuid":"b9407f30f5f8466eaff925556b57fe6d","major":19602,"minor":10956,"measuredPower":-74,"rssi":-63,"accuracy":0.5746081071882325,"proximity":"near"}
        //console.log(JSON.stringify(bleacon));

        detectionService.processDetection({
            agentId: agentId,
            time: Date.now(),
            uuid: bleacon.uuid,
            major: bleacon.major,
            minor: bleacon.minor,
            tx: bleacon.measuredPower,
            rssi: bleacon.rssi,
            proximity: bleacon.accuracy
        });
    });
}


function sendDetections() {
    //console.log("sendDetections()");
    // expire old detections
    detectionService.removedExpired();
    var detections = detectionService.getDetections();
    if (detections.length == 0) {
        console.log("No Beacon detected Yet.");
    }
    else {
        console.log("Sending Batch Update: ");
        post.postData(detections, path);
        console.log("Batch Update Completed.");

    }
}


bleacon.startScanning(/*uuid,major,minor*/);
startScanning();