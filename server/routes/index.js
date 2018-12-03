const express = require('express');
const router = express.Router();
const _ = require('lodash');
const path = require('path');
const { handleFileUpload } = require('../utils/handleFileUpload');


// GET Route
router.get('/', (req, res) => {
  res.render('index.html');
});

// POST Route
router.post('/', (req, res) => {
  let body = _.pick(req.body, ['urlOne', 'urlTwo', 'percentage']);
  handleFileUpload(body.urlOne, body.urlTwo, body.percentage);
  res.download(path.join(__dirname, '../files/data.csv'));

});

module.exports = router;
