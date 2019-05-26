var express = require('express');
var router = express.Router();

var mbzBuilder = require('../public/javascripts/mbzBuilder');

function getORQuery(queryString) {
    let orQuery = {};

    for (let currentTagKey in queryString) {
        orQuery["module\\dxml.module.tags.tag.name"] = queryString[currentTagKey];
    }

    return orQuery;
}

function getANDQuery(queryString) {
    let mongoQuery = [];
    
    for (let currentTagKey in queryString) {
        mongoQuery.push({"module\\dxml.module.tags.tag.name" : queryString[currentTagKey]})
    }

    let andQuery = {};
    andQuery["$and"] = mongoQuery;

    console.log(andQuery);

    return andQuery;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    // let mongoQuery = getORQuery(req.query);
    let mongoQuery = getANDQuery(req.query);

    mbzBuilder.buildMBZ(mongoQuery);
    res.render('index', { title: 'Express' });
});

module.exports = router;
