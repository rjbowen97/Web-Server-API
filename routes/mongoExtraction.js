var express = require('express');
var router = express.Router();

var mbzBuilder = require('../public/javascripts/mbzBuilder');

/* GET home page. */
router.get('/', function (req, res, next) {
    mbzBuilder.buildMBZ();
    res.render('index', { title: 'Express' });
});

module.exports = router;
