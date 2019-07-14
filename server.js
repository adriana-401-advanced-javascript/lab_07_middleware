'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('./routes.js');

const requestTime = (req, res, next) => {
  req.requestTime = (new Date().toUTCString());
  console.log(req.requestTime);
  next();
};

const eachRequest = (req, res, next) => {
  console.log(`req.path, req.method, and requestTime: ${req.path}, ${req.method}, ${req.requestTime}`);
  next();
};

const errorOnD = (req, res, next) => {
  if (req.path === '/d') {
    next('d');
  }
  next();
};

const squareIt = (num) => {
  return (req, res, next) => {
    req.number = num*num;
    next();
  };
};

app.use(requestTime);
app.use(eachRequest);
app.use(errorOnD);
app.use(routes);

app.get('/a', (req,res) => {
  res.status(200).send('Route A');
});

app.get('/b', squareIt(5), (req,res) => {
  res.status(200).send(`Route B ${req.number}`);
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
