'use strict';

const nock = require('nock');
const config = require('./config');

function configureMockEndpoints() {
  nock(config.mockEndpoint)
    .get('/').reply(200, {})
    .get('/500-status').reply(500, {})
    .get('/throw-error').replyWithError(new Error('An error occurred'))
    .post('/post', config.POST_BODY).reply(200, {});
}

module.exports = {
  configureMockEndpoints
};
