var express = require('express');
var router = express.Router();


router.post('/insert', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
