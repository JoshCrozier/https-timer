'use strict';

const httpsTimer = require('./../index.js');

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
