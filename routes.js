'use strict';

const express = require ('express');
const router = express.Router();

router.get('/c');
router.get('/d');

router.get('/c', (req,res) => {
  res.status(200).send('Route C');
});

router.get('/d', (req,res) => {
  res.status(200).send('Route D');
});

module.exports = router;
