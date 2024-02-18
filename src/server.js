const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const otherHandler = require('./otherResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': otherHandler.getUsers,
    '/notReal': otherHandler.notReal,
    notFound: otherHandler.notFound,
  },
  HEAD: {
    '/getUsers': otherHandler.getUsersHead,
    '/notReal': otherHandler.notReal,
    notFound: otherHandler.notFoundHead,
  },
  POST: {
    '/addUser': otherHandler.addUser,
  },
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response);
  }

  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening of 127.0.0.1:${port}`);
});
