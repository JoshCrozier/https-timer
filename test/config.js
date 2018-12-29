'use strict';

const basePath = 'https://localhost:8080';

module.exports = {
  mockEndpoint: `${basePath}`,
  mockEndpointPost: `${basePath}/post`,
  mockEndpoint500Status: `${basePath}/500-status`,
  mockEndpointWithError: `${basePath}/throw-error`,
  expectedTimingDurationKeys: [
    'socketOpen', 'dnsLookup', 'tcpConnection',
    'tlsHandshake', 'firstByte', 'contentTransfer',
    'total'
  ],
  POST_BODY: {
    test: 123
  }
};
