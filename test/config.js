'use strict';

module.exports = {
  mockEndpoint: 'http://localhost:8080',
  mockEndpointWithError: 'http://localhost:8081',
  expectedTimingDurationKeys: [
    'socketOpen', 'dnsLookup', 'tcpConnection',
    'tlsHandshake', 'firstByte', 'contentTransfer',
    'total'
  ]
};
