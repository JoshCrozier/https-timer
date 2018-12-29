# https-timer

[![npm package](https://nodei.co/npm/https-timer.png?downloads=true)](https://www.npmjs.com/package/https-timer)

[![NPM version](https://img.shields.io/npm/v/https-timer.svg?style=flat-square)](https://www.npmjs.com/package/https-timer)
[![Build status](https://img.shields.io/travis/JoshCrozier/https-timer.svg?style=flat-square)](https://travis-ci.org/JoshCrozier/https-timer)
[![Coverage](https://img.shields.io/codecov/c/github/JoshCrozier/https-timer.svg?style=flat-square)](https://codecov.io/github/JoshCrozier/https-timer)
[![Dependencies](https://img.shields.io/david/JoshCrozier/https-timer.svg?style=flat-square)](https://david-dm.org/JoshCrozier/https-timer)
[![DevDependencies](https://david-dm.org/JoshCrozier/https-timer/dev-status.svg?style=flat-square)](https://david-dm.org/JoshCrozier/https-timer?type=dev)
[![Vulnerabilities](https://snyk.io/test/npm/https-timer/badge.svg?style=flat-square)](https://snyk.io/test/npm/https-timer)

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

## Request with custom options

Since `httpsTimer` utilizes the native Node.js [`http`](https://nodejs.org/api/http.html) and [`https`](https://nodejs.org/api/https.html) modules, you can pass an `options` object when making a request:

```js
const httpsTimer = require('https-timer');

const options = {
  url: 'https://api.github.com/repos/JoshCrozier/https-timer',
  headers: {
    'User-Agent': 'HTTPS Request Timer'
  }
};

httpsTimer.get(options, (error, response) => {
  if (!error && response && response.statusCode === 200) {
    console.log('Response body: ', JSON.parse(response.body));
    console.log('Response Timing: ', response.timing);
  } else {
    console.log('Request error: ', error);
  }
});
```


## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016-2018 Josh Crozier