const express = require('express')
    , router = express.Router()
    , _ = require('lodash')
    , path = require('path')
    , validUrl = require('valid-url')
    , http = require('../utils/http')
    , csv = require('express-csv')
    , findAndCompare = require('../utils/findAndCompare');


// GET Route
router.get('/', (req, res) => {
  res.render('index.html');
});


// POST Route
router.post('/', (req, res) => {

  let body = _.pick(req.body, ['urlOne', 'urlTwo', 'percentage']);

  if (validUrl.isUri(body.urlOne) && validUrl.isUri(body.urlTwo)){
    http(body.urlOne, body.urlTwo).then((data) => {
      let mostSimilarLink = findAndCompare(data, body.urlOne, body.urlTwo)
      res.csv(mostSimilarLink);
    }).catch((error) => {
      return error
    });
  }else{
    res.redirect('back')
  }
});

module.exports = router;
