http-timer
==========

A Node.js module for timing HTTP/S requests.

Useful for determining the timing for the following HTTP/S events:

- Socket Initialization
- DNS Lookup
- TCP Connection
- TLS Handshake
- Request
- Time to First Byte
- Content transfer

## Basic Usage

```
httpTimer.get('https://www.google.com', (error, response) => {
  if (!error && response) {
    console.log(response.timing.durations); // Prints the timing durations below
  }
});
```

Example HTTPS timing durations (in milliseconds):

```
{
  "socketOpen": 1.591956,
  "dnsLookup": 20.326722,
  "tcpConnection": 45.247362,
  "tlsHandshake": 93.815933,
  "sendRequest": 1.593583,
  "firstByte": 154.307801,
  "contentTransfer": 2.472127,
  "total": 319.355484
}
```


## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016-2018 Josh Crozier