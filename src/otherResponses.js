const users = {};

const basicResponse = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const basicResponseHead = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you request was not found.',
    id: 'notFound',
  };

  basicResponse(request, response, 404, responseJSON);
};

const notFoundHead = (request, response) => {
  basicResponseHead(request, response, 404);
};

module.exports = {
  basicResponse,
  basicResponseHead,
  notFound,
  notFoundHead,
};
