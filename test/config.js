'use strict';

const basePath = 'http://localhost:8080';

module.exports = {
  MAX_TIMEOUT: 10 * 1000,
  mockEndpoint: `${basePath}`,
  mockEndpointPost: `${basePath}/post`,
  mockEndpoint500Status: `${basePath}/500-status`,
  mockEndpointWithError: `${basePath}/throw-error`,
  POST_BODY: {
    test: 123
  },
  realEndpointNoTLS: 'http://www.google.com',
  realEndpointTLS: 'https://www.google.com',
  realEndpointIP: 'https://1.1.1.1',
  expectedTimingDurationKeys: [
    'socketOpen', 'dnsLookup', 'tcpConnection',
    'tlsHandshake', 'firstByte', 'contentTransfer',
    'total'
  ]
};
