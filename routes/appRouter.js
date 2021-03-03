const express = require('express');
const router = express.Router();
const { appControlling}= require('../controllers/appController')

/* GET home page. */
router.get('/',    appControlling)

module.exports = router;

