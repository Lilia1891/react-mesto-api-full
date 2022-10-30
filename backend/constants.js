const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const REGISTRATION_ERROR = 409;
const FORBIDDEN_ERROR = 403;
const corsOptions = {
  origin: [
    'https://mesto-praktikum.nomoredomains.icu',
    'http://mesto-praktikum.nomoredomains.icu',
    'http://localhost:3002',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};
module.exports = {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  REGISTRATION_ERROR,
  FORBIDDEN_ERROR,
  corsOptions,
};
