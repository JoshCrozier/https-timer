'use strict';

const nock = require('nock');
const config = require('./config');

function configureMockEndpoints() {
  nock(config.mockEndpoint).get('/').reply(200, {}).post('/post', config.POST_BODY).reply(200, {});
  nock(config.mockEndpointWithError).get('/').replyWithError(new Error('An Error Occurred'));
}

module.exports = {
  configureMockEndpoints
};
