// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { validateUrl } = require('./validateUrl');
const { createSucessPayload } = require('./createSucessPayload');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlValidation = validateUrl(req.url);

    res.setHeader('Content-Type', 'application/json');

    if (urlValidation.correct) {
      respondWithSuccess(res, req.url);
    } else {
      responWithError(res, urlValidation.messages);
    }
  });

  return server;
}

function respondWithSuccess(res, url) {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  const payload = createSucessPayload(url);

  res.end(JSON.stringify(payload));
}

function responWithError(res, messages) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';

  const payload = {
    errors: [...messages].map((el) => {
      return { message: el };
    }),
  };

  res.end(JSON.stringify(payload));
}

module.exports = { createServer };
