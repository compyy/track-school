'use strict';

module.exports = {

    baseUrl: '192.168.1.242:8080',
    baseUrltoken: '_logic/roles/admin',
    baseProt: 'rest',
    baseUser: 'admin',
    basePassword: 'changeit',
    baseDB: '/school/gateway',
    debugLogs: false,


    agent: {
        name: 'Entrance 1',
        location: 'School Main Entrance',
        capabilities: "BLE Scanner",
        range: 1.5 // range (in meters) considered for an enter event
    },
    batchSendFrequency: 10, // number of seconds
    beaconExpireFrequency: 30, // number of seconds
    numPastDetectionsToAvg: 6 // number of previous detections to smooth
}