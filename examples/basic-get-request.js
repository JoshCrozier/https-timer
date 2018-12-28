'use strict';

const httpsTimer = require('./../index.js');

httpsTimer.get('https://www.google.com', (error, response) => {
  if (!error && response) {
    console.log('Headers: ', response.headers);
    console.log('Status Code: ', response.statusCode);
    console.log('Response body: ', response.body);
    console.log('Response Timing: ', response.timing);
  } else {
    console.log('Request error: ', error);
  }
});
