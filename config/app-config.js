const express = require('express'),
  favicon = require('serve-favicon'),
  bodyParser = require('body-parser');
  cookieParser = require('cookie-parser'),
  path = require('path');

module.exports = function() {
  const app = express();

  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../views'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(favicon("public/favicon.png"));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(cookieParser());

  return app;
}();