const express = require('express');
const router = express.Router();

const home = require('../controller/homeController');
router.get('/',home.homeFunc);

module.exports = router;