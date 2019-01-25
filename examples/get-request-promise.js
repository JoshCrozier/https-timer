'use strict';

const httpsTimer = require('./../index.js');

httpsTimer.getAsync('https://www.google.com').then(response => {
  console.log(response.timing);
}).catch(error => {
  console.log('Request error: ', error);
});
