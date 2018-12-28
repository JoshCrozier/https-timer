# https-timer

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependencies][david-image]][david-url]
[![DevDependencies][david-dev-image]][david-dev-url]
[![Vulnerabilities][snyk-image]][snyk-url]
[![NPM downloads][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/https-timer.svg?style=flat
[npm-url]: https://www.npmjs.com/package/https-timer
[travis-image]: https://img.shields.io/travis/JoshCrozier/https-timer.svg?style=flat
[travis-url]: https://travis-ci.org/JoshCrozier/https-timer
[david-image]: https://img.shields.io/david/JoshCrozier/https-timer.svg?style=flat
[david-url]: https://david-dm.org/JoshCrozier/https-timer
[david-dev-image]: https://david-dm.org/JoshCrozier/https-timer/dev-status.svg
[david-dev-url]: https://david-dm.org/JoshCrozier/https-timer?type=dev
[snyk-image]: https://snyk.io/test/npm/https-timer/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/https-timer
[download-image]: https://img.shields.io/npm/dm/https-timer.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/https-timer

A lightweight, dependency-free [Node.js]((https://nodejs.org)) module for timing HTTP/HTTPS requests.

Useful for determining the duration of different HTTPS phases:

- Socket Initialization
- DNS Lookup
- TCP Connection
- TLS Handshake
- Time to First Byte
- Content Transfer

## Installation

    $ npm install https-timer --save

## Basic Usage

```js
const httpsTimer = require('https-timer');

httpsTimer.get('https://www.google.com', (error, response) => {
  if (!error && response) {
    console.log(response.timing); // Prints the timing durations below
  }
});
```

When a request has ended, a `timing` object is added to the `response` object.

Here is an example snapshot of the `timing` object. The timing durations are in milliseconds:

```json
{
  "durations": {
    "socketOpen": 1.579389,
    "dnsLookup": 39.922508,
    "tcpConnection": 28.770425,
    "tlsHandshake": 218.159047,
    "firstByte": 148.640706,
    "contentTransfer": 1.954565,
    "total": 439.02664
  }
}
```


## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016-2018 Josh Crozier