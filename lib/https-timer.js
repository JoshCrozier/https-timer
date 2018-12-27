'use strict';

const http = require('http');
const https = require('https');
const urlUtil = require('url');
const timeRequest = require('./time-request');

function request(url, options, callback) {
  const params = getParams(url, options, callback);

  return handleRequest('request', params);
}

function get(url, options, callback) {
  const params = getParams(url, options, callback);

  return handleRequest('get', params);
}

function handleRequest(method, params) {
  const httpModule = getHttpModule(params);
  const request = timeRequest(httpModule[method](params), params.callback);

  if (method === 'request' && params.body) {
    request.write(params.body);
  }

  request.end();

  return request;
}

function getHttpModule(params) {
  return /^https/.test(params.protocol) ? https : http;
}

function getParams(url, options, callback) {
  const params = Object.assign(
    typeof url === 'string' ? urlUtil.parse(url) : {},
    options !== null && typeof options === 'object' ? options : {}
  );

  params.callback = typeof options === 'function' ? options : callback;

  return params;
}

module.exports = {
  get,
  request
};