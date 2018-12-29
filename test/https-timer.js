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

    it('should have a TLS duration of zero when requesting a non-HTTPS endpoint', done => {
      httpsTimer.get(config.realEndpointNoTLS, (error, response) => {
        expect(response.timing.durations.tlsHandshake).to.be.equal(0);

        done(error);
      });
    }).timeout(config.MAX_TIMEOUT);

    it('should have a DNS duration of zero when requesting an IP address', done => {
      httpsTimer.get(config.realEndpointIP, (error, response) => {
        expect(response.timing.durations.dnsLookup).to.be.equal(0);

        done(error);
      });
    }).timeout(config.MAX_TIMEOUT);
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
