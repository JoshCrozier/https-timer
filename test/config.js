'use strict';

const basePath = 'https://localhost';

module.exports = {
  mockEndpoint: `${basePath}:8080`,
  mockEndpointPost: `${basePath}:8080/post`,
  mockEndpointWithError: `${basePath}:8081`,
  expectedTimingDurationKeys: [
    'socketOpen', 'dnsLookup', 'tcpConnection',
    'tlsHandshake', 'firstByte', 'contentTransfer',
    'total'
  ],
  POST_BODY: {
    test: 123
  }
};
