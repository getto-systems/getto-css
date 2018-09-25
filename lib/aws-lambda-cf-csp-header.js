'use strict';

const headers = [
  ["Strict-Transport-Security", "max-age=31536000"],
  ["Content-Security-Policy", [
    "default-src 'self'",
    "object-src 'none'",
    "connect-src 'self'",
    "img-src 'self'",
    "font-src 'self' https://fonts.gstatic.com/ https://use.fontawesome.com/",
    "script-src 'self'",
    "style-src 'self' https://fonts.googleapis.com/ https://use.fontawesome.com/"
  ]],
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["X-XSS-Protection", "1; mode=block"],
  ["Referrer-Policy", "same-origin"]
].map(function(header) {
  const key = header[0];
  let value = header[1];
  if (value.join) {
    value = value.join("; ");
  }
  return [key, value];
});

exports.handler = async (event) => {
  const response = event.Records[0].cf.response;

  headers.forEach((h) => {
    const key = h[0];
    const value = h[1];
    response.headers[key.toLowerCase()] = [{
      key: key,
      value: value,
    }];
  });

  return response;
};
