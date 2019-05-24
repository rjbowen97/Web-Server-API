var express = require('express');
var router = express.Router();

var mbzBuilder = require('../public/javascripts/mbzBuilder');

/* GET home page. */
router.get('/', function (req, res, next) {
    let mongoQuery = {};
    console.log(req.query);

    tagList = []

    for (let currentTagKey in req.query) {

        console.log(currentTagKey)
        console.log(req.query[currentTagKey]);

        mongoQuery["module\\dxml.module.tags.tag.name"] = req.query[currentTagKey];

    }

    console.log(mongoQuery);

    mbzBuilder.buildMBZ(mongoQuery);
    res.render('index', { title: 'Express' });
});

module.exports = router;
