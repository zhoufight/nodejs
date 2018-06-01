const express = require('express');
const router = express.Router();
const api = require('../controllers/apiController');

router.get('/queryUser',api.queryUser);
router.get('/queryLogin',api.queryLogin);

module.exports = router;