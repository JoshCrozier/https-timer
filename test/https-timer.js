'use strict';

const expect = require('chai').expect;
const httpsTimer = require('./../index.js');
const setup = require('./setup');
const shared = require('./shared-tests');
const config = require('./config');

describe('Core API - httpsTimer', () => {
  beforeEach(() => { setup.configureMockEndpoints(); });

  describe('.get()', () => {
    shared.testRequestByMethod('get');
  });
  describe('.request()', () => {
    shared.testRequestByMethod('request');

    it('should support the POST method', done => {
      httpsTimer.request(config.mockEndpointPost, {
        method: 'POST',
        body: JSON.stringify(config.POST_BODY)
      }, (error, response) => {
        expect(response).to.be.an('object');

        done(error);
      });
    });
  });
});
