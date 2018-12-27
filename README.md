https-timer
==========

A [Node.js]((https://nodejs.org)) module for timing HTTP/HTTPS requests.

Useful for determining the timing of the following events:

- Socket Initialization
- DNS Lookup
- TCP Connection
- TLS Handshake
- Request
- Time to First Byte
- Content transfer


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
    "socketOpen": 1.591956,
    "dnsLookup": 20.326722,
    "tcpConnection": 45.247362,
    "tlsHandshake": 93.815933,
    "sendRequest": 1.593583,
    "firstByte": 154.307801,
    "contentTransfer": 2.472127,
    "total": 319.355484
  }
}
```


## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016-2018 Josh Crozier