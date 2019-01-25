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

  describe('.getAsync()', () => {
    it('should be the async equivalent for the `get` method', done => {
      httpsTimer.getAsync(config.mockEndpoint).then(response => {
        shared.expectTimingDurations(response);

        done();
      }).catch(done);
    });

    it('should be compatible with async/await', async() => {
      const response = await httpsTimer.getAsync(config.mockEndpoint);
      shared.expectTimingDurations(response);
    });
  });

  describe('.requestAsync()', () => {
    it('should be the async equivalent for the `request` method', done => {
      httpsTimer.requestAsync(config.mockEndpoint).then(response => {
        shared.expectTimingDurations(response);

        done();
      }).catch(done);
    });

    it('should be compatible with async/await', async() => {
      const response = await httpsTimer.requestAsync(config.mockEndpoint);
      shared.expectTimingDurations(response);
    });
  });
});
