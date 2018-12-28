'use strict';

const httpsTimer = require('./../index.js');

const url = 'https://api.github.com/repos/JoshCrozier/https-timer';
const options = {
  headers: {
    'User-Agent': 'HTTPS Request Timer'
  }
};

httpsTimer.get(url, options, (error, response) => {
  if (!error && response && response.statusCode === 200) {
    console.log('Response body: ', JSON.parse(response.body));
    console.log('Response Timing: ', response.timing);
  } else {
    console.log('Request error: ', error);
  }
});
