'use strict';

function timeRequest(request, callback) {
  const eventTimes = {
    start: process.hrtime(),
    socketOpen: null,
    dns: null,
    tcp: null,
    tls: null,
    request: null,
    firstByte: null,
    end: null
  };

  request.on('response', response => {
    let responseBody = '';

    response.on('data', data => { responseBody += data; });
    response.once('readable', () => { eventTimes.firstByte = process.hrtime(); });
    response.once('end', () => {
      eventTimes.end = process.hrtime();

      response.timing = {
        durations: calculateDurations(eventTimes)
      };

      response.body = responseBody || null;

      if (callback) {
        callback(null, response);
      }
    });
  });

  request.once('socket', socket => {
    eventTimes.socketOpen = process.hrtime();

    socket.once('lookup', () => { eventTimes.dns = process.hrtime(); });
    socket.once('connect', () => { eventTimes.tcp = process.hrtime(); });
    socket.once('secureConnect', () => { eventTimes.tls = process.hrtime(); });
  });

  request.once('finish', () => { eventTimes.request = process.hrtime(); });

  request.once('error', error => {
    if (callback) {
      callback(error, null);
    }
  });

  return request;
}

function calculateDurations(event) {
  return {
    socketOpen: getDuration(event.start, event.socketOpen),
    dnsLookup: event.dns !== null ? getDuration(event.socketOpen, event.dns) : 0,
    tcpConnection: getDuration(event.dns !== null ? event.dns : event.socketOpen, event.tcp),
    tlsHandshake: event.tls !== null ? getDuration(event.tcp, event.tls) : 0,
    sendRequest: getDuration(event.tls !== null ? event.tls : event.tcp, event.request),
    firstByte: getDuration(event.request, event.firstByte),
    contentTransfer: getDuration(event.firstByte, event.end),
    total: getDuration(event.start, event.end)
  };
}

function getDuration(start, end) {
  const secondDiff = end[0] - start[0];
  const nanoSecondDiff = end[1] - start[1];
  const diffInNanoSecond = secondDiff * 1e9 + nanoSecondDiff;
  const diff = diffInNanoSecond / 1e6;

  return diff;
}

module.exports = timeRequest;
