'use strict';

const Hapi = require('hapi');
const dotenv = require('dotenv');
const fs = require('fs');
const Bell = require('bell');

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const server = Hapi.server({
  port: process.env.PORT || 3000,
  tls: {
    key: fs.readFileSync('private/webserver.key'),
    cert: fs.readFileSync('private/webserver_self.crt')
  }
});


async function init() {
  await server.register(require('inert'));
  await server.register(require('vision'));
  await server.register(require('hapi-auth-cookie'));
  await server.register(require('bell'));
  require('./app/models/db');

  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });

  const authCookieOptions = {
    password:  process.env.cookie_password,
    cookie: process.env.cookie_name,
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/'
  };

  server.auth.strategy('standard', 'cookie', authCookieOptions);

  const bellAuthOptions = {
    provider: 'github',
    password: 'github-encryption-password-secure',
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    isSecure: true
  };

  server.auth.strategy('github-oauth', 'bell', bellAuthOptions);

  server.auth.default({
    mode: 'required',
    strategy: 'standard',
  });

  server.route(require('./routes'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();