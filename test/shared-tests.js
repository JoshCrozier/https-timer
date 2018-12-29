'use strict';

const expect = require('chai').expect;
const httpsTimer = require('./../index.js');
const config = require('./config');

function testRequestByMethod(method) {
  it('should return a valid response object on success and the error should be null', done => {
    httpsTimer[method](config.mockEndpoint, (error, response) => {
      expect(error).to.be.equal(null);
      expect(response).to.not.equal(undefined);
      expect(response).to.be.an('object');

      done(error);
    });
  });

  it('should return an error on failure and the response object should be null', done => {
    httpsTimer[method](config.mockEndpointWithError, (error, response) => {
      expect(error).to.not.be.equal(null);
      expect(response).to.equal(null);

      done(response);
    });
  });

  it('should include headers and a status code in the response object', done => {
    httpsTimer[method](config.mockEndpoint, (error, response) => {
      expect(response.headers).to.be.an('object');
      expect(response.statusCode).to.be.a('number');

      done(error);
    });
  });

  it('should contain `body` and `timing` properties in the response object', done => {
    httpsTimer[method](config.mockEndpoint, (error, response) => {
      expect(response.body).to.not.equal(undefined);
      expect(response.timing).to.be.an('object');

      done(error);
    });
  });

  it('should contain a `timing.duration` object with the expected durations keys', done => {
    httpsTimer[method](config.mockEndpoint, (error, response) => {
      const durations = response.timing.durations;

      expect(durations).to.be.an('object');
      expect(durations).to.contain.keys(config.expectedTimingDurationKeys);

      done(error);
    });
  });

  it('should always contain durations that are numbers greater than or equal to zero', done => {
    httpsTimer[method](config.mockEndpoint, (error, response) => {
      const durations = response.timing.durations;

      config.expectedTimingDurationKeys.forEach(key => {
        expect(durations[key]).to.be.a('number');
        expect(durations[key]).to.be.at.least(0);
      });

      done(error);
    });
  });

  it('should always contain durations that add up to the total duration', done => {
    httpsTimer[method](config.mockEndpoint, (error, response) => {
      const durations = response.timing.durations;
      const nonTotalDurationKeys = config.expectedTimingDurationKeys.filter(key => key !== 'total');
      const sumOfDurations = nonTotalDurationKeys.map(key => durations[key]).reduce((a, b) => a + b, 0);

      expect(durations.total).to.closeTo(sumOfDurations, 0.001);

      done(error);
    });
  });
}

module.exports = {
  testRequestByMethod
};
