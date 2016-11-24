'use strict';

// choices for data transfer protocol
var HTTP_PROTOCOL = 'HTTP';
var SOCKET_PROTOCOL = 'socket';

module.exports = {

    baseUrl: 'http://192.168.1.242:9000',

    agent: {
        name : 'Student 1',
        location: 'Enterance',
        range: 1.5 // range (in meters) considered for an enter event
    },
    batchSendFrequency : 2, // number of seconds
    detectionProtocol: SOCKET_PROTOCOL,
    beaconExpireFrequency : 10, // number of seconds
    numPastDetectionsToAvg: 6 // number of previous detections to smooth
}