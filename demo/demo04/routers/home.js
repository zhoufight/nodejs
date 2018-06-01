const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
router.get('/',home.homeFunc);

module.exports = router;