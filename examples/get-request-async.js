'use strict';

const httpsTimer = require('./../index.js');

(async() => {
  try {
    const response = await httpsTimer.getAsync('https://www.google.com');
    console.log(response.timing);
  } catch (error) {
    console.log('Request error: ', error);
  }
})();
