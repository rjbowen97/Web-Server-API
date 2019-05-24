var express = require('express');
var router = express.Router();

var mbzBuilder = require('../public/javascripts/mbzBuilder');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    mbzBuilder.buildMBZ();
    res.render('index', { title: 'Express' });
});

module.exports = router;
