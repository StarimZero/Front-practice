var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books.ejs',{title: '도서 검색 페이지 입니다.'});
});

module.exports = router;
