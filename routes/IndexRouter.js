const express = require('express');
const router = express.Router();
const { indexControling}= require('../controllers/indexController')

/* GET home page. */
router.get('/',  indexControling)

module.exports = router;
