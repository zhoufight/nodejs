const express = require('express');
const router = express.Router();
const home = require('./home.js');

router.use('/',home);