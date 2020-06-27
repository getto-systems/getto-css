const headers = {
  "strict-transport-security": "max-age=31536000",
  "content-security-policy": [
    "default-src 'none'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "connect-src 'self'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "img-src 'self'",
    "font-src 'self'",
    "script-src " + [
      "'self'",
    ].join(" "),
    "style-src " + [
      "'self'",
    ].join(" "),
    "style-src-elem " + [
      "'self'",
      "https://trellis.getto.systems/css/",
      "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
      "'sha256-2A5Wtu5POsS6Hj3CQs8vKYei6omWRq7MzlUZF7VwmHs='",
    ].join(" "),
  ].join(";"),
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "x-xss-protection": "1; mode=block",
  "referrer-policy": "same-origin",
};

console.log(JSON.stringify(Object.keys(headers).reduce((acc,key) => {
  acc["header-" + key] = headers[key];
  return acc;
}, {})));
