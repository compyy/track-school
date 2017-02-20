'use strict';

var Beacon = require('./Beacon');
var _ = require('lodash');
var beaconDictionary = {};

module.exports.processDetection = function processDetection(detection) {
    storeDetection(detection);
}

function storeDetection(detection) {
    var beacon = new Beacon(detection);
    // capture most recent detection
    var existingBeacon = beaconDictionary[beacon.key()];
    if (existingBeacon) {
        existingBeacon.update(detection);
    } else {
        beaconDictionary[beacon.key()] = beacon;
        console.log("New Student added", beacon.key());
    }
}

/**
 * Remove beacons we no longer see
 */
module.exports.removedExpired = function removeExpired() {
    var keys = _.keys(beaconDictionary);

    _.forEach(keys, function (key) {

        var beacon = beaconDictionary[key];
        if (beacon.isExpired()) {
            delete beaconDictionary[key];
            console.log('delete expired beacon: ' + key);
        }
    });
}

module.exports.getDetections = function () {
    var beacons = _.values(beaconDictionary);
    var detections = _.invokeMap(beacons, Beacon.prototype.payload);
    return detections;
}